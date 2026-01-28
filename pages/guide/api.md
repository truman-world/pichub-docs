# API 文档

PicHub 提供完整的 RESTful API，支持通过编程方式上传、管理和检索图片。

## 🔑 认证机制

PicHub API 支持两种认证方式：

### 1. API Token（推荐）

每个用户可以在个人设置中生成 API Token。

**获取 Token**:
1. 登录 PicHub
2. 访问 "个人中心" → "API 设置"
3. 点击"生成新 Token"
4. 复制并妥善保存

**使用方式**:
```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
     https://your-domain.com/api/user
```

### 2. IP 白名单

对于固定服务器调用,可配置 IP 白名单免 Token 验证。

**配置方法**:
1. 在后台 "系统设置" → "API 配置"
2. 添加可信 IP 地址
3. 无需 Token 即可调用

> ⚠️ **安全提示**: IP 白名单仅适用于内网或固定公网 IP 的场景。

---

## 📤 图片上传

### 上传单张图片

**端点**: `POST /api/upload`

**请求头**:
```
Authorization: Bearer YOUR_API_TOKEN
Content-Type: multipart/form-data
```

**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `image` | File | 是 | 图片文件 (支持 jpg, png, gif, webp) |
| `album_id` | Integer | 否 | 相册 ID (默认为"未分类") |
| `title` | String | 否 | 图片标题 |
| `description` | String | 否 | 图片描述 |
| `tags` | String | 否 | 标签,逗号分隔 (如: "风景,旅行") |

**cURL 示例**:
```bash
curl -X POST https://your-domain.com/api/upload \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "image=@/path/to/photo.jpg" \
  -F "album_id=5" \
  -F "title=Beautiful Sunset" \
  -F "tags=sunset,nature"
```

**成功响应** (200):
```json
{
  "success": true,
  "data": {
    "id": 12345,
    "title": "Beautiful Sunset",
    "url": "https://your-domain.com/i/abc123.jpg",
    "thumbnail": "https://your-domain.com/i/abc123_thumb.jpg",
    "size": 2048576,
    "width": 1920,
    "height": 1080,
    "mime_type": "image/jpeg",
    "created_at": "2026-01-28T10:30:00Z"
  }
}
```

**错误响应** (422):
```json
{
  "success": false,
  "message": "The image field is required.",
  "errors": {
    "image": ["The image field is required."]
  }
}
```

---

### 批量上传

**端点**: `POST /api/upload/batch`

**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `images[]` | File[] | 是 | 图片文件数组 (最多 20 张) |
| `album_id` | Integer | 否 | 相册 ID |

**cURL 示例**:
```bash
curl -X POST https://your-domain.com/api/upload/batch \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "images[]=@photo1.jpg" \
  -F "images[]=@photo2.jpg" \
  -F "images[]=@photo3.jpg" \
  -F "album_id=5"
```

**成功响应**:
```json
{
  "success": true,
  "data": {
    "uploaded": 3,
    "failed": 0,
    "images": [
      {
        "id": 12345,
        "url": "https://your-domain.com/i/abc123.jpg"
      },
      {
        "id": 12346,
        "url": "https://your-domain.com/i/def456.jpg"
      },
      {
        "id": 12347,
        "url": "https://your-domain.com/i/ghi789.jpg"
      }
    ]
  }
}
```

---

## 📋 图片管理

### 获取图片列表

**端点**: `GET /api/images`

**查询参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| `page` | Integer | 页码 (默认: 1) |
| `per_page` | Integer | 每页数量 (默认: 20, 最大: 100) |
| `album_id` | Integer | 筛选相册 |
| `search` | String | 搜索关键词 (标题/标签) |
| `sort` | String | 排序方式 (`created_at`, `size`, `views`) |
| `order` | String | 排序顺序 (`asc`, `desc`) |

**示例**:
```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
     "https://your-domain.com/api/images?page=1&per_page=10&sort=created_at&order=desc"
```

**响应**:
```json
{
  "success": true,
  "data": [
    {
      "id": 12345,
      "title": "Beautiful Sunset",
      "url": "https://your-domain.com/i/abc123.jpg",
      "thumbnail": "https://your-domain.com/i/abc123_thumb.jpg",
      "size": 2048576,
      "views": 128,
      "created_at": "2026-01-28T10:30:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 150,
    "last_page": 15
  }
}
```

---

### 获取单张图片详情

**端点**: `GET /api/images/{id}`

**示例**:
```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
     https://your-domain.com/api/images/12345
```

**响应**:
```json
{
  "success": true,
  "data": {
    "id": 12345,
    "title": "Beautiful Sunset",
    "description": "Captured at Malibu Beach",
    "url": "https://your-domain.com/i/abc123.jpg",
    "thumbnail": "https://your-domain.com/i/abc123_thumb.jpg",
    "size": 2048576,
    "width": 1920,
    "height": 1080,
    "mime_type": "image/jpeg",
    "views": 128,
    "downloads": 15,
    "tags": ["sunset", "nature", "beach"],
    "album": {
      "id": 5,
      "name": "Travel Photos"
    },
    "created_at": "2026-01-28T10:30:00Z",
    "updated_at": "2026-01-28T10:30:00Z"
  }
}
```

