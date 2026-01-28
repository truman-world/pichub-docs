---
title: 快速开始
icon: i-ri-rocket-line
---

# 🚀 快速开始

只需几分钟，即可在您的服务器上部署 PicHub。

## 📋 环境要求

在开始之前，请确保您的服务器满足以下要求：

- **PHP**: >= 8.2
- **MySQL**: >= 8.0
- **Web Server**: Nginx (推荐) 或 Apache
- **Extensions**: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML

## 📦 安装步骤

### 1. 获取代码

通过 Git 克隆仓库到您的 Web 根目录：

```bash
git clone https://github.com/truman-world/PicHub.git
cd PicHub
```

### 2. 安装依赖

使用 Composer 安装 PHP 依赖：

```bash
composer install --no-dev --optimize-autoloader
```

### 3. 目录权限

确保 Web 服务器 (如 `www-data`) 对以下目录有写入权限：

```bash
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```

### 4. 运行安装向导

1.  将 Web 服务器的根目录指向 `public` 文件夹。
2.  在浏览器中访问您的域名 (例如 `https://your-pichub.com`)。
3.  系统会自动检测到尚未安装，并跳转至 `/install` 向导页面。
4.  跟随屏幕指引完成环境检测、数据库配置和管理员账号创建。

### 5. 完成！

安装完成后，您将自动登录到 PicHub 仪表盘。尽情探索吧！

::: tip 💡 提示
为了安全起见，安装完成后，所有的敏感配置都会被写入 `.env` 文件，同时会生成 `storage/installed` 锁文件以防止重复安装。
:::

## 🔄 升级

```bash
git pull origin main
composer install --no-dev
php artisan migrate --force
php artisan view:clear
```
