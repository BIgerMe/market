<template>
  <div :id="id" :style="{ height: height, width: width }"></div>
</template>

<script>
  import { clone } from '@/utils/three'
  export default {
    props: {
      id:{
        type: String,
        default: 'phoenix',
      },
      width: {
        type: String,
        default: '200px',
      },
      height: {
        type: String,
        default: '200px',
      },
    },
    data() {
      return {}
    },
    mounted() {
        this.phoenix()
    },
    methods: {
      phoenix() {
        let id = this.id
        let container
        let camera, scene, renderer
        let mesh = [], mixer = []
        let controls,bloomComposer,meshAxis
        const radius = 2000
        let process = 0
        let theta = 0
        let thetaArr = [0,0]
        let speed = [0.0004,0.0003]
        let prevTime = Date.now()
        function init() {
          container = document.getElementById(id)
          let width = container.offsetWidth
          let height = container.offsetHeight
          camera = new THREE.PerspectiveCamera(
            45,
            width / height,
            1,
            10000
          )
          camera.position.set(0,0,12000)

          scene = new THREE.Scene()

          const light1 = new THREE.DirectionalLight(0xFFFFFF, 1)
          light1.position.set(1, 1, 0).normalize()
          scene.add(light1)

          const loader = new THREE.GLTFLoader()

          loader.load('//video.xxroom.xyz/scene.glb', function (gltf) {
            // loader.load('./static/three/gltf/phoenix.glb', function (gltf) {
            // loader.load('./static/three/gltf/phoenix_bird/scene.gltf', function (gltf) {
            let mesh1 = clone(gltf.scene)
            let mesh2 = clone(gltf.scene)

            mesh1.position.set(-1000,-150,0)
            mesh1.scale.set(0.5,0.5,0.5) //缩小至0.5倍
            mesh1.rotateY(-Math.PI/8)
            mesh2.position.set(500,300,0)

            let mixer1 = new THREE.AnimationMixer(mesh1)
            let mixer2 = new THREE.AnimationMixer(mesh2)
            mixer1.clipAction(gltf.animations[0]).setDuration(1).play()
            mixer2.clipAction(gltf.animations[0]).setDuration(1).play()
            scene.add( mesh1,mesh2 );
            mesh.push(mesh1,mesh2);
            mixer.push(  mixer1,mixer2 );
          })
          /*宇宙*/
          meshAxis = new THREE.Vector3(0,1,0)
          loader.load('//video.xxroom.xyz/nss.glb', function (gltf) {
            let mesh3 = gltf.scene
            mesh.push(mesh3)
            mesh3.rotateX(Math.PI/10)
            mesh3.position.set(-4500,-4500,1000)
            mesh3.scale.set(30,30,30) //放大n倍
            scene.add(mesh3)
          })

          renderer = new THREE.WebGLRenderer( {alpha: true } );
          //您可以将透明颜色保留为默认值。
          renderer.setClearColor( 0x000,0); //default
          renderer.setPixelRatio(window.devicePixelRatio) //像素比
          renderer.setSize(width, height)
          renderer.outputEncoding = THREE.sRGBEncoding //真彩色，不加的话颜色会与ps中图像看上去的不同
          container.appendChild(renderer.domElement)

          controls = new THREE.OrbitControls(camera,renderer.domElement);// 初始化控制器
          controls.target.set(0, 0, 0);// 设置控制器的焦点，使控制器围绕这个焦点进行旋转

          /*通道*/
          const renderScene = new THREE.RenderPass(scene, camera)
          renderScene.autoClear = false
          const bloomPass = new THREE.UnrealBloomPass();
          bloomPass.renderToScreen = true;
          bloomPass.threshold = 0;
          bloomPass.strength = 1.5;
          bloomPass.radius = 0;

          // var width = container.offsetWidth || 1;
          // var height = container.offsetHeight || 1;
          // var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false };
          // var renderTarget = new THREE.WebGLRenderTarget( width, height, parameters );
          // bloomComposer = new THREE.EffectComposer(renderer, renderTarget);

          //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
          bloomComposer = new THREE.EffectComposer(renderer)
          bloomComposer.setSize(width, height);
          bloomComposer.addPass(renderScene);
          bloomComposer.addPass(bloomPass);

          // renderPass.clear=false
          renderer.autoClear = false
          // renderer.autoClearColor = false
        }

        function animate() {
          /*泛光渲染*/
          bloomComposer.render()
          requestAnimationFrame(animate)
          render()
        }
        function render() {
          /*相机的位置*/
          /*相机的位置*/
          if (camera.position.z > 3000 && process === 0) {
            if (camera.position.z - 50 <= 3000) {
              process = 1;//进入阶段1
            } else {
              camera.position.z -= 50;
            }
          } else {
            theta += 0.1
            if (camera.position.z < 5000 && process === 1) {
              if (camera.position.z + 30 >= 5000) {
                process = 2; //进入阶段2
              } else {
                camera.position.z += 30;
              }
            }
            if (process === 2) {
              thetaArr[0] += 0.5
              if (thetaArr[0] >= 450) {
                process = 3
              } else {
                camera.position.x = 5000 * Math.sin(THREE.MathUtils.degToRad(thetaArr[0]))
                camera.position.z = 5000 * Math.cos(THREE.MathUtils.degToRad(thetaArr[0]))
              }
            }
            if (process === 3) {
              if (camera.position.x > 2600) {
                if (camera.position.x - 25 <= 2600) {
                  process = 4; //进入阶段2
                } else {
                  camera.position.x -= 25;
                  camera.position.y += 5;
                }
              }
            }
          }
            /*头正尾负*/
            // camera.position.x = radius  * Math.sin(THREE.MathUtils.degToRad(theta))
            // camera.position.y = radius * Math.cos(THREE.MathUtils.degToRad(theta))
            // camera.position.z = radius  * Math.cos(THREE.MathUtils.degToRad(theta))
            /*相机看向的位置*/
          camera.lookAt(0, 0, 0)

          if (mixer) {
            const time = Date.now()
            let t = time - prevTime
            if(mixer[0] !== undefined){
              mesh[0].rotateOnAxis(meshAxis,(t) * -Math.PI/600000)
              mesh[1].position.x += 100 * 0.03 * Math.sin(THREE.MathUtils.degToRad(theta))
              mesh[2].position.x += 50 * 0.03 * Math.sin(THREE.MathUtils.degToRad(theta))
              mesh[1].position.z += 100 * 0.03 * Math.sin(THREE.MathUtils.degToRad(theta)) * Math.tan(22.5)
              if(mesh[1].position.x > mesh[2].position.x +700){
                speed[0] = 0.00025
              }else if(mesh[1].position.x + 800 < mesh[2].position.x){
                speed[0] = 0.0004
              }
              mixer[0].update((t)* speed[0])
              mixer[1].update((t)* speed[1])
            }
            prevTime = time
          }
          renderer.render(scene, camera)
        }

        init()
        animate()
      },
    },
  }
</script>
