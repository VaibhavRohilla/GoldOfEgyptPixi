import { io } from "socket.io-client";
import { Globals, ResultData, initData } from "./scripts/Globals";

function getToken() {
  let cookieArr = document.cookie.split("; ");
  for(let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if('token' === cookiePair[0]) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}

// Usage example
let token = getToken();
if(token!== null) {
  console.log("Token:", token);
} else {
  console.log("Token not found");
}

const authToken = token;

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdiIsImRlc2lnbmF0aW9uIjoiY29tcGFueSIsImlhdCI6MTcxODQ0ODE3MywiZXhwIjoxNzE5MDUyOTczfQ.ERbN8pla0bYN8Lk7Dq_GLuNY6OI_KZrtIqpfFSziaDU";
const socketUrl = "http://localhost:5000";
export class SocketManager {
  private socket;

  constructor(private onInitDataReceived: () => void) { 
    this.socket = io(socketUrl, {
      auth: {
        token: authToken,
      },
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.socket.on("connect_error", (error: Error) => {
      console.error("Connection Error:", error.message);
    });

    this.socket.on("connect", () => {
      console.log("Connected to the server");

      this.socket.emit(
        "AUTH",
        JSON.stringify({
          id: "AUTH",
          Data: {
            GameID: "SL-VIK",
          },
        })
      );

      this.socket.on("message", (message) => {
        const data = JSON.parse(message);
        console.log(`Message ID : ${data.id} |||||| Message Data : ${JSON.stringify(data.message)}`);
        if(data.id == "InitData")
          {
            this.onInitDataReceived();
            initData.gameData = data.message.GameData;
            initData.playerData = data.message.PlayerData;
            console.log(initData);
          }
          if(data.id == "ResultData")
            {
              ResultData.gameData = data.message.GameData;
              ResultData.playerData = data.message.PlayerData;
              console.log(ResultData);
              Globals.emitter?.Call("ResultData");
            }
      });
    });

    this.socket.on("internalError", (errorMessage: string) => {
      console.log(errorMessage);
    });
  }


 // Add this method to the SocketManager class in socket.ts

authenticate(): Promise<void> {
    return new Promise((resolve, reject) => {
        this.socket.on("connect", () => {
            console.log("Connected to the server");

            this.socket.emit(
                "AUTH",
                JSON.stringify({
                    id: "AUTH",
                    Data: {
                        GameID: "SL-GF",
                    },
                })
            );

        });
    });
}
  messages(message: any) {
    console.log(message);
  }
  sendMessage(id : string, message: any) {
    this.socket.emit(
      "message",
      JSON.stringify({ id: id, data: message })
    );
  }

}

