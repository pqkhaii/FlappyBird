import { _decorator, Canvas, Component, director, log, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgCtr')
export class BgCtr extends Component {

    @property({
        type:Node,
        tooltip: 'Background 0'
    })
    private bg0: Node;

    @property({
        type:Node,
        tooltip: 'Background 1'
    })
    private bg1: Node;

    @property({
        type:Node,
        tooltip: 'Background 2'
    })
    private bg2: Node;

    private startLocation0 = new Vec3(0, 0, 0);
    private startLocation1 = new Vec3(0, 0, 0);
    private startLocation2 = new Vec3(0, 0, 0);

    public gameSpeed:number = 200;
    
    protected update(deltaTime: number) : void {
        // set location
        this.startLocation0 = this.bg0.position; 
        this.startLocation1 = this.bg1.position;
        this.startLocation2 = this.bg2.position;

        let moveBg = this.gameSpeed * deltaTime;
        
        //move background
        this.startLocation0.x -= moveBg; 
        this.startLocation1.x -= moveBg;
        this.startLocation2.x -= moveBg;
        
        //out of screen
        if(this.startLocation0.x <= -473){ 
            console.log('1')
            this.startLocation0.x = 2320; //1418
        }
        
        if(this.startLocation1.x <= -473){
            console.log('2')
            this.startLocation1.x = 2320;
        }

        if(this.startLocation2.x <= -473){
            console.log('3')
            this.startLocation2.x = 2320;
        }

        this.bg0.setPosition(this.startLocation0);
        this.bg1.setPosition(this.startLocation1);
        this.bg2.setPosition(this.startLocation2);
    }
}

