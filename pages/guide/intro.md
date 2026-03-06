---
title: 介绍
---

# 什么是 PicHub

PicHub 是一个开源的图片托管系统，基于 Laravel 11 构建。支持多存储后端、REST API、付费订阅和后台管理。

项目地址：[github.com/truman-world/PicHub](https://github.com/truman-world/PicHub)

## 核心功能

**存储**：本地磁盘、阿里云 OSS、腾讯云 COS、AWS S3、七牛云、Cloudflare R2。在后台可随时切换，已上传的图片不受影响。

**图片处理**：自动压缩、生成缩略图、格式转换（WebP）、添加水印。支持自定义压缩质量和水印样式。

**内容审核**：内置 NsfwJS 和 OpenAI 两种审核驱动，上传时自动检测违规内容。支持自定义阈值和分类。

**API**：完整的 REST API，支持 Token 和 API Key 两种认证方式。兼容 ShareX、uPic、PicGo 等第三方客户端。

**用户系统**：注册、登录、邮箱验证、社交登录。支持多种角色（管理员、付费用户、免费用户、游客），每种角色可配置存储配额和上传限制。

**付费订阅**：内置套餐管理、支付网关（支付宝、微信、Stripe）、优惠券和兑换码。

**后台管理**：基于 Filament 3 的管理面板，覆盖用户管理、图片管理、举报处理、订单管理、系统设置等。

## 技术栈

| 组件 | 技术 |
|---|---|
| 后端框架 | Laravel 11, PHP 8.2+ |
| 管理面板 | Filament 3 |
| 前端 | Blade + Tailwind CSS + Alpine.js |
| 数据库 | MySQL 8.0+ / SQLite |
| 缓存/队列 | Redis / Database |
| 部署 | Docker Compose / Nginx + PHP-FPM |

## 开源协议

MIT License。可自由使用、修改和分发。

商业用户可购买 [商业授权](https://pichub.app/license) 获取技术支持和去除版权标识。

## 下一步

- [快速开始](/guide/getting-started) — 5 分钟内跑起来
- [安装部署](/guide/deployment) — 生产环境部署指南
- [API 文档](/guide/api) — REST API 接口说明
