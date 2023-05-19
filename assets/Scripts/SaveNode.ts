import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SaveNode')
export class SaveNode extends Component {
    public NodeSaveGreen : boolean = false;
    public NodeSaveRed : boolean = false;

    protected onTouchBtnRed() : void {
        this.NodeSaveRed = true;
        this.NodeSaveGreen = false;

        director.addPersistRootNode(this.node);
        // console.log("red");

        director.loadScene('main');
    }

    protected onTouchBtnGreen() : void {
        this.NodeSaveGreen = true;
        this.NodeSaveRed = false;

        director.addPersistRootNode(this.node);
        // console.log("green");

        director.loadScene('main');
    }
}

