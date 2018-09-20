# 效果

## 一、迷雾效果

scene(场景)可以增加迷雾效果，所有远处mesh(网格模型)都会逐渐改变成迷雾的颜色，与camera(摄像机)的far配合，可以达到减少渲染量提升性能的效果。

### 1.代码

``` js
scene.fog = new THREE.Fog(0x000000, 5, 18)
```

### 2.效果

<iframe height='353' scrolling='no' title='迷雾' src='//codepen.io/kuminson/embed/BOPNQb/?height=353&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/BOPNQb/'>迷雾</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 3.解释

THREE.Fog( hex, near, far )

| 参数 | 描述 |
| --- | ---- |
| hex | 迷雾的颜色，一般想要达到远处消失的效果，把颜色设置成背景色就行了|
| near | 从摄像头到多远开始出现迷雾效果 |
| far | 从摄像头到多远迷雾达到最大，也就是完全是迷雾的颜色 |

迷雾效果是场景内都生效的，如果想让某些材质不受影响，可以在材质选项里关闭这个效果

``` js
let material = new THREE.Material({
    fog: false
})
```

### 4.与camera(摄像机)配合提升性能

camera(摄像机)主要用到的是透视相机对象PerspectiveCamera，把相机的far参数设定和迷雾far多一点的值，可以实现部分性能优化。

THREE.PerspectiveCamera(fov, aspect, near, far)

| 参数 | 描述 |
| --- | ---- |
| fov | 横向视角，摄像机能看到的视野，人类横向视角能到180左右，对于3D视图来说，一般设置60-90度就行。<br>推荐：60|
| aspect | 渲染出的宽高比，这里就用承载canvas的dom宽高就行。<br>推荐：dom.clientWidth / dom.clientHeight  |
| near | 指定距离摄像机多近的距离开始渲染。<br>推荐：0.1  |
| far | 超出摄像机多远的距离不在渲染，这要根据场景里东西设置的大小来定。 <br>推荐：700 |

![camera](../static/img/perspective_camera.png)


## 二、导入模型

如果几何体过于复杂，可以利用3DMax、sketchup之类的建模软件进行建模，然后导出模型文件利用对应的加载器加载进来。

``` html
<script src="https://unpkg.com/three"></script>
<script src="https://threejs.org/examples/js/loaders/OBJLoader.js"></script>
```

``` js
// 创建模型加载器
var loader = new THREE.OBJLoader();
loader.load('https://res.cloudinary.com/kuminson/raw/upload/v1537409648/three.js/chahu_xlo7pg.obj', function (loadedMesh) {
      // 创建材质
      let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
      // 取出几何体
      let geometry = loadedMesh.children[0].geometry
      // 生成mesh
      let chahu = new THREE.Mesh( geometry, material )
     // 加入场景中
     scene.add(chahu)
  })
```

<iframe height='287' scrolling='no' title='导入模型' src='//codepen.io/kuminson/embed/qMJOWV/?height=287&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/qMJOWV/'>导入模型</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## 三、动画

### 1.动画实现方式

动画的实现原理是改动一点mesh(网格模型)参数,比如位置或者旋转角度，然后渲染一帧图片。

重复上面的操作，就形成了动画。

虽然可以使用setTimeOut()来实现，但是有诸多问题，比如一秒渲染的帧数过多，超过显示器刷新速度，会造成丢帧。

这时候可以使用h5的方法requestAnimationFrame()，这个方法可以根据显示器自动设置帧数(基本上是60帧每秒)，使用方法和setTimeOut()类似。

``` js
var renderStateId
// 逐帧渲染动画
animate () {
  // box绕y轴旋转
  box.rotation.y += 0.01
  // 渲染一帧
  renderer.render(scene, camera)
  // 递归调用 重复渲染动画
  renderStateId = requestAnimationFrame(animate)
}
```

requestAnimationFrame调用时会返回一个id值，可以用cancelAnimationFrame()方法取消

``` js
cancelAnimationFrame(renderStateId)
```


### 2.组(group)的应用

有些动画需要的多个一起运动效果，单独做会很麻烦，但是如果能一起运动就会很简单。这时候就需要组(group)这个对象了。

