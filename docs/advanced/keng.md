# 踩坑

## 一、canvas背景透明

有时候会需要让渲染出来的内容背景是半透明的，需要先在实例化renderer(渲染器)时传入参数来开启透明效果，然后再设置透明度时才会生效。

``` js
let renderer = new THREE.WebGLRenderer({
    alpha: true
})
// setClearColor(背景色，透明度)
renderer.setClearColor(0x000000, 0.1)
```

<iframe height='359' scrolling='no' title='eLjxmm' src='//codepen.io/kuminson/embed/eLjxmm/?height=359&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/eLjxmm/'>eLjxmm</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 二、给canvas截图

有时会有给canvas截图的需求，如果直接用toDataURL截图，只会得到空白的背景。

因为webGl标准默认是把渲染每一帧的图像都直接清除，所以开启图像缓存就可以成功截图了

``` js
let renderer = new THREE.WebGLRenderer({
    // 图像缓存
    preserveDrawingBuffer: true
})
```


## 三、自动像素比可能会有问题

官方会推荐根据设备的宽高像素比进行优化，主要针对高像素的设备。

``` js
this.renderer.setPixelRatio(window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1)
```

但实际使用中，发现有些安卓机会返回错误的像素比值，导致渲染canvas时图像变形，所以根据实际情况考虑，不必要时可以不使用此配置。


## 四、有些面看不见

在THREE.js里，面是分正反的，默认是只渲染正面的材质，背面不会渲染，导致看到背面时，模型或者平面会消失。

如果需要看到背面的时候，可以在材质属性里进行设置双面渲染，就能解决此类问题。

``` js
let material = new Three.MeshBasicMaterial({
    // 双面渲染
    side: THREE.DoubleSide
})
```