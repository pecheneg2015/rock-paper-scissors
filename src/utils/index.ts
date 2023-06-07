import { v4 as uuidv4 } from "uuid";
import { Peer } from "peerjs";

export const generatePeerConnection = () => {
  // return new Peer(uuidv4(), { debug: 0 });
  return new Peer(uuidv4(), { debug: 0 });
};
