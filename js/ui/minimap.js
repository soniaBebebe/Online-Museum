export class MiniMap{
    constructor(camera, bounds){
        this.camera=camera;
        this.bounds=bounds;

        this.mapEl=document.getElementById("minimap");
        this.playerEl=document.getElementById("player");

        this.size=this.mapEl.clientWidth;
    }

    update(){
        const x=(this.camera.position.x - this.bounds.minX) / (this.bounds.maxX - this.bounds.minX);
        const z=(this.camera.position.z - this.bounds.minZ) / (this.bounds.maxZ - this.bounds.minZ);

        const mapX=x*this.size;
        const mapY=z*this.size;

        this.playerEl.style.left=`${mapX-5}px`;
        this.playerEl.style.top=`${mapY-5}px`;

        const yaw=this.camera.rotation.y;
        this.playerEl.style.transform=`rotate(${yaw}rad)`;
    }
}