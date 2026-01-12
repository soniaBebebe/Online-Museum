import {SceneManager} from "./scene/SceneManager.js";
import {XRManager} from "./xr/XRManager.js";
import {CameraManager} from "./scene/CameraManager.js";
import { RendererManager } from "./scenes/RendererManager.js";

const sceneManager=new SceneManager();
sceneManager.init();

const xrManager=new XRManager(sceneManager);
xrManager.init();

const cameraManager=new CameraManager();
const rendererManager=new RendererManager();

function animate(){
    rendererManager.renderer.render(
        sceneManager.scene,
        cameraManager.camera
    )
}

rendererManager.renderer.setAnimationLoop(animate);