module.exports.meta = require('../package.json')
import { dirname, join, resolve } from 'node:path'
import { existsSync, promises as fs } from 'node:fs'
export default async function ExampleModule(moduleOptions) {
  const opt = moduleOptions.map((o, i) => {
    const urlArr = o.url.split(/[\/]/g)
    return Object.assign(
      {
        url: '',
        fileName: urlArr[urlArr.length - 1],
        filePath: 'iconfonts',
        inject: true,
        dts: false,
        iconJson: false,
        prefix: '',
      },
      o
    )
  })
  for (let i = 0; i < opt.length; i++) {
    const o = opt[i]
    let url = o.url

    let URL_CONTENT = await getURLContent(url)
    if (o.prefix) {
      URL_CONTENT = URL_CONTENT.replace(
        /\<symbol id\=\"/g,
        `<symbol id="${o.prefix}`
      )
    }

    const filePath = resolve(__dirname, `../static/${o.filePath}`, o.fileName)
    generateFile(filePath, URL_CONTENT)

    if (o.inject) {
      this.options.head.script.push({
        src: join(o.filePath, o.fileName).split('\\').join('/'),
      })
    }
  }
}

/**
 * 获取地址，如果是相对协议地址自动添加https
 * @param url
 * @returns
 */
function getURL(url) {
  return /http/.test(url) ? url : `https:${url}`
}

/**
 * 判断是否是https地址
 * @param url
 * @returns
 */
function isHttpsURL(url) {
  return /https/.test(url)
}

/**
 * 生成文件
 * @param path
 * @param content
 */
async function generateFile(filepath, content) {
  const originalContent = existsSync(filepath)
    ? await fs.readFile(filepath, 'utf-8')
    : ''
  originalContent !== content && writeFile(filepath, content)
}

/**
 * 写文件
 * @param filePath
 * @param content
 * @returns
 */
async function writeFile(filePath, content = '') {
  await fs.mkdir(dirname(filePath), { recursive: true })
  return await fs.writeFile(filePath, content, 'utf-8')
}

/**
 * 获取指定url地址的内容
 * @param url
 * @returns
 */
async function getURLContent(url) {
  const targetURL = getURL(url)
  let http
  try {
    http = isHttpsURL(targetURL) ? await import('https') : await import('http')
  } catch (err) {
    console.log('https support is disabled!')
  }
  return new Promise((resolve, reject) => {
    http
      .get(targetURL, (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk.toString()))
        res.on('end', () => resolve(data))
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
