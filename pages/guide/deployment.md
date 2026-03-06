# 安装部署

本指南覆盖生产环境的完整部署流程，包括 Docker Compose 和手动部署两种方式。

## 服务器要求

### 最低配置

- CPU：1 核心
- 内存：1GB RAM
- 存储：10GB 可用空间
- 操作系统：Ubuntu 20.04+ / Debian 11+ / CentOS 8+

### 推荐配置

- CPU：2 核心+
- 内存：2GB+ RAM
- 存储：20GB+ SSD
- 带宽：5Mbps+

### 软件依赖

- PHP 8.2+（手动部署）
- MySQL 8.0+ / MariaDB 10.6+
- Nginx 1.18+ / Apache 2.4+
- Redis 6.0+（可选但推荐）
- Composer 2.x, Git

---

## Docker Compose 部署（推荐）

Docker Compose 会一次性启动所有依赖服务（MySQL、Redis、PHP-FPM、Nginx），无需手动安装。

### 前置条件

- 安装 [Docker Engine](https://docs.docker.com/engine/install/)（20.10+）
- 安装 [Docker Compose](https://docs.docker.com/compose/install/)（v2+）

### 部署步骤

```bash
# 1. 克隆仓库
git clone https://github.com/truman-world/PicHub.git
cd PicHub

# 2. 复制环境配置
cp .env.example .env
```

编辑 `.env`，修改以下配置：

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

# Docker 环境下使用容器名连接
DB_HOST=mysql
DB_DATABASE=pichub
DB_USERNAME=pichub
DB_PASSWORD=your_strong_password

REDIS_HOST=redis
```

```bash
# 3. 启动所有服务
docker compose up -d

# 4. 查看启动状态
docker compose ps
```

等待所有容器变为 `running` 状态后，访问 `http://your-domain.com/install` 完成安装向导。

### 常用运维命令

```bash
# 查看日志
docker compose logs -f app

# 进入容器
docker compose exec app bash

# 执行 artisan 命令
docker compose exec app php artisan migrate
docker compose exec app php artisan queue:restart

# 更新代码
git pull origin main
docker compose exec app composer install --no-dev
docker compose exec app php artisan migrate --force
docker compose restart app

# 停止所有服务
docker compose down

# 停止并清除数据（谨慎操作）
docker compose down -v
```

### 数据持久化

Docker Compose 配置中已通过 volume 挂载实现数据持久化：

- MySQL 数据：`mysql_data` volume
- Redis 数据：`redis_data` volume
- 上传文件：`./storage/app` 挂载到容器内

`docker compose down` 不会删除 volume 数据。只有 `docker compose down -v` 才会清除。

### 配置 HTTPS

在宿主机安装 Certbot 并配置反向代理，或在 Docker 前端放一个 Nginx 反向代理。

```bash
# 宿主机 Nginx 反向代理示例
sudo apt install -y nginx certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 手动部署

### 步骤 1：安装 PHP 和扩展

#### Ubuntu / Debian

```bash
sudo apt update
sudo apt install -y php8.3-fpm php8.3-cli php8.3-mysql php8.3-redis \
    php8.3-xml php8.3-mbstring php8.3-curl php8.3-zip \
    php8.3-gd php8.3-bcmath php8.3-intl
```

#### CentOS / RHEL

```bash
sudo dnf install -y php83-php-fpm php83-php-cli php83-php-mysqlnd \
    php83-php-redis php83-php-xml php83-php-mbstring \
    php83-php-curl php83-php-zip php83-php-gd
```

### 步骤 2：安装 MySQL

```bash
sudo apt install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
sudo mysql_secure_installation
```

创建数据库：

```sql
mysql -u root -p
CREATE DATABASE pichub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'pichub'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON pichub.* TO 'pichub'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 步骤 3：安装 Redis（可选）

```bash
sudo apt install -y redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

### 步骤 4：安装 Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 步骤 5：部署 PicHub

```bash
cd /var/www
sudo git clone https://github.com/truman-world/PicHub.git pichub
sudo chown -R www-data:www-data pichub
cd pichub

# 安装 Composer（如未安装）
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# 安装依赖
composer install --no-dev --optimize-autoloader

# 配置环境
cp .env.example .env
php artisan key:generate
```

编辑 `.env`：

```env
APP_NAME=PicHub
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pichub
DB_USERNAME=pichub
DB_PASSWORD=your_strong_password

REDIS_HOST=127.0.0.1
QUEUE_CONNECTION=redis
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

### 步骤 6：配置 Nginx

```bash
sudo nano /etc/nginx/sites-available/pichub
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com;
    root /var/www/pichub/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;
    charset utf-8;
    client_max_body_size 100M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/pichub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 步骤 7：设置文件权限

```bash
cd /var/www/pichub
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### 步骤 8：启动安装向导

访问 `http://your-domain.com/install`，按向导完成数据库迁移和管理员账户创建。

---

## HTTPS 配置

### Certbot (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
sudo certbot renew --dry-run
```

Certbot 会自动修改 Nginx 配置并申请免费证书。

---

## 队列配置

PicHub 使用队列处理图片压缩、水印等耗时任务。

### Supervisor

```bash
sudo apt install -y supervisor
sudo nano /etc/supervisor/conf.d/pichub-worker.conf
```

```ini
[program:pichub-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/pichub/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/pichub/storage/logs/worker.log
stopwaitsecs=3600
```

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start pichub-worker:*
```

### 定时任务

```bash
sudo crontab -e -u www-data
```

添加：

```
* * * * * cd /var/www/pichub && php artisan schedule:run >> /dev/null 2>&1
```

---

## 性能优化

### OPcache

编辑 `/etc/php/8.3/fpm/php.ini`：

```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
opcache.revalidate_freq=60
```

### Gzip 压缩

在 Nginx 配置中添加：

```nginx
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
```

### CDN

将静态资源托管到 CDN，在 `.env` 中配置：

```env
ASSET_URL=https://cdn.your-domain.com
```

---

## 常见问题

### 500 错误

```bash
tail -f /var/www/pichub/storage/logs/laravel.log
```

常见原因：文件权限不正确、`.env` 配置错误、Composer 依赖未安装。

### 上传失败

1. 检查 Nginx `client_max_body_size`
2. 检查 PHP 配置：

```bash
php -i | grep upload_max_filesize
php -i | grep post_max_size
```

### 队列不运行

```bash
sudo supervisorctl status
```

---

## 下一步

- [存储配置](/guide/storage) — 各云存储驱动配置
- [API 文档](/guide/api) — 接口调用指南
- [常见问题](/guide/faq) — 更多疑难解答
