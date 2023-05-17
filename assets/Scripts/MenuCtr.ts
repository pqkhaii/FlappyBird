import { _decorator, Color, Component, director, Node, NodeSpace } from 'cc';
import { SaveNode } from './SaveNode';
const { ccclass, property } = _decorator;

@ccclass('MenuCtr')
export class MenuCtr extends Component {
    
    public NodeSaveBlue : boolean = false;
    public NodeSaveRed : boolean = false;

    protected onTouchCancel() {
        director.loadScene('main')
    }


}

