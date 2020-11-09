[![Netlify Status](https://api.netlify.com/api/v1/badges/6d248400-2f19-4f30-aa78-6c77b6aa65c9/deploy-status)](https://app.netlify.com/sites/nuxt-material-admin/deploys)

# Nuxt Material + Express full Backend ,Frontend

Nuxt.js + [vue-material-admin](https://github.com/tookit/vue-material-admin) boilerplate.

This template is based on Vuetify.

### Demo

https://vuetifyshop.herokuapp.com

### Project Setup

To use this boilerplate make sure to you have already installed [Vue CLI](https://www.npmjs.com/package/@vue/cli)

```bash
# clone project
$ git clone git@github.com:hoidq2525/nuxt-vuetify-express.git
$ cd my-project

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build

# generate static project
$ npm run generate
```

### Seed data mongodb
```bash
# in project copy .env_example to .env
$ cp .env_example .env
$ cd api
$ node install.js
```
![node install.js](https://i.imgur.com/sFBkMAN.png)
1/admin : localhost:3000/admin
2/frontend: localhost:3000
### demo
### 1.login admin page
![login](https://i.imgur.com/xm4HTBE.png)
### 2/admin
![admin](https://i.imgur.com/HlIKs0x.png)
### 3/menu manager(test)
![menu](https://i.imgur.com/bDdvXDl.png)
### 4/ manager file
![media](https://i.imgur.com/crsNQpF.png)
![mediapopup](https://i.imgur.com/LtTqMfZ.png)
### 5/manager articles
![article](https://i.imgur.com/Q4BhyuK.png)
### 6/create article
![create article](https://i.imgur.com/KI00G1l.png)
### 7/drap & drop article to list
![create article](https://i.imgur.com/Ij191xN.png)
###  8/ Frontend list features
![feature](https://i.imgur.com/tTFEvfm.png)
### 9/about page
![node install.js](https://i.imgur.com/eNy6GyH.png)
![menu and feature](https://i.imgur.com/6UpQcu9.png)




ALL to create with Vue, [Nuxtjs](https://nuxtjs.org/) use ``` serverMiddleware: [
        '~/api/index.js'
    ]``` And node, express, mongodb with frontend bootstrap-vue, vuetifyjs.

