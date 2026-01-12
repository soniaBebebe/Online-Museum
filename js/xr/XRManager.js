import { VRButton } from "https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/webxr/VRButton.js";

export class XRManager{
    constructor(sceneManager){
        this.sceneManager=sceneManager;
    }
    init(){
        document.body.appendChild(
            VRButton.createButton(this.sceneManager.renderer)
        );
    }
}