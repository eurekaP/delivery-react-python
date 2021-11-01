#!/bin/bash
echo "Assuming 'postgres' and 'postgis' are installed..."
CURR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
_DBUSER=${DBUSER:-connect}
_DBNAME=${DBNAME:-connect}
echo "Setting up database '$_DBNAME' with user '$_DBUSER' ..."
createuser -U postgres $_DBUSER
psql -U postgres -c "ALTER USER $_DBUSER CREATEDB;"
createdb -U postgres -O $_DBUSER $_DBNAME
psql -U postgres $_DBNAME < $CURR_DIR/pgsetup.sql

# vim:ts=4:sw=4:expandtab
