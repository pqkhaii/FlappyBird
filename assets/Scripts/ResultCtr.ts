import { _decorator, Component, Label, Node, Sprite, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResultCtr')
export class ResultCtr extends Component {

    @property({
        type: Label
    })
    public ScoreLabel: Label;

    @property({
        type: Label
    })
    private HighScore: Label;

    @property({
        type: Node
    })
    private ResultEnd: Node;

    @property({
        type: Sprite
    })
    private bgScore: Sprite

    @property({
        type: Sprite
    })
    private bgGameOver: Sprite


    maxScore: number = 0;
    currentScore: number = 0;

    private scoreArray: number[] = [];

    private keyScore: string = 'score'
    
    protected start(): void {
        var getScore = sys.localStorage.getItem(this.keyScore);
        
        if(getScore){
            this.scoreArray = JSON.parse(getScore);
            localStorage.setItem(this.keyScore, JSON.stringify(this.scoreArray))
        }
    }

    protected updateScore(num: number): void {
        this.currentScore = num;
        this.ScoreLabel.string = this.currentScore.toString();
    }
    
    public addScore(): void {
        this.updateScore(this.currentScore += 1)
    }

    public showResults(): void {
        this.scoreArray.push(this.currentScore);

        sys.localStorage.setItem(this.keyScore, JSON.stringify(this.scoreArray));
        var getScore = JSON.parse(sys.localStorage.getItem(this.keyScore));

        this.HighScore.string = Math.max(...getScore).toString();
        
        this.ResultEnd.active = true;
        this.HighScore.node.active = true;
        this.bgScore.node.active = true;
        this.bgGameOver.node.active = true;
    }

    public hideResults(): void {
        this.HighScore.node.active = false;
        this.ResultEnd.active = false;
        this.bgScore.node.active = false;
        this.bgGameOver.node.active = false;
    }
}

