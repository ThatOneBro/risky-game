import { Application, Graphics } from 'pixi.js';
import { GameState, deepCompareState } from './game';
import { randomInt } from './util';

export const TILE_SIZE = 40;

export enum Color {
  UNOCCUPIED = 0x242424,
  PURPLE = 0x650a5a,
  GREEN = 0x00cc66,
}
const NUM_COLORS = 2;

export function getRandomColor() {
  switch (randomInt(1, NUM_COLORS)) {
    case 1:
      return Color.PURPLE;
    case 2:
      return Color.GREEN;
    default:
      return Color.UNOCCUPIED;
  }
}

export class Renderer {
  app: Application;
  graphics: Graphics;
  prevState: GameState | null;

  constructor(app: Application) {
    this.app = app;
    this.graphics = new Graphics();
    this.prevState = null;
    app.stage.addChild(this.graphics);
  }

  render(state: GameState): void {
    maybeRender(this.graphics, this.prevState, state);
    this.prevState = state;
  }
}

function maybeRender(graphics: Graphics, prevState: GameState | null, state: GameState): void {
  if (prevState && deepCompareState(prevState, state)) {
    return;
  }
  rerender(graphics, state);
}

function rerender(graphics: Graphics, state: GameState) {
  for (let i = 0; i < state.tiles.length; i++) {
    for (let j = 0; j < state.tiles[0].length; j++) {
      const tile = state.tiles[i][j];
      graphics.rect(TILE_SIZE * i, TILE_SIZE * j, TILE_SIZE, TILE_SIZE);
      graphics.fill(tile.occupant?.color ?? Color.UNOCCUPIED);
      graphics.stroke({ width: 2, color: 0xfeeb77 });
    }
  }
}
