# Web-front-end-performance-optimization
剖析web前端性能优化原理，分析当前大公司在性能优化上所做的实践。

### 浏览器的一个请求从发送到返回都经历了什么？
![](./images/浏览器请求流程图.PNG)

- 使用 CDN 资源时最好不好和主站域名一样，防止访问 cdn 时还携带主站cookie，避免网络无谓的损耗。
- 如何减少 http 请求的大小

### 请求过程中一些潜在的性能优化点
- dns 是否可以通过缓存减少 dns 查询时间？
- 网络请求的过程中走最近的网络环境？
- 相同静态资源是否可以缓存？
- 能否减少请求 http 请求大小？
- 减少 http 请求
- 服务端渲染

### 深入理解 http 请求过程是前端性能优化的核心

## 资源的合并与压缩
- 减少 http 请求数量
- 减少请求资源大小

### google 首页案例学习
- html 压缩
- css 压缩
- js 的压缩和混乱
- 文件合并
- 开启gzip

#### html 压缩
- HTML 代码压缩就是压缩这些在文本文件中有意义，但是在 HTML 中 **不显示**的字符，包括**空格**，**制表符**，**换行符**等，还有一些其它意义的字符，如 **HTML 注释**也可以被压缩。  
如何进行压缩：
1. 使用在线网站进行压缩
2. nodejs 提供了 html-minifier 工具
3. 后端模板引擎渲染压缩

#### CSS 压缩
- 无效代码删除
- css 语义合并  
如何进行 css 压缩：
1. 使用在线网站压缩
2. 使用 html-minifier 对html 中的 css 压缩
3. 使用 clean-css 对 css 进行压缩

#### JS 压缩与混乱
- 无效字符的删除
- 剔除注释
- 代码语义的缩减与优化
- 代码保护  
如何进行 js 压缩和混乱：
1. 使用在线网站进行压缩
2. 使用 html-minifier 对 html 中的 js 进行压缩
3. 使用 uglifyjs 对 js 进行压缩

#### 文件合并
文件合并存在的问题：
- 首屏渲染问题
- 缓存失效问题  
建议：
- 公共库合并
- 不同页面的合并
- 见机行事，随机应变  
如何进行文件合并：
1. 使用在线网站进行文件合并
2. 使用 nodejs 实现文件合并

#### 在线压缩工具
- tool.oschina.net/jacompress

#### 实战 fis3
新建 fis-conf.js

## 图片相关优化
- 理解**图片相关的优化的核心概念**
- 结合 facebook 和淘宝移动首页案例分析
- 掌握通过**在线网站**和 **fis3** 实现两种图片相关的一些优化

### 一张 JPG 图片的解析过程
![](./images/jpg压缩.PNG)

### png8/png24/png32 之间的区别
- png8 —— 256色 + 支持透明
- png24 —— 2^24 色 + 不支持透明
- png32 —— 2^24 色 + 支持透明

**每种图片格式都有自己的特点，根据不同的业务场景选择不同的图片格式是很有必要的。**

### 不同格式图片常用的业务场景
- jpg 有损压缩，压缩率高，不支持透明
  - 大部分不需要透明图片的业务场景
- png 支持透明，浏览器兼容好
  - 大部分需要透明图片的业务场景
- webp 压缩程度更好，在 ios webview 有兼容性问题
  - 安卓全部
- svg 矢量图，代码内嵌相对较小
  - 图片样式相对简单的场景

### 图片压缩

#### CSS 雪碧图
优点：可以减少网站的 HTTP 请求数量
缺点：整合图片比较大时，一次加载比较慢

#### Image inline

#### 使用矢量图

#### 在安卓下使用 webp
webp 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损有损压缩模式、Alpha 透明以及动画的特性，在 JEPG 和 PNG 上的转化效果都非常优秀、稳定和统一。

### 图片压缩案例分析
www.iconfont.cn
https://tinypng.com

### 图片压缩实战
图片转换网站：zhitu.isux.us
在图片小于8kb的时候做一个构建工具inline 的选择
雪碧图：www.spritecow.com

## css 和 js 的装载与执行
- 理解浏览器端 html、css、js 的加载过程
- 结合 chrome 的能力学习和掌握 css、js 加载过程中的优化点
- 通过案例分析和实战演练深入理解学习的优化点

### HTML 页面加载渲染的过程
![](./images/html_xuanran.PNG)

### HTML 渲染过程的一些特点
- 顺序执行、并发加载（并发度受域名限制，单个域名并发度有限）
- 是否阻塞
- 依赖关系
- 引入方式

### 顺序执行、并发加载
- 词法分析
- 并发加载
- 并发上限

### css 阻塞和 js 阻塞
- css head 中阻塞页面的渲染
- css 阻塞 js 的执行
- css 不阻塞外部脚本的加载
- 直接引入的 js 阻塞页面的渲染
- js 不阻塞资源的加载
- js 顺序执行，阻塞后续 js 逻辑的执行