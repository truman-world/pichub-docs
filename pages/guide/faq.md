---
title: 常见问题
icon: i-ri-question-line
---

# ❓ 常见问题 (FAQ)

## 🔧 安装与部署

### Q: 安装完成后访问首页报 500 错误？
**A**: 请检查 `storage` 目录的权限。
```bash
chmod -R 775 storage bootstrap/cache
```
如果问题依旧，请查看 `storage/logs/laravel.log` 获取详细错误信息。

### Q: 图片上传后显示 404？
**A**: 请确保可以在浏览器通过 URL 访问到 `public/storage` 目录。
如果使用的是 `local` 驱动，请务必运行：
```bash
php artisan storage:link
```
这会在 `public` 目录下创建一个指向 `storage/app/public` 的软链接。

---

## 🔐 安全与授权

### Q: 忘记管理员密码怎么办？
**A**: 目前需通过命令行重置（后续将提供邮件找回功能）。
```bash
php artisan user:reset-password --email="admin@example.com" --password="newpassword"
```

### Q: 如何升级到 Pro 版？
**A**: 请前往 [PicHub 官网](https://pichub.app) 购买授权码。购买后登录管理后台 -> 授权中心，输入 Key 进行激活。

---

## 💻 开发相关

### Q: 如何参与开发？
**A**: 欢迎 Fork 我们的 [GitHub 仓库](https://github.com/truman-world/PicHub)。请在开发前阅读 `CONTRIBUTING.md`。

### Q: 支持 Docker 部署吗？
**A**: 官方 Docker 镜像正在制作中。目前社区提供了一些非官方的 Docker Compose 方案。
