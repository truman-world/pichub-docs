---
title: 环境变量参考
---

# 环境变量参考

PicHub 的所有配置项均通过 `.env` 文件管理。本页列出完整的环境变量清单。

> [!TIP]
> 安装时可从 `.env.example` 复制：`cp .env.example .env && php artisan key:generate`

## 应用配置

| 变量 | 说明 | 默认值 |
|---|---|---|
| `APP_NAME` | 站点名称 | `PicHub` |
| `APP_ENV` | 运行环境 | `local` |
| `APP_KEY` | 加密密钥（必须唯一） | — |
| `APP_DEBUG` | 调试模式 | `true` |
| `APP_TIMEZONE` | 时区 | `Asia/Shanghai` |
| `APP_URL` | 站点 URL | `http://localhost` |
| `APP_LOCALE` | 默认语言 | `zh_CN` |
| `APP_FALLBACK_LOCALE` | 备选语言 | `en` |

> [!CAUTION]
> 生产环境务必设置 `APP_DEBUG=false`，否则错误信息会暴露敏感数据。

## 数据库

| 变量 | 说明 | 默认值 |
|---|---|---|
| `DB_CONNECTION` | 数据库驱动 | `sqlite` |
| `DB_HOST` | 数据库主机 | `127.0.0.1` |
| `DB_PORT` | 数据库端口 | `3306` |
| `DB_DATABASE` | 数据库名 | `pichub` |
| `DB_USERNAME` | 数据库用户名 | `root` |
| `DB_PASSWORD` | 数据库密码 | — |

PicHub 支持 SQLite 和 MySQL。开发环境推荐 SQLite（零配置），生产环境推荐 MySQL 8.0+。

## 缓存与队列

| 变量 | 说明 | 默认值 |
|---|---|---|
| `CACHE_STORE` | 缓存驱动 | `database` |
| `CACHE_PREFIX` | 缓存键前缀 | `pichub` |
| `QUEUE_CONNECTION` | 队列驱动 | `database` |
| `SESSION_DRIVER` | Session 驱动 | `database` |
| `SESSION_LIFETIME` | Session 有效期（分钟） | `120` |

生产环境推荐将缓存、队列、Session 均切换到 Redis：

```env
CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
```

## Redis

| 变量 | 说明 | 默认值 |
|---|---|---|
| `REDIS_CLIENT` | Redis 客户端 | `phpredis` |
| `REDIS_HOST` | Redis 地址 | `127.0.0.1` |
| `REDIS_PORT` | Redis 端口 | `6379` |
| `REDIS_PASSWORD` | Redis 密码 | `null` |

## 邮件

| 变量 | 说明 | 默认值 |
|---|---|---|
| `MAIL_MAILER` | 邮件驱动 | `log` |
| `MAIL_HOST` | SMTP 主机 | `127.0.0.1` |
| `MAIL_PORT` | SMTP 端口 | `2525` |
| `MAIL_USERNAME` | SMTP 用户名 | `null` |
| `MAIL_PASSWORD` | SMTP 密码 | `null` |
| `MAIL_ENCRYPTION` | 加密方式 (`tls`/`ssl`) | `null` |
| `MAIL_FROM_ADDRESS` | 发件地址 | `hello@example.com` |
| `MAIL_FROM_NAME` | 发件人名称 | `${APP_NAME}` |

> [!IMPORTANT]
> 邮件功能用于用户注册验证、密码重置等。生产环境必须配置真实的 SMTP 服务器（如 Resend、Mailgun、阿里云邮件推送等）。

## 存储

| 变量 | 说明 | 默认值 |
|---|---|---|
| `STORAGE_DEFAULT` | 默认存储驱动 | `local` |
| `STORAGE_PATH` | 存储路径前缀 | `images` |
| `STORAGE_MAX_FILE_SIZE` | 最大文件大小（KB） | `10240` |
| `STORAGE_ALLOWED_EXTENSIONS` | 允许的文件扩展名 | `jpg,jpeg,png,gif,webp,bmp,svg` |
| `FILESYSTEM_DISK` | Laravel 文件系统磁盘 | `local` |

### AWS S3 / MinIO / R2

| 变量 | 说明 |
|---|---|
| `AWS_ACCESS_KEY_ID` | Access Key |
| `AWS_SECRET_ACCESS_KEY` | Secret Key |
| `AWS_DEFAULT_REGION` | 地区 |
| `AWS_BUCKET` | Bucket 名称 |
| `AWS_ENDPOINT` | 自定义端点（MinIO/R2 必填） |
| `AWS_URL` | 自定义 URL（CDN 加速域名） |
| `AWS_USE_PATH_STYLE_ENDPOINT` | 路径风格端点 |

> [!TIP]
> 阿里云 OSS、腾讯云 COS、七牛云等国内存储的配置在 Filament 后台 → **存储管理** 中设置，不需要 `.env` 变量。

## 图片处理

| 变量 | 说明 | 默认值 |
|---|---|---|
| `IMAGE_DRIVER` | 处理引擎 (`gd` / `imagick`) | `gd` |
| `IMAGE_QUALITY` | 默认输出质量（1–100） | `80` |
| `IMAGE_MAX_WIDTH` | 最大宽度（px） | `4096` |
| `IMAGE_MAX_HEIGHT` | 最大高度（px） | `4096` |
| `IMAGE_THUMBNAIL_WIDTH` | 缩略图宽度 | `300` |
| `IMAGE_THUMBNAIL_HEIGHT` | 缩略图高度 | `300` |

## 功能开关

| 变量 | 说明 | 默认值 |
|---|---|---|
| `ENABLE_API` | 是否启用 API | `true` |
| `ENABLE_REGISTRATION` | 是否允许注册 | `true` |
| `ENABLE_HOTLINK_PROTECTION` | 是否启用防盗链 | `false` |
| `CONTENT_MODERATION_ENABLED` | 是否启用内容审核 | `false` |
| `CONTENT_MODERATION_PROVIDER` | 审核驱动 | — |
| `ALLOWED_DOMAINS` | 防盗链白名单域名 | — |
| `API_RATE_LIMIT` | API 每分钟请求限制 | `60` |

## 授权

| 变量 | 说明 | 默认值 |
|---|---|---|
| `LICENSE_API_URL` | 授权服务器地址 | `https://license.pichub.app/api/verify` |

详见 [商业授权](/guide/license)。

## 日志

| 变量 | 说明 | 默认值 |
|---|---|---|
| `LOG_CHANNEL` | 日志通道 | `stack` |
| `LOG_STACK` | 堆栈通道 | `single` |
| `LOG_LEVEL` | 日志级别 | `debug` |

## 前端

| 变量 | 说明 | 默认值 |
|---|---|---|
| `VITE_APP_NAME` | 前端显示的应用名 | `${APP_NAME}` |
