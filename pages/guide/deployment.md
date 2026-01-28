# 部署指南

本指南将帮助您在自己的服务器上部署 PicHub。

## 📋 服务器要求

### 最低配置
- **CPU**: 1核心
- **内存**: 1GB RAM
- **存储**: 10GB 可用空间
- **操作系统**: Ubuntu 20.04+ / Debian 11+ / CentOS 8+

### 推荐配置
- **CPU**: 2核心+
- **内存**: 2GB+ RAM
- **存储**: 20GB+ SSD
- **带宽**: 5Mbps+

### 软件依赖
- **PHP**: 8.2 或更高版本
- **数据库**: MySQL 8.0+ 或 MariaDB 10.6+
- **Web服务器**: Nginx 1.18+ 或 Apache 2.4+
- **缓存/队列**: Redis 6.0+ (可选但推荐)
- **工具**: Composer 2.x, Git

---

## 🚀 快速部署（推荐）

### 使用一键安装脚本

```bash
# 下载安装脚本
wget https://raw.githubusercontent.com/truman-world/PicHub/main/scripts/install.sh

# 赋予执行权限
chmod +x install.sh

# 运行安装
sudo ./install.sh
```

脚本会自动：
- ✅ 检测系统环境
- ✅ 安装必要依赖（PHP, MySQL, Redis, Nginx）
- ✅ 配置 Nginx 虚拟主机
- ✅ 拉取 PicHub 代码
- ✅ 安装 Composer 依赖
- ✅ 启动图形化安装向导

安装完成后，访问 `http://your-domain.com/install` 完成最后配置。

---

## 🛠️ 手动部署

### 步骤 1: 安装 PHP 和扩展

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install -y php8.3-fpm php8.3-cli php8.3-mysql php8.3-redis \
    php8.3-xml php8.3-mbstring php8.3-curl php8.3-zip \
    php8.3-gd php8.3-bcmath php8.3-intl
```

#### CentOS/RHEL
```bash
sudo dnf install -y php83-php-fpm php83-php-cli php83-php-mysqlnd \
    php83-php-redis php83-php-xml php83-php-mbstring \
    php83-php-curl php83-php-zip php83-php-gd
```

### 步骤 2: 安装 MySQL

```bash
# Ubuntu/Debian
sudo apt install -y mysql-server

# 启动并设置开机自启
sudo systemctl start mysql
sudo systemctl enable mysql

# 安全配置（设置root密码）
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

### 步骤 3: 安装 Redis（可选）

```bash
sudo apt install -y redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

### 步骤 4: 安装 Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 步骤 5: 克隆 PicHub 代码

```bash
# 进入 Web 根目录
cd /var/www

# 克隆仓库
sudo git clone https://github.com/truman-world/PicHub.git pichub

# 设置权限
sudo chown -R www-data:www-data pichub
cd pichub
```

### 步骤 6: 安装 Composer 依赖

```bash
# 安装 Composer（如果未安装）
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# 安装依赖
composer install --no-dev --optimize-autoloader
```

### 步骤 7: 配置环境变量

```bash
# 复制配置文件
cp .env.example .env

# 生成应用密钥
php artisan key:generate
```

编辑 `.env` 文件，配置数据库：
```dotenv
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

# Redis配置（如已安装）
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

QUEUE_CONNECTION=redis  # 或 database
CACHE_DRIVER=redis      # 或 file
SESSION_DRIVER=redis    # 或 file
```

### 步骤 8: 配置 Nginx

创建站点配置文件：
```bash
sudo nano /etc/nginx/sites-available/pichub
```

粘贴以下配置：
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

    # 客户端上传限制
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

启用站点并重启 Nginx：
```bash
sudo ln -s /etc/nginx/sites-available/pichub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 步骤 9: 设置文件权限

```bash
cd /var/www/pichub
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### 步骤 10: 启动安装向导

在浏览器访问：
```
http://your-domain.com/install
```

按照向导完成：
1. 环境检测
2. 数据库配置
3. 数据库迁移
4. 管理员账户创建

---

## 🔒 配置 HTTPS（强烈推荐）

### 使用 Certbot (Let's Encrypt)

```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx

# 自动配置 SSL
sudo certbot --nginx -d your-domain.com

# 设置自动续期
sudo certbot renew --dry-run
```

Certbot 会自动修改 Nginx 配置并申请免费证书。

---

## ⚙️ 队列配置（推荐）

PicHub 使用队列处理图片压缩、水印等耗时任务。

### 1. 配置 Supervisor

安装 Supervisor：
```bash
sudo apt install -y supervisor
```

创建配置文件：
```bash
sudo nano /etc/supervisor/conf.d/pichub-worker.conf
```

内容：
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

启动队列：
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start pichub-worker:*
```

### 2. 配置定时任务（Cron）

```bash
sudo crontab -e -u www-data
```

添加：
```
* * * * * cd /var/www/pichub && php artisan schedule:run >> /dev/null 2>&1
```

---

## 🐳 Docker 部署（可选）

如果您熟悉 Docker，可以使用容器化部署：

```bash
# 克隆仓库
git clone https://github.com/truman-world/PicHub.git
cd PicHub

# 使用 Docker Compose
docker-compose up -d
```

访问 `http://localhost:8000/install` 完成安装。

---

## 📊 性能优化建议

### 1. 启用 OPcache

编辑 PHP 配置 `/etc/php/8.3/fpm/php.ini`：
```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
opcache.revalidate_freq=60
```

### 2. 启用 Gzip 压缩

在 Nginx 配置中添加：
```nginx
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
```

### 3. 配置 CDN

将静态资源（CSS/JS/图片）托管到CDN：
- 阿里云 OSS + CDN
- 腾讯云 COS + CDN
- Cloudflare

在 `.env` 中配置：
```dotenv
ASSET_URL=https://cdn.your-domain.com
```

---

## 🔧 常见问题

### 500 错误
检查日志：
```bash
tail -f /var/www/pichub/storage/logs/laravel.log
```

常见原因：
- 文件权限不正确：`chmod -R 775 storage`
- `.env` 配置错误
- Composer 依赖未安装

### 上传失败
1. 检查 Nginx 配置中的 `client_max_body_size`
2. 检查 PHP 配置：
```bash
php -i | grep upload_max_filesize
php -i | grep post_max_size
```

### 队列不运行
检查 Supervisor 状态：
```bash
sudo supervisorctl status
```

---

## 📚 下一步

- [配置指南](./configuration.md) - 详细的环境变量说明
- [API 文档](./api.md) - 接口调用指南
- [常见问题](./faq.md) - 疑难解答

---

**需要帮助？** 访问 [GitHub Issues](https://github.com/truman-world/PicHub/issues) 或加入我们的社区。
