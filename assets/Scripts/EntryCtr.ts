import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EntryCtr')
export class EntryCtr extends Component {
    private sceneMenu: string = 'menu';

    protected onTouchStart(): void {
        director.loadScene(this.sceneMenu)
    }
}