---

### 更新图片信息

**端点**: `PUT /api/images/{id}`

**请求体**:
```json
{
  "title": "Updated Title",
  "description": "New description",
  "tags": "sunset,beach,travel",
  "album_id": 10
}
```

**示例**:
```bash
curl -X PUT https://your-domain.com/api/images/12345 \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","tags":"sunset,beach"}'
```

---

### 删除图片

**端点**: `DELETE /api/images/{id}`

**示例**:
```bash
curl -X DELETE https://your-domain.com/api/images/12345 \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

**响应**:
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## 📁 相册管理

### 获取相册列表

**端点**: `GET /api/albums`

**示例**:
```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
     https://your-domain.com/api/albums
```

**响应**:
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "Travel Photos",
      "description": "My travel memories",
      "cover_image": "https://your-domain.com/i/abc123.jpg",
      "image_count": 42,
      "created_at": "2026-01-20T10:00:00Z"
    }
  ]
}
```

---

### 创建相册

**端点**: `POST /api/albums`

**请求体**:
```json
{
  "name": "New Album",
  "description": "Album description"
}
```

---

### 删除相册

**端点**: `DELETE /api/albums/{id}`

**查询参数**:
| 参数 | 说明 |
|------|------|
| `delete_images` | `true` 删除其中图片, `false` 移至"未分类" |

---

## 👤 用户信息

### 获取当前用户信息

**端点**: `GET /api/user`

**响应**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "storage_used": 524288000,
    "storage_limit": 10737418240,
    "image_count": 150,
    "created_at": "2025-12-01T00:00:00Z"
  }
}
```

---

### 获取使用统计

**端点**: `GET /api/stats`

**响应**:
```json
{
  "success": true,
  "data": {
    "total_images": 150,
    "total_albums": 8,
    "total_views": 12580,
    "total_storage": 524288000,
    "today_uploads": 5,
    "this_month_uploads": 42
  }
}
```

---

## 🔔 Webhook 配置

PicHub 支持在特定事件发生时向您的服务器发送 Webhook 通知。

### 配置 Webhook

在后台 "API 设置" → "Webhook" 中配置：
- **URL**: 您的接收端点
- **Secret**: 用于验证请求签名
- **事件**: 选择关注的事件

### 支持的事件

| 事件 | 触发时机 |
|------|---------|
| `image.uploaded` | 图片上传成功 |
| `image.deleted` | 图片被删除 |
| `album.created` | 相册创建 |
| `storage.limit` | 存储空间达到 80% |

### Webhook 载荷示例

```json
{
  "event": "image.uploaded",
  "timestamp": "2026-01-28T10:30:00Z",
  "data": {
    "id": 12345,
    "url": "https://your-domain.com/i/abc123.jpg",
    "user_id": 1
  }
}
```

### 验证签名

请求头中包含 `X-PicHub-Signature`:
```php
$signature = hash_hmac('sha256', $payload, $your_secret);
if ($signature === $_SERVER['HTTP_X_PICHUB_SIGNATURE']) {
    // 验证通过
}
```

---

## ⚙️ 错误代码

| 状态码 | 说明 |
|-------|-----|
| `200` | 成功 |
| `400` | 请求参数错误 |
| `401` | 未授权 (Token 无效或缺失) |
| `403` | 禁止访问 (权限不足) |
| `404` | 资源不存在 |
| `413` | 文件过大 |
| `422` | 验证失败 |
| `429` | 请求过于频繁 |
| `500` | 服务器错误 |

---

## 🔧 速率限制

为保障服务稳定性，API 调用受以下限制：

| 用户类型 | 限制 |
|---------|-----|
| 免费用户 | 60 次/分钟 |
| 付费用户 | 300 次/分钟 |
| IP 白名单 | 1000 次/分钟 |

超出限制后返回 `429 Too Many Requests`。

---

## 💡 SDK 和工具

### 官方 SDK
- **PHP**: `composer require pichub/php-sdk`
- **Node.js**: `npm install pichub-sdk`
- **Python**: `pip install pichub`

### 第三方集成
- **WordPress**: PicHub 图床插件
- **Typecho**: PicHub 上传插件
- **PicGo**: 支持 PicHub 图床

---

## 📚 相关文档

- [部署指南](./deployment.md) - 如何搭建 PicHub
- [配置指南](./configuration.md) - 环境变量说明
- [常见问题](./faq.md) - 疑难解答

**需要帮助？** 访问 [GitHub Issues](https://github.com/truman-world/PicHub/issues)
