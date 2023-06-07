import { DataConnection } from "peerjs";
import { makeAutoObservable } from "mobx";

type Status = "START" | "GAME" | "RESULT" | "REPEAT"; // start->game->result->game
export type Score = {
  win: number;
  loss: number;
  draw: number;
};
type Result = "draw" | "win" | "loss";
type GameResult = {
  [x in Item]: {
    [y in Item]: Result;
  };
};

const gameInfo: GameResult = {
  paper: {
    paper: "draw",
    rock: "win",
    scissors: "loss",
  },
  rock: {
    paper: "loss",
    rock: "draw",
    scissors: "win",
  },
  scissors: {
    paper: "win",
    rock: "loss",
    scissors: "draw",
  },
};
const items = ["paper", "rock", "scissors"] as const;
export type Item = (typeof items)[number];

export class Game {
  private dataChannel: DataConnection;
  private p1: Player;
  private p2: Player;

  constructor(channel: DataConnection) {
    makeAutoObservable(this);
    this.dataChannel = channel;
    this.p1 = new Player(channel, true);
    this.p2 = new Player(channel, false);
  }

  startGame() {
    this.p1.startGame();
  }

  sendStep(item: Item) {
    this.p1.sendStep(item);
  }

  repeatGame() {
    this.p1.repeatGame();
    this.p2.resetStep();
  }

  get isNotStarted() {
    return this.p1.status === "START";
  }
  get isStarted() {
    return (
      (this.p1.status === "GAME" && this.p2.status === "GAME") ||
      (this.p1.status === "RESULT" && this.p2.status === "GAME") ||
      (this.p1.status === "GAME" && this.p2.status === "RESULT")
    );
  }

  get isFinished() {
    return (
      (this.p1.status === "RESULT" && this.p2.status === "RESULT") ||
      (this.p1.status === "RESULT" && this.p2.status === "START")
    );
  }

  get result() {
    if (this.p1.selectedItem && this.p2.selectedItem)
      return gameInfo[this.p1.selectedItem][this.p2.selectedItem];
    return undefined;
  }
  get awaitP2Start() {
    return (
      (this.p1.status === "GAME" && this.p2.status === "START") ||
      (this.p1.status === "START" && this.p2.status === "RESULT")
    );
  }

  get yourStep() {
    return this.p1.selectedItem;
  }

  get opponentStep() {
    return this.p2.selectedItem;
  }
}

export class Player {
  private dataChannel: DataConnection;
  private statusValue: Status = "START";

  private item?: Item;
  constructor(channel: DataConnection, isLocal: boolean) {
    makeAutoObservable(this);
    this.dataChannel = channel;
    if (!isLocal) {
      this.dataChannel.on("data", (data: unknown) => {
        console.log("DATA:", data);
        const dataParsed = JSON.parse(data as string);
        if (dataParsed.type === "game" && dataParsed.action === "start") {
          this.setStatus("GAME");
          this.item = undefined;
        }
        if (dataParsed.type === "game" && dataParsed.action === "item") {
          this.setItem(dataParsed.element);
          this.setStatus("RESULT");
        }
        if (dataParsed.type === "game" && dataParsed.action === "repeat") {
          this.setStatus("START");
          this.item = undefined;
        }
      });
    }
  }

  private setStatus(val: Status) {
    this.statusValue = val;
  }
  get status() {
    return this.statusValue;
  }
  startGame() {
    this.dataChannel.send(JSON.stringify({ type: "game", action: "start" }));
    this.setStatus("GAME");
  }

  sendStep(type: Item) {
    this.dataChannel.send(
      JSON.stringify({ type: "game", action: "item", element: type })
    );
    this.setItem(type);
    this.setStatus("RESULT");
  }

  repeatGame() {
    this.dataChannel.send(JSON.stringify({ type: "game", action: "repeat" }));
    this.setStatus("START");
    this.resetStep();
  }

  get selectedItem() {
    return this.item;
  }

  resetStep() {
    this.item = undefined;
  }
  setItem(item: Item) {
    this.item = item;
  }
}
