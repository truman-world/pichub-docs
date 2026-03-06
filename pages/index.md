---
layout: home
hero:
  name: PicHub
  text: 开源图片托管系统
  tagline: 基于 Laravel 11，支持多存储后端、REST API、内容审核
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/truman-world/PicHub

features:
  - title: 多存储后端
    details: 本地磁盘、阿里云 OSS、腾讯云 COS、AWS S3、七牛云、Cloudflare R2
  - title: REST API
    details: Token 和 API Key 双认证，兼容 ShareX / uPic / PicGo
  - title: 内容审核
    details: 支持 NsfwJS、OpenAI 等审核驱动，上传时自动检测违规内容
  - title: 后台管理
    details: Filament 管理面板，用户、图片、举报、订单一站式管理
  - title: Docker 部署
    details: docker compose up -d 一行启动，含 MySQL + Redis
  - title: MIT 开源
    details: 代码公开，可自由修改和分发
---

## 适用场景

- 个人博客的图片托管
- 团队内部的图片管理
- 应用后端的图片存储服务
- 商业图床 SaaS

## 技术栈

| 组件 | 技术 |
|---|---|
| 后端 | Laravel 11, PHP 8.2+ |
| 管理面板 | Filament 3 |
| 前端 | Blade + Alpine.js |
| 数据库 | MySQL 8.0+ / SQLite |
| 缓存 | Redis / Database |

## 开始使用

```bash
# Docker 部署（推荐）
git clone https://github.com/truman-world/PicHub.git
cd PicHub
docker compose up -d
# 访问 http://localhost:8000/install

# 或手动部署
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

查看 [快速开始](/guide/getting-started) 了解详情。
