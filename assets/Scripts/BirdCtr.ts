import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, easing, EventTouch, input, Input, director, sys, game} from 'cc';
import { GameCtr } from './GameCtr';

const { ccclass, property } = _decorator;

@ccclass('BirdCtr')
export class BirdCtr extends Component {

 
    private speed: number = 0;
    public sp : number = 0;

    onLoad(){
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    //bird fly
    birdFly() {
        this.speed -= 0.05; //drop
        this.sp = this.node.position.y;
        this.sp += this.speed;
        this.node.setPosition(this.node.position.x, this.sp, 0);

        var angle = -(this.speed/2) * 30;
        if (angle >= 30){
            angle = 30;
        }
        this.node.angle = -angle;
    }

    onTouchStart (event: EventTouch) {
        this.speed = 2; //fly
    }
}

