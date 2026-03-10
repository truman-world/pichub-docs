---
title: 水印配置
---


PicHub 内置完善的水印系统，支持文字水印、图片水印和满屏水印三种模式。水印在图片上传时自动应用，采用**三层优先级系统**灵活控制。

## 优先级系统

水印配置遵循以下优先级（从高到低）：

| 层级 | 说明 | 示例 |
|---|---|---|
| 用户上传参数 | 上传时通过 API 指定是否添加水印 | `watermark=off` |
| 管理员规则 | 后台设置的全局处理规则 | 强制所有图片加水印 |
| 默认配置 | 系统默认行为 | 不加水印 |

> [!TIP]
> 管理员可以在后台设置**强制水印**，此时用户无法通过上传参数跳过水印。

## 后台配置入口

登录 Filament 管理面板 → **系统设置** → **图片处理**

### 文字水印

| 参数 | 说明 | 默认值 |
|---|---|---|
| 水印文本 | 显示的文字内容 | 站点名称 |
| 字体大小 | 文字大小（px） | 24 |
| 字体颜色 | HEX 颜色值 | `#ffffff` |
| 透明度 | 0–100，0 为完全透明 | 50 |
| 位置 | 9 个预设位置 | 右下角 |

**支持的位置：**

```
左上  中上  右上
左中  居中  右中
左下  中下  右下
```

### 图片水印

| 参数 | 说明 |
|---|---|
| 水印图片 | 上传 PNG 格式水印（支持透明背景） |
| 缩放比例 | 水印图片相对于原图的缩放比例 |
| 透明度 | 0–100 |
| 位置 | 同文字水印的 9 个位置 |

### 满屏水印

满屏水印会在整张图片上以网格方式重复显示水印文字，常用于版权保护。

| 参数 | 说明 | 默认值 |
|---|---|---|
| 水印文本 | 重复显示的文字 | 站点名称 |
| 字体大小 | 文字大小 | 16 |
| 旋转角度 | 倾斜角度（度） | -30 |
| 间距 | 水印之间的像素间距 | 100 |
| 透明度 | 0–100 | 30 |

## API 上传时控制水印

通过 API 上传图片时，可以在请求参数中控制水印行为：

```bash
curl -X POST https://your-pichub.com/api/v1/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@photo.jpg" \
  -F "watermark=text" \
  -F "watermark_text=© My Brand" \
  -F "watermark_position=bottom-right"

curl -X POST https://your-pichub.com/api/v1/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@photo.jpg" \
  -F "watermark=off"
```

**可用的水印参数：**

| 参数 | 值 | 说明 |
|---|---|---|
| `watermark` | `text` / `image` / `fullscreen` / `off` | 水印类型 |
| `watermark_text` | 字符串 | 自定义水印文字 |
| `watermark_position` | `top-left`, `bottom-right` 等 | 水印位置 |
| `watermark_opacity` | 0–100 | 透明度 |

> [!IMPORTANT]
> 如果管理员在后台启用了**强制水印**，即使 API 传入 `watermark=off` 也会被忽略，水印仍然会被应用。

## 字体支持

PicHub 的水印系统会**智能选择字体**：

- **中文文本** → 自动使用思源黑体（Noto Sans CJK）
- **英文文本** → 使用 Inter 或系统默认无衬线字体
- **混合文本** → 优先选择支持中文的字体

字体文件存放在 `storage/app/fonts/` 目录下。可以将自定义字体（`.ttf` 文件）放入该目录来扩展可用字体。

## 相关配置

水印功能依赖图片处理引擎，相关环境变量：

```env
IMAGE_DRIVER=gd

IMAGE_QUALITY=80
```

> [!TIP]
> 建议生产环境使用 `imagick` 引擎，它在水印渲染质量和字体支持方面优于 `gd`。
