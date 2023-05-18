import { _decorator, Canvas, Component, director, log, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgCtr')
export class BgCtr extends Component {

    @property({
        type:Node,
        tooltip: 'Background 0'
    })
    public bg0: Node;

    @property({
        type:Node,
        tooltip: 'Background 1'
    })
    public bg1: Node;

    @property({
        type:Node,
        tooltip: 'Background 2'
    })
    public bg2: Node;

    

    public bgWith0:number;
    public bgWith1:number;
    public bgWith2:number;

    public tempStartLocation0 = new Vec3();
    public tempStartLocation1 = new Vec3();
    public tempStartLocation2 = new Vec3();

    public gameSpeed:number = 200;

    protected onload() : void {
        this.startUp();
    }

    protected startUp() : void{
      
        // this.tempStartLocation0.x = 480;
        // this.tempStartLocation1.x = 1430;
        // this.tempStartLocation2.x = 2360;
        
        this.bg0.setPosition(480,0,0)
        this.bg1.setPosition(1430,0,0)
        this.bg2.setPosition(2340,0,0)
    }
    
    protected update(deltaTime: number) : void {
        this.tempStartLocation0 = this.bg0.position; // gán vị trí tính toán
        this.tempStartLocation1 = this.bg1.position;
        this.tempStartLocation2 = this.bg2.position;
        
        this.tempStartLocation0.x -= this.gameSpeed * deltaTime; //dịch chuyển bg
        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        
        if(this.tempStartLocation0.x <= -473){ //out of screen
            // console.log('1')
            this.tempStartLocation0.x = 1418;
        }
        
        if(this.tempStartLocation1.x <= -473){
            // console.log('2')
            this.tempStartLocation1.x = 1418;
        }
        if(this.tempStartLocation2.x <= -473){
            // console.log('3')
            this.tempStartLocation2.x = 1418;
        }

        this.bg0.setPosition(this.tempStartLocation0);
        this.bg1.setPosition(this.tempStartLocation1);
        this.bg2.setPosition(this.tempStartLocation2);
    }
}

// if(this.tempStartLocation0.x <= -473){
//     this.tempStartLocation0.x = 2360;
// }

// if(this.tempStartLocation1.x <= -472){
//     this.tempStartLocation1.x = 2360;
// }

// if(this.tempStartLocation2.x <= -472){
//     this.tempStartLocation2.x = 2360;
// }

// this.bg0.setPosition(this.tempStartLocation0);
// this.bg1.setPosition(this.tempStartLocation1);
// this.bg1.setPosition(this.tempStartLocation2);

