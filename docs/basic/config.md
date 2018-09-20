# 配置介绍

## 一、Geometries(几何体)

Geometries(几何体)就是各种形状，长方体、球形、椎体、圆柱体等等，是实例化mesh(网格模型)的参数之一。

我们先实例化一个最简单的正方体，参数是BoxBufferGeometry(x轴方向的宽度，y轴方向的高度，z轴方向的深度)

``` js
let geometry = new THREE.BoxBufferGeometry(2, 2, 2)
```



## 二、Material(材质)

Material(材质)是用来确定怎么显示几何体，是mesh(网格模型)的参数之一

我们先来实例化一个普通的不受光照影响的Material(材质)

``` js
let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
```



## 三、mesh(网格模型)

mesh(网格模型)是结合Geometries(几何体)和Material(材质)，成为可以放到scene(场景)里渲染的对象。

我们把上面生成的Geometries(几何体)和Material(材质)作为参数传入mesh(网格模型)里

``` js
let mesh = new THREE.Mesh( geometry, material )
```



## 四、camera(摄像机)

可以把camera(摄像机)当做是人的眼睛，renderer(渲染器)会根据camera(摄像机)看到的东西来渲染。

参数需要一个承载canvas的dom元素的宽高比，其他可以直接使用默认配置就行

``` js
// 实例化摄像机
let camera = THREE.PerspectiveCamera(60, dom.width / dom.height, 0.1, 1000)
```



## 五、scene(场景)

scene(场景)是包含光源和mesh(网格模型)的空间，然后作为参数传给renderer(渲染器)来渲染出图片

``` js
// 实例化场景
let scene = new THREE.Scene()
```

使用.add()方法把生成好的mesh(网格模型)放进场景就行了


```js
scene.add(mesh)
```




## 六、renderer(渲染器)

renderer(渲染器)是用来把camera(摄像机)看到scene(场景)里的东西都渲染出来，放到canvas里。一般我们用的是webGL渲染的renderer(渲染器)WebGLRenderer

``` js
let renderer = new THREE.WebGLRenderer()
```

然后设置canvas宽高

``` js
renderer.setSize(800, 500)
```

记得把生成的canvas绑定到页面上

``` js
let dom = document.getElementById('box')
dom.appendChild(renderer.domElement)
```

最后把配置好的scene(场景)和camera(摄像机)作为参数传入renderer(渲染器)canvas元素就能渲染出图片了

``` js
renderer.render(scene, camera)
```


更详细内容可以看[进阶](/advanced/)内容
