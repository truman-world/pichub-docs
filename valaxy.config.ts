import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-press'
import { addonAlgolia } from 'valaxy-addon-algolia'

// add icons what you will need
const safelist = [
    'i-ri-home-line',
    'i-ri-database-2-line',
    'i-ri-code-box-line',
    'i-ri-shield-check-line',
    'i-ri-dashboard-3-line',
    'i-ri-box-3-line',
    'i-ri-open-source-line',
    'i-ri-focus-3-line',
    'i-ri-stack-line',
    'i-ri-rocket-line',
    'i-ri-arrow-right-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
    // site config see site.config.ts

    addons: [
        addonAlgolia(),
    ],

    siteConfig: {
        title: 'PicHub Docs',
        description: 'Documentation for PicHub',
        url: 'https://pichub-docs.vercel.app',
        favicon: '/favicon.ico',
    },

    theme: 'press',

    themeConfig: {
        logo: '/logo.png',

        nav: [
            { text: '首页', link: '/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/deployment' },
            { text: '社区论坛', link: '/forum' },
            { text: '版本发布', link: 'https://github.com/truman-world/PicHub/releases' },
        ],

        socialLinks: [
            { icon: 'i-ri-github-fill', link: 'https://github.com/truman-world/PicHub' },
        ],

        sidebar: [
            {
                text: '入门',
                items: [
                    { text: '介绍', link: '/guide/intro' },
                    { text: '快速开始', link: '/guide/getting-started' },
                    { text: '安装部署', link: '/guide/deployment' },
                    { text: '升级', link: '/guide/upgrade' },
                ],
            },
            {
                text: '配置',
                items: [
                    { text: '基础设置', link: '/guide/settings' },
                    { text: '存储配置', link: '/guide/storage' },
                    { text: '图片处理', link: '/guide/image-processing' },
                    { text: '内容审核', link: '/guide/image-security' },
                    { text: '用户与角色', link: '/guide/users' },
                ],
            },
            {
                text: 'API',
                items: [
                    { text: 'API 文档', link: '/guide/api' },
                ],
            },
            {
                text: '更多',
                items: [
                    { text: '支付与订阅', link: '/guide/payments' },
                    { text: '进阶配置', link: '/guide/advanced' },
                    { text: '常见问题', link: '/guide/faq' },
                    { text: '故障排查', link: '/guide/troubleshooting' },
                    { text: '贡献指南', link: '/guide/contributing' },
                ],
            },
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025-present PicHub',
        },
    },

    unocss: {
        safelist,
    },
})
