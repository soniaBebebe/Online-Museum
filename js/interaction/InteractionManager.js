import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";


export class InteractionManager{
    constructor(camera,scene,renderer,onExhibitSelected){
        this.camera =camera;
        this.scene = scene;
        this.renderer = renderer;
        this.onExhibitSelected = onExhibitSelected;

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        this.pickables=[];
        this.hovered = null;
    }

    registerExhibitGroup(group){
        const meshes = group.userData.pickables || [];
        meshes.forEach(m=>{
            m.userData.exhibit=group.userData.exhibit;
            this.pickables.push(m);
        });
    }

    initDesktopPointer(){
        this.renderer.domElement.addEventListener("pointerdown", (e)=>{
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.pointer.x=((e.clientX-rect.left)/rect.width)*2 -1;
            this.pointer.y=-(((e.clientY-rect.top)/rect.height)*2 -1);
            this.raycaster.setFromCamera(this.pointer, this.camera);
            const hits=this.raycaster.intersectObjects(this.pickables, true);
            // if (hits.length>0){ const exhibit=hits[0].object.userData.exhibit;
            //     if (exhibit) this.onExhibitSelected(exhibit);
            if (hits.length > 0){
                const obj = hits[0].object;
                const exhibit = obj.userData.exhibit;

                if (exhibit){
                    this.onExhibitSelected(exhibit, obj.parent);
                }
            }
        })
    }

    initHoverHighlight(){
        this.renderer.domElement.addEventListener("pointermove", (e)=>{
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.pointer.x=((e.clientX-rect.left)/rect.width)*2-1;
            this.pointer.y=-((e.clientY-rect.top)/rect.height)*2+1;

            this.raycaster.setFromCamera(this.pointer,this.camera);
            const hits = this.raycaster.intersectObjects(this.pickables, true);

            if(this.hovered){
                this.highlightGroup(this.hovered, 0x000000);
                this.hovered=null;
            }
            if(hits.length>0){
                let obj=hits[0].object;
                while (obj.parent && !obj.userData.exhibit){
                    obj=obj.parent;
                }
                if(obj){
                    this.highlightGroup(obj, 0x333333);
                    this.hovered=obj;
                }
                if (obj.material){
                console.log("Material:", obj.material);
                console.log("Has emissive:", obj.material.emissive);
                }
            }
            
        })
    }
    // highlightGroup(group,color){
    //     group.traverse(child=>{
    //         if(child.isMesh && child.material){
    //             if(child.material.emissive){
    //                 child.material.emissive.set(color);
    //             }
    //         }
    //     });
    // }
    highlightGroup(group,color){

    group.traverse(child=>{

    if(child.isMesh && child.material){

        if(child.material.emissive){
            child.material.emissive.set(color);
        } 
        else if(child.material.color){

            child.material.color.offsetHSL(0, 0, color === 0x000000 ? -0.2 : 0.2);
        }

    }
    //nachat otsuda!!!

        });

    }   
}