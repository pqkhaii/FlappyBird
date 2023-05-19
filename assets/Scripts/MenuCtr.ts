import { _decorator, Color, Component, director, Node, NodeSpace } from 'cc';
import { SaveNode } from './SaveNode';
const { ccclass, property } = _decorator;

@ccclass('MenuCtr')
export class MenuCtr extends Component {

    protected onTouchCancel() : void {
        director.loadScene('main')
    }
}

