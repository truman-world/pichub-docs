# 进阶配置

本页覆盖 PicHub 的高级配置项，适合有运维经验的用户。

## Redis 配置

Redis 用于缓存、会话和队列。生产环境强烈推荐。

```env
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

## 队列

PicHub 使用队列处理图片压缩、水印、邮件发送等耗时任务。

### Supervisor 配置

```ini
[program:pichub-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/pichub/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/pichub/storage/logs/worker.log
```

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start pichub-worker:*
```

### 定时任务

```bash
# crontab -e
* * * * * cd /var/www/pichub && php artisan schedule:run >> /dev/null 2>&1
```

定时任务处理：过期图片清理、统计数据聚合、订阅状态检查等。

## CDN 配置

将静态资源和图片通过 CDN 加速：

```env
ASSET_URL=https://cdn.your-domain.com
CDN_URL=https://cdn.your-domain.com
```

支持的 CDN 方案：

- Cloudflare（推荐，免费计划即可）
- 阿里云 CDN（配合 OSS 使用）
- 腾讯云 CDN（配合 COS 使用）

## Webhook 通知

PicHub 支持 Webhook，在特定事件发生时向指定 URL 发送 HTTP 请求。

在后台管理 → Webhook 配置中设置：

- Webhook URL
- 触发事件（上传、删除、举报等）
- 请求密钥（用于验签）

### Webhook 请求格式

```json
{
  "event": "image.uploaded",
  "timestamp": "2026-03-06T12:00:00Z",
  "data": {
    "image_id": 123,
    "url": "https://your-domain.com/images/abc.webp",
    "user_id": 1
  }
}
```

## PushPlus 消息推送

PicHub 支持通过 PushPlus 向微信推送通知（如举报提醒、新用户注册等）。

在后台管理 → 系统设置 → PushPlus 中配置 Token。

## Cloudflare Turnstile

用于注册页面的人机验证，防止垃圾注册。

```env
TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key
```

在 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Turnstile 中创建站点获取密钥。

## 性能优化

### OPcache

```ini
# php.ini
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
opcache.revalidate_freq=60
```

### Laravel 缓存

```bash
# 生产环境必须执行
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### Nginx Gzip

```nginx
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
```

## 下一步

- [故障排查](/guide/troubleshooting) — 常见问题排查
- [常见问题](/guide/faq) — FAQ
- [贡献指南](/guide/contributing) — 参与开发
