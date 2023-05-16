import { _decorator, Component, EventKeyboard, KeyCode, Node, EventTouch, Prefab, instantiate, director, Contact2DType, Collider2D, IPhysics2DContact, Input, input, Button, sys, Sprite, Label, color, Color, find} from 'cc';
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

        // let parameters = find('parameters');
        // console.log(parameters)
        // //let BirdParameters = parameters.getComponent('SaveNode');
        // let BirdParameters = parameters.getComponent(SaveNode);
        // console.log(BirdParameters)


        this.isClick = false;
        this.isCreatePipe = false;
        
        this.hitPipe = false;

        this.result.hideResults();
        this.result.ScoreLabel.node.active = false;

        // this.btnPlay.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        // this.btnTryAgain.on(Input.EventType.TOUCH_START, this.onTouchTryAgain, this);
        //this.btnOption.on(Input.EventType.TOUCH_START, this.onTouchOption, this);
        //this.btnCancel.on(Input.EventType.TOUCH_START, this.onTouchCancel, this);
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
            var minY = -260;
            var maxY = -720;
            posY = minY + Math.random() * (maxY - minY);

            this.pipe[i].setPosition(posX, posY, 0);
        }
    }

    movePipes() {
        for (let i = 0; i < this.pipe.length; i++) {
            var posX = this.pipe[i].position.x;
            // console.log(posX);
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
        // this.turnOffOption();
        this.isClick = true;
        this.createPipes();       
        this.btnOption.active = false;
        this.result.ScoreLabel.node.active = true;
    }

    onTouchTryAgain() {
        director.loadScene('main');
        // this.result.hideResults();
        this.startGame();
    }

    onTouchOption() {
        // this.bgOption.node.active = true;
        // this.btnCancel.active = true;
        // this.labelOption.node.active = true;
        director.loadScene('menu')
    }

    startGame() {
        this.result.hideResults();
        director.resume();
        // console.log(this.BirdCtr)
        this.BirdCtr.birdFly();
        // console.log(this.BirdCtr.birdFly());
    }

    gameOver() {
        this.result.showResults();
        director.pause();
        // this.result.saveScore()
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