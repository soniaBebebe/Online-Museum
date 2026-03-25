import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

import { GLTFLoader } from "https://esm.sh/three@0.158/examples/jsm/loaders/GLTFLoader.js";
// import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js";

export class ExhibitLoader{
    async load(url){
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load exhibits: ${res.status}`);
        return await res.json();
    }

    createExhibitObject(exhibit){
        const group = new THREE.Group();
        const standGeo = new THREE.CylinderGeometry(0.6, 0.8, 0.9, 32);
        const standMat = new THREE.MeshStandardMaterial({roughness:0.85, metalness:0.05});
        const stand = new THREE.Mesh(standGeo, standMat);
        stand.position.y = 0.45;
        group.add(stand);

        console.log("MODEL LOADED:", exhibit.model);
        // const itemGeo = new THREE.SphereGeometry(0.35,32,32);
        // const itemMat = new THREE.MeshStandardMaterial({roughness:0.35, metalness:0.15});
        // const item = new THREE.Mesh(itemGeo, itemMat);
        // item.position.y = 1.15;
        // group.add(item);

        // group.position.set(exhibit.position[0], exhibit.position[1]-1, exhibit.position[2]);
        group.userData.exhibit=exhibit;
        // group.userData.isExhbit=true;
        group.userData.pickables=[];

        // return group;

        if (exhibit.model){
            const loader = new GLTFLoader();

            loader.load(exhibit.model, (gltf)=>{
                const model = gltf.scene;
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());

                const size = box.getSize(new THREE.Vector3());
                model.position.sub(center);

                const maxDim=Math.max(size.x, size.y, size.z);

                const targetSize=0.7;
                const scale=targetSize/maxDim;

                model.scale.setScalar(scale);
                model.position.y+=1.2;
                if(exhibit.offset){
                    model.position.x+=exhibit.offset[0];
                    model.position.y+=exhibit.offset[1];
                    model.position.z+=exhibit.offset[2];
                }
                model.traverse((child)=>{

                    if (child.isMesh){
                        child.userData.exhibit=exhibit;
                        group.userData.pickables.push(child);
                    }
                });
                group.add(model);
                group.userData.rotate=exhibit.rotate;
                console.log("Loaded:", exhibit.model);
                model.traverse(child=>{
                    console.log(child.type);
                });
            })
        }
        else{
            const geo = new THREE.SphereGeometry(0.35,32,32);
            const mat = new THREE.MeshStandardMaterial({color:0xffffff});
            const sphere = new THREE.Mesh(geo, mat);
            sphere.position.y = 1.1;
            sphere.userData.exhibit=exhibit;
            group.add(sphere);
        }
        group.position.set(
            exhibit.position[0],
            0,
            exhibit.position[2]
        );

        return group;
    }
}