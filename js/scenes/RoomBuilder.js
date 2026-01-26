import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

export class RoomBuilder{
    static buildSimpleRoom(scene){
        const floorGeo = new THREE.PlaneGeometry(20,20);
        const floorMat = new THREE.MeshStandardMaterial({roughness:0.9, metalness:0.0});
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI/2;
        floor.receiveShadow = true;
        scene.add(floor);

        const wallGeo = new THREE.PlaneGeometry(20,4);
        const wallMat = new THREE.MeshStandardMaterial({roughness:0.95, metalness:0.0});

        const back = new THREE.Mesh(wallGeo, wallMat);
        back.position.set(0,2,-10);
        scene.add(back)

        const front = new THREE.Mesh(wallGeo, wallMat);
        front.position.set(0,2,10);
        front.rotation.y = Math.PI;
        scene.add(front)

        const left = new THREE.Mesh(wallGeo, wallMat);
        left.position.set(-10,2,0);
        left.rotation.y = Math.PI/2;
        scene.add(left)

        const right = new THREE.Mesh(wallGeo, wallMat);
        right.position.set(10,2,0);
        right.rotation.y = -Math.PI/2;
        scene.add(right)

        const ceilGeo = new THREE.planeGeometry(20,20);
        const ceilMat = new THREE.MeshStandardMaterial({roughness:1.0, metalness:0.0, side:THREE.DoubleSide});
        const ceiling = new THREE.Mesh(ceilGeo, ceilMat);
        ceiling.position.y=4;
        ceiling.rotation.x=Math.PI/2;
        scene.add(ceiling);
    }
}