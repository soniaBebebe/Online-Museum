import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";
export class SceneManager{
    constructor(){
        this.scene=new THREE.Scene();
        this.clock=new THREE.Clock();
    }
    init(){
        this.scene.background=new THREE.Color(0x202020);
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