把多个mesh(网格模型)放到一个组(group)里，对组进行动画。

``` js
// 创建球体
let sphereGeometry = new THREE.SphereBufferGeometry(0.5, 32, 32)
// 生成球体
let sphere = new THREE.Mesh(sphereGeometry, material)
// 复制球体
let sphere2 = sphere.clone()
// 实例化组
let group = new THREE.Group()
// 修改球位置
sphere.position.x = 3
sphere2.position.x = -3
// 把球加入组中
group.add(sphere)
group.add(sphere2)
// 把组加入场景中
scene.add(group)

function anima () {
  // box绕y轴旋转
  group.rotation.y += 0.1
  // 渲染一帧
  renderer.render(scene, camera)
  // 渲染
  requestAnimationFrame(anima)
}

anima()
```

<iframe height='349' scrolling='no' title='组' src='//codepen.io/kuminson/embed/PdxgEP/?height=349&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/PdxgEP/'>组</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>



### 3.TWEEN的使用

很多时候，模型的运动速率并不是不变的，都是曲线。如果自己写算法会比较麻烦，TWEEN.js就很好的解决此类问题，并且非常适合与requestAnimationFrame()配合使用。

::: warning 注意
要在动画循环里加入TWEEN.update()，来获得每帧变化
:::

``` js{14}
// 实例化TWEEN 并设置要改变的对象
new TWEEN.Tween(sphere.position)
      // 对象的属性要变成多少值和时间
      .to({y: -10}, 1000)
      // 使用的变化曲线，这里用的是弹性曲线
      .easing(TWEEN.Easing.Bounce.Out)
      // 无限循环
      .repeat(Infinity)
      // 开始计算
      .start()

function anima () {
  // 计算一帧的变化
  TWEEN.update()
  // 渲染一帧
  renderer.render(scene, camera)
  // 渲染
  requestAnimationFrame(anima)
}
anima()
```

<iframe height='358' scrolling='no' title='tween.js使用' src='//codepen.io/kuminson/embed/yxQrrK/?height=358&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/yxQrrK/'>tween.js使用</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## 四、交互操作

有时候会需要鼠标与canvas里的模型进行交互，THREE.js里是这样实现的。

简单来说就是计算出鼠标在canvas上的位置，然后发射出一条经过摄像机和鼠标位置的射线，射线穿过的模型会被记录返回。接下来对相应的模型进行操作就可以了

先看下代码

``` js
// 绑定鼠标松开事件
dom.addEventListener('mouseup', (event) => {
  // 禁止冒泡
  event.preventDefault()
  // 计算鼠标位置
  let vector = new THREE.Vector3((event.clientX / dom.clientWidth) * 2 - 1, -(event.clientY / dom.clientHeight) * 2 + 1, 0.5)
  // 把屏幕上的二维矩阵换算成场景里的三维矩阵
  vector = vector.unproject(camera)
  // 发出射线
  let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize())
  // 设置射线中匹配的mesh
  let intersects = raycaster.intersectObjects([box])
  // 如果有对象
  if (intersects.length > 0) {
    // 修改颜色
    intersects[0].object.material.color = new THREE.Color(Math.floor(Math.random() * 10) / 10, Math.floor(Math.random() * 10) / 10, Math.floor(Math.random() * 10) / 10)
  }
})
```

点击方块会变换不同颜色

<iframe height='359' scrolling='no' title='鼠标点击交互' src='//codepen.io/kuminson/embed/NLeWaV/?height=359&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/NLeWaV/'>鼠标点击交互</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>



## 五、粒子

有两种绘制点的方法THREE.Sprite(material) 和 THREE.Points(geometry, material)，

当数量比较多的时候，Points方法会更好的节省性能，因为大量点的坐标都可以放入一个geometry对象中进行管理，非常节省资源。

粒子还有一个特性是他们没有方向，都是面向摄像机，外形是正方形，可以加入文理来改变样子。

