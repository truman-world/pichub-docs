import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-press'
import { addonAlgolia } from 'valaxy-addon-algolia'

// add icons what you will need
const safelist = [
    'i-ri-home-line',
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
        url: 'https://doc.pichub.com',
    },

    theme: 'press',

    themeConfig: {
        banner: {
            enable: true,
            title: 'PicHub',
            cloud: {
                enable: true,
            },
        },

        sidebar: [
            {
                text: '开始',
                items: [
                    { text: '介绍', link: '/guide/intro' },
                    { text: '快速开始', link: '/guide/started' },
                ],
            },
            {
                text: '指南',
                items: [
                    { text: '部署指南', link: '/guide/deployment' },
                    { text: 'API 文档', link: '/guide/api' },
                    { text: '配置指南', link: '/guide/configuration' },
                    { text: '常见问题', link: '/guide/faq' },
                ],
            },
        ],

        pages: [
            {
                name: '我的小伙伴们',
                id: 'friends',
                icon: 'i-ri-group-line',
                color: '#0078E7',
            },
            {
                name: '喜欢的项目',
                id: 'projects',
                icon: 'i-ri-github-line',
                color: '#b967ff',
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
