# 故障排查

遇到问题？本指南涵盖 PicHub 最常见的错误及解决方法。

---

## 🔴 安装问题

### 访问 `/install` 显示 404

**原因**：Nginx 配置不正确，请求没有被转发给 PHP。

**解决**：
```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```
确保 Nginx `root` 指向 `public/` 目录，而不是项目根目录。

---

### 安装完成后仍然跳转到安装页面

**原因**：安装完成标志文件未生成。

**解决**：
```bash
# 手动创建安装锁文件
touch /var/www/pichub/storage/app/installed
```

---

## 🔴 上传问题

### 上传失败 / 超出大小限制

**检查 Nginx**：
```nginx
# 在 server {} 块中添加
client_max_body_size 100M;
```

**检查 PHP**：
```bash
# 查看当前限制
php -i | grep -E "upload_max_filesize|post_max_size"
```

如需修改，编辑 `/etc/php/8.3/fpm/php.ini`：
```ini
upload_max_filesize = 100M
post_max_size = 100M
```

重启 PHP-FPM：
```bash
sudo systemctl restart php8.3-fpm
```

---

### 图片上传成功但无法访问（404）

**原因 1**：存储链接未创建。
```bash
php artisan storage:link
```

**原因 2**：文件权限问题。
```bash
sudo chown -R www-data:www-data storage
sudo chmod -R 775 storage
```

---

### 云存储上传失败（OSS / S3 / COS）

1. 检查 `.env` 中的密钥是否正确（无多余空格）
2. 检查 Bucket 权限是否允许写入
3. 查看日志定位具体错误：
```bash
tail -f storage/logs/laravel.log | grep -i "oss\|s3\|cos\|storage"
```

---

## 🔴 页面错误

### 500 Internal Server Error

**第一步**：检查 Laravel 日志
```bash
tail -n 50 storage/logs/laravel.log
```

**常见原因及修复**：

| 错误关键词 | 原因 | 解决方法 |
|---|---|---|
| `SQLSTATE` | 数据库连接失败 | 检查 `.env` DB 配置 |
| `No application encryption key` | APP_KEY 未生成 | `php artisan key:generate` |
| `Class not found` | Composer 未安装 | `composer install` |
| `Permission denied` | 文件权限 | `chmod -R 775 storage` |
| `Route not defined` | 路由缓存过期 | `php artisan route:clear` |

---

### 页面样式丢失（CSS 404）

**原因**：前端资源未构建。
```bash
npm install && npm run build
```

如果使用 CDN，检查 `.env` 中的 `ASSET_URL` 是否正确。

---

### 登录后立即被踢出（Session 问题）

**原因**：Session 驱动配置问题。

```bash
# 检查 session 配置
php artisan config:show session.driver

# 清理已有 session
php artisan session:clear 2>/dev/null || rm -rf storage/framework/sessions/*
```

如果使用 Redis Session，确认 Redis 正在运行：
```bash
redis-cli ping  # 应返回 PONG
```

---

## 🔴 邮件问题

### 注册/密码重置邮件发不出去

1. 在后台 **系统设置 → 邮件配置** 中点击"发送测试邮件"
2. 检查 SMTP 配置：端口 465（SSL）或 587（TLS/STARTTLS）
3. 查看日志：
```bash
grep -i "mail\|smtp" storage/logs/laravel.log | tail -20
```

---

## 🔴 队列问题

### 图片处理/水印不生效

**原因**：队列 Worker 未运行，任务积压在队列中。

```bash
# 查看积压任务数量
php artisan queue:monitor

# 临时直接处理（调试用）
php artisan queue:work --once

# 生产环境用 Supervisor 管理
sudo supervisorctl status pichub-worker
sudo supervisorctl start pichub-worker:*
```

---

### 定时任务不执行

检查 Cron 配置：
```bash
sudo crontab -l -u www-data
```

应有以下条目：
```cron
* * * * * cd /var/www/pichub && php artisan schedule:run >> /dev/null 2>&1
```

手动测试：
```bash
php artisan schedule:run
```

---

## 🔴 性能问题

### 页面加载慢

```bash
# 1. 重建缓存
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 2. 检查 OPcache 是否启用
php -r "echo opcache_get_status()['opcache_enabled'] ? 'OPcache ON' : 'OPcache OFF';"

# 3. 查看慢查询（在 .env 中开启）
DB_LOG_QUERIES=true
```

---

## 清理命令速查

```bash
# 清除所有缓存
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 重建缓存（生产环境）
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 重置队列
php artisan queue:flush
php artisan queue:restart
```

---

## 仍然解决不了？

- 查看 [GitHub Issues](https://github.com/truman-world/PicHub/issues)
- 提交 Bug：附上 `storage/logs/laravel.log` 最后 50 行
- 商业用户发送邮件：[support@pichub.com](mailto:support@pichub.com)
