import { apiConf } from "@/api/api.conf.ts";
import type { ShotResponseDto } from "@/api/dto/shots/shot-response.dto.ts";

class ShotSocketUtil {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private closedManually: boolean = false;
  private token = "";

  setToken(token: string) {
    this.token = token;
  }

  connect() {
    this.disconnect();

    const wsUrl = `${apiConf.endpoint}/ws/shots?token=${this.token}`;

    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      this.closedManually = false;
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
      if (!this.closedManually) {
        this.handleReconnect();
      }
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
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.closedManually = true;
      this.socket.close();
      this.socket = null;
    }
  }

  // eslint-disable-next-line no-unused-vars
  onShotAdded?: ((shot: ShotResponseDto) => void) | null;
  // eslint-disable-next-line no-unused-vars
  onShotsSync?: ((shots: ShotResponseDto[]) => void) | null;
}

export const shotSocketUtil = new ShotSocketUtil();
