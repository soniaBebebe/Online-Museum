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

        this.tooltip = document.createElement("div");
        this.tooltip.className="minimap-tooltip";
        this.mapEl.appendChild(this.tooltip);
    }

    // update(){
    //     const x=(this.camera.position.x - this.bounds.minX) / (this.bounds.maxX - this.bounds.minX);
    //     const z=(this.camera.position.z - this.bounds.minZ) / (this.bounds.maxZ - this.bounds.minZ);

    //     const mapX=x*this.size;
    //     const mapY=z*this.size;

    //     this.playerEl.style.left=`${mapX-5}px`;
    //     this.playerEl.style.top=`${mapY-5}px`;

    //     const yaw=this.camera.rotation.y;
    //     this.playerEl.style.transform=`rotate(${yaw}rad)`;
    // }

    registerExhibit(object3D, exhibitData){
        const marker = document.createElement("div");
        marker.className="exhibit-marker";
        marker.addEventListener("mouseenter", ()=>{
            this.tooltip.textContent=exhibitData.title;
            this.tooltip.style.opacity="1";
        });

        marker.addEventListener("mouseleave", ()=>{
            this.tooltip.style.opacity="0";
        });

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
    update(){
        const x=(this.camera.position.x - this.bounds.minX) / (this.bounds.maxX - this.bounds.minX);
        const z=(this.camera.position.z - this.bounds.minZ) / (this.bounds.maxZ -  this.bounds.minZ);

        this.playerEl.style.left = `${x * this.size}px`;
        this.playerEl.style.top = `${z * this.size}px`;

        this.playerEl.style.transform=`translate(-50%, -50%) rotate(${this.camera.rotation.y}rad)`;

        for (const obj of this.exhibits){
            const marker = this.markers.get(obj);
            if (!marker) continue;

            const ex=(obj.position.x - this.bounds.minX) / (this.bounds.maxX - this.bounds.minX);
            const ez=(obj.position.z - this.bounds.minZ) / (this.bounds.maxZ - this.boundsminZ);

            marker.style.left =`${ex * this.size}px`;
            marker.style.top = `${ez * this.size}px`;
        }

        if (this.tooltip.style.opacity==="1"){
            const activeMarker = this.mapEl.querySelector(".exhibit-marker:hover");
            if (activeMarker){
                this.tooltip.style.left=activeMarker.style.left;
                this.tooltip.style.top = activeMarker.style.top;
            }
        }

    }
}