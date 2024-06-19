import { AnimatedSprite, Container } from "pixi.js";
import { Globals } from "./Globals";
import { config } from "./appConfig";
import { extname } from "path";
import { Easing, Tween } from "@tweenjs/tween.js";

export class UiPopups extends Container 
{
    menuBtn !: AnimatedSprite;
    settingBtn!: interactiveBtn;
    rulesBtn!: interactiveBtn;
    infoBtn! : interactiveBtn;
    isOpen : boolean = false;
    constructor()
    {
        super();
        this.ruleBtnInit();
        this.settingBtnInit();
        this.infoBtnInit();

        this.menuBtnInit();
    }
    menuBtnInit()
    {
        const menuBtnSprites: any = [Globals.resources.MenuBtn.texture,Globals.resources.MenuBtnH.texture];
        this.menuBtn  = new interactiveBtn(menuBtnSprites,()=>{console.log("called");this.openPopUp();},0,true);
        this.menuBtn.position.set(config.logicalWidth/10,config.logicalHeight/4)
        this.addChild(this.menuBtn);
    }
    openPopUp() {
        // Toggle the isOpen boolean
        this.isOpen =!this.isOpen;
        console.log(this.isOpen);
        this.menuBtn.interactive = false;
        if(this.isOpen) {
            this.rulesBtn.moveToTween(this.menuBtn);
            this.infoBtn.moveToTween(this.menuBtn);
            this.settingBtn.moveToTween(this.menuBtn);
        } else {
            this.rulesBtn.moveBack(this.menuBtn);
            this.infoBtn.moveBack(this.menuBtn);
            this.settingBtn.moveBack(this.menuBtn);
        }
    }
    settingBtnInit()
    {
        const settingBtnSprites: any = [Globals.resources.settingBtn.texture,Globals.resources.settingBtnH.texture];
        this.settingBtn  = new interactiveBtn(settingBtnSprites,()=>{console.log("called")},2,false);
        this.settingBtn.position.set(config.logicalWidth/10,config.logicalHeight/4)
        this.addChild(this.settingBtn);
    }

    ruleBtnInit()
    {
        const rulesBtnSprites: any = [Globals.resources.rulesBtn.texture,Globals.resources.rulesBtnH.texture];
        this.rulesBtn  = new interactiveBtn(rulesBtnSprites,()=>{console.log("called")},3,false);
        this.rulesBtn.position.set(config.logicalWidth/10,config.logicalHeight/4)
        this.addChild(this.rulesBtn);
    }
    infoBtnInit()
    {
        const infotBtnSprites: any = [Globals.resources.infoBtn.texture,Globals.resources.infoBtnH.texture];
        this.infoBtn  = new interactiveBtn(infotBtnSprites,()=>{console.log("called")},4,false);
        this.infoBtn.position.set(config.logicalWidth/10,config.logicalHeight/4)
        this.addChild(this.infoBtn);
    }
}

class interactiveBtn extends AnimatedSprite
{
    moveToPosition:number = -1;
    constructor(AnimatedTextures : any,callBack:()=>void,endPos : number,visible : boolean)
    {
        super(AnimatedTextures);
        this.anchor.set(0.5);
        this.buttonMode = true;
        this.interactive = visible;
        this.visible = visible;
        this.moveToPosition =endPos;
        this.on("pointerdown", () => { this.gotoAndStop(1);callBack(); })
		this.on("pointerup", () => {   this.gotoAndStop(0); })
		this.on("pointerout", () => {  this.gotoAndStop(0); })
    }
    moveToTween(sprite : AnimatedSprite)
    {
        this.visible = true;
        new Tween(this.position)
        .to({y:config.logicalWidth/10 + this.moveToPosition*this.height},600)
        .easing(Easing.Elastic.Out)
        .onComplete(()=>{ this.interactive = true; sprite.interactive = true;})
        .start();

    }
    moveBack(sprite : AnimatedSprite)
    {
        this.interactive = false;
        new Tween(this)
        .to({y:config.logicalWidth/10 + this.height},600)
        .easing(Easing.Elastic.Out)
        .onComplete(()=>{this.visible = false;sprite.interactive = true;})
        .start();
    }
}