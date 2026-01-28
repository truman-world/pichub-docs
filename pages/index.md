---
layout: home
hero:
  name: PicHub
  text: 现代化图床解决方案
  tagline: 高性能 · 易扩展 · 开箱即用
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/truman-world/PicHub

features:
  - title: 高性能架构
    details: 基于 Laravel 11 构建，优化的查询策略和缓存机制，支持大规模图片存储
  - title: 多存储驱动
    details: 支持本地存储、阿里云 OSS、腾讯云 COS、AWS S3、七牛云等多种存储后端
  - title: 完整的 API
    details: RESTful API 设计，支持 Token 认证和 IP 白名单，轻松集成到现有系统
  - title: 强大的管理后台
    details: 基于 Filament 3 构建的现代化管理界面，支持用户管理、权限控制、数据统计
  - title: 灵活的部署
    details: 支持 Docker 部署、传统服务器部署，提供详细的部署文档和一键安装脚本
  - title: 开源可定制
    details: MIT 协议开源，代码结构清晰，易于二次开发和功能扩展
---

## 快速了解

PicHub 是一个功能完整的图床系统，适用于：

- **个人博客**: 为你的博客提供稳定的图片托管服务
- **内容团队**: 团队协作管理图片资源，支持相册分类
- **应用后端**: 作为移动应用或 Web 应用的图片存储后端
- **企业内网**: 私有化部署，保护数据安全

## 核心特性

### 存储策略

支持多种存储驱动，可根据需求灵活切换：

```env
FILESYSTEM_DISK=local        # 本地存储
# FILESYSTEM_DISK=s3          # AWS S3
# FILESYSTEM_DISK=oss         # 阿里云 OSS
# FILESYSTEM_DISK=cos         # 腾讯云 COS
```

### API 接口

简单易用的 API 设计：

```bash
# 上传图片
curl -X POST https://your-domain.com/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@photo.jpg"

# 获取图片列表
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://your-domain.com/api/images
```

### 用户系统

- 用户注册和登录
- 基于角色的权限控制
- 个人空间管理
- 存储配额限制

## 开始使用

```bash
# 克隆仓库
git clone https://github.com/truman-world/PicHub.git
cd PicHub

# 安装依赖
composer install

# 配置环境
cp .env.example .env
php artisan key:generate

# 运行安装向导
php artisan serve
# 访问 http://localhost:8000/install
```

查看[完整部署指南](/guide/deployment)了解更多。

## 技术栈

- **后端框架**: Laravel 11.x
- **数据库**: MySQL 8.0+ / PostgreSQL
- **缓存**: Redis
- **管理后台**: Filament 3
- **队列**: Redis / Database

## 开源协议

MIT License - 你可以自由使用、修改和分发本项目。

商业使用建议购买[商业授权](https://pichub.app/license)以获得技术支持和去除版权标识。
