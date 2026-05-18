FROM node:22-bookworm-slim AS frontend

WORKDIR /app

COPY src/package.json src/package-lock.json ./
RUN npm ci

COPY src ./
RUN npm run build


FROM composer:2 AS vendor

WORKDIR /app

COPY src/composer.json src/composer.lock ./
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-progress \
    --optimize-autoloader \
    --no-scripts


FROM php:8.3-apache AS app

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public \
    PORT=8080

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        libicu-dev \
        libonig-dev \
        libzip-dev \
        unzip \
    && docker-php-ext-install \
        bcmath \
        intl \
        mbstring \
        pdo_mysql \
        zip \
    && a2enmod rewrite headers \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY src ./
COPY --from=vendor /app/vendor ./vendor
COPY --from=frontend /app/public/build ./public/build
COPY deploy/start-container.sh /usr/local/bin/start-container

RUN chmod +x /usr/local/bin/start-container \
    && mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && rm -f bootstrap/cache/*.php \
    && php artisan package:discover --ansi \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8080

CMD ["start-container"]
