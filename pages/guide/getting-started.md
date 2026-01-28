# 快速开始

本指南将帮助你在 5 分钟内运行 PicHub。

## 环境要求

- PHP 8.2 或更高版本
- Composer 2.x
- MySQL 8.0+ 或 MariaDB 10.6+
- Redis (可选，推荐用于生产环境)

## 安装步骤

### 1. 获取代码

```bash
git clone https://github.com/truman-world/PicHub.git
cd PicHub
```

### 2. 安装依赖

```bash
composer install
```

### 3. 配置环境

```bash
cp .env.example .env
php artisan key:generate
```

编辑 `.env` 文件，配置数据库连接：

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pichub
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 4. 启动应用

```bash
php artisan serve
```

访问 `http://localhost:8000/install` 启动图形化安装向导。

## 图形化安装向导

安装向导会自动完成以下步骤：

1. **环境检测**: 检查 PHP 版本、扩展、文件权限
2. **数据库配置**: 验证数据库连接
3. **数据库迁移**: 创建必要的数据表
4. **管理员账户**: 设置初始管理员用户

完成后即可登录后台管理系统。

## 生产环境部署

生产环境建议使用 Nginx 或 Apache 作为 Web 服务器。

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/pichub/public;

    index index.php;
    charset utf-8;

    client_max_body_size 100M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

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

### 队列和定时任务

PicHub 使用队列处理图片压缩、邮件发送等耗时任务。

**配置 Supervisor**:

```ini
[program:pichub-worker]
command=php /var/www/pichub/artisan queue:work redis --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/www/pichub/storage/logs/worker.log
```

**配置 Crontab**:

```bash
* * * * * cd /var/www/pichub && php artisan schedule:run >> /dev/null 2>&1
```

## 常见配置

### 存储驱动

默认使用本地存储，可切换到云存储：

```env
# 阿里云 OSS
FILESYSTEM_DISK=oss
ALIYUN_OSS_ACCESS_KEY_ID=your_key
ALIYUN_OSS_ACCESS_KEY_SECRET=your_secret
ALIYUN_OSS_BUCKET=your_bucket
ALIYUN_OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com

# AWS S3
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your_bucket
```

### 队列驱动

生产环境建议使用 Redis：

```env
QUEUE_CONNECTION=redis
```

### 缓存驱动

```env
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

## 下一步

- [部署指南](./deployment.md) - 详细的生产环境部署教程
- [API 文档](./api.md) - 了解如何通过 API 使用 PicHub
- [配置指南](./configuration.md) - 环境变量详细说明
- [常见问题](./faq.md) - 疑难解答

## 需要帮助？

- GitHub Issues: [https://github.com/truman-world/PicHub/issues](https://github.com/truman-world/PicHub/issues)
- 文档: [https://doc.pichub.com](https://doc.pichub.com)
