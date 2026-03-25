import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";
export class SceneManager{
    constructor(){
        this.scene=new THREE.Scene();
        this.clock=new THREE.Clock();
    }
    init(){
        //      EXAMPLE 1!!
        // const canvas = document.createElement('canvas');
        // canvas.width=512;
        // canvas.height=512;

        // const ctx=canvas.getContext('2d');

        // const gradient=ctx.createLinearGradient(0,0,0,512);
        // gradient.addColorStop(0, '#4584fa');
        // gradient.addColorStop(1, '#09347d');

        // ctx.fillStyle=gradient;
        // ctx.fillRect(0,0,512,512);

        // const texture=new THREE.CanvasTexture(canvas);
        // this.scene.background=texture;

        const loader=new THREE.TextureLoader();

        loader.load('textures/skyPic.jpg', (texture)=>{
            texture.mapping=THREE.EquirectangularReflectionMapping;
            this.scene.background=texture;
        });
        
        this.addLights();
    }
    addLights(){
        const ambient=new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambient);

        const dir=new THREE.DirectionalLight(0xffffff, 0.8);
        dir.position.set(5,10,5);
        this.scene.add(dir);
    }
}