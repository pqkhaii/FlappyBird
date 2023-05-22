import { _decorator, assert, AudioClip, AudioSource, Component, Node, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioCtr')
export class AudioCtr extends Component {
    @property({
        type : AudioSource
    })
    private audioSource: AudioSource = null;

    @property({
        type: [AudioClip]
    })
    private clips: AudioClip[] = [];

    @property({
        type: Node
    })
    private btnOnAudio: Node = null;

    @property({
        type : Node
    })
    private btnOffAudio: Node = null;

    protected onLoad(): void {
        const _audioSource = this.audioSource.node.getComponent(AudioSource!);
        this.audioSource = _audioSource;

        this.btnOffAudio.active = false;
    }

    public onAudio(index: number): void {
        let clip: AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }

    protected playAudio(): void {
        this.audioSource.volume = 1;

        this.btnOffAudio.active = false;
        this.btnOnAudio.active = true;
    }

    protected pauseAudio(): void {
        this.audioSource.volume = 0;

        this.btnOnAudio.active = false;
        this.btnOffAudio.active = true;
    }
}

