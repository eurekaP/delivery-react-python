#!/bin/bash

if uname -r | grep -q -i "arch"
then
    OS_DETECTED="ARCH"
    pkg_is_installed() {
        pacman -Qs ${1} > /dev/null 2>&1
    }
    pkg_is_available() {
        pacman -Syy > /dev/null 2>&1
        pacman -Si ${1} > /dev/null 2>&1
    }
    pkg_install() {
        print_info "Installing ${1}"
        pacman -Syy > /dev/null 2>&1
        pacman -S --noconfirm ${1} >> ${LOGFILE} 2>&1
    }
    fix_supervisord() {
        CONF=/etc/supervisord.conf
        if grep -qs "*.ini" $CONF
        then
            print_info "Modifying [include] section in ${CONF}"
            sed -i -- 's|*.ini|*|g' $CONF
        fi
        enable_service supervisord
        start_service supervisord
    }
    symlink_supervisor_conf() {
        symlink_if_missing "/srv/${APP_NAME}/srv/etc" "/etc/supervisor.d" "${APP_NAME}-supervisor.conf"
    }
    init_postgres() {
        sudo -iu postgres initdb -D /var/lib/postgres/data || print_info "PostgreSQL has already been initialized"
    }
    fix_pg_hba() {
        PG_HBA="/var/lib/postgres/data/pg_hba.conf"
        if grep -q ident ${PG_HBA}
        then
            print_info "Converting 'ident' to 'md5' in ${PG_HBA}"
            cp ${PG_HBA} ${PG_HBA}.DEFAULT >> ${LOGFILE}
            sed -i -- 's| ident| md5|g' ${PG_HBA}
        fi
        pg_reload_conf
    }
	fix_nginx() {
        mkdir -p /etc/nginx/sites-available
        mkdir -p /etc/nginx/sites-enabled
        # Remove the default "server" configuration from nginx.conf. If we don't do this
        # our configuration will not be used.
        if grep -qs "server" /etc/nginx/nginx.conf
        then
            print_info "Modifying default nginx configuration"
            # Create a backup of the default configuration
            cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.DEFAULT >> ${LOGFILE}
            sed -i '/server/,$d' /etc/nginx/nginx.conf  # removes everything in the file from the first line that contains the word "server"
            echo '    include       /etc/nginx/sites-enabled/*;' >> /etc/nginx/nginx.conf
            echo '}' >> /etc/nginx/nginx.conf
        fi
	}
    init_elasticsearch() {
        ELASTICSEARCH_KEYSTORE="/usr/share/elasticsearch/config/elasticsearch.keystore"
        if [ -e $ELASTICSEARCH_KEYSTORE ]; then
            print_info "Found existing elasticsearch.keystore..."
        else
            print_info "Creating elasticsearch.keystore"
            yes | elasticsearch-keystore create
        fi
        enable_service elasticsearch
        start_service elasticsearch
    }
    restart_cron_service() {
        restart_service cronie
    }
elif uname -v | grep -q "Ubuntu"
then
    OS_DETECTED="UBUNTU"
    pkg_is_installed() {
        dpkg-query -l ${1} > /dev/null 2>&1
    }
    pkg_is_available() {
        apt-get --assume-yes update > /dev/null 2>&1
        apt-cache search ${1} > /dev/null 2>&1
    }
    pkg_install() {
        print_info "Installing ${1}"
        apt-get update > /dev/null 2>&1
        apt-get -y install -q ${1} >> ${LOGFILE} 2>&1
    }
    fix_supervisord() {
        CONF=/etc/supervisor/supervisord.conf
        if grep -qs "*.conf" $CONF
        then
            print_info "Modifying [include] section in ${CONF}"
            sed -i -- 's|*.conf|*|g' $CONF
        fi
        enable_service supervisor
        start_service supervisor
    }
    symlink_supervisor_conf() {
        symlink_if_missing "/srv/${APP_NAME}/srv/etc" "/etc/supervisor/conf.d" "${APP_NAME}-supervisor.conf"
    }
    init_postgres() {
        print_info "Assuming on Ubuntu postgresql has been initialized already"
    }
    fix_pg_hba() {
        PG_HBA="/etc/postgresql/10/main/pg_hba.conf"
        if grep -q peer ${PG_HBA}
        then
            print_info "Converting 'peer' to 'trust' in ${PG_HBA}"
            cp ${PG_HBA} ${PG_HBA}.DEFAULT >> ${LOGFILE}
            sed -i -- 's| peer| trust|g' ${PG_HBA}
        fi
        pg_reload_conf
    }
    init_elasticsearch() {
        #TODO: initialize keystore
        print_info "Initializing elasticsearch"
        enable_service elasticsearch
        start_service elasticsearch
    }
	fix_nginx() {
        # no op for ubuntu
        echo 'no op'
    }
    restart_cron_service() {
        restart_service cron
    }

else
    OS_DETECTED="UNKNOWN"
fi

echo "${OS_DETECTED} os detected"

ARCH_DETECTED=0
if [ "$OS_DETECTED" == "ARCH" ]; then
	ARCH_DETECTED=1
fi


