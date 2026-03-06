# 贡献指南

感谢你有兴趣为 PicHub 做贡献！本指南将帮助你快速上手。

---

## 如何贡献

我们欢迎以下形式的贡献：

- **报告 Bug** — 发现问题，提交 Issue
- **功能建议** — 有好想法，发起 Discussion
- **改进文档** — 修正错误，补充说明
- **提交代码** — 修复 Bug 或开发新功能
- **翻译** — 帮助我们支持更多语言

---

## 快速开始（本地开发）

### 1. Fork 并克隆仓库

```bash
# Fork 后克隆你的副本
git clone https://github.com/YOUR_USERNAME/PicHub.git
cd PicHub
```

### 2. 安装依赖

```bash
# PHP 依赖
composer install

# 前端依赖
npm install
```

### 3. 配置环境

```bash
cp .env.example .env
php artisan key:generate
```

编辑 `.env`，配置本地数据库（使用 SQLite 最简单）：
```dotenv
DB_CONNECTION=sqlite
```

### 4. 初始化数据库

```bash
php artisan migrate --seed
```

### 5. 启动开发服务

```bash
# 终端 1：Laravel 服务
php artisan serve

# 终端 2：前端热重载
npm run dev
```

访问 `http://localhost:8000`，默认管理员：`admin@pichub.app` / `password`

---

## 提交 Pull Request

### 分支命名规范

```
feature/your-feature-name   # 新功能
fix/issue-description       # Bug 修复
docs/what-you-updated       # 文档更新
refactor/what-you-refactor  # 代码重构
```

### 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat: add image watermark batch processing
fix: resolve upload timeout on slow connections
docs: update S3 configuration example
refactor: extract storage driver logic to service
```

### PR 流程

1. 基于 `main` 创建新分支：`git checkout -b feature/my-feature`
2. 完成你的修改并提交
3. 确保所有测试通过：`php artisan test`
4. 推送到你的 Fork：`git push origin feature/my-feature`
5. 在 GitHub 上创建 Pull Request
6. 等待 Review 和反馈

---

## 运行测试

```bash
# 运行全部测试
php artisan test

# 运行特定测试
php artisan test --filter=ImageUploadTest

# 查看覆盖率
php artisan test --coverage
```

---

## 代码规范

项目使用 **PSR-12** 代码风格。

```bash
# 检查代码风格
./vendor/bin/pint --test

# 自动修复风格问题
./vendor/bin/pint
```

---

## 添加翻译

翻译文件位于 `lang/` 目录：

```
lang/
  en/         # 英文（基准）
  zh_CN/      # 简体中文
  fr/         # 法语
  ru/         # 俄语
```

添加新语言：
1. 复制 `lang/en/` 目录，重命名为目标语言代码（如 `ja/`）
2. 翻译 `.php` 文件中的所有字符串
3. 在 `config/app.php` 的 `available_locales` 中添加新语言

---

## 有问题？

- 先搜索 [现有 Issues](https://github.com/truman-world/PicHub/issues)
- 查看 [Discussions](https://github.com/truman-world/PicHub/discussions)
- 联系维护者：[support@pichub.app](mailto:support@pichub.app)

---

再次感谢你的贡献！每一个 PR，无论大小，都让 PicHub 变得更好。
