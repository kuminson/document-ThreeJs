# 骚操作

## 1.粒子大陆地球

先看效果，一個地球，大陆用粒子填充，海洋留空

<pointEarth/>

### 说下思路

重点是判断每個点是否应该显示，而判断的方法就是找到一张位图，像下面这样

![位图](/img/earth_1.png)

用把图导入canvas中，利用getImageData()方法把所有像素信息取出来，然后对每个位置粒子进行判断，如果取到的像素是黑色的，就显示粒子，否则不添加粒子。

下面是代码

``` js
// 加载位图
let bitmap = new Image()
bitmap.src = '/img/earth_1.png'
bitmap.onload = () => {
addBitLand()
}
var point
// 生成点阵大陆
function addBitLand () {
// canvas导入位图
let canvas = document.createElement('canvas')
canvas.width = bitmap.width
canvas.height = bitmap.height
let ctx = canvas.getContext('2d')
ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
// 获取位图像素数据
let bitmapData = ctx.getImageData(0, 0, bitmap.width, bitmap.height)
// 生成点材质
let pointMaterial = new THREE.PointsMaterial({
  size: 0.1,
  color: new THREE.Color(0x31b477),
  depthWrite: false,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending
})
// 生成几何体
let u = 100
let v = 100
let pointGeometry = new THREE.Geometry()
let spherical = new THREE.Spherical(4)
for (let sv = 0; sv < v; sv++) {
  let st = (u * (1 - Math.sin(sv / v * Math.PI))) / u + 0.5
  for (let su = 0; su < u; su += st) {
    let pu = su / u
    let pv = sv / v
    let x = parseInt(bitmap.width * pu)
    let y = parseInt(bitmap.height * pv)
    if (bitmapData.data[(y * bitmap.width + x) * 4] === 0) {
      spherical.theta = pu * Math.PI * 2 - Math.PI / 2
      spherical.phi = pv * Math.PI
      let pos = new THREE.Vector3()
      pos.setFromSpherical(spherical)
      pointGeometry.vertices.push(pos)
    }
  }
}
point = new THREE.Points(pointGeometry, pointMaterial)
// 加入场景中
scene.add(point)
}
```


