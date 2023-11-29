

这是一个自动下载iconfont symbol js到项目的Nuxt 插件，支持以下特性：

- 自动下载iconfont symbol js 到本地。
- 支持构建时自动注入index.html。

## 安装

```shell
npm install -D nuxt-module-iconfont
// 或
yarn add -D nuxt-module-iconfont
// 或
pnpm install -D nuxt-module-iconfont
```

## 使用方法

添加插件到`nuxt.config.js`

```js
export default {
  buildModules: [
    [
      "nuxt-module-iconfont",
      [
        {
          url: "//at.alicdn.com/t/c/font_3998853_kiflghuyvf.js",
          fileName: "iconfont-common.js",
          prefix: "iconfont-",
        },
      ],
    ],
  ],
};
```

## 配置选项(options)

### url

iconfont使用symbol引用方式，生成的项目js地址，该参数为主要输入参数。

- **Type :** `string`
- **Default :** ''
- **Required :**`true`

### filePath

保存自动下载iconfont symbol js的public下的路径。

- **Type :** `string`
- **Default :** `iconfonts`
- **Required :**`false`

### fileName

- **Type :** `string`
- **Default :** `${filename}.js`
- **Required :**`false`


### inject

iconfont symbol js是否自动注入到`index.html`文件。

- **Type :** `boolean`
- **Default :** `true`
- **Required :**`false`



### prefix

生成的iconfont symbol js的前缀，为了区分多个 iconfont 中的 id 值。

- **Type :** `string`
- **Default :** ''
- **Required :**`false`



