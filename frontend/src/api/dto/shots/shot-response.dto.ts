export interface ShotResponseDto {
  id: number;
  userId: number;
  x: number;
  y: number;
  r: number;
  isHit: boolean;
  hitTime: string;
  executionTime: number;
}