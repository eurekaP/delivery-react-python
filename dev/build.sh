#!/bin/bash

#[ -n "$DEBUG" ] && set -x

ENV=$1
APP_USER=connect
APP_NAME=connect-${ENV}

CURR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR=`realpath ${CURR_DIR}/..`
CONFIG_DIR=$PROJECT_DIR/dev/

cd ${PROJECT_DIR}
VERSION=`git rev-parse --short HEAD`
cd -

BUILD_DIR=$CURR_DIR/build/${APP_NAME}
DIST_DIR=$CURR_DIR/dist

if [ ! -d "$CONFIG_DIR" ]; then
    echo "Can not find config files directory ${CONFIG_DIR}";
    exit 1
fi


if [ -d "$BUILD_DIR" ]; then rm -rf $BUILD_DIR; fi
mkdir -p $BUILD_DIR

cd $PROJECT_DIR

if [ -z "$ENV" ]
then
    echo "ENV type not specified. Default is '${USER}'. Continue (Y/n)?"
    read go
    if [[ $go != "Y" && $go != "y" && $go != "" ]]; then
        echo "Cancelled."
        exit 1
    fi
    ENV="${USER}"
fi


echo "Copying project files to build.."
mkdir -p ${BUILD_DIR}

FILES_CMD="git ls-tree --full-tree -r --name-only HEAD"
FILES_LIST="${BUILD_DIR}/../_files.txt"
#FILES_EXCLUDES=".hgignore .hgtags srv/etc/"
#for EXCL in $FILES_EXCLUDES
#do
#    FILES_CMD="${FILES_CMD} --exclude ${EXCL}"
#done
FILES_CMD="${FILES_CMD} > ${FILES_LIST}"
eval ${FILES_CMD}

cd $CURR_DIR
rsync --files-from ${FILES_LIST} -av --progress --safe-links --delete $PROJECT_DIR $BUILD_DIR/ > /dev/null # 2>&1

if [ $ENV != "development" ]; then
    BUILD_CONF="${CONFIG_DIR}/build.${ENV}.conf"
    if [ -f ${BUILD_CONF} ]
    then
        echo "Loading build config from ${BUILD_CONF}"
        source ${BUILD_CONF}
    else
        echo "Using default build config ${CONFIG_DIR}/build.conf"
        source ${CONFIG_DIR}/build.conf
    fi
fi


cat << EOF
===============================================================================
${APP_NAME} build started at $(/bin/date)
===============================================================================
Configuration:

APP_NAME=${APP_NAME}
APP_USER=${APP_USER}
ENV=${ENV}
USE_BASIC_HTTP_AUTH=${USE_BASIC_HTTP_AUTH}

SENTRY_DSN_BACKEND=${SENTRY_DSN_BACKEND}
SENTRY_DSN_FRONTEND=${SENTRY_DSN_FRONTEND}

REDIS_DB=${REDIS_DB}
API_ROOT=${API_ROOT}

POSTMARK_API_TOKEN=${POSTMARK_API_TOKEN}
EMAIL_WEBHOOK_SECRET=${EMAIL_WEBHOOK_SECRET}
EMAIL_SUBJECT_PREFIX=${EMAIL_SUBJECT_PREFIX}

SET_MEDIA_ROOT=${SET_MEDIA_ROOT}
IS_DEVELOPMENT=${IS_DEVELOPMENT}

API_WORKERS_COUNT=${API_WORKERS_COUNT}
ADMIN_WORKERS_COUNT=${ADMIN_WORKERS_COUNT}
RQ_HIGH_WORKERS_COUNT=${RQ_HIGH_WORKERS_COUNT}
RQ_DEFAULT_WORKERS_COUNT=${RQ_DEFAULT_WORKERS_COUNT}
RQ_LOW_WORKERS_COUNT=${RQ_LOW_WORKERS_COUNT}

WEB_DOMAIN=${WEB_DOMAIN}
API_DOMAIN=${API_DOMAIN}
ADMIN_DOMAIN=${ADMIN_DOMAIN}
WEB_CERT=${WEB_CERT}
API_CERT=${API_CERT}
ADMIN_CERT=${ADMIN_CERT}

AUTH_PERMANENT_ACCESS=${AUTH_PERMANENT_ACCESS}
STAFF_USERS=${STAFF_USERS}

EMAILS_STAFF_ONLY=${EMAILS_STAFF_ONLY}
EMAILS_WHITELIST=${EMAILS_WHITELIST}

