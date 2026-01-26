import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

export class CameraManager{
    constructor(){
        this.camera=new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        this.camera.position.set(0, 1.6, 5);
    }
}