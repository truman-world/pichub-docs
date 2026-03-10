---
title: Webhook 配置
---

# Webhook 配置

PicHub 支持 Webhook 通知，当系统中发生特定事件时，自动向你指定的 URL 发送 HTTP POST 请求。

## 支持的事件

| 事件类型 | 触发时机 |
|---|---|
| `image.uploaded` | 图片上传成功 |
| `image.deleted` | 图片被删除 |
| `user.registered` | 新用户注册 |
| `user.deleted` | 用户被删除 |
| `payment.success` | 支付成功 |
| `report.created` | 新举报提交 |
| `ticket.created` | 新工单创建 |
| `ticket.replied` | 工单收到回复 |
| `webhook.test` | 测试事件 |

## 配置方式

在 Filament 管理面板 → **系统设置** → **Webhooks** 中创建 Webhook：

| 字段 | 说明 |
|---|---|
| 名称 | Webhook 的标识名（如"Discord 通知"） |
| URL | 接收请求的目标 URL |
| 密钥 (Secret) | 用于签名验证的密钥 |
| 事件 | 勾选要监听的事件类型 |
| 超时时间 | 请求超时（秒），默认 30 |
| 最大重试次数 | 失败后重试次数，默认 3 |
| 自定义请求头 | 可选的额外 HTTP Header |

## 请求格式

每次触发时，PicHub 会发送如下格式的 JSON 请求：

```json
{
  "event": "image.uploaded",
  "timestamp": "2026-03-01T12:00:00.000000Z",
  "data": {
    "image_id": 123,
    "filename": "photo.jpg",
    "size": 1048576,
    "user_id": 1
  },
  "version": "1.0"
}
```

### 请求头

| Header | 说明 |
|---|---|
| `Content-Type` | `application/json` |
| `User-Agent` | `PicHub-Webhooks/1.0` |
| `X-Webhook-Signature-256` | HMAC-SHA256 签名 |
| `X-Webhook-Event` | 事件类型 |
| `X-Webhook-ID` | Webhook ID |
| `X-Webhook-Timestamp` | Unix 时间戳 |

## 签名验证

PicHub 使用 HMAC-SHA256 对请求体签名。接收端应验证签名以确保请求来自 PicHub：

```php
// PHP 签名验证示例
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE_256'];
$secret = 'your_webhook_secret';

$expected = hash_hmac('sha256', $payload, $secret);

if (hash_equals($expected, $signature)) {
    // 签名有效，处理事件
    $data = json_decode($payload, true);
    // ...
} else {
    http_response_code(401);
    echo 'Invalid signature';
}
```

```javascript
// Node.js 签名验证示例
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}
```

## 重试机制

- 发送失败后按配置的重试次数自动重试
- 连续失败超过 **10 次**后，Webhook 将被**自动禁用**（可在后台重新启用）
- 每次发送的结果（成功/失败/重试）均记录在 Webhook 日志中

## 测试

创建 Webhook 后，点击「发送测试」按钮，系统会发送一个 `webhook.test` 事件到目标 URL，用于验证连接是否正常。

> [!TIP]
> 测试时可以使用 [webhook.site](https://webhook.site) 生成临时接收 URL，方便查看请求内容。
