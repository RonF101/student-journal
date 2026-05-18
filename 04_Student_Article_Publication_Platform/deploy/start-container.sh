#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/html
APP_PORT="${PORT:-8080}"

cat > /etc/apache2/ports.conf <<EOF
Listen 0.0.0.0:${APP_PORT}
EOF

cat > /etc/apache2/sites-available/000-default.conf <<EOF
<VirtualHost 0.0.0.0:${APP_PORT}>
    ServerAdmin webmaster@localhost
    DocumentRoot ${APP_DIR}/public

    <Directory ${APP_DIR}/public>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog /proc/self/fd/2
    CustomLog /proc/self/fd/1 combined
</VirtualHost>
EOF

cd "$APP_DIR"

mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
rm -f bootstrap/cache/*.php

if [ ! -f .env ] && [ -f .env.example ]; then
    cp .env.example .env
fi

php artisan storage:link --force || true

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    php artisan migrate --force
fi

if [ "${RUN_CORE_SEEDERS:-true}" = "true" ]; then
    php artisan db:seed --class=CoreProductionSeeder --force
fi

php artisan config:cache
php artisan route:cache
php artisan view:cache

exec apache2-foreground
