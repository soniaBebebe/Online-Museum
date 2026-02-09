export class MiniMap{
    constructor(camera, bounds){
        this.camera=camera;
        this.bounds=bounds;

        this.mapEl=document.getElementById("minimap");
        this.playerEl=document.getElementById("player");

        this.exhibits=[];
        this.markers= new Map();
        this.activeExhibit=null;

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

    registerExhibit(object3D, exhibitData){
        const marker = document.createElement("div");
        marker.className="exhibit-marker";

        this.mapEl.appendChild(marker);

        this.exhibits.push(object3D);
        this.markers.set(object3D, marker);
    }

    setActive(object3D){
        if(this.activeExhibit){
            const old=this.markers.get(this.activeExhibit);
            old?.classList.remove("active");
        }

        this.activeExhibit=object3D;

        if (object3D){
            const m=this.markers.get(object3D);
            m?.classList.add("active");
            //nachat otsuda update coordinati objectov
        }
    }
}