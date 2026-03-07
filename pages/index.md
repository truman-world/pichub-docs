---
layout: home
hero:
  name: PicHub
  text: 真正好用的图床
  tagline: 🆓 开源免费・支持多存储后端・内置内容审核，可通过 REST API 接入任何应用。
  badge:
    text: v1.0.0 ✨ 版本更新指南 →
    link: https://github.com/truman-world/PicHub/releases
  actions:
    - theme: brand
      text: 一键安装
      link: /guide/getting-started
    - theme: alt
      text: 操作文档
      link: /guide/settings
    - theme: alt
      text: GitHub
      link: https://github.com/truman-world/PicHub

features:
  - title: 多存储后端
    details: 支持本地磁盘、阿里云 OSS、腾讯云 COS、AWS S3、七牛云等，后台即可一键切换。
    icon: i-ri-database-2-line
  - title: REST API
    details: Token 和 API Key 双认证，完美兼容 ShareX、uPic、PicGo 等主流客户端。
    icon: i-ri-code-box-line
  - title: 内容审核
    details: 内置 NsfwJS 和 OpenAI 审核驱动，上传时自动检测违规内容并立即拦截。
    icon: i-ri-shield-check-line
  - title: 后台管理
    details: 基于 Filament 3 构建的现代化管理面板，用户、图片、举报、订单一站式管理。
    icon: i-ri-dashboard-3-line
  - title: Docker 部署
    details: 官方自带 docker-compose.yml，一行命令即可启动完整环境（MySQL + Redis）。
    icon: i-ri-box-3-line
  - title: MIT 协议
    details: 代码完全公开，可自由使用、修改和二次分发。拥有全部数据控制权。
    icon: i-ri-open-source-line
---

<br>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 bottom-sections">
  <div class="p-8 bg-[#f6f6f7] dark:bg-white/5 rounded-2xl transition-all hover:shadow-lg">
    <h3 class="text-xl font-bold mb-6 flex items-center gap-2"><div class="i-ri-focus-3-line text-[#3451B2] dark:text-[#6481ea]"></div> 适用场景</h3>
    <ul class="space-y-4 text-[#67676c] dark:text-gray-300 text-sm md:text-base p-0 m-0 list-none">
      <li class="flex items-start gap-2"><div class="i-ri-checkbox-circle-fill text-[#5672CD] mt-1 shrink-0"></div> 个人博客的图片托管</li>
      <li class="flex items-start gap-2"><div class="i-ri-checkbox-circle-fill text-[#5672CD] mt-1 shrink-0"></div> 团队内部的图片管理</li>
      <li class="flex items-start gap-2"><div class="i-ri-checkbox-circle-fill text-[#5672CD] mt-1 shrink-0"></div> 应用后端的图片存储服务</li>
      <li class="flex items-start gap-2"><div class="i-ri-checkbox-circle-fill text-[#5672CD] mt-1 shrink-0"></div> 商业图床 SaaS 变现</li>
    </ul>
  </div>
  <div class="p-8 bg-[#f6f6f7] dark:bg-white/5 rounded-2xl transition-all hover:shadow-lg">
    <h3 class="text-xl font-bold mb-6 flex items-center gap-2"><div class="i-ri-stack-line text-[#3451B2] dark:text-[#6481ea]"></div> 技术栈</h3>
    <ul class="space-y-4 text-[#67676c] dark:text-gray-300 text-sm md:text-base p-0 m-0 list-none">
      <li class="flex items-start gap-2"><div class="i-ri-arrow-right-s-line text-[#5672CD] mt-1 shrink-0"></div> <strong>后端</strong>: Laravel 11, PHP 8.2+</li>
      <li class="flex items-start gap-2"><div class="i-ri-arrow-right-s-line text-[#5672CD] mt-1 shrink-0"></div> <strong>管理面板</strong>: Filament 3</li>
      <li class="flex items-start gap-2"><div class="i-ri-arrow-right-s-line text-[#5672CD] mt-1 shrink-0"></div> <strong>前端</strong>: Blade + Alpine.js</li>
      <li class="flex items-start gap-2"><div class="i-ri-arrow-right-s-line text-[#5672CD] mt-1 shrink-0"></div> <strong>数据缓存</strong>: MySQL 8.0+ / Redis 6.0+</li>
    </ul>
  </div>
</div>

<div class="px-8 py-10 bg-[rgba(86,114,205,0.06)] dark:bg-[rgba(100,129,234,0.1)] rounded-3xl my-16 text-center border border-[rgba(86,114,205,0.1)]">
  <div class="inline-flex justify-center items-center w-12 h-12 rounded-full bg-[#5672CD] text-white mb-4">
    <div class="i-ri-rocket-line text-2xl"></div>
  </div>
  <h2 class="text-2xl font-bold mb-6 border-none pb-0 mt-0">快速体验</h2>
  <div class="text-left bg-[#1e1e20] text-gray-300 p-5 rounded-xl font-mono text-sm max-w-2xl mx-auto mb-8 shadow-xl overflow-x-auto">
    <div class="text-gray-500 mb-2"># 官方 Docker 一键启动版</div>
    <div><span class="text-pink-400">git clone</span> https://github.com/truman-world/PicHub.git</div>
    <div><span class="text-pink-400">cd</span> PicHub</div>
    <div><span class="text-pink-400">docker compose</span> up -d</div>
    <div class="text-gray-500 mt-2"># 访问 http://localhost:8000/install 完成安装</div>
  </div>
  <a href="/guide/getting-started" class="inline-flex items-center gap-2 bg-[#5672CD] hover:bg-[#4a63b8] dark:hover:bg-[#6481EA] text-white px-8 py-3 rounded-full font-semibold transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(86,114,205,0.3)] no-underline">
    查看详细部署指南 <div class="i-ri-arrow-right-line"></div>
  </a>
</div>
