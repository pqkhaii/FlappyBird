import { _decorator, Color, Component, director, find, Node } from 'cc';
import { SaveNode } from './SaveNode';
const { ccclass, property } = _decorator;

@ccclass('MenuCtr')
export class MenuCtr extends Component {
    public NodeBird: boolean = false;
    public NodeBird2: boolean = false;

    private sceneMain: string = 'main';
    private MyNode: string = 'MyNode';

    protected onTouchBtnBird(): void {
        this.NodeBird = true;

        if(!find(this.MyNode)){
            let parameters = new Node(this.MyNode);
            director.addPersistRootNode(parameters);

            let colorParams = parameters.addComponent(SaveNode);

            colorParams.NodeBird2 = this.NodeBird2;
            colorParams.NodeBird = this.NodeBird;
        }

        else{
            let colorParams = find(this.MyNode).getComponent(SaveNode);

            colorParams.NodeBird2 = this.NodeBird2;
            colorParams.NodeBird = this.NodeBird;
        }

        director.loadScene(this.sceneMain);
    }

    protected onTouchBtnBird2(): void {
        this.NodeBird2 = true;

        if (!find(this.MyNode)) {
            let parameters = new Node(this.MyNode);
            director.addPersistRootNode(parameters);

            let colorParams = parameters.addComponent(SaveNode);

            colorParams.NodeBird2 = this.NodeBird2;
            colorParams.NodeBird = this.NodeBird;
        }

        else {
            let colorParams = find(this.MyNode).getComponent(SaveNode);

            colorParams.NodeBird2 = this.NodeBird2;
            colorParams.NodeBird = this.NodeBird;
        }
        
        director.loadScene(this.sceneMain);
    }
}

