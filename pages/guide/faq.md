# 常见问题

## 安装与部署

### 安装完成后访问首页报 500 错误

检查 `storage` 目录的权限：

```bash
chmod -R 775 storage bootstrap/cache
```

如果问题依旧，查看 `storage/logs/laravel.log` 获取详细错误信息。

### 图片上传后显示 404

如果使用本地存储（`local` 驱动），需要创建软链接：

```bash
php artisan storage:link
```

这会在 `public` 目录下创建一个指向 `storage/app/public` 的软链接。

### 支持 Docker 部署吗

支持。项目自带 `Dockerfile` 和 `docker-compose.yml`，一行命令即可启动：

```bash
docker compose up -d
```

详见 [快速开始](/guide/getting-started) 和 [安装部署](/guide/deployment)。

---

## 安全与授权

### 忘记管理员密码怎么办

通过命令行重置：

```bash
php artisan user:reset-password --email="admin@example.com" --password="newpassword"
```

### 如何购买商业授权

前往 [pichub.app/license](https://pichub.app/license) 购买授权码。购买后在管理后台 → 授权中心输入 Key 激活。

商业授权提供去除版权标识和优先技术支持。

---

## 上传与存储

### 上传大文件失败

需要同时调整 Nginx 和 PHP 的限制：

```nginx
# Nginx
client_max_body_size 100M;
```

```ini
# php.ini
upload_max_filesize = 100M
post_max_size = 100M
```

修改后重启 PHP-FPM：`sudo systemctl restart php8.3-fpm`

### 如何切换存储驱动

在后台管理 → 系统设置 → 存储配置中切换，或修改 `.env` 中的 `FILESYSTEM_DISK`。详见 [存储配置](/guide/storage)。

### 已上传的图片会受影响吗

切换存储驱动不会影响已上传的图片。旧图片仍然通过原存储驱动访问。

---

## 开发相关

### 如何参与开发

Fork [GitHub 仓库](https://github.com/truman-world/PicHub)，在本地搭建开发环境。详见 [贡献指南](/guide/contributing)。

### 如何运行测试

```bash
php artisan test
```

---

## 更多问题

- [故障排查](/guide/troubleshooting) — 常见错误排查步骤
- [GitHub Issues](https://github.com/truman-world/PicHub/issues) — 报告 Bug
