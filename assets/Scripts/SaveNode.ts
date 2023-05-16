import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SaveNode')
export class SaveNode extends Component {
    public NodeSaveBlue : boolean = false;
    public NodeSaveRed : boolean = false;

    public test:number = 1;

    onTouchBtnRed() {
        // this.SaveNode.getComponent(SaveNode).NodeSaveBlue = this.SaveNode.NodeSaveBlue;
        // this.SaveNode.getComponent(SaveNode).NodeSaveRed = this.SaveNode.NodeSaveRed;
        this.NodeSaveRed = true;
        this.NodeSaveBlue = false;
    }

    onTouchBtnBlue() {
        // this.SaveNode.getComponent(SaveNode).NodeSaveBlue = this.SaveNode.NodeSaveBlue;
        // this.SaveNode.getComponent(SaveNode).NodeSaveRed = this.SaveNode.NodeSaveRed;
        this.NodeSaveBlue = true;
        this.NodeSaveRed = false;
    }
}

