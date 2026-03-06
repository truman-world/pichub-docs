# 快速开始

本指南帮助你在 5 分钟内运行 PicHub。

## 方式一：Docker 部署（推荐）

适合快速体验和生产部署。需要安装 [Docker](https://docs.docker.com/get-docker/) 和 [Docker Compose](https://docs.docker.com/compose/install/)。

```bash
git clone https://github.com/truman-world/PicHub.git
cd PicHub

# 复制环境配置
cp .env.example .env

# 启动所有服务（MySQL + Redis + PHP + Nginx）
docker compose up -d
```

等待容器启动完成后，访问 `http://localhost:8000/install` 进入安装向导。

安装向导会自动完成：
1. 环境检测 — 检查 PHP 版本、扩展、文件权限
2. 数据库配置 — 验证数据库连接
3. 数据库迁移 — 创建数据表
4. 管理员账户 — 设置初始管理员

完成后即可登录使用。

### Docker 常用命令

```bash
# 查看运行状态
docker compose ps

# 查看日志
docker compose logs -f app

# 停止服务
docker compose down

# 重启服务
docker compose restart

# 进入容器执行 artisan 命令
docker compose exec app php artisan migrate
```

## 方式二：手动部署

适合已有 LNMP/LAMP 环境的服务器。

### 环境要求

- PHP 8.2+（需要扩展：mysql, redis, xml, mbstring, curl, zip, gd, bcmath, intl）
- Composer 2.x
- MySQL 8.0+ / MariaDB 10.6+
- Redis（可选，推荐用于生产环境）

### 安装步骤

```bash
# 1. 获取代码
git clone https://github.com/truman-world/PicHub.git
cd PicHub

# 2. 安装依赖
composer install

# 3. 配置环境
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

```bash
# 4. 启动开发服务器
php artisan serve
```

访问 `http://localhost:8000/install` 启动安装向导。

## 安装后配置

安装向导完成后，建议进行以下配置：

### 存储驱动

默认使用本地存储。可在后台管理 → 存储管理中添加云存储，或在 `.env` 中配置：

```env
# 阿里云 OSS
FILESYSTEM_DISK=oss
ALIYUN_OSS_ACCESS_KEY_ID=your_key
ALIYUN_OSS_ACCESS_KEY_SECRET=your_secret
ALIYUN_OSS_BUCKET=your_bucket
ALIYUN_OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com
```

### 队列和缓存

生产环境建议使用 Redis：

```env
QUEUE_CONNECTION=redis
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

## 下一步

- [安装部署](/guide/deployment) — 生产环境 Nginx / Docker Compose 完整配置
- [存储配置](/guide/storage) — 各云存储驱动配置
- [API 文档](/guide/api) — REST API 接口说明
- [常见问题](/guide/faq) — 疑难解答
