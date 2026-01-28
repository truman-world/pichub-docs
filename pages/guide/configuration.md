---
title: 配置指南
icon: i-ri-settings-3-line
---

# ⚙️ 配置指南

PicHub 的大部分配置可以通过图形化安装向导完成，但某些高级功能需要手动编辑 `.env` 文件。

## 环境变量 (.env)

安装完成后，根目录下会生成 `.env` 文件。以下是关键配置项说明：

### 基础应用

```ini
APP_NAME=PicHub
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
```

- **APP_DEBUG**: 生产环境请务必设置为 `false`。
- **APP_URL**: 必须设置为您的完整域名，否则生成的图片链接可能不正确。

### 数据库

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pichub
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 上传限制

虽然可以在前端限制，但为了安全，建议也在后端配置：

```ini
# 最大上传大小 (KB)
MAX_UPLOAD_SIZE=10240 
```

---

## ☁️ 存储策略 (Filesystem)

PicHub 支持多云存储策略。默认使用本地存储 (`local`/`public`)。

要启用 S3 兼容存储（如 AWS S3, 阿里云 OSS, 腾讯云 COS, MinIO），请配置：

```ini
FILESYSTEM_DISK=s3

AWS_ACCESS_KEY_ID=your-key-id
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your-bucket
AWS_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
```

::: tip 💡 提示
如果你使用 MinIO 或其他兼容服务，请务必设置 `AWS_USE_PATH_STYLE_ENDPOINT=true`。
:::

## 📧 邮件服务

用于找回密码和发送通知。

```ini
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

## 🚀 队列服务 (Queue)

为了提升性能，图片处理和邮件发送建议使用队列。

1.  修改配置：`QUEUE_CONNECTION=database` 或 `redis`
2.  运行队列监听器：

```bash
php artisan queue:work
```

建议使用 `Supervisor` 来守护队列进程。
