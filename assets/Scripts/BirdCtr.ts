import { _decorator, Component, EventTouch, input, Input} from 'cc';
import { AudioCtr } from './AudioCtr';

const { ccclass, property } = _decorator;

@ccclass('BirdCtr')
export class BirdCtr extends Component {

    @property({
        type: AudioCtr
    })
    private AudioCtr: AudioCtr;

    private speed: number = 0;
    public sp : number = 0;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    public birdFly(): void {
        this.speed -= 0.05;
        this.sp = this.node.position.y;
        this.sp += this.speed;
        
        this.node.setPosition(this.node.position.x, this.sp, 0);

        var angle = -(this.speed/2) * 20;
        
        if (angle >= 20){
            angle = 20;
        }
        
        this.node.angle = -angle;
    }

    protected onTouchStart(event: EventTouch): void {
        this.speed = 2;
        this.AudioCtr.onAudio(0);
    }
}