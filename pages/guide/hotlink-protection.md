---
title: 防盗链与原图保护
---


PicHub 提供多层次的图片访问控制机制，防止图片被未授权的第三方网站直接引用，同时保护原图不被随意下载。

## 防盗链 (Hotlink Protection)

### 启用防盗链

在 `.env` 文件中启用：

```env
ENABLE_HOTLINK_PROTECTION=true
```

### 配置允许的域名

设置允许直接引用图片的域名白名单：

```env
ALLOWED_DOMAINS=yourdomain.com,cdn.yourdomain.com,blog.yourdomain.com
```

多个域名用英文逗号分隔。留空表示仅允许从本站域名访问。

### 工作原理

启用防盗链后，PicHub 会检查每个图片请求的 `Referer` 头：

1. **`Referer` 在白名单中** → 正常返回图片
2. **`Referer` 不在白名单中** → 返回 403 或替代图片
3. **无 `Referer`（直接在浏览器打开）** → 正常返回（可配置）

> [!NOTE]
> 搜索引擎爬虫（Google、Bing 等）会被自动放行，不受防盗链规则限制。

### Nginx 层面增强

除了应用层防盗链，建议在 Nginx 配置中添加额外保护：

```nginx
location ~* \.(jpg|jpeg|png|gif|webp|bmp|svg)$ {
    valid_referers none blocked server_names
        *.yourdomain.com
        *.google.com
        *.bing.com;

    if ($invalid_referer) {
        return 403;
        # 或者返回一个替代图片：
        # rewrite ^ /images/hotlink-placeholder.png break;
    }
}
```

## 原图保护

PicHub 支持隐藏原始图片，仅对外提供缩略图或压缩版本。

### 配置方式

在 Filament 管理面板 → **系统设置** → **图片处理** 中：

| 设置 | 说明 |
|---|---|
| 原图访问权限 | 所有人 / 仅上传者 / 仅登录用户 |
| 默认提供尺寸 | 原图 / 中等 / 缩略图 |
| 直链返回版本 | 配置直链（API Link）返回原图还是压缩版 |

### 保护策略建议

| 场景 | 推荐设置 |
|---|---|
| 个人图床 | 关闭防盗链，原图所有人可见 |
| 企业图床 | 启用防盗链，原图仅登录用户可见 |
| 摄影师作品展示 | 启用防盗链 + 满屏水印，原图仅上传者可见 |
| 电商产品图 | 启用防盗链，直链返回压缩版 |

## 图片访问日志

PicHub 会自动记录每次图片访问的信息：

- 访问者 IP
- Referer 来源
- User-Agent
- 访问时间

这些日志数据可在 Filament 管理面板 → **图片** → **访问日志** 中查看，帮助分析图片的引用情况和识别异常流量。

## 完整配置示例

```env
ENABLE_HOTLINK_PROTECTION=true
ALLOWED_DOMAINS=mysite.com,blog.mysite.com,cdn.mysite.com

API_RATE_LIMIT=60
```

> [!TIP]
> 如果你使用了 Cloudflare CDN，建议同时在 Cloudflare 的 **Scrape Shield** → **Hotlink Protection** 中启用防盗链，双重保护效果更佳。
