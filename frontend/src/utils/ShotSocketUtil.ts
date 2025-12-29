import { apiConf } from "@/api/api.conf.ts";
import type { ShotResponseDto } from "@/api/dto/shots/shot-response.dto.ts";
import type { ShotRequestDto } from "@/api/dto/shots/shot-request.dto.ts";
import { store } from "@/store";
import { setRefreshRequested } from "@/store/slices/authSlice.ts";
import {
  addToQueue,
  removeFromQueue,
  setIsConnected,
} from "@/store/slices/shotSlice.ts";
import { v4 as uuidv4 } from "uuid";

class ShotSocketUtil {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private closedManually: boolean = false;
  private token = "";
  private lastShot: { id: string, data: ShotRequestDto } | null = null;

  setToken(token: string) {
    if (this.token !== token) {
      this.token = token;
    }
  }

  connect() {
    this.disconnect();

    const wsUrl = `${apiConf.endpoint}/ws/shots?token=${this.token}`;

    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      this.closedManually = false;
      this.reconnectAttempts = 0;
      store.dispatch(setIsConnected(true));
      store.getState().shot.queue.forEach((shot) => {
        const success = this.sendShot(shot.data);
        if (success) {
          store.dispatch(removeFromQueue(shot.id));
        }
      });
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === 401) {
        this.disconnect();
        store.dispatch(setRefreshRequested(true));
        if (this.lastShot !== null) {
          store.dispatch(addToQueue(this.lastShot));
        }
      } else if (data.type === "shots:sync") {
        this.onShotsSync?.(data.shots);
      } else if (data.type === "shot:added") {
        if (this.lastShot !== null) {
          store.dispatch(removeFromQueue(this.lastShot.id));
        }
        this.onShotAdded?.(data.shot);
      }
      this.lastShot = null;
    };

    this.socket.onclose = () => {
      if (!this.closedManually) {
        this.handleReconnect();
      }
      store.dispatch(setIsConnected(false));
    };
  }

  sendShot(shot: ShotRequestDto) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          type: "shot:create",
          shot,
        }),
      );
      this.lastShot = {
        id: uuidv4(),
        data: shot,
      };
      return true;
    }
    return false;
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
