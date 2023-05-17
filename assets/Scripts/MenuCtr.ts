import { _decorator, Color, Component, director, Node, NodeSpace } from 'cc';
import { SaveNode } from './SaveNode';
const { ccclass, property } = _decorator;

@ccclass('MenuCtr')
export class MenuCtr extends Component {

    // @property({
    //     type: SaveNode
    // })
    // private SaveNode : SaveNode;
    
    public NodeSaveBlue : boolean = false;
    public NodeSaveRed : boolean = false;

    start() {
        let parameters = new Node('Parameters');
        let flappyBirdParameters = parameters.addComponent(SaveNode);
        flappyBirdParameters.NodeSaveBlue = true;
        flappyBirdParameters.test = 2


        director.addPersistRootNode(parameters)
        // director.loadScene('main')
    }

    onTouchBtnRed() {
        // this.SaveNode.getComponent(SaveNode).NodeSaveBlue = this.SaveNode.NodeSaveBlue;
        // this.SaveNode.getComponent(SaveNode).NodeSaveRed = this.SaveNode.NodeSaveRed;
        this.NodeSaveRed = true;
        this.NodeSaveBlue = false;
        // director.loadScene('main')
    }

    onTouchBtnBlue() {
        // this.SaveNode.getComponent(SaveNode).NodeSaveBlue = this.SaveNode.NodeSaveBlue;
        // this.SaveNode.getComponent(SaveNode).NodeSaveRed = this.SaveNode.NodeSaveRed;
        this.NodeSaveBlue = true;
        this.NodeSaveRed = false;
        // director.loadScene('main')
    }

    

    onTouchCancel() {

        director.loadScene('main')
    }


}

