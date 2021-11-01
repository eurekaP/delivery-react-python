#!/bin/bash
set -e

TARGET_ENV=$1

if [ -z "$TARGET_ENV" ]
then
    echo "Target environment not specified. Continue with '$USER'? (Y/n)"
	read go
	if [[ $go != "Y" && $go != "y" && $go != "" ]]; then
		echo "Cancelled."
		exit 1
	fi
	TARGET_ENV=$USER
fi


if [ "$TARGET_ENV" = "production" ]; then
    HOST=connect.fleetpal.io
else
    HOST=${TARGET_ENV}.fleetpal.io
fi

_CURR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PROJECT_DIR="$( cd "$_CURR_DIR/.." >/dev/null 2>&1 && pwd )"


#VERSION=`hg identify -n ${PROJECT_DIR}`
cd ${PROJECT_DIR}
VERSION=`git rev-parse --short HEAD`
cd -

PKG_NAME=connect-${TARGET_ENV}-${VERSION}
PKG_ARCHIVE=${PKG_NAME}.tar.gz
PKG_FILEPATH=$PROJECT_DIR/dev/dist/${PKG_ARCHIVE}
INSTALL_CMD="mkdir -p ~/${PKG_NAME} && cd ~/${PKG_NAME} && tar xzf ~/${PKG_ARCHIVE} --strip-components 1 && sudo ~/${PKG_NAME}/install.sh"

PKG_FILEPATH=$PKG_FILEPATH $PROJECT_DIR/dev/build.sh $TARGET_ENV
if [ "$HOST" = "localhost" ]; then
    cp ${PKG_FILEPATH} ~/
    eval ${INSTALL_CMD}
else
    scp -q -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${PKG_FILEPATH} $HOST:~/
    ssh $HOST bash -c "'${INSTALL_CMD}'"
fi

# vim:ts=4:sw=4:expandtab
