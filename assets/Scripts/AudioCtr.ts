import { _decorator, assert, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioCtr')
export class AudioCtr extends Component {
    @property({
        type: AudioSource
    })
    private audioSource: AudioSource = null;

    @property({
        type: [AudioClip]
    })
    private clips: AudioClip[] = [];

    @property({
        type: Node
    })
    public btnOnAudio: Node = null;

    @property({
        type: Node
    })
    public btnOffAudio: Node = null;

    protected onLoad(): void {
        const _audioSource = this.audioSource.node.getComponent(AudioSource!);
        this.audioSource = _audioSource;

        this.btnOffAudio.active = false;
    }

    public onAudio(index: number): void {
        let clip: AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }

    public playAudio(): void {
        this.audioSource.volume = 1;

        this.btnOffAudio.active = false;
        this.btnOnAudio.active = true;
    }

    public pauseAudio(): void {
        this.audioSource.volume = 0;

        this.btnOnAudio.active = false;
        this.btnOffAudio.active = true;
    }
}

