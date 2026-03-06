# 存储配置

PicHub 支持多种存储驱动，可在后台管理界面或 `.env` 中配置，无需改动代码。

---

## 支持的存储驱动

| 驱动 | 适用场景 | 费用 |
|---|---|---|
| **本地存储（Local）** | 开发环境、小站 | 免费 |
| **阿里云 OSS** | 国内用户首选 | 按量计费 |
| **腾讯云 COS** | 国内用户 | 按量计费 |
| **Amazon S3** | 国际用户 / 兼容接口 | 按量计费 |
| **七牛云（Qiniu）** | 国内低成本 | 有免费额度 |
| **MinIO** | 私有部署 / S3 兼容 | 自建免费 |

---

## 本地存储

最简单的配置，适合测试和小流量站点。

```dotenv
FILESYSTEM_DISK=local
```

文件存储在 `storage/app/public/`，通过以下命令创建软链接：
```bash
php artisan storage:link
```

> **注意**：本地存储受服务器磁盘限制，不支持 CDN 加速，不推荐用于生产环境大流量场景。

---

## 阿里云 OSS

### 1. 创建 Bucket

登录 [OSS 控制台](https://oss.console.aliyun.com/)：
- 点击「创建 Bucket」，选择合适的地域
- **读写权限**：选择「私有」（PicHub 会生成签名 URL）或「公共读」
- 记录 **Bucket 名称** 和 **Endpoint**

### 2. 获取 AccessKey

在阿里云控制台右上角头像 → **AccessKey 管理** → 创建 AccessKey（建议使用子账号）。

### 3. 配置 .env

```dotenv
FILESYSTEM_DISK=oss

OSS_ACCESS_ID=your_access_key_id
OSS_ACCESS_KEY=your_access_key_secret
OSS_BUCKET=your_bucket_name
OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com
OSS_URL=https://your_bucket_name.oss-cn-hangzhou.aliyuncs.com
OSS_IS_CNAME=false
```

也可以在**后台 → 系统设置 → 存储配置**中可视化配置，无需修改 `.env`。

---

## 腾讯云 COS

### 1. 创建存储桶

登录 [COS 控制台](https://console.cloud.tencent.com/cos)：
- 创建存储桶，选择地域
- **访问权限**：推荐「私有读写」

### 2. 获取密钥

前往 [API 密钥管理](https://console.cloud.tencent.com/cam/capi) 创建子账号密钥。

### 3. 配置 .env

```dotenv
FILESYSTEM_DISK=cos

COS_SECRET_ID=your_secret_id
COS_SECRET_KEY=your_secret_key
COS_REGION=ap-guangzhou
COS_BUCKET=your_bucket_name-1234567890
COS_URL=https://your_bucket_name-1234567890.cos.ap-guangzhou.myqcloud.com
```

---

## Amazon S3 / 兼容接口

适用于 AWS S3 以及所有兼容 S3 协议的服务（MinIO、Cloudflare R2、Backblaze B2 等）。

### 配置 .env

```dotenv
FILESYSTEM_DISK=s3

AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your_bucket_name
AWS_URL=https://your_bucket_name.s3.amazonaws.com

# 使用兼容接口（MinIO / R2 / 自建）时需要指定 endpoint
AWS_ENDPOINT=https://your-minio-url.com
AWS_USE_PATH_STYLE_ENDPOINT=true
```

---

## 七牛云

### 配置 .env

```dotenv
FILESYSTEM_DISK=qiniu

QINIU_ACCESS_KEY=your_access_key
QINIU_SECRET_KEY=your_secret_key
QINIU_BUCKET=your_bucket_name
QINIU_DOMAIN=https://your-cdn-domain.com
```

> 七牛云需要绑定自定义域名才能正常访问文件，请在七牛控制台配置 CDN 域名。

---

## 配置 CDN 加速

配置好 CDN 后，在 `.env` 中设置 CDN 域名，PicHub 会自动使用 CDN 链接生成图片 URL：

```dotenv
# 通用 CDN 配置（覆盖存储 URL）
CDN_URL=https://cdn.your-domain.com
```

---

## 验证存储配置

配置完成后，在后台 **系统设置 → 存储配置** 页面点击「连接测试」，或运行：

```bash
php artisan tinker
```
```php
Storage::disk('s3')->put('test.txt', 'hello');
echo Storage::disk('s3')->url('test.txt');
```

---

## 选型建议

| 场景 | 推荐 |
|---|---|
| 国内用户为主，流量大 | 阿里云 OSS + CDN |
| 腾讯云生态 | 腾讯云 COS |
| 国际用户 / 出海 | Amazon S3 + CloudFront |
| 私有化部署，不依赖第三方 | MinIO（S3 兼容） |
| 个人小站，成本优先 | 七牛云（有免费额度） |

---

## 下一步

- [安装部署](/guide/deployment) — 查看完整服务器配置
- [基础设置](/guide/settings) — 所有 `.env` 变量说明
- [故障排查](/guide/troubleshooting) — 存储问题排查
