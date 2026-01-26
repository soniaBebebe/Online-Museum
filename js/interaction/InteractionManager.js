import * as THREE from "three";

export class InteractionManager{
    constructor(camera,scene,renderer,onExhibitSelected){
        this.camera =camera;
        this.scene = scene;
        this.renderer = renderer;
        this.onExhibitSelected = onExhibitSelected;

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        this.pickables=[];
    }
    registerExhibitGroup(group){
        const meshes = group.userData.pickables || {};
        meshes.forEach(m=>{
            m.userData.exhibit=group.userData.exhibit;
            this.pickables.push(m);
        });
    }

    initDesctopPointer(){
        this.renderer.domElement.addEventListener("pointerdown", (e)=>{
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.pointer.x=((e.clientX-rect.left)/rect.width)*2 -1;
            this.pointer.y=-(((e.clientY-rect.top)/rect.height)*2 -1);
            this.raycaster.setFromCamera(this.pointer, this.camera);
            const hits=this.raycaster.intersectObjects(this.pickables, true);
            if (hits.length>0){ const exhibit=hits[0].object.userData.exhibit;
                if (exhibit) this.onExhibitSelected(exhibit);
            }
        })
    }
}