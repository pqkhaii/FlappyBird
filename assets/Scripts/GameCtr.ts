import { _decorator, Component, EventKeyboard, KeyCode, Node, EventTouch, Prefab, instantiate, director, Contact2DType, Collider2D, IPhysics2DContact, Input, input, Button, sys, Sprite, Label, color, Color, find, url, SpriteFrame, Texture2D, TextAsset, resources, ImageAsset, math} from 'cc';
const { ccclass, property } = _decorator;

import { BgCtr } from './BgCtr';
import { BirdCtr } from './BirdCtr';
import { ResultCtr } from './ResultCtr';
import { SaveNode } from './SaveNode';
import { AudioCtr } from './AudioCtr';


@ccclass('GameCtr')
export class GameCtr extends Component {

    @property({
        type: Component,
        tooltip: 'Background'
    })
    public bg: BgCtr

    @property({
        type: ResultCtr,
        tooltip: 'Result'
    })
    public result: ResultCtr;

    @property({
        type: BirdCtr,
        tooltip: 'Bird'
    })
    public BirdCtr: BirdCtr

    @property({type: Prefab})
    pipePrefab: Prefab = null;

    @property({type:Node})
    pipeNode: Node = null;

    pipe: Node[] = [null, null, null];

    @property({
        type: Node
    })
    private btnPlay: Node = null;

    @property({
        type: AudioCtr
    })
    private AudioCtr: AudioCtr;

    private isClick = false;
    private isCreatePipe = false;
    private hitPipe: boolean = false;

    private sceneMain: string = 'main';
    private sceneMenu: string = 'menu';

    @property({
        type: Node
    })
    private btnOption: Node = null;

    protected onLoad(): void{
        this.handleOnload();
        this.handlePersistNode();
    }

    protected handleOnload(): void {
        this.startGame();

        this.isClick = false;
        this.isCreatePipe = false;
        this.hitPipe = false;

        this.result.hideResults();
        this.result.ScoreLabel.node.active = false;
    }

    protected handlePersistNode(): void {
        let parameters = find('colorNode');
        let BirdParameters = parameters.getComponent(SaveNode);
        let getColorSprite = this.BirdCtr.getComponent(Sprite);
        console.log(BirdParameters);
        console.log(getColorSprite);
        console.log(BirdParameters.NodeSaveGreen);
        console.log(BirdParameters.NodeSaveRed);
        if(BirdParameters.NodeSaveGreen === true ){
            getColorSprite.color = new Color(144, 238, 144);
        }

        if(BirdParameters.NodeSaveRed === true){
            getColorSprite.color = new Color(248, 189, 201);
        }
    }

    protected update(deltaTime: number): void {
        this.onCollisionEnter();
        
        // move pipes
        if(this.isCreatePipe === true){
            this.movePipes();
        }

        //check click Play Game
        if(this.isClick === true){
            let posY = this.BirdCtr.sp

            if(posY <= (-370) || posY >= 305 ){
                // this.BirdCtr.node.setPosition(0, 0);
                this.hitPipe = false;
                this.gameOver();
                this.AudioCtr.onAudio(3);
            }

            else if(this.hitPipe === true){
                this.hitPipe = false;
                this.AudioCtr.onAudio(2);
                this.gameOver();
            }

            else{
                this.startGame();
            }          
        }
    }

    protected createPipes(): void {
        this.isCreatePipe = true;

        for (let i = 0; i < this.pipe.length; i++) {

            //create pipes
            this.pipe[i] = instantiate(this.pipePrefab);
            this.pipeNode.addChild(this.pipe[i]);

            var posX = this.pipe[i].position.x;           
            var posY = this.pipe[i].position.y;

            // space of pipes
            posX = 500 + (350 * i) ; 

            var minY = -360;
            var maxY = -720;

            posY = math.randomRangeInt(minY, maxY); 

            this.pipe[i].setPosition(posX, posY, 0);
        }
    }

    protected movePipes(): void {
        for (let i = 0; i < this.pipe.length; i++) {

            var posX = this.pipe[i].position.x;
            var posY = this.pipe[i].position.y;

            posX -= 1.0;

            //check pass pipe, add score
            var posBird = this.BirdCtr.node.position.x
            
            if(posX === posBird){
                this.result.addScore();
                this.AudioCtr.onAudio(1);
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

    protected onTouchStart(event: EventTouch): void {
        this.btnPlay.active = false;
        this.isClick = true;
        this.createPipes();       
        this.btnOption.active = false;
        this.result.ScoreLabel.node.active = true;
    }

    protected onTouchTryAgain(): void {
        director.loadScene(this.sceneMain);
        this.startGame();
    }

    protected onTouchOption(): void {
        director.loadScene(this.sceneMenu)
    }

    protected onTouchHome(): void {
        director.loadScene(this.sceneMain)
        this.startGame();
    }

    protected startGame(): void {
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
