const pkg = require('./package')
require('dotenv').config()

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {

    /*
     ** Headers of the page
     */
    head: {
        title: 'Nuxt Material Express',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'Vue Material Admin Template is a \n' +
                    '    Google Material Design inspired admin dashboard template built with Vue and Vuetify.'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
            }
        ],
        script: [
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js' }
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#3adced' },

    /*
     ** Global CSS
     */
    css: [
        '~/assets/style/theme.styl',
        '~/assets/style/app.styl',
        'font-awesome/css/font-awesome.css',
        'roboto-fontface/css/roboto/roboto-fontface.css'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/vuetify',
        '@/plugins/vee-validate',
        { src: '~/plugins/ckeditor.js', mode: 'client' },
    ],
    telemetry: false,
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/api/users/login',
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: true,
                    user: {
                        url: '/api/users/user',
                        method: 'get',
                        propertyName: 'user'
                    }
                },
                tokenRequired: true,
                tokenType: "Bearer"
            }
        },
        redirect: {
            login: '/admin/login', // User will be redirected to this path if login is required
            logout: '/', // User will be redirected to this path if after logout, current route is protected
            home: '/admin' // User will be redirect to this path after login if accessed login page directly
        },
        rewriteRedirects: true,
    },

    /*
     ** Nuxt.js modules
     */
    modules: [
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
    ],

    /*
     ** Build configuration
     */
    axios: {
        baseUrl: process.env.BASE_URL
    },
    build: {
        transpile: ['vuetify/lib'],
        plugins: [new VuetifyLoaderPlugin()],
        loaders: {
            stylus: {
                import: ["~assets/style/variables.styl"]
            }
        },

        /*
         ** You can extend webpack config here
         */
        extend(config, { isDev, isClient }) {
            // ..
            config.module.rules.push({
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: 'file-loader'
                })
                // Sets webpack's mode to development if `isDev` is true.
            if (isDev) {
                config.mode = 'development'
            }
        }
    },
    serverMiddleware: [
        '~/api/index.js'
    ]
}