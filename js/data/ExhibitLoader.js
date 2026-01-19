import * as THREE from "three";

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

        const itemGeo = new THREE.SphereGeometry(0.35,32,32);
        const itemMat = new THREE.MeshStandardMaterial({roughness:0.35, metalness:0.15});
        const item = new THREE.Mesh(itemGeo, itemMat);
        item.position.y = 1.15;
        group.add(item);

        group.position.set(exhibit.position[0], exhibit.position[1]-1, exhibit.position[2]);
        group.userData.exhibit=exhibit;
        group.userData.isExhbit=true;
        group.userData.pickables=[stand,item];

        return group;
    }
}