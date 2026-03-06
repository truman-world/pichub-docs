# 升级指南

## 从 Git 升级

```bash
cd /var/www/pichub

# 拉取最新代码
git pull origin main

# 更新依赖
composer install --no-dev --optimize-autoloader

# 运行数据库迁移
php artisan migrate --force

# 清除缓存
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 重启队列
php artisan queue:restart
```

## Docker 升级

```bash
cd /path/to/PicHub

# 拉取最新代码
git pull origin main

# 重新构建并启动
docker compose up -d --build

# 运行迁移
docker compose exec app php artisan migrate --force

# 清除缓存
docker compose exec app php artisan config:cache
docker compose exec app php artisan route:cache
docker compose exec app php artisan view:cache
```

## 升级注意事项

- 升级前建议备份数据库：`mysqldump -u root -p pichub > backup.sql`
- 检查 [GitHub Releases](https://github.com/truman-world/PicHub/releases) 的版本说明，确认是否有 breaking changes
- 如果升级后出现问题，查看 `storage/logs/laravel.log`
- 升级不会影响已上传的图片和用户数据

## 下一步

- [故障排查](/guide/troubleshooting) — 升级后问题排查
- [常见问题](/guide/faq) — FAQ
