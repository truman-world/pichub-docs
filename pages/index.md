---
layout: home
hero:
  name: PicHub
  text: 开源图片托管系统
  tagline: 基于 Laravel 11 构建，支持多存储后端、REST API、内容审核、Docker 一键部署
  badge:
    text: v1.0.0 ✨
    link: https://github.com/truman-world/PicHub/releases
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/truman-world/PicHub

features:
  - title: 多存储后端
    details: 支持本地磁盘、阿里云 OSS、腾讯云 COS、AWS S3、七牛云、Cloudflare R2，后台一键切换
  - title: REST API
    details: Token 和 API Key 双认证，兼容 ShareX、uPic、PicGo 等主流客户端
  - title: 内容审核
    details: 内置 NsfwJS 和 OpenAI 审核驱动，上传时自动检测违规内容并拦截
  - title: 后台管理
    details: 基于 Filament 3 的管理面板，用户、图片、举报、订单、设置一站式管理
  - title: Docker 部署
    details: 自带 docker-compose.yml，一行命令启动完整环境（MySQL + Redis + Nginx）
  - title: MIT 开源
    details: 代码完全公开，可自由使用、修改和分发，也可购买商业授权获取技术支持
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

## 快速体验

```bash
# Docker 一键启动
git clone https://github.com/truman-world/PicHub.git
cd PicHub
docker compose up -d
# 访问 http://localhost:8000/install 完成安装
```

更多部署方式请查看 [快速开始](/guide/getting-started)。
