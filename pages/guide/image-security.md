# 内容审核

PicHub 内置图片内容审核功能，支持在上传时自动检测违规内容（如色情、暴力），阻止违规图片上传。

## 工作原理

上传流程中，图片在存储之前会经过所有已启用的审核配置。任一审核驱动判定为违规，上传即被拒绝，用户会看到具体的拒绝原因（如「图片审核未通过：检测到违规内容：porn」）。

## 支持的审核驱动

| 驱动 | 说明 | 是否需要外部服务 |
|---|---|---|
| NsfwJS | 基于 TensorFlow.js 的 NSFW 检测，需部署 NsfwJS API 服务 | 是（自建） |
| OpenAI Moderation | 使用 OpenAI 内容审核 API | 是（需要 API Key） |

后续可扩展更多驱动（如百度、腾讯云内容安全）。

## NsfwJS 配置

NsfwJS 是一个开源的 NSFW 图片检测服务，需要单独部署 API。

### 部署 NsfwJS API

```bash
# 使用 Docker 部署
docker run -d -p 3100:3000 --name nsfwjs ghcr.io/infinitered/nsfwjs-api:latest
```

### 在 PicHub 后台配置

1. 进入后台管理 → 图片安全配置
2. 新建配置，选择驱动「NsfwJS」
3. 填写 API 地址（如 `http://localhost:3100`）
4. 设置阈值（默认 0.7，值越小越严格）
5. 选择检测分类（Porn、Hentai、Sexy 等）
6. 启用配置

### 阈值说明

NsfwJS 返回每个分类的概率值（0-1）：

| 分类 | 说明 |
|---|---|
| Porn | 色情内容 |
| Hentai | 动漫色情 |
| Sexy | 性感暴露 |
| Drawing | 绘画/动漫 |
| Neutral | 正常内容 |

当任一已选分类的概率超过阈值时，图片被拒绝。阈值 0.7 适用于大多数场景。

## OpenAI Moderation 配置

使用 OpenAI 的内容审核 API，支持多种内容类型检测。

### 在 PicHub 后台配置

1. 进入后台管理 → 图片安全配置
2. 新建配置，选择驱动「OpenAI Moderation」
3. 填写 OpenAI API Key
4. 可选：配置代理地址（用于网络受限环境）
5. 启用配置

### 注意事项

- OpenAI Moderation API 对图片格式有要求，建议使用 PNG 或 JPEG
- API 调用有速率限制，高并发场景建议配合 NsfwJS 使用
- 代理配置支持 HTTP/SOCKS5 代理

## 审核模式

每个审核配置可独立设置执行模式：

- **同步模式（sync）**：上传时立即审核，审核不通过则拒绝上传。推荐用于大多数场景
- **异步模式（async）**：上传后异步审核，适用于高并发场景（暂未实现）

## 多驱动组合

可同时启用多个审核配置。例如：

- NsfwJS（快速本地检测，过滤明显违规）
- OpenAI（二次验证，检测边缘案例）

所有 `is_active = true` 且 `sync_mode = sync` 的配置都会在上传时依次执行。

## 下一步

- [图片处理](/guide/image-processing) — 压缩、水印、缩略图
- [基础设置](/guide/settings) — 站点配置
- [用户与角色](/guide/users) — 上传权限控制
