import * as THREE from "https://unpkg.com/three@0.158.0/build/three.module.js";

export class RendererManager{
    constructor(canvas){
        this.renderer=new THREE.WebGLRenderer({antialias:true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.xr.enabled=true;
        document.body.appendChild(this.renderer.domElement);
    }
}