import { MediaConnection } from "peerjs";
import { makeAutoObservable } from "mobx";

export type CallType = "IN" | "OUT";
export class VideoChat {
  private dataChannel: MediaConnection;
  private remoteMediaStream?: MediaStream;
  private awaitAnswer = true;
  private type: CallType;
  private ready: boolean = true;
  constructor(channel: MediaConnection, type: CallType) {
    makeAutoObservable(this);
    this.dataChannel = channel;
    this.type = type;
    this.addStreamListener();
  }

  private setVideoStream(stream?: MediaStream) {
    this.remoteMediaStream = stream;
    if (this.type === "OUT" && this.awaitAnswer)
      this.awaitAnswer = !this.awaitAnswer;
  }
  private addStreamListener() {
    this.dataChannel.on("error", (e) => {
      console.log("Error", e);
    });
    this.dataChannel.on("stream", (stream: MediaStream) => {
      this.setVideoStream(stream);
    });
    this.dataChannel.on("close", () => {
      this.setVideoStream();
      this.awaitAnswer = true;
      this.ready = false;
    });
    return this;
  }

  setAwaitAns(val: boolean) {
    this.awaitAnswer = val;
  }
  answer(stream: MediaStream) {
    this.dataChannel.answer(stream);
    this.setAwaitAns(false);
  }

  resetCall() {
    this.dataChannel.close();
  }
  get remoteSrc() {
    return this.dataChannel.remoteStream;
  }

  get localSrc() {
    return this.dataChannel.localStream;
  }

  get callType() {
    return this.type;
  }

  get isAnswered() {
    return !this.awaitAnswer;
  }

  get isReady() {
    return this.ready;
  }
}
