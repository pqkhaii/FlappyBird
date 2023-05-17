import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SaveNode')
export class SaveNode extends Component {
    public NodeSaveBlue : boolean = false;
    public NodeSaveRed : boolean = false;

    onTouchBtnRed() {
        this.NodeSaveRed = true;
        this.NodeSaveBlue = false;
        director.addPersistRootNode(this.node)
        director.loadScene('main')
    }

    onTouchBtnBlue() {
        this.NodeSaveBlue = true;
        this.NodeSaveRed = false;
        director.addPersistRootNode(this.node)
        director.loadScene('main')
    }

}

