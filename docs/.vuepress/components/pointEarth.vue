<template>
  <div class="pointEarth" id="pointEarth"></div>
</template>

<script>
  import * as THREE from 'three'
  export default {
    name: 'pointEarth',
    mounted () {
      // 实例化场景
      let scene = new THREE.Scene()
      // 获取承载dom
      let dom = document.getElementById('pointEarth')
      // 实例化摄像机
      let camera = new THREE.PerspectiveCamera(60, 400 / 300, 0.1, 700)
      // 设置摄像机位置
      camera.position.x = 3
      camera.position.y = 5
      camera.position.z = 5
      // 设置摄像机朝向 朝向原点
      camera.lookAt(new THREE.Vector3(0, 0, 0))
      // 实例化渲染器 用webGL来渲染
      let renderer = new THREE.WebGLRenderer()
      // 渲染器的背景色
      renderer.setClearColor(0x000000)
      // 设置渲染的canvas的大小
      renderer.setSize(400, 300)
      // 创建模型
      let geometry = new THREE.BoxBufferGeometry(2, 2, 2)
      // 创建材质
      let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
      // 生成mesh
      let box = new THREE.Mesh( geometry, material )
      // 加入场景中
      // scene.add(box)
      // 把canvas挂载到dom上
      dom.appendChild(renderer.domElement)

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

      function anima () {
        // box绕y轴旋转
        if (point !== undefined) {
          point.rotation.y += 0.01
        }
        // 渲染一帧
        renderer.render(scene, camera)
        // 渲染
        requestAnimationFrame(anima)
      }

      anima()
    }
  }
</script>

<style scoped>
.pointEarth{
  margin-top: 20px;
  text-align: center;
}
</style>