``` js
// 创建几何体对象
let geometry = new THREE.Geometry()
// 创建材质
let material = new THREE.PointsMaterial( {
  color: 0x00ff00,
  size: 0.1
} )
// 设置范围值
let pointR = 15
// 循环生成点的位置
for (let i = 0; i < 3000; i++) {
  // 随机生成点位置
  let v = new THREE.Vector3(Math.random() * pointR - pointR / 2, Math.random() * pointR - pointR / 2, Math.random() * pointR - pointR / 2)
  // 把位置加入到几何体中
  geometry.vertices.push(v)
}
// 生成点
let box = new THREE.Points( geometry, material )
```

<iframe height='370' scrolling='no' title='粒子' src='//codepen.io/kuminson/embed/rZoOeO/?height=370&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/rZoOeO/'>粒子</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 六、阴影

有时候需要阴影效果，增加灯光和一些材质配置就能达到效果

::: warning 注意
阴影非常消耗资源，要谨慎调整配置
:::

渲染器要开启阴影渲染

``` js
renderer.shadowMap.enabled = true
```

效果更好的阴影算法

``` js
renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

需要灯光

``` js
// 增加灯光
let spotLight = new THREE.SpotLight( 0xffffff )
// 调整位置
spotLight.position.set( 20, 20, -10 )
// 调整朝向
spotLight.lookAt(new THREE.Vector3(0, 0, 0))
// 允许渲染阴影
spotLight.castShadow = true
// 修改阴影质量
spotLight.shadow.mapSize.width = 2048
spotLight.shadow.mapSize.height = 2048
// 加入场景
scene.add(spotLight)
```

设置可以产生阴影的mesh

``` js
box.castShadow = true
```

设置可以接受阴影的mesh，平面都可以接受

``` js
plane.receiveShadow = true
```

<iframe height='365' scrolling='no' title='阴影' src='//codepen.io/kuminson/embed/OoryaG/?height=365&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/OoryaG/'>阴影</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 七、插件

官方推荐了三个插件，分别是用来调整摄像机的orbitControls、性能检测器stats.js和可视化调参dat.GUI


### 1.orbitControls

安装

``` sh
npm install three-orbit-controls
```

``` js
// 引入
import orbit from 'three-orbit-controls'
// 摄像机控制器绑定到three上
let OrbitControls = orbit(THREE)
// 实例化摄像机控制器
orbitControls = new OrbitControls(camera)

function anima () {
  // 改变摄像机朝向
  orbitControls.update()
  // 渲染一帧
  renderer.render(scene, camera)
  // 渲染
  requestAnimationFrame(anima)
}
anima()
```

### 2.stats.js

安装

``` sh
npm install stats.js
```

``` js
import Stats from 'stats'
let stats = new Stats()
//设置统计模式
stats.setMode(0) // 0: fps, 1: ms, 2: mb, 3+: custom
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.top = '0px'
document.body.appendChild( stats.domElement )
function anima () {
  //通知stats画面已被重新渲染了
    stats.update()
  // 渲染一帧
  renderer.render(scene, camera)
  // 渲染
  requestAnimationFrame(anima)
}
anima()
```

<iframe height='357' scrolling='no' title='stats.js' src='//codepen.io/kuminson/embed/wERWmZ/?height=357&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/wERWmZ/'>stats.js</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 3.dat.GUI

安装

``` sh
npm install dat.gui
```

``` js
import * as dat from 'dat.gui'
// 创建参数对象
let fizzyText = {
  speed: 0.01,
  color: 0.2
}
// 实例化可视化调参面板
let gui = new dat.GUI()
// 增加参数
gui.add(fizzyText, 'speed', 0.01, 0.2)
gui.add(fizzyText, 'color', 0.2, 1)

function anima () {
  // 应用参数
  // box绕y轴旋转
  box.rotation.y += fizzyText.speed
  box.material.color = new THREE.Color(fizzyText.color * 2, fizzyText.color, fizzyText.color * 0.4)
  // 渲染一帧
  renderer.render(scene, camera)
  // 渲染
  requestAnimationFrame(anima)
}

anima()
```


<iframe height='362' scrolling='no' title='dat.GUI' src='//codepen.io/kuminson/embed/eLbgVZ/?height=362&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/eLbgVZ/'>dat.GUI</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
