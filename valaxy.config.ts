import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-press'

// add icons what you will need
const safelist = [
    'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
    // site config see site.config.ts

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
