# 疑问


## 一、THREE.js里用的是什么单位

THREE.js里没有单位，都是按数值算出的比例，所以在使用的时候必须把所有单位统一成一个单位，然后对THREE.js进行设置就行，最终表现的是所有数值的比例。



## 二、怎么判断方向

采用的是遵循右手定则的直角坐标系

![right hand](../static/img/coordinate.jpg)

可以用官方自带的THREE.AxesHelper()生成直角坐标系

<iframe height='358' scrolling='no' title='直角坐标系' src='//codepen.io/kuminson/embed/MqByjK/?height=358&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/MqByjK/'>直角坐标系</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## 三、可以生成哪些Geometries(几何体)

目前官网给出了十几个几何体

| [BoxGeometry(长方体)](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry) | [CircleGeometry(正多边形)](https://threejs.org/docs/index.html#api/en/geometries/CircleGeometry) | [ConeGeometry(椎体)](https://threejs.org/docs/index.html#api/en/geometries/ConeGeometry) |
| ---- | ---- | ---- |
| [DodecahedronGeometry(十二面体)](https://threejs.org/docs/index.html#api/en/geometries/DodecahedronGeometry) | [IcosahedronGeometry(二十面体)](https://threejs.org/docs/index.html#api/en/geometries/IcosahedronGeometry) | [LatheGeometry(绕Y轴旋转生成的面)](https://threejs.org/docs/index.html#api/en/geometries/LatheGeometry) |
| [ParametricGeometry(根据参数生成形状)](https://threejs.org/docs/index.html#api/en/geometries/ParametricGeometry) | [PlaneGeometry(平面)](https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry) | [RingGeometry(环形面)](https://threejs.org/docs/index.html#api/en/geometries/RingGeometry) |
| [SphereGeometry(球体)](https://threejs.org/docs/index.html#api/en/geometries/SphereGeometry) | [TetrahedronGeometry(四面体)](https://threejs.org/docs/index.html#api/en/geometries/TetrahedronGeometry) | [TorusGeometry(圆环体)](https://threejs.org/docs/index.html#api/en/geometries/TorusGeometry) |
| [TubeGeometry(沿曲线挤出的管道)](https://threejs.org/docs/index.html#api/en/geometries/TubeGeometry) | [TorusKnotGeometry(换面纽结体)](https://threejs.org/docs/index.html#api/en/geometries/TorusKnotGeometry) | [ShapeGeometry(二维形状)](https://threejs.org/docs/index.html#api/en/geometries/ShapeGeometry) |
| [OctahedronGeometry(八面体)](https://threejs.org/docs/index.html#api/en/geometries/OctahedronGeometry) | [CylinderGeometry(柱体)](https://threejs.org/docs/index.html#api/en/geometries/CylinderGeometry) | [ExtrudeGeometry(从路径形状拉伸)](https://threejs.org/docs/index.html#api/en/geometries/ExtrudeGeometry) |

<iframe height='357' scrolling='no' title='官方几何体' src='//codepen.io/kuminson/embed/ZMMZLj/?height=357&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/kuminson/pen/ZMMZLj/'>官方几何体</a> by kuminson (<a href='https://codepen.io/kuminson'>@kuminson</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

和三个比较特殊的几何体EdgesGeometry、WireframeGeometry、TextGeometry

EdgesGeometry、WireframeGeometry用于辅助

TextGeometry用于生成文字体

::: warning 注意

还有带Buffer的几何体与其一一对应，有Buffer和没Buffer的区别点在于性能和存储数据方式不一样

没有Buffer，是更通用的Geometries(几何体)，里面的数据存储都是Vector3，Vector2，Face3的实例，修改起来十分方便

而有Buffer的是专门针对webGL进行优化过的，性能要更好，但是存储方式是Float32Array的类型，操作起来比较麻烦。

刚开始做Three.js用带Buffer的就行，性能好，基本上不会去改点的位置之类的。

以后要进行点的位置修改的时候，可以考虑通过fromGeometry()和fromBufferGeometry()来互相转换，达到方便修改又能高效渲染。
:::


## 四、怎么获得球面上某点的三维坐标

THREE.js内置了一些数学方法，可以计算这些点的三维坐标。

Vector3()是表示空间上一点的对象，里面有很多内置的方法方便调用。

``` js
var location = new THREE.Vector3( 0, 0, 0 )
```

Spherical(radius: Float, phi: Float, theta: Float)是计算球面某点位置的对象。

参数radius是半径，phi是类似纬度的角度0-Math.PI之间，theta是类似经度的角度值0-2Math.PI之间

``` js
var spherical = new Three.Spherical(3, Math.Pi * 0.5, Math.Pi * 0.5)
// 把位置换算成Vector3类型 location就是球面位置了
location.setFromSpherical(spherical)
```

