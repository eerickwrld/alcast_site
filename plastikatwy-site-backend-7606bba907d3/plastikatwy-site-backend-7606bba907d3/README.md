# Alcast Backend

[![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Backend desenvolvido em Laravel para o sistema Alcast, utilizando Filament para o painel administrativo e outras ferramentas modernas de desenvolvimento.


- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- [Composer](https://getcomposer.org/) (opcional, apenas se não for usar o container do Sail)

## 🛠️ Configuração do Ambiente

1. **Clonar o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd alcast-backend
   ```

2. **Instalar dependências do PHP (opcional - pode ser feito via Sail)**
   ```bash
   composer install
   ```

3. **Configurar ambiente**
   - Copiar o arquivo `.env.example` para `.env`
   - Gerar chave da aplicação:
     ```bash
     php artisan key:generate
   - Configurar as variáveis de ambiente no arquivo `.env` conforme necessário

## 🐳 Executando com Laravel Sail

O projeto utiliza o [Laravel Sail](https://laravel.com/docs/sail) para gerenciar o ambiente de desenvolvimento Docker.

1. **Iniciar os containers**
   ```bash
   # Se for a primeira vez ou se precisar reconstruir os containers
   ./vendor/bin/sail up -d --build
   
   # Ou para iniciar containers já existentes
   ./vendor/bin/sail up -d
   ```

2. **Instalar dependências (se não tiver instalado localmente)**
   ```bash
   ./vendor/bin/sail composer install
   ./vendor/bin/sail npm install
   ```

3. **Executar migrações e seeders**
   ```bash
   ./vendor/bin/sail artisan migrate --seed
   ```

4. **Iniciar o servidor de desenvolvimento**
   ```bash
   ./vendor/bin/sail up
   ```

5. **Acessar a aplicação**
   - Aplicação: http://localhost
   - Admin (Filament): http://localhost/admin
   - Mailpit (para e-mails): http://localhost:8025
   - PHPMyAdmin: http://localhost:8080 (usuário: sail, senha: password)

## 🛠 Comandos úteis com Sail

- **Acessar o container**
  ```bash
  ./vendor/bin/sail shell
  ```

- **Executar comandos Artisan**
  ```bash
  ./vendor/bin/sail artisan [comando]
  ```

- **Executar comandos Composer**
  ```bash
  ./vendor/bin/sail composer [comando]
  ```

- **Executar comandos NPM**
  ```bash
  ./vendor/bin/sail npm [comando]
  ```

- **Reconstruir containers**
  ```bash
  ./vendor/bin/sail down --rmi all -v
  ./vendor/bin/sail up -d --build
  ```

## 🚀 Implantação

Para ambientes de produção, certifique-se de:
1. Configurar corretamente as variáveis de ambiente no `.env`
2. Gerar a chave da aplicação
3. Otimizar o carregamento
4. Configurar o cache de configurações

```bash
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Comandos úteis

- **Iniciar servidor de desenvolvimento**
  ```bash
  php artisan serve
  ```

- **Executar migrações**
  ```bash
  php artisan migrate
  ```

- **Popular banco de dados com dados de teste**
  ```bash
  php artisan db:seed
  ```

- **Compilar assets**
  ```bash
  npm run dev
  ```
  
  Para produção:
  ```bash
  npm run build
  ```

## Tecnologias utilizadas

- [Laravel 12](https://laravel.com/) - Painel administrativo
- [Laravel Sail](https://laravel.com/docs/sail) - Ambiente de desenvolvimento Docker
- [MySQL](https://www.mysql.com/) - Banco de dados
- [Redis](https://redis.io/) - Cache e filas
- [Mailpit](https://github.com/axllent/mailpit) - Cliente de e-mail para desenvolvimento

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Desenvolvimento

Para contribuir com o projeto, siga as diretrizes de contribuição e o código de conduta.
