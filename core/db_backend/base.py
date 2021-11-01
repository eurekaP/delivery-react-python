import subprocess
import os
from django.db.utils import ProgrammingError
from django.contrib.gis.db.backends.postgis.base import DatabaseWrapper as PostgisDatabaseWrapper


class DatabaseWrapper(PostgisDatabaseWrapper):
    def prepare_database(self):
        self.setup_extensions()
        try:
            super().prepare_database()
        except ProgrammingError as e:
            if not e.args or 'Must be superuser' not in e.args[0]:
                raise

    def setup_extensions(self):
        env = os.environ.copy()
        env['CONNECT_DBUSER'] = self.settings_dict['USER']
        env['CONNECT_DBNAME'] = self.settings_dict['NAME']
        subprocess.run(['./bin/pgsetup.sh'], env=env)

# vim:ts=4:sw=4:expandtab
