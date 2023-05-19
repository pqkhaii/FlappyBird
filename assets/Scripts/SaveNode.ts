import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SaveNode')
export class SaveNode extends Component {
    public NodeSaveGreen : boolean = false;
    public NodeSaveRed : boolean = false;
 
}

