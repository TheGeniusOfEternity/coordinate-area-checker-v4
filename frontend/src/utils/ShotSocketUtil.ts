import { apiConf } from "@/api/api.conf.ts";
import type { ShotResponseDto } from "@/api/dto/shots/shot-response.dto.ts";

class ShotSocketUtil {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect() {
    const wsUrl = `${apiConf.endpoint}/ws/shots`;

    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
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
      this.handleReconnect();
    };
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts += 1;
      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  // eslint-disable-next-line no-unused-vars
  onShotAdded?: ((shot: ShotResponseDto) => void) | null;
  // eslint-disable-next-line no-unused-vars
  onShotsSync?: ((shots: ShotResponseDto[]) => void) | null;
}

export const shotSocketUtil = new ShotSocketUtil();
