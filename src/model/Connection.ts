import { DataConnection, MediaConnection, Peer } from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable } from "mobx";
import { Chat } from "./Chat";
import { CallType, VideoChat } from "./VideoChat";
import { Game } from "./Game";
export type IsNullable<T> = T | null;
export type PeerStatus =
  | "DEFAULT"
  | "OPEN"
  | "FAIL"
  | "DISCONNECT"
  | "CLOSE"
  | "CALL"
  | "CONNECT";
export class Connection {
  private readonly connection?: Peer;
  private status: PeerStatus = "DEFAULT";
  private dataChannel: IsNullable<DataConnection> = null;
  private chatObj: IsNullable<Chat> = null;
  private videoObj: IsNullable<VideoChat> = null;
  private gameObj: IsNullable<Game> = null;
  constructor() {
    makeAutoObservable(this);
    this.connection = new Peer(uuidv4(), { debug: 0 });
    this.addErrorListener()
      .addOpenListener()
      .addDisconnectedListener()
      .addCloseListener()
      .addCallListener()
      .addConnectionListener();
  }
  disconnect() {
    this.peer?.destroy();
  }
  private addErrorListener() {
    this.connection?.on("error", (e) => {
      console.log(e);
      this.status = "FAIL";
      console.log("Error");
    });
    return this;
  }

  private setDataChannel(e: DataConnection | null) {
    this.dataChannel = e;
    this.dataChannel?.on("iceStateChanged", () => {
      console.log("iceStateChanged");
    });
    this.dataChannel?.on("close", () => {
      console.log("close dc");
    });
    this.dataChannel?.on("error", () => {
      console.log("error dc");
    });
  }
  private updateStatus(status: PeerStatus) {
    this.status = status;
  }
  private addConnectionListener() {
    this.connection?.on("connection", (e: DataConnection) => {
      console.log("connection");
      this.updateStatus("CONNECT");
      if (!this.dataChannel) {
        this.setDataChannel(e);
        this.gameObj = new Game(e);
        this.chatObj = new Chat(e);
      } else e.close();
    });
    return this;
  }

  private addCallListener() {
    this.connection?.on("call", (call) => {
      this.updateStatus("CALL");
      this.setVideoObj(call, "IN");
      console.log("call");
    });
    return this;
  }

  private addOpenListener() {
    this.connection?.on("open", () => {
      this.updateStatus("OPEN");
      console.log("open");
    });
    return this;
  }

  private addCloseListener() {
    this.connection?.on("close", () => {
      this.updateStatus("CLOSE");
      console.log("close");
    });
    return this;
  }
  private addDisconnectedListener() {
    this.connection?.on("disconnected", () => {
      this.updateStatus("DISCONNECT");
      console.log("disconnected");
    });
    return this;
  }

  addConnection(id: string, connectionName?: string) {
    if (this.connection) {
      console.log("ADD CONNECTION");
      const dataChannel = this.connection.connect(id, {
        label: connectionName,
      });
      this.setDataChannel(dataChannel);

      this.chatObj = new Chat(dataChannel);
      this.gameObj = new Game(dataChannel);
    }
  }
  setVideoObj(call: MediaConnection, type: CallType) {
    this.videoObj = new VideoChat(call, type);
  }
  addCall(id: string, stream: MediaStream) {
    const call = this.peer?.call(id, stream);
    if (call) this.setVideoObj(call, "OUT");
  }
  get currentStatus() {
    return this.status;
  }
  get id() {
    return this.connection?.id;
  }
  get peer() {
    return this.connection;
  }

  get channel() {
    return this.dataChannel;
  }

  get chat() {
    return this.chatObj;
  }
  get videoChat() {
    return this.videoObj;
  }

  get game() {
    return this.gameObj;
  }
}
