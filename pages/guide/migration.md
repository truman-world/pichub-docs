---
title: 迁移指南
---

# 从其他图床迁移到 PicHub

本文介绍如何从 Lsky Pro、Chevereto 等图床系统迁移到 PicHub。

## 迁移前准备

1. **备份数据** — 迁移前务必完整备份原系统的数据库和图片文件
2. **安装 PicHub** — 参考 [安装部署](/guide/deployment) 完成 PicHub 的部署
3. **确认存储** — 配置好 PicHub 的 [存储后端](/guide/storage)（建议与原系统使用相同的存储类型）

## 从 Lsky Pro 迁移

### 数据库映射

| Lsky Pro 表 | PicHub 表 | 说明 |
|---|---|---|
| `users` | `users` | 用户基础信息可直接映射 |
| `images` | `images` | 图片记录，字段名有差异 |
| `groups` | `albums` | Lsky Pro 分组 → PicHub 相册 |

### 迁移步骤

**1. 导出 Lsky Pro 用户数据**

```sql
-- 从 Lsky Pro 导出用户
SELECT id, name, email, password, created_at FROM users;
```

**2. 导入到 PicHub**

```sql
-- 插入到 PicHub users 表
INSERT INTO users (name, email, password, created_at, updated_at)
SELECT name, email, password, created_at, NOW()
FROM lsky_users;
```

> [!WARNING]
> Lsky Pro 和 PicHub 均使用 bcrypt 加密密码，因此密码可以直接迁移。但如果 Lsky Pro 版本较旧（如 v1.x），密码加密方式可能不同，需要让用户重新设置密码。

**3. 迁移图片记录**

```sql
-- Lsky Pro 图片 → PicHub 图片
INSERT INTO images (user_id, original_name, filename, path, mime_type, size, created_at, updated_at)
SELECT
    user_id,
    origin_name,
    filename,
    pathname,
    mimetype,
    size,
    created_at,
    NOW()
FROM lsky_images;
```

**4. 迁移图片文件**

将 Lsky Pro 的存储目录中的图片文件复制到 PicHub 的存储目录：

```bash
# 本地存储示例
rsync -avz /path/to/lsky/storage/ /path/to/pichub/storage/app/images/
```

如果使用对象存储（如 OSS/S3），只需在 PicHub 中配置相同的 Bucket 和路径前缀即可。

## 从 Chevereto 迁移

### 数据库映射

| Chevereto 表 | PicHub 表 | 说明 |
|---|---|---|
| `chv_users` | `users` | 用户信息 |
| `chv_images` | `images` | 图片数据 |
| `chv_albums` | `albums` | 相册数据 |
| `chv_storages` | `storages` | 存储配置 |

### 迁移步骤

**1. 导出 Chevereto 数据**

```sql
-- 导出用户
SELECT user_id, user_name, user_email, user_password, user_date FROM chv_users;

-- 导出图片
SELECT image_id, image_user_id, image_name, image_original_filename,
       image_extension, image_size, image_date
FROM chv_images;
```

**2. 字段映射插入**

由于 Chevereto 使用自增 ID 前缀的命名方式，需要对路径进行转换：

```php
// 示例：PHP脚本批量迁移
$cheveretoImages = DB::connection('chevereto')->table('chv_images')->get();

foreach ($cheveretoImages as $img) {
    DB::table('images')->insert([
        'user_id'       => $userIdMap[$img->image_user_id] ?? 1,
        'original_name' => $img->image_original_filename,
        'filename'      => $img->image_name . '.' . $img->image_extension,
        'path'          => 'migrated/' . $img->image_name . '.' . $img->image_extension,
        'mime_type'     => 'image/' . $img->image_extension,
        'size'          => $img->image_size,
        'created_at'    => $img->image_date,
        'updated_at'    => now(),
    ]);
}
```

**3. 复制图片文件**

```bash
# Chevereto 默认存储路径
rsync -avz /path/to/chevereto/images/ /path/to/pichub/storage/app/images/migrated/
```

## 通用迁移建议

### 处理外链兼容

迁移后，旧的图片 URL 将失效。可以通过 Nginx 设置 301 重定向来维持兼容：

```nginx
# 旧 Lsky Pro 链接重定向到 PicHub
location ~ ^/i/(.*)$ {
    return 301 https://your-pichub.com/images/$1;
}

# 旧 Chevereto 链接重定向
location ~ ^/images/(.*)$ {
    return 301 https://your-pichub.com/images/$1;
}
```

### 验证清单

迁移完成后，逐项检查：

- [ ] 用户可正常登录
- [ ] 旧图片可正常访问
- [ ] 缩略图自动生成
- [ ] 存储空间统计准确
- [ ] 外链 / 直链可用

## 需要帮助？

如果在迁移过程中遇到问题：

- 提交 [GitHub Issue](https://github.com/truman-world/PicHub/issues) 获取社区支持
- 购买 [商业授权](https://pichub.app/license) 可获得一对一迁移技术支持
