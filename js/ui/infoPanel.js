export class infoPanel{
    constructor(){
        this.panel=document.getElementById("infoPanel");
        this.titleEl=document.getElementById("infoTitle");
        this.descEl=document.getElementById("infoDesc");

        this.playBtn=document.getElementById("playAudioBtn");
        this.stopBtn=document.getElementById("stopAudioBtn");
        this.closeBtn=document.getElementById("closeInfoBtn");

        this.audio=new Audio();
        this.currentExhibit=null;

        this.playBtn.addEventListener("click", ()=>this.play());
        this.stopBtn.addEventListener("click", ()=>this.stop());
        this.closeBtn.addEventListener("click", ()=>this.hide());
    }

    show(exhibit){
        this.currentExhibit=exhibit;
        this.titleEl.textContent=exhibit.title;
        this.descEl.textContent=exhibit.description;

        if(exhibit.audio) this.audio.src=exhibit.audio;

        this.panel.hidden=false;
    }

    hide(){
        this.stop();
        this.panel.hidden=true;
        this.currentExhibit=null;
    }
    play(){
        if(!this.currentExhibit?.audio)return;
        this.audio.play().catch(()=>{});
    }
    stop(){
        this.audio.pause();
        this.audio.currentTime=0;
    }
}