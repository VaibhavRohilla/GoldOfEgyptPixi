import { Container, DisplayObject, Graphics, Resource, Sprite, Texture } from "pixi.js";
import { config } from "./appConfig";
import { AnimatedBackgroundSprite, BackgroundGraphic, BackgroundSprite } from "./Background";
import { Globals } from "./Globals";
import { staticData } from "./LoaderConfig";

export abstract class Scene {


    private sceneContainer: Container;


    mainContainer: Container;
    // mainBackground: BackgroundGraphic;
    private mainBackground: BackgroundGraphic | BackgroundSprite;


    constructor() {
        this.sceneContainer = new Container();
        // if (typeof mainBackgroundColor === "number") {
            // this.mainBackground = new BackgroundGraphic(config.logicalWidth, config.logicalHeight, this.fullBackground);
            
            // } 
            // else {
                const Background = Sprite.from(staticData.Background);

                this.mainBackground = new BackgroundSprite(Background.texture, window.innerWidth, window.innerHeight);
                this.addChildToFullScene(this.mainBackground);
        // }


        this.mainContainer = new Container();

        this.resetMainContainer();

        this.sceneContainer.addChild(this.mainContainer);

        // const mask = new Graphics();
        // mask.beginFill(0xffffff);
        // mask.drawRect(0, 0, config.logicalWidth, config.logicalHeight);
        // mask.endFill();
        // this.mainContainer.addChild(mask);
        // this.mainContainer.mask = mask;

    }

    // changeBackgroundSprite(index: number) {
    //     this.fullBackground.updateBackgroundIndex(index);
    // }

    resetMainContainer() {
        this.mainContainer.x = config.minLeftX;
        this.mainContainer.y = config.minTopY;
        this.mainContainer.scale.set(config.minScaleFactor);
    }
    addToScene(obj: DisplayObject) {
        this.sceneContainer.addChild(obj);

    }
    resize(): void {
        this.resetMainContainer();
        // this.mainBackground.resetBg(window.innerWidth, window.innerHeight);
        this.mainBackground.width =  window.innerWidth;
        this.mainBackground.height =  window.innerHeight;

    }

    initScene(container: Container) {
        container.addChild(this.sceneContainer);
    }
    destroyScene() {
        this.sceneContainer.destroy();
    }

    addChildToFullScene(component: DisplayObject) {
        this.sceneContainer.addChild(component);

    }
    addChildToIndexFullScene(component: DisplayObject, index: number) {
        this.sceneContainer.addChildAt(component, index);
    }



    abstract update(dt: number): void;

    abstract recievedMessage(msgType: string, msgParams: any): void;
}