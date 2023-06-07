import { DataConnection } from "peerjs";
import { action, computed, makeAutoObservable } from "mobx";
export type Message = {
  text: string;
  createdAt: Date;
  type: "Input" | "Output";
};

type MessageDTO = {
  type: "message";
  data: string;
};

function isMessageDTO(obj: Record<string, unknown>): obj is MessageDTO {
  return typeof obj.data === "string" && obj.type === "message";
}

export class Chat {
  private dataChannel: DataConnection;
  private messageList: Message[] = [];
  constructor(channel: DataConnection) {
    makeAutoObservable(this);
    this.dataChannel = channel;
    this.addDataListener();
  }

  private addDataListener() {
    this.dataChannel.on("data", (e: unknown) => {
      if (typeof e === "string") {
        const message = JSON.parse(e);
        console.log("isMessageDTO(message)", isMessageDTO(message));
        if (isMessageDTO(message)) {
          this.addMessage({
            type: "Input",
            text: message.data,
            createdAt: new Date(),
          });
        }
      }
    });
    return this;
  }

  @action
  addMessage(message: Message) {
    this.messageList.push(message);
  }
  sendMessage(message: string) {
    const data: MessageDTO = {
      type: "message",
      data: message,
    };
    this.dataChannel.send(JSON.stringify(data));
    this.addMessage({
      type: "Output",
      text: message,
      createdAt: new Date(),
    });
  }

  @computed
  get messages() {
    return this.messageList;
  }
}
