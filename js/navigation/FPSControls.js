import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

export class FPSControls{
    constructor(camera, domElement=document.body){
        this.camera=camera;
        this.domElement=domElement;

        this.moveForward=false;
        this.moveBackward=false;
        this.moveLeft=false;
        this.moveRight=false;

        this.velocity=new THREE.Vector3();
        this.direction=new THREE.Vector3();

        this.speed=3.0;
        this.lookSpeed=0.002;

        this.pitch=0;
        this.yaw=0;

        this._initEvents();
    }
    _initEvents(){
        document.addEventListener("keydown", (e)=>this._onKeyDown(e));
        document.addEventListener("keyup", (e)=>this._onKeyUp(e));

        this.domElement.addEventListener("click",  ()=>{
            this.domElement.requestPointerLock();
        });

        document.addEventListener("mousemove", (e)=>{
            if(document.pointerLockElement!==this.domElement) return;
            this._onMouseMove(e);
        });
    }

    _onKeyDown(e){
        switch(e.code){
            case "KeyW":this.moveForward=true; break;
            case "KeyS":this.moveBackward=true; break;
            case "KeyA":this.moveLeft=true; break;
            case "KeyD":this.moveRight=true; break;
        }
    }
    _onKeyUp(e){
        switch(e.code){
            case "KeyW":this.moveForward=false; break;
            case "KeyS":this.moveBackward=false; break;
            case "KeyA":this.moveLeft=false; break;
            case "KeyD":this.moveRight=false; break;
        }
    }

    _onMouseMove(e){
        this.yaw -=e.movementX*this.lookSpeed;
        this.pitch -=e.movementY*this.lookSpeed;

        this.pitch=Math.max(-Math.PI/2, Math.min(Math.PI/2, this.pitch));
        this.camera.rotation.set(this.pitch, this.yaw,0);
    }

    update(delta){
        this.direction.set(0,0,0);

        if(this.moveForward) this.direction.z-=1;
        if(this.moveBackward) this.direction.z+=1;
        if(this.moveLeft) this.direction.x-=1;
        if(this.moveRight) this.direction.x+=1;

        this.direction.normalize();

        if(this.direction.lengthSq()>0){
            this.velocity.copy(this.direction)
            .applyEuler(this.camera.rotation)
            .multiplyScalar(this.speed*delta);

            this.camera.position.add(this.velocity);
        }
    }
}