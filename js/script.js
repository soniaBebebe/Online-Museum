import {SceneManager} from "./scenes/SceneManager.js";
import {XRManager} from "./xr/XRManager.js";
import {CameraManager} from "./scenes/CameraManager.js";
import { RendererManager } from "./scenes/RendererManager.js";
import {RoomBuilder} from "./scenes/RoomBuilder.js";
import {ExhibitLoader} from "./data/ExhibitLoader.js";
import {InteractionManager} from "./interaction/InteractionManager.js";
import { infoPanel } from "./ui/infoPanel.js";
import {FPSControls} from "./navigation/FPSControls.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";
import {MiniMap} from "./ui/minimap.js";

const sceneManager=new SceneManager();
sceneManager.init();

const xrManager=new XRManager(RendererManager.renderer);
xrManager.init();

const cameraManager=new CameraManager();
const rendererManager=new RendererManager();
const infoPanelUi=new infoPanel();

const controls=new FPSControls(
    cameraManager.camera,
    rendererManager.renderer.domElement
);

const miniMap=new MiniMap(
    cameraManager.camera,
    controls.bounds
);

const loader=new ExhibitLoader();
const exhibits=await loader.load("./js/data/exhibits.json");

const interaction=new InteractionManager(
    cameraManager.camera,
    sceneManager.scene,
    rendererManager.renderer,
    (exhibit, object3D)=>{
        infoPanelUi.show(exhibit);
        miniMap.setActive(object3D);
    }
);
interaction.initDesktopPointer();

for (const ex of exhibits){
    const obj=loader.createExhibitObject(ex);
    sceneManager.scene.add(obj);
    interaction.registerExhibitGroup(obj);

    miniMap.registerExhibit(obj, ex);
}

const axes=new THREE.AxesHelper(2);
sceneManager.scene.add(axes);
const clock=new THREE.Clock();

function animate(){
    const delta=clock.getDelta();
    controls.update(delta);
    miniMap.update();
    rendererManager.renderer.render(
        sceneManager.scene,
        cameraManager.camera
    )
}

window.addEventListener("resize", ()=>{
    cameraManager.camera.aspect=window.innerWidth / window.innerHeight;
    cameraManager.camera.updateProjectionMatrix();
    rendererManager.renderer.setSize(window.innerWidth, window.innerHeight);
})

rendererManager.renderer.setAnimationLoop(animate);