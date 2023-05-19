import { _decorator, Color, Component, director, find, Node } from 'cc';
import { SaveNode } from './SaveNode';
const { ccclass, property } = _decorator;

@ccclass('MenuCtr')
export class MenuCtr extends Component {
    public NodeSaveGreen : boolean = false;
    public NodeSaveRed : boolean = false;

    protected start(): void {

    }

    protected onTouchBtnRed() : void {
        this.NodeSaveRed = true;
        if (find('colorNode') == undefined) {
            let parameters = new Node('colorNode');
            director.addPersistRootNode(parameters);
            let colorParams = parameters.addComponent(SaveNode);
            colorParams.NodeSaveRed = this.NodeSaveRed;
            colorParams.NodeSaveGreen = this.NodeSaveGreen;
        }
        else {
            let colorParams = find('colorNode').getComponent(SaveNode);
            colorParams.NodeSaveRed = this.NodeSaveRed;
            colorParams.NodeSaveGreen = this.NodeSaveGreen;
        }
    }

    protected onTouchBtnGreen() : void {
        this.NodeSaveGreen = true;
        if (find('colorNode') == undefined) {
            let parameters = new Node('colorNode');
            director.addPersistRootNode(parameters);
            let colorParams = parameters.addComponent(SaveNode);
            colorParams.NodeSaveRed = this.NodeSaveRed;
            colorParams.NodeSaveGreen = this.NodeSaveGreen;
        }
        else {
            let colorParams = find('colorNode').getComponent(SaveNode);
            colorParams.NodeSaveRed = this.NodeSaveRed;
            colorParams.NodeSaveGreen = this.NodeSaveGreen;
        }
    }

    protected onTouchCancel() : void {
        
        director.loadScene('main')
    }

    
}

