import {SceneManager} from "./scene/SceneManager.js";
import {XRManager} from "./xr/XRManager.js";
import {CameraManager} from "./scene/CameraManager.js";
import { RendererManager } from "./scenes/RendererManager.js";
import {RoomBuilder} from "./scene/rendererManager.js";
import {ExhibitLoader} from "./data/ExhibitLoader.js";
import {InteractionManager} from "./interaction/InteractionManager.js";
import { infoPanel, infoPanel } from "./ui/infoPanel.js";

const sceneManager=new SceneManager();
sceneManager.init();

const xrManager=new XRManager(sceneManager);
xrManager.init();

const cameraManager=new CameraManager();
const rendererManager=new RendererManager();
const infoPanel=new infoPanel();

const loader=new ExhibitLoader();
const exhibits=await loader.load("./data/exhibits.json");

const interaction=new InteractionManager(
    cameraManager.camera,
    sceneManager.scene,
    rendererManager.renderer,
    (exhibit)=>infoPanel.show(exhibit)
);
interaction.initDesctopPointer();

for (const ex of exhibits){
    const obj=loader.createExhibitObject(ex);
    sceneManager.scene.add(obj);
    interaction.registerExhibitGroup(obj);
}

const axes=new THREE.AxesHelper(2);
sceneManager.scene.add(axes);

function animate(){
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