REQUIRED_PACKAGES_ARCH=${REQUIRED_PACKAGES_ARCH}
REQUIRED_PACKAGES_UBUNTU=${REQUIRED_PACKAGES_UBUNTU}
===============================================================================
EOF


INSTALL_TEMPLATE=$CONFIG_DIR/install.sh.template
INSTALLER=${BUILD_DIR}/install.sh
echo "Rendering $INSTALL_TEMPLATE to $INSTALLER"
cp ${INSTALL_TEMPLATE} ${INSTALLER}
sed -i -- "s|{app_version}|${VERSION}|g" ${INSTALLER}
sed -i -- "s|{app_name}|${APP_NAME}|g;s|{app_user}|${APP_USER}|g" ${INSTALLER}
sed -i -- "s|{staff_users}|${STAFF_USERS}|g" ${INSTALLER}
sed -i -- "s|{use_basic_http_auth}|${USE_BASIC_HTTP_AUTH}|g" ${INSTALLER}
sed -i -- "s|{required_packages_arch}|${REQUIRED_PACKAGES_ARCH}|g;s|{required_packages_ubuntu}|${REQUIRED_PACKAGES_UBUNTU}|g" ${INSTALLER}
chmod +x ${INSTALLER}
cp $CONFIG_DIR/_install_lib.sh $BUILD_DIR/

mkdir -p ${BUILD_DIR}/srv/etc

cp -v ${PROJECT_DIR}/srv/etc/ssl-all.nginx.conf ${BUILD_DIR}/srv/etc/
cp -v ${PROJECT_DIR}/srv/etc/htpasswd ${BUILD_DIR}/srv/etc/


echo "Rendering nginx template files for ${ENV}."
NGINX_TEMPLATES="admin api web ssl"
for FNAME in $NGINX_TEMPLATES
do
    SRC_FNAME=${PROJECT_DIR}/srv/etc/${ENV}-${FNAME}.nginx.conf
    TARGET_FNAME=${BUILD_DIR}/srv/etc/${APP_NAME}-${FNAME}.nginx.conf
    if [ -f $SRC_FNAME ]
    then
        cp -v $SRC_FNAME $TARGET_FNAME
    else
        cp ${PROJECT_DIR}/srv/etc/${FNAME}.nginx.template $TARGET_FNAME
        sed -i -- "s|{app_name}|${APP_NAME}|g" $TARGET_FNAME
        sed -i -- "s|{api_domain}|${API_DOMAIN}|g" $TARGET_FNAME
        sed -i -- "s|{api_cert}|${API_CERT}|g" $TARGET_FNAME
        sed -i -- "s|{web_domain}|${WEB_DOMAIN}|g" $TARGET_FNAME
        sed -i -- "s|{web_cert}|${WEB_CERT}|g" $TARGET_FNAME
        sed -i -- "s|{admin_domain}|${ADMIN_DOMAIN}|g" $TARGET_FNAME
        sed -i -- "s|{admin_cert}|${ADMIN_CERT}|g" $TARGET_FNAME
    fi
done

echo "Rendering supervisor template files for ${ENV}." # FIXME copy pasta from above
if [ -f ${PROJECT_DIR}/srv/etc/${ENV}-supervisor.conf ]
then
    cp -v ${PROJECT_DIR}/srv/etc/${ENV}-supervisor.conf ${BUILD_DIR}/srv/etc/${APP_NAME}-supervisor.conf
else
    TARGET_FNAME=${BUILD_DIR}/srv/etc/${APP_NAME}-supervisor.conf
    cp -v ${PROJECT_DIR}/srv/etc/supervisor.template $TARGET_FNAME
    sed -i -- "s|{app_name}|${APP_NAME}|g" $TARGET_FNAME
    sed -i -- "s|{app_user}|${APP_USER}|g" $TARGET_FNAME
    sed -i -- "s|{api_workers_count}|${API_WORKERS_COUNT}|g"  $TARGET_FNAME
    sed -i -- "s|{admin_workers_count}|${ADMIN_WORKERS_COUNT}|g" $TARGET_FNAME
    sed -i -- "s|{rq_high_workers_count}|${RQ_HIGH_WORKERS_COUNT}|g" $TARGET_FNAME
    sed -i -- "s|{rq_default_workers_count}|${RQ_DEFAULT_WORKERS_COUNT}|g" $TARGET_FNAME
    sed -i -- "s|{rq_low_workers_count}|${RQ_LOW_WORKERS_COUNT}|g" $TARGET_FNAME
fi


