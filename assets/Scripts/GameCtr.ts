import { _decorator, Component, Node, Prefab, instantiate, director, Contact2DType, Collider2D, IPhysics2DContact,find, math} from 'cc';
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

    @property({
        type: BirdCtr,
        tooltip: 'Bird 2'
    })
    public BirdCtr2: BirdCtr

    @property({
        type: Prefab
    })
    pipePrefab: Prefab = null;

    @property({
        type: Node
    })
    pipeNode: Node = null;

    pipe: Node[] = [null, null, null];

    @property({
        type: AudioCtr
    })
    private AudioCtr: AudioCtr;

    @property({
        type: Node
    })
    public btnPause: Node = null;

    @property({
        type: Node
    })
    public btnResume: Node = null;

    private hitPipe: boolean = false;

    private sceneMain: string = 'main';
    private sceneEntry: string = 'entry';

    protected onLoad(): void{
        this.handleOnload();
        this.handlePersistNode();
    }

    protected handleOnload(): void {
        this.startGame();

        this.hitPipe = false;

        this.btnPause.active = false;

        this.result.hideResults();
        this.result.ScoreLabel.node.active = true;
    }

    protected handlePersistNode(): void {
        let parameters = find('MyNode');
        let BirdParameters = parameters.getComponent(SaveNode);

        if(BirdParameters.NodeBird === true ){
            this.BirdCtr2.node.active = false;
        }

        if(BirdParameters.NodeBird2 === true){
            this.BirdCtr.node.active = false;
        }
    }

    protected start(): void {
        this.createPipes();
        this.startGame();
    }

    protected update(deltaTime: number): void {
        this.onCollisionEnter();
        this.movePipes();

        let posY = this.BirdCtr.sp;

        if(posY <= (-370) || posY >= 305){
            this.hitPipe = false;
            this.AudioCtr.onAudio(3);
            this.gameOver();
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

    protected createPipes(): void {
        for (let i = 0; i < this.pipe.length; i++) {
            
            this.pipe[i] = instantiate(this.pipePrefab);
            this.pipeNode.addChild(this.pipe[i]);

            var posX = this.pipe[i].position.x;           
            var posY = this.pipe[i].position.y;

            posX = 500 + (400 * i) ; 

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

            if (posX <= -610) {
                posX = 520;

                var minY = -360;    //old: -360
                var maxY = -720;    //old: -600
                
                posY = math.randomRangeInt(minY, maxY) 
            }

            this.pipe[i].setPosition(posX, posY, 0);
        }
    }

    protected onTouchTryAgain(): void {
        director.loadScene(this.sceneMain);
        this.startGame();
    }

    protected onTouchHome(): void {
        director.loadScene(this.sceneEntry);
        this.startGame();
    }

    protected onTouchPause(): void {
        director.pause();
        this.btnPause.active = true;
        this.btnResume.active = false;
    }

    protected onTouchResume(): void {
        director.resume();
        this.btnPause.active = false;
        this.btnResume.active = true;
    }

    protected startGame(): void {
        this.result.hideResults();
        director.resume();
        this.BirdCtr.birdFly();
        this.BirdCtr2.birdFly();
    }

    protected gameOver(): void {
        this.result.showResults();
        director.pause();
        this.btnPause.active = false;
        this.btnResume.active = false;
    }

    protected onCollisionEnter(): void {
        let colliderBird = this.BirdCtr.getComponent(Collider2D)
        let colliderBird2 = this.BirdCtr2.getComponent(Collider2D)

        if(colliderBird){
            colliderBird.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }

        if(colliderBird2){
            colliderBird2.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact2, this)
        }
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null ): void {
        this.hitPipe = true;
    }

    protected onBeginContact2(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null ): void {
        this.hitPipe = true;
    }
}