error_exit() {
    echo "ERROR: ${1}"
    test -n "${LOGFILE}" && echo "ERROR: ${1}" 1>&2 >> ${LOGFILE}
    exit 1
}

print_info() {
    echo "INFO: ${1}"
    test -n "${LOGFILE}" && echo "INFO: ${1}" >> ${LOGFILE}
}

test_dependencies() {
    RESULT=0
    for PKG in $@
    do
        if pkg_is_installed ${PKG};
        then
            print_info "${PKG} is installed"
        else
            print_info "${PKG} is not installed"
            RESULT=1
        fi
    done
    return ${RESULT}
}

check_available_packages() {
    RESULT=0
    for PKG in $@
    do
        pkg_is_available ${PKG} || RESULT=1
    done
    return ${RESULT}
}

copy_if_missing() {
    SOURCEDIR=${1}
    DESTDIR=${2}
    FILENAME=${3}

    # always update sample files
    SAMPLE=${DESTDIR}/${FILENAME}.sample
    print_info "Updating sample configuration in ${SAMPLE}"
    # Remove existing file, else cp will ask for confirmation
    # rm -f does not complain if the file does not exist
    rm -vf ${SAMPLE} >> ${LOGFILE}
    cp -v ${SOURCEDIR}/${FILENAME} ${SAMPLE} >> ${LOGFILE}
    chown -v ${APP_USER} ${SAMPLE} >> ${LOGFILE}

    # Copy the config file only if it does not yet exist
    if [ -e ${DESTDIR}/${FILENAME} ]; then
        print_info "Found existing file ${DESTDIR}/${FILENAME}"
    else
        cp -v ${SOURCEDIR}/${FILENAME} ${DESTDIR}/ >> ${LOGFILE}
        chown -v ${APP_USER} ${DESTDIR}/${FILENAME} >> ${LOGFILE}
    fi
}

symlink_if_missing() {
    # Symlink file ${3} from source directory ${1} to destination directory ${2}
    # Do not link if destination file already exists

    SOURCEDIR=${1}
    DESTDIR=${2}
    FILENAME=${3}

    if [ -e ${DESTDIR}/${FILENAME} ]; then
        print_info "Found existing file ${DESTDIR}/${FILENAME}"
    else
        print_info "Symlinking ${SOURCEDIR}/${FILENAME} to ${DESTDIR}/${FILENAME}"
        ln -vnfs ${SOURCEDIR}/${FILENAME} ${DESTDIR}/${FILENAME} >> ${LOGFILE}
    fi
}

enable_service() {
    SERVICE=${1}
    if systemctl -q is-enabled ${SERVICE}
    then
        print_info "The ${SERVICE} service is already enabled"
    else
        print_info "Enabling the ${SERVICE} service"
        systemctl enable ${SERVICE} >> ${LOGFILE} 2>&1
    fi
}

start_service() {
    SERVICE=${1}
    print_info "Starting the ${SERVICE} service"
    systemctl start ${SERVICE} >> ${LOGFILE} 2>&1
}

restart_service() {
    SERVICE=${1}
    print_info "Restarting the ${SERVICE} service"
    systemctl restart ${SERVICE} >> ${LOGFILE} 2>&1
}

run_query() {
    psql -U postgres -c "${1}"
}

manage_py() {
    print_info "Running ${VENV_DIR}/bin/python ${INSTALL_DIR}/manage.py ${1}"
    ${VENV_DIR}/bin/python ${INSTALL_DIR}/manage.py ${1} >> ${LOGFILE}
}

pg_user_exists() {
    if [ "$(psql -U postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='${1}';")" = "1" ]
    then
        return 0 # exit code 0 - success
    else
        return 1
    fi
}

pg_db_exists() {
    if [ "$(psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='${1}';")" = "1" ]
    then
        return 0 # exit code 0 - success
    else
        return 1
    fi
}

pg_disconnect_clients_from_db() {
    # force disconnect all other clients from the database to be renamed
    run_query "SELECT pg_terminate_backend( pid ) FROM pg_stat_activity WHERE pid <> pg_backend_pid( ) AND datname = '${1}';"
}

pg_reload_conf() {
    print_info "Reloading postgres config files"
    run_query "SELECT pg_reload_conf();"
    #restart_service postgresql
}

create_linux_user() {
    USERNAME=${1}
    HOME_DIR=${2:-"/home/${USERNAME}/"}
    if id -u ${USERNAME} >/dev/null 2>&1; then
        print_info "User '${USERNAME}' exists"
        #if [ ! "$(eval echo ~${USERNAME})" = "${HOME_DIR}" ];
        #then
        #    error_exit "The home directory for user ${USERNAME} is currently \
        #    '$(eval echo ~${HOME_DIR})'. This needs to be equal to the configured \
        #    ${APP_NAME} installation directory (${HOME_DIR})."
        #fi
    else
        print_info "Creating user '${USERNAME}' with home directory ${HOME_DIR}"
        useradd --create-home --home-dir ${HOME_DIR} --shell /bin/bash --user-group ${USERNAME}
    fi
    chmod o+rx ${HOME_DIR}
}



# vim:ts=4:sw=4:expandtab
