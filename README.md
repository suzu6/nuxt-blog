# nuxt-blog

> Nuxt.js project

## init

ref: [Getting Started with Nuxt + MarkDown](https://www.andreliem.ca/getting-started-nuxt-markdown/)
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
mkdir content
mkdir content/posts

# p
npm isntall -g processmd
processmd content/posts/*.md --stdout --preview 80 --outputDir content/posts/json > content/summary.json

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
  return `/article/${splitArray.slice(0, 3).join('-')}/${splitArray.slice(3,).join('-')}`
};

module.exports = {
  // 省略
  generate: {
    routes: generateDynamicRoutes,
  },
  // 省略
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

