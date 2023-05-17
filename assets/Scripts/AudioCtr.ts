import { _decorator, assert, AudioSource, Component, Node, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioCtr')
export class AudioCtr extends Component {
    @property({
        type : AudioSource
    })
    private _audioSource: AudioSource = null;

    @property({
        type : Node
    })
    private btnOnAudio : Node = null;

    @property({
        type : Node
    })
    private btnOffAudio : Node = null;

    protected onLoad() {
        const audioSource = this.node.getComponent(AudioSource) ;

        // Assign the component to the global variable _audioSource
        this._audioSource = audioSource;

        this.btnOnAudio.active = false;
    }

    protected playAudio () {
        // Play the music
        this._audioSource.play();
        this.btnOffAudio.active = true;
        this.btnOnAudio.active = false;
    }

    protected pauseAudio () {
        // Pause the music
        this._audioSource.stop();
        this.btnOnAudio.active = true;
        this.btnOffAudio.active = false;
    }
}

