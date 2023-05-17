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
        type : Sprite
    })
    private bgScore : Sprite

    @property({
        type : Sprite
    })
    private bgGameOver : Sprite


    maxScore: number = 0;
    currentScore: number = 0;

    private maxScoreStorage : number = 0;
    private scoreArray : number[] = [];

    updateScore(num: number) {
        this.currentScore = num;
        
        this.ScoreLabel.string = ('' + this.currentScore);
        // console.log(userData)
    }
    start(): void {
        var getScore = sys.localStorage.getItem('score');
        if(getScore){
            //read data
            this.scoreArray = JSON.parse(getScore);
            
            localStorage.setItem('score', JSON.stringify(this.scoreArray))
        }
    }

    addScore() {
        this.updateScore(this.currentScore += 1)
    }

    showResults() {
        this.scoreArray.push(this.currentScore);

        sys.localStorage.setItem('score', JSON.stringify(this.scoreArray));
        var getScore = JSON.parse(sys.localStorage.getItem('score'));

        this.HighScore.string = '' + Math.max(...getScore)
        
        this.ResultEnd.active = true;
        this.HighScore.node.active = true;
        this.bgScore.node.active = true;
        this.bgGameOver.node.active = true;
    }

    hideResults() {
        this.HighScore.node.active = false;
        this.ResultEnd.active = false;
        this.bgScore.node.active = false;
        this.bgGameOver.node.active = false;
    }
}

