---
title: 小程序组件化
date: 2019-02-24 21:37:43
tags: "项目"
categories: "项目"
---


### 小程序组件化实践

小程序组件化实践是学习[慕课网七月老师](https://coding.imooc.com/class/251.html)所记录，主要是迎合小程序组件化开发的趋势，该项目主要技术栈为**小程序、Es6**

### 1、初始化项目

#### 1.1、组件概述

从小程序基础库版本  1.6.3  开始，小程序支持简洁的**组件化编程**。所有自定义组件相关特性都需要基础库版本  1.6.3  或更高。开发者可以将页面内的**功能模块**抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个**低耦合**的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似。

#### 1.2、Flex 布局与 rpx 设置

**Flex 布局**可以去查看[阮一峰老师《Flex 布局教程》](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

`rpx`是微信小程序新推出的一个单位，按官方的定义，`rpx`可以根据屏幕宽度进行自适应。`rpx`实际上就是系统级的`rem`.

`rpx`单位是微信小程序中 css 的尺寸单位，`rpx`可以根据屏幕宽度进行自适应。规定屏幕宽为 750rpx。如在 iPhone6 上，屏幕宽度为 375px，共有 750 个物理像素，则 750rpx = 375px = 750 物理像素，1rpx = 0.5px = 1 物理像素。
同时也需要设置字体样式。

在`app.wxss`设置:

```python
/* 设置全局样式*/
page {
    font-family: PingFangSC-Thin;
    font-size: 16px;
}
1rpx = 0.5px = 1物理像素

2rpx = 1px
```

使用  `@import`语句可以导入外联样式表，`@import`后跟需要导入的外联样式表的相对路径，用`;`  表示语句结束。

### 2、自定义组件

**自定义组件**类似于页面，一个自定义组件由  `json` `wxml` `wxss` `js` 4 个文件组成。要编写一个自定义组件，首先需要在  `json`  文件中进行自定义组件声明（将  `component`  字段设为  `true`  可这一组文件设为自定义组件）：

```python
{
  "component": true
}
```

#### 2.1、自定义组件的 properties 属性与 data 属性

`Component`构造器可用于定义组件，调用`Component`构造器时可以指定组件的属性、数据、方法等。

| 定义段     | 类型       | 描述                                                                                                                                                                     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| properties | Object Map | 组件的对外属性，是属性名到属性设置的**映射表**，属性设置中可包含三个字段， **`type`  表示属性类型、 `value`  表示属性初始值、 `observer`  表示属性值被更改时的响应函数** |
| data       | Object     | 组件的内部数据，和  `properties`  一同用于组件的模板渲染                                                                                                                 |

![](https://upload-images.jianshu.io/upload_images/12474664-373e4443d86f4637.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

**在`properties`里定义的是组件对外要开发的属性，在`data`里定义的是在组件里自己使用的私有的数据**。同时`properties`会对属性进行**初始值设定**，例如`type`为`Boolean`时，`value`默认为`false`

在`components/like/index.js`中定义自定义组件`like`对外暴露开发的属性。

```python
properties: {
    like: {
        type: Boolean, //String, Number, Boolean, Object, Array, null
    },
    count: {
        type: Number
    },
    readOnly: {
        type: Boolean
    }
}
```

读取`properties`中的属性：

```python
this.properties.count
```

#### 2.2、triggerEvent 触发事件

自定义组件触发事件时，需要使用  **`triggerEvent`**  方法，指定`事件名`、`detail对象`和`事件选项`

在`components/like/index.js`中定义  **`triggerEvent`**  方法：

```python
let behavior = this.properties.like ? 'like' : 'cancel'
this.triggerEvent('like', {     // 自定义事件名称
    behavior                    // 自定义属性
}, {} )                         //  触发事件的选项
```

**`triggerEvent`**  的第一个参数表示事件的名字，如例子里的`like`，第二个参数表示要传递的数据，如`behavior`，第三个参数表示触发事件的类型，一般不填。

![触发事件选项](https://upload-images.jianshu.io/upload_images/12474664-0228fd5113cb7d8a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

`pages`页面里要调用自定义组件里的自定义事件，就`bind`那个事件的名字就好了，例如这里

在`pages/classic/classic.wxml`引入`like`组件后使用  **`triggerEvent`**  方法

```python
<v-like class="like" bind:like="onLike" like="{{ likeStatus }}" count="{{ likeCount }}" />

//自定义函数，判断是否点赞
onLike: function (event) {
    console.log(event)
    let behavior = event.detail.behavior
}
```

#### 2.3、自定义组件生命周期

[组件主要生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html)：

组件的生命周期，指的是组件自身的一些函数，这些函数在特殊的时间点或遇到一些特殊的框架事件时被自动触发

其中，最重要的生命周期是  **`created attached detached`** ，包含一个组件实例生命流程的最主要时间点。

- 组件实例刚刚被创建好时， **`created`**  生命周期被触发。此时，组件数据  `this.data`  就是在`Component`  构造器中定义的数据  `data` 。  此时还不能调用  `setData` 。  通常情况下，这个生命周期只应该用于给组件  `this`  添加一些自定义属性字段。
- 在组件完全初始化完毕、进入页面节点树后， `attached`  生命周期被触发。此时，`this.data`  已被初始化为组件的当前值。这个生命周期很有用，绝大多数初始化工作可以在这个时机进行。
- 在组件离开页面节点树后， `detached`  生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则  `detached`  会被触发。

生命周期方法可以直接定义在`Component`  构造器的第一级参数中。自小程序基础库版本  2.2.3  起，组件的生命周期也可以在  `lifetimes`  字段内进行声明（这是推荐的方式，其优先级最高）

```python
Component({
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
```

![](https://upload-images.jianshu.io/upload_images/12474664-4350e66b3b5dd305.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

#### 2.4、observer 在设置月份上的运用

对于[observer 数据监听器](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html)的用法，官网有更为详细的解释。

由于月份是每月一次更改的，所以适用于在**properties**中使用 **`observer`** 监听

| 定义段     | 类型       | 描述                                                                                                                                                                     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| properties | Object Map | 组件的对外属性，是属性名到属性设置的**映射表**，属性设置中可包含三个字段， **`type`  表示属性类型、 `value`  表示属性初始值、 `observer`  表示属性值被更改时的响应函数** |

其中，**`observer`  表示属性值被更改时的响应函数** 。

在`components/epsoide/index.js`中：

```python
properties: {
    index: {
        type: String,   //千万不要在observer中修改自身属性
        observer: function (newVal, oldVal, changePath) {
            //observer 表示属性值被更改时的响应函数
            let val = newVal < 10 ? '0' + newVal : newVal
            console.log(typeof val)
            this.setData({
                _index: val
            })
        }
    }
}
```

```python
/*** 组件的初始数据*/
data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',],
    year: 0,
    month: '',
    _index: ''
},
```

上图`observer`里的函数的意思是: 如果设置`index`的数值小于 10，就在`index`之前加上一个“0”，如果大于 10 就设置原来的`index`。在这段代码中，我们发现：在`setData`的时候改变的的是 **`data`里`_index`** 的值，不是改变本身`index`的值，为什么呢？

因为在`observer`函数里，**是不能改变自身的值的，要不然会无限递归调用**。所以在`data`里设置了一个新的变量`_index`用来接收`index`被更改时设置的值。因此，在组件的`wxml`里要绑定的是`_index`而不是`index`。

由于 **`new Date().getMonth()`** 获取月份为月份下标`0--11`，所以需要通过函数将下标转换为月份的真正显示

```python
attached: function () {
    // Component构造器 组件生命周期函数，在组件实例进入页面节点树时执行
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
        year,
        month: this.data.months[month]
    })
}
```

此外，还需注意的是，由于函数作用域发生了改变，在异步回调函数`success`里想要获取`data`中的`test`的值，是不可能访问到`this`的，`this`指代不明确，此时访问会报错。
如：

```python
success: function(res) {
    console.log(this.data.test)   // 报错
}
```

- 传统方法里，在回调函数内重新定义`this` **`let _this = this`** ，让`this`指向`_this`
- 使用 **`Es6箭头函数`**

  ```python
  success: (res) {
      console.log(this.data.test) // 正确
  }
  ```

### 3、小程序网络请求的封装

#### 3.1、config 配置

在小程序根目录下定义 **`config.js`** 文件，里面配置小程序网络请求前缀，这样，如果以后请求前缀发生了更改，只需在`config`里重新修改即可。

```python
const config = {
    api_blink_url: 'http://bl.7yue.pro/v1/',
    appkey: 'AbhC31IG7ruCDp57'
}
export {
    config
} //输出暴露config
```

#### 3.2、封装网络请求 https

在 **`util/http.js`** 中封装网络请求 **`https`**，小程序中所有的网络请求都写在这里，如果页面需要用到网络请求，就需要`import`这个`https`，这样维护代码的时候更加方便。

- 使用 **`Es6 class`** 定义 `HTTP`类，在封装一个`request`实例方法

```python
 //ES6 定义一个HTTP类
class HTTP {
    request(params) {   // request 实例方法(函数)
    if (!params.method) {
        params.method = "GET"
    }
    wx.request({
        url: config.api_blink_url + params.url,
        data: params.data,
        header: {
            'content-type': 'application/json',
            'appkey': config.appkey
        },
        success: (res) => {
            //开发者服务器返回的 HTTP 状态码
            // 判断以2（2xx)开头的状态码为正确
            let code = res.statusCode.toString()
            if (code.startsWith('2')) {
                // 表示参数字符串是否在源字符串的头部
                params.success && params.success(res.data)
            }
            else {
                let error_code = res.data.error_code
                this._show_error(error_code)
            }
        },
        fail: (err) => {
            this._show_error(1)
        }
    })
}
```

小程序 **`request`** 需要包含`url`、`data`、`header`、`method`、`success`、`fail`等。这里封装的网络请求 **`https`** 中为优化`method`，在`request`之前就先进行判断。

```python
 if (!params.method) {
    params.method = "GET"
}
```

这里运用 Es6 新特性**函数默认参数**进行判断，如果`request`请求中没有携带`method`，则`method`定义为`GET`；如果携带了，`method`就以携带值为准。

- 以 **`str.startWith()` 判断参数字符串是否在原字符串的头部**来判断服务器返回的`HTTP`状态码是否是以‘2’开头的，如果是就执行参数`params`下的`success`异步回调函数。

```python
if (code.startsWith('2')) {  //表示参数字符串是否在源字符串的头部
    params.success && params.success(res.data)
} else {
    let error_code = res.data.error_code
    this._show_error(error_code)
}
```

**`params.success && params.success(res.data)`** 这里先判断`params`是否为空，当不为空时执行`params.success`回调函数。是一种代码优化的写法。等同于

```python
if(params.success) {
    params.success(res.data)
}
```

- 自定义状态码

一个谨慎严谨的自定义状态码能严谨的提示相关提示信息

```python
const tips = {
    1: '默认提示信息',
    1005: '无效的开发者key',
    3000: '暂无新期刊'
}
```

这里使用自定义私有方法定义弹窗

```python
_show_error(error_code) { //下划线代表自定义私有方法
    if (!error_code) {
        error_code = 1
    }
    wx.showToast({
        title: tips[error_code],
        icon: 'none',
        duration: 2000
    })
}
```

这里获取网络请求的异步回调用的是 **`callBack回调函数`** 。封装的每一层都要传入 `callBack` 回调函数中去，而如果用 **`promise`** 的方式的话，是不用层层传入的，只要一直`return`到上一层，直到在`page`页面需要回调结果了，再获取这个`promise`对象，再通过`promise`对象的`then`方法获取网络请求的结果。

例如在`modules/classic.js`中：

```python
import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {
    getLatest(sCallBack) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallBack(res)
                this._setLatestIndex(res.index)  // 缓存的写入
                let key = this._getKey(res.index)
                wx.setStorageSync(key, res)
            }
        })
    }
}
```

在`pages/classic/classic.js`中引入使用`ClassicModel`

```python
import {ClassicModel} from '../../modules/classic.js'

// 进行实例化
let classicModel = new ClassicModel() //实例化
```

通过 **`new Model`** 实例化后使用

```python
classicModel.getLatest((res) => {
    console.log(res)                  // 获取的数据
    this.setData({
        classic: res,                 // 数据绑定
        likeStatus: res.like_status,  // 页面初始化时数据渲染
        likeCount: res.fav_nums
    })
})
```

#### this.setData 与 this.data

小程序中会经常用到 `this.data` 与 `this.setData`。其中 `this.data` 是用来获取页面 `data` 对象的，而 `this.setData` 是用来更新界面的。

##### Page.prototype.setData()

**`setData`** 函数用于将数据从逻辑层发送到视图层，同时改变对应的 `this.data` 的值。

注意：

- 直接修改 `this.data` 无效，无法改变页面的状态，还会造成数据不一致。

- 单次设置的数据不能超多 1024KB

### 4、导航栏 navi 组件相关要点

#### 4.1、导航栏 navi 组件注意要点

- 通过导航栏 `navi` 组件操控 `classic` 页面电影/文章/句子组件时需要通过 `triggerEvent` 操作，还需要判断是否是最先/后一张

```python
onLeft: function (event) {
    if (!this.properties.latest) {   /* 判断是否是第一期，是，则禁用 */
        this.triggerEvent('left', {}, {})
    }
}
```

- 移动端点击触发事件时，需要把放大触发区域。

#### 4.2、behavior 组件复用

在 `component`下新建文件件 `classic` ,其中又包含三组件： `music`组件、`movies`组件、`essay`组件。其中，三者 `properties` 中基本一致，所以可以使用 `behaviors` 经行组件间代码共享。

**`behaviors`** 是用于组件间**代码共享**的特性，类似于一些编程语言中的“`mixins`”或“`traits`”。每个 `behavior` 可以包含一组`属性`、`数据`、`生命周期函数`和`方法`，组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。每个组件可以引用**多个 behavior** 。 `behavior` 也可以引用其他 `behavior` 。

在新建的 `components/classic/classic-beh.js` 中：

**`behavior 需要使用 Behavior() 构造器定义。`**

```python
let classicBeh = Behavior({
    properties: {          //外部属性
        img: String,
        content: String,
        hidden: Boolean    // 组件隐藏显示
    },
    data: {},
    methods: {}
})

export { classicBeh }
```

**覆盖准则**：

- 如果有同名的属性或方法，组件本身的属性或方法会覆盖  `behavior`  中的属性或方法，如果引用了多个  `behavior` ，在定义段中靠后  `behavior`  中的属性或方法会覆盖靠前的属性或方法；

- 如果有同名的数据字段，如果数据是对象类型，会进行对象合并，如果是非对象类型则会进行相互覆盖；

- 生命周期函数不会相互覆盖，而是在对应触发时机被逐个调用。如果同一个  behavior  被一个组件多次引用，它定义的生命周期函数只会被执行一次。

在使用时需引用:

```python
// 引用
import { classicBeh } from "../classic-beh";

// 使用
behaviors: [classicBeh]
```

#### 4.3、组件间 wxss 样式复用

在组件 `classic` 文件夹里新建一个`common.wxss`，可以提取 `music` 组件、`movies` 组件、`essay` 组件里公共的样式写在这里。

引用时需要使用 **`@import`** 调用

```python
@import "../common.wxss"
```

#### 4.4、wx：if 与 hidden 区别

在 `classic` 页面中，由于 `music` 组件、`movies` 组件、`essay` 组件都占用页面同一面区域，所以在通过导航栏 navi 组件切换显示时，需要控制这三组件显示与否。

`wx:if`  与  `hidden`  都可以控制微信小程序中元素的显示与否。

区别：

- `wx:if`  是一个控制属性，需要将它添加到一个标签上。如果要一次性判断多个组件标签，可以使用一个  `<block>`  标签将多个组件包装起来，并在上边使用  `wx:if`  控制属性。

- `wx:if`  是遇 `true`  显示，`hidden`  是遇 `false`  显示。

- `wx:if`  在隐藏的时候不渲染，而 `hidden`  在隐藏时仍然渲染，只是不呈现。

- 所以如果**频繁切换**的话，用 `wx:if`  将会消耗更多资源，因为每次呈现的时候他都会渲染，每次隐藏的时候，他都会销毁。用 `hidden` 相对来说要好点。

- 如果切换并不频繁的话，用 `wx:if`  相对来说较好些，因为它会避免初始就一下渲染那么多。

```python
<v-movie hidden="{{ classic.type != 100 }}" img="{{ classic.image }}" content="{{ classic.content }}" />
<v-music hidden="{{ classic.type != 200 }}" img="{{ classic.image }}" content="{{ classic.content }}" src="{{ classic.url }}" />
<v-essay hidden="{{ classic.type != 300 }}" img="{{ classic.image }}" content="{{ classic.content }}" />
```

### 5、使用 Promise 重构网络请求

#### 5.1、promise 重构网络请求

在第 3 章节中，已经封装过小程序的`https`网络请求，现在以此为基础，使用`promise`重新封装。首先，要明白为什么要引入`promise`进行封装呢？在第 3 章中获取网络请求的异步回调结果用的是`callbck`函数的方式。这样其实有一个很不好的现象，就是封装的每一层都要传入`callback`回调函数，而如果用`promise`的方式的话，是不用层层传入的，只要一直`return`到上一层，直到在`page`页面你需要回调结果了，再获取这个`promise`对象，再通过`promise`对象的`then`方法获取网络请求的结果。

况且 **函数是不能保存状态的，而对象是能保存状态的，callcack 是个回调函数，promise 是个对象，所以 callback 方式需要层层传递，而 promise 方式不需要。**

promise 在小程序的使用：

```python
const promise = new Promise((resolve, reject) => {              
    wx.wx.getSystemInfo({
        success: (res) => {
            resolve(res)
        },
        fail: (err) => {
            reject(err)
        },
        complete: () => {}
    });
})

promise.then((res)=>{
    console.log(res)
    },(error)=>{
    console.log(error)
})
```

`request`方法返回一个`promise` 以前的`request(params)` 中`params`是个`js`对象，由于 JavaScript 对象特性，其他参数是可以附加在`params`对象上，但是别人不知道需要传什么参数，所以需要明确函数参数。

```python
request({url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
        this._request(url, resolve, reject, data, method)
    })
}
```

还有一种好处是： 可以指定**参数默认值**，如`data = {}`, `method = 'GET'`。且必填参数必须在默认参数之前：

```python
_request(url, resolve, reject, data = {}, method = 'GET')
```

在`modules/books.js`中引入使用

```python
class BooksModel extends HTTP {
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }
}
```

在具体页面中使用:

```python
booksModel.getHotList().then(res => {
  console.log("这是获取的书籍信息")
  console.log(res)
  this.setData({
    books: res
  })
})
```

#### 5.2、promise 解决回调地狱

比如现在有多个网络请求，这几个网络请求是存在**链式关系**的，就是必须第一个网络请求完成后才能进行第二个、再第三个、第四个。。。。，如果用`callback`的形式进行封装，会出现如下图的结果：

![回调地狱图示](https://upload-images.jianshu.io/upload_images/12474664-abe10a27913d3709.png?imageMogr2/auto-orient/)

此时可以用`promise`进行网络请求：

```python
API1.getResult(res)
    .then(res => {
        return API2.getResult(res);
    })
    .then(res => {
        return API3.getResult(res);
    })
    .then(res => {
        console.log(res);
    });
```

这样每个网络请求是平行的，所以解决了回调地狱的问题。
