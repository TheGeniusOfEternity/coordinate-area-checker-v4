import { apiConf } from "@/api/api.conf.ts";
import type { ShotResponseDto } from "@/api/dto/shots/shot-response.dto.ts";

export interface Shot {
  id: string;
  x: number;
  y: number;
  r: number;
  userId: string;
  timestamp: number;
}

class ShotSocketUtil {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect() {
    const wsUrl = `${apiConf.endpoint}/ws/shots`;

    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "shots:sync") {
        this.onShotsSync?.(data.shots);
      } else if (data.type === "shot:added") {
        this.onShotAdded?.(data.shot);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts += 1;
      setTimeout(() => {
        console.log(
          `Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
        );
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  // Callbacks для событий
  // eslint-disable-next-line no-unused-vars
  onShotAdded?: ((shot: ShotResponseDto) => void) | null;
  // eslint-disable-next-line no-unused-vars
  onShotsSync?: ((shots: ShotResponseDto[]) => void) | null;
}

export const shotSocketUtil = new ShotSocketUtil();