echo "Rendering bin template files for ${ENV}."
for CMD in start stop restart
do
    TARGET_FNAME=${BUILD_DIR}/bin/${CMD}.sh
    sed "s|{app_name}|${APP_NAME}|g" ${CONFIG_DIR}/${CMD}.sh.template > $TARGET_FNAME
    chmod +x ${TARGET_FNAME}
    sed -i -- "s|{app_name}|${APP_NAME}|g" ${TARGET_FNAME}
done

echo ${VERSION} > $BUILD_DIR/version.txt
cd $CURR_DIR

if [ $ENV != "development" ]; then
    CONFIG_JS=${BUILD_DIR}/client/src/config.js
    VERSION_INFO=${VERSION}
    if [ $ENV != "production" ]; then
        VERSION_INFO="${VERSION_INFO} ${ENV}"
    fi
    echo "Setting VERSION in config.js to ${VERSION_INFO}."
    sed -i -- "s|VERSION = ''|VERSION = '${VERSION_INFO}'|g" ${CONFIG_JS}

    if [ -n "${API_ROOT}" ]; then
        echo "Setting API_ENDPOINT in config.js to ${API_ROOT}."
        sed -i -- "s|http://localhost:8000|${API_ROOT}|g" ${CONFIG_JS}
    fi

    if [ -n "${SENTRY_DSN_FRONTEND}" ]; then
        echo "Setting sentry_dsn in config.js to ${SENTRY_DSN_FRONTEND}."
        sed -i -- "s|sentry_dsn = ''|sentry_dsn = '${SENTRY_DSN_FRONTEND}'|g" ${CONFIG_JS}
    fi
fi


ENV_FILE="${CONFIG_DIR}/_env.${ENV}"
ENV_TARGET=${BUILD_DIR}/_env
if [ -f ${ENV_FILE} ]
then
    echo "Copying ${ENV_FILE} to build.."
    cp -v ${ENV_FILE} $ENV_TARGET
else
    echo "Rendering _env.template for ${ENV}."
    cp ${CONFIG_DIR}/_env.template $ENV_TARGET
    sed -i -- "s|{env}|${ENV}|g" $ENV_TARGET
    sed -i -- "s|{email_webhook_secret}|${EMAIL_WEBHOOK_SECRET}|g" $ENV_TARGET
    sed -i -- "s|{email_subject_prefix}|${EMAIL_SUBJECT_PREFIX}|g" $ENV_TARGET
    sed -i -- "s|{set_emails_staff_only}|${SET_EMAILS_STAFF_ONLY}|g" $ENV_TARGET
    sed -i -- "s|{set_emails_whitelist}|${SET_EMAILS_WHITELIST}|g" $ENV_TARGET
    sed -i -- "s|{set_media_root}|${SET_MEDIA_ROOT}|g" $ENV_TARGET
    sed -i -- "s|{domain}|${DOMAIN}|g;s|{api_domain}|${API_DOMAIN}|g;s|{web_domain}|${WEB_DOMAIN}|g;s|{admin_domain}|${ADMIN_DOMAIN}|g" $ENV_TARGET
    sed -i -- "s|{notifications_agg_seconds}|${NOTIFICATIONS_AGG_WAIT_SECONDS}|g" $ENV_TARGET
    sed -i -- "s|{redisdb}|${REDIS_DB}|g;s|{sentrydsn}|${SENTRY_DSN_BACKEND}|g" $ENV_TARGET
    sed -i -- "s|{emails_staff_only}|${EMAILS_STAFF_ONLY}|g;s|{emails_whitelist}|${EMAILS_WHITELIST}|g" $ENV_TARGET
    sed -i -- "s|{permanent_access}|${AUTH_PERMANENT_ACCESS}|g" $ENV_TARGET
    sed -i -- "s|{postmark_api_token}|${POSTMARK_API_TOKEN}|g" $ENV_TARGET
fi


mkdir -p ${BUILD_DIR}/client/build

echo "Copying sentry.properties to build.."
cp -v $CONFIG_DIR/sentry.properties $BUILD_DIR/client

echo "Building web frontend files.."
cd ${BUILD_DIR}/client
cp -r $PROJECT_DIR/client/node_modules .
npm install
npm run build
cd ${CURR_DIR}

: "${PKG_FILEPATH:=${DIST_DIR}/${APP_NAME}-${VERSION}.tar.gz}"
echo "Creating package ${PKG_FILEPATH}"
mkdir -p $DIST_DIR
cd ${BUILD_DIR}/..
tar --exclude="client/node_modules" -czf ${PKG_FILEPATH} ${APP_NAME}/
cd ${CURR_DIR}

# vim:ts=4:sw=4:expandtab
