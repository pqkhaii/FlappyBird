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

    public NodeSaveAll : boolean = false;

    start() {
        // let parameters = new Node('Parameters');
        // let flappyBirdParameters = parameters.addComponent(SaveNode);
        
        // if(this.NodeSaveBlue == true ){
        //     flappyBirdParameters.NodeSaveAll = true;
        // }

        // if(this.NodeSaveRed == true){
        //     flappyBirdParameters.NodeSaveAll = false;
        // }

        // console.log(flappyBirdParameters.NodeSaveAll)

        // director.addPersistRootNode(parameters)
        // // director.loadScene('main')
    }


    onTouchCancel() {

        director.loadScene('main')
    }


}

