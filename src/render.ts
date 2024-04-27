import { Graphics } from 'pixi.js';
import { GameState } from './game';

export function render(graphics: Graphics, state: GameState): void {
  for (let i = 0; i < state.tiles.length - 1; i++) {
    for (let j = 0; j < state.tiles[0].length - 1; j++) {
      graphics.rect(50 * i, 50 * j, 50, 50);
      graphics.fill(0x650a5a);
      graphics.stroke({ width: 2, color: 0xfeeb77 });
    }
  }
}
