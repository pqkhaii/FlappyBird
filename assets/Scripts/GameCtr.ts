import { _decorator, Component, EventKeyboard, KeyCode, Node, EventTouch, Prefab, instantiate, director, Contact2DType, Collider2D, IPhysics2DContact, Input, input, Button, sys, Sprite, Label, color, Color, find, url, SpriteFrame, Texture2D, TextAsset, resources, ImageAsset, math} from 'cc';
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

    private isClick = false;
    private isCreatePipe = false;
    private hitPipe : boolean = false;

    @property({
        type : Node
    })
    private btnOption : Node = null;

    protected onLoad() : void{
        this.handleOnload();

        let parameters = find('Persist_Node');
        //console.log(parameters)
        let BirdParameters = parameters.getComponent(SaveNode);

        // director.addPersistRootNode(parameters))

        if(BirdParameters.NodeSaveGreen == true ){

            // const url = 'assets/Images/birdgreen1/spriteFrame';
            // resources.load(url, SpriteFrame, (err: any, spriteFrame) => {
            //     const sprite = this.BirdCtr.getComponent(Sprite);
            //     sprite.spriteFrame = spriteFrame;
            //     console.log(spriteFrame)
            //   });

            let getColor = this.BirdCtr.getComponent(Sprite)
            getColor.color = new Color(144, 238, 144)
        }

        if(BirdParameters.NodeSaveRed == true){
            let getColor = this.BirdCtr.getComponent(Sprite)
            getColor.color = new Color(248, 189, 201)
        }
    }

    protected handleOnload() : void {
        this.isClick = false;
        this.isCreatePipe = false;
        
        this.hitPipe = false;

        this.result.hideResults();
        this.result.ScoreLabel.node.active = false;
    }

    protected update(deltaTime: number) : void {
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
                this.hitPipe = false;
                this.gameOver();
            }
            else{
                this.startGame();
            }          
        }
    }

    protected createPipes() : void {
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
            posY = math.randomRangeInt(minY, maxY); 
            //minY + Math.random() * (maxY - minY);

            this.pipe[i].setPosition(posX, posY, 0);
        }
    }

    protected movePipes() : void {
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
                
                posY = math.randomRangeInt(minY, maxY) 
            }
            this.pipe[i].setPosition(posX, posY, 0);
        }
    }

    protected onTouchStart(event: EventTouch) : void {
        this.btnPlay.active = false;
        this.isClick = true;
        this.createPipes();       
        this.btnOption.active = false;
        this.result.ScoreLabel.node.active = true;
    }

    protected onTouchTryAgain() : void {
        director.loadScene('main');
        this.startGame();
    }

    protected onTouchOption() : void {
        director.loadScene('menu')
    }

    protected startGame() : void {
        this.result.hideResults();
        director.resume();
        this.BirdCtr.birdFly();
    }

    protected gameOver() : void {
        this.result.showResults();
        director.pause();
    }

    protected onCollisionEnter () : void {
        let collider = this.BirdCtr.getComponent(Collider2D)
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    protected onBeginContact( selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null ) : void {
        this.hitPipe = true;
    }
}
