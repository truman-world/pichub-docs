# 基础设置

PicHub 的大部分配置可通过后台管理面板（`/admin`）完成，也可手动编辑 `.env` 文件。

## 应用配置

```env
APP_NAME=PicHub
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
```

- `APP_DEBUG`：生产环境必须设为 `false`，否则会暴露错误信息
- `APP_URL`：必须设为完整域名，否则生成的图片链接会不正确

## 数据库

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pichub
DB_USERNAME=root
DB_PASSWORD=your_password
```

支持 MySQL 8.0+ 和 SQLite（开发环境）。

## 缓存和队列

```env
CACHE_DRIVER=redis      # 或 file / database
SESSION_DRIVER=redis     # 或 file / database
QUEUE_CONNECTION=redis   # 或 database / sync
```

Redis 推荐用于生产环境，能显著提升性能。如无 Redis，可使用 `database` 或 `file`。

## 邮件

用于注册验证邮件、密码重置、通知等。

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@your-domain.com"
MAIL_FROM_NAME="${APP_NAME}"
```

常见邮件服务配置：

| 服务 | MAIL_HOST | MAIL_PORT |
|---|---|---|
| Gmail | smtp.gmail.com | 587 |
| QQ 邮箱 | smtp.qq.com | 465 |
| 阿里企业邮箱 | smtp.mxhichina.com | 465 |
| Mailgun | smtp.mailgun.org | 587 |

## 上传限制

```env
# 后台也可配置，.env 为全局默认值
MAX_UPLOAD_SIZE=10240   # 单位 KB
```

同时检查 Nginx 和 PHP 配置：

```nginx
# Nginx
client_max_body_size 100M;
```

```ini
# php.ini
upload_max_filesize = 100M
post_max_size = 100M
```

## 注册与登录

在后台管理面板 → 系统设置中配置：

- 是否开放注册
- 是否需要邮箱验证
- Cloudflare Turnstile 验证码（防机器人注册）
- 社交登录（Google、GitHub）

## 域名与 CDN

```env
# 静态资源 CDN
ASSET_URL=https://cdn.your-domain.com

# 自定义 CDN 域名（覆盖存储 URL）
CDN_URL=https://cdn.your-domain.com
```

## 下一步

- [存储配置](/guide/storage) — 多云存储驱动配置
- [图片处理](/guide/image-processing) — 压缩、水印、缩略图
- [内容审核](/guide/image-security) — NSFW 检测配置
