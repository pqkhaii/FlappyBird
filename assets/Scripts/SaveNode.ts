import { _decorator, Component} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SaveNode')
export class SaveNode extends Component {
    public NodeBird : boolean = false;
    public NodeBird2 : boolean = false;
}