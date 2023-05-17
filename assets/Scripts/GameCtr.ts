import { _decorator, Component, EventKeyboard, KeyCode, Node, EventTouch, Prefab, instantiate, director, Contact2DType, Collider2D, IPhysics2DContact, Input, input, Button, sys, Sprite, Label, color, Color, find, url, SpriteFrame, Texture2D, TextAsset, resources, ImageAsset} from 'cc';
const { ccclass, property } = _decorator;

import { BgCtr } from './BgCtr';
import { BirdCtr } from './BirdCtr';
import { ResultCtr } from './ResultCtr';
import { SaveNode } from './SaveNode';
// import { PipePool } from './PipePool';

@ccclass('GameCtr')
export class GameCtr extends Component {

    @property({
        type: Component,
        tooltip: 'This is bg'
    })
    public bg: BgCtr

    @property({
        type: ResultCtr,
        tooltip: 'Result here'
    })
    public result: ResultCtr;

    @property({
        type: BirdCtr,
        tooltip: 'This is Bird'
    })
    public BirdCtr: BirdCtr

    @property({type: Prefab})
    pipePrefab: Prefab = null;

    @property({type:Node})
    pipeNode : Node = null;

    pipe: Node[] = [null, null, null]

    @property({
        type: Node
    })
    private btnPlay : Node = null;

    // @property({
    //     type: Node
    // })
    // private btnTryAgain : Node = null;

    private isClick = false;
    private isCreatePipe = false;
    private hitPipe : boolean = false;

    @property({
        type : Node
    })
    private btnOption : Node = null;

    onLoad(){

        this.isClick = false;
        this.isCreatePipe = false;
        
        this.hitPipe = false;

        this.result.hideResults();
        this.result.ScoreLabel.node.active = false;

        let parameters = find('Persist_Node');
        console.log(parameters)
        let BirdParameters = parameters.getComponent(SaveNode);
        if(BirdParameters.NodeSaveBlue == true ){

            // const url = 'asset/Images/birdgreen1.png';
            // resources.load(url, ImageAsset, (err: any, imageAsset) => {
            //     const sprite = this.BirdCtr.getComponent(Sprite);
            //     const spriteFrame = new SpriteFrame();
            //     const tex = new Texture2D();
            //     tex.image = imageAsset;
            //     spriteFrame.texture = tex;
            //     sprite.spriteFrame = spriteFrame;
            // });

            // // var urlImage = 'asset/Images/birdgreen1.png'
            // // let texture = textureCache.addImage
            // // this.BirdCtr.getComponent(Sprite).spriteFrame= new SpriteFrame(texture); 
            // console.log("Blue")

            let getColor = this.BirdCtr.getComponent(Sprite)
            getColor.color = Color.BLUE;
        }

        if(BirdParameters.NodeSaveRed == true){
            let getColor = this.BirdCtr.getComponent(Sprite)
            getColor.color = Color.RED;
        }
    }

    update(deltaTime: number) {
        this.onCollisionEnter();
        
        // move pipes
        if(this.isCreatePipe == true){
            this.movePipes();
        }

        //check click Play Game
        if(this.isClick == true){
            let posY = this.BirdCtr.sp

            if(posY <= (-370) || posY >= 305 ){
                this.BirdCtr.node.setPosition(0, 0);
                this.hitPipe = false;
                this.gameOver();
            }
            else if(this.hitPipe == true){
                // this.birdctr.node.setPosition(0, 0);
                this.hitPipe = false;
                this.gameOver();
            }
            else{
                this.startGame();
            }          
        }
    }

    createPipes() {
        this.isCreatePipe = true;

        for (let i = 0; i < this.pipe.length; i++) {

            //create pipes
            this.pipe[i] = instantiate(this.pipePrefab);
            this.pipeNode.addChild(this.pipe[i]);

            var posX = this.pipe[i].position.x;           
            var posY = this.pipe[i].position.y;

            posX = 500 + (350 * i) ; // space of pipes
            var minY = -360;
            var maxY = -720;
            posY = minY + Math.random() * (maxY - minY);

            this.pipe[i].setPosition(posX, posY, 0);
        }
    }

    movePipes() {
        for (let i = 0; i < this.pipe.length; i++) {

            var posX = this.pipe[i].position.x;
            var posY = this.pipe[i].position.y;

            posX -= 1.0;

            //check pass pipe, add score
            var posBird = this.BirdCtr.node.position.x
            
            if(posX == posBird){
                this.result.addScore();
            }

            if (posX <= -550) {
                posX = 520;

                var minY = -360; //old: -360
                var maxY = -720;    //old: -600
                
                posY = minY + Math.random() * (maxY - minY);
            }
            this.pipe[i].setPosition(posX, posY, 0);
        }
    }

    onTouchStart(event: EventTouch) {
        this.btnPlay.active = false;
        this.isClick = true;
        this.createPipes();       
        this.btnOption.active = false;
        this.result.ScoreLabel.node.active = true;
    }

    onTouchTryAgain() {
        director.loadScene('main');
        this.startGame();
    }

    onTouchOption() {
        director.loadScene('menu')
    }

    startGame() {
        this.result.hideResults();
        director.resume();
        this.BirdCtr.birdFly();
    }

    gameOver() {
        this.result.showResults();
        director.pause();
    }

    onCollisionEnter () {
        let collider = this.BirdCtr.getComponent(Collider2D)
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    onBeginContact( selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null ){
        this.hitPipe = true;
    }
}
