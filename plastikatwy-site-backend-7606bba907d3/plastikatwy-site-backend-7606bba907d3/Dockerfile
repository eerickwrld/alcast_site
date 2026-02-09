FROM php:8.3-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    libicu-dev

# Instalar extensões PHP necessárias
RUN docker-php-ext-configure intl
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Diretório de trabalho
WORKDIR /var/www

# Copiar arquivos
COPY . .

# Instalar dependências do Composer
RUN composer install --optimize-autoloader --no-dev --no-interaction

# Permissões
RUN chown -R www-data:www-data /var/www
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Expor porta
EXPOSE 8000

# Comando de inicialização
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
