# nuxt-blog

> Nuxt.js project

## init

ref: [Nuxt.js で Markdown ベースのブログを構築する（Markdown 編）](https://jmblog.jp/posts/2018-01-17/build-a-blog-with-nuxtjs-and-markdown-1/)

```sh
# nuxt環境の作成

vue init nuxt/starter nuxt-blog
cd nuxt-blog
npm install


# /posts/{yyyy-MM-dd}/{記事名} のURLにするため。
mkdir pages/posts
mkdir pages/posts/_date
mkdir pages/posts/_date/_slug
cp pages/index.vue pages/posts/_date/_slug/index.vue

# 記事の作成場所
mkdir markdown
mkdir markdown/posts

# p
npm isntall -g processmd
processmd markdown/*.md --stdout --preview 80 --outputDir content/posts/json > content/summary.json

```

## nuxt.config.jsonのgenerateにmdの変換を追加

```js
const { sourceFileArray } = require('./content/summary.json');
// const sourceFileNameToUrl = require('/');

const generateDynamicRoutes = callback => {
  const routes = sourceFileArray.map(sourceFileName => {
    return sourceFileNameToUrl(sourceFileName);
  });
  callback(null, routes);
};

function sourceFileNameToUrl(filepath) {
  const deleteExt = filepath.replace('.md', '')
  const fileName = deleteExt.split('/')[deleteExt.split('/').length - 1]
  const splitArray = fileName.split('-')
  return `/posts/${splitArray.slice(0, 3).join('-')}/${splitArray.slice(3,).join('-')}`
};

module.exports = {
  // 省略
  generate: {
    routes: generateDynamicRoutes,
  },
  // 省略
}
```

## pages/posts/_date/_slug/index.vueの変更

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="post-meta"><time>{{ params.date }}</time></div>
    <div v-html="bodyHtml"></div>
  </div>
</template>

<script>
import { sourceFileArray } from '../../../../content/summary.json';

export default {
  validate({ params }) {
    return sourceFileArray.includes(`markdown/${params.date}-${params.slug}.md`);
  },
  asyncData({ params }) {
    return Object.assign({}, require(`~/content/posts/json/${params.date}-${params.slug}.json`), { params });
  },
  head() {
    const title = `${this.title} - jmblog.jp`;
    const url = `https://jmblog.jp/posts/${this.params.date}/${this.params.slug}/`;
    return {
      title: title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title },
      ],
      link: [{ rel: 'canonical', href: url }],
    };
  },
};
</script>

<style>
/* @import 'assets/tomorrow-night-bright.css'; */
</style>

<style scoped>
.post-meta {
  font-size: 0.8em;
  color: #888;
  margin-top: -1rem;
  margin-bottom: 2.4rem;
  text-align: right;
}
</style>
```

## sitemap

```sh
npm install --save @nuxtjs/sitemap
```

nuxt.config.jsonに追加
```js
module.exports = {
  //省略
  modules: ['@nuxtjs/sitemap'],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.suzu6.net',
    generate: true,
    exclude: ['/404'],
    routes: generateDynamicRoutes,
  },
}
```

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

