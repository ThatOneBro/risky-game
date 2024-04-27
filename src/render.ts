import { Application, Graphics } from 'pixi.js';
import { GameState, deepCompareState } from './game';

export enum Color {
  UNOCCUPIED = 0x242424,
  PURPLE = 0x650a5a,
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
  for (let i = 0; i < state.tiles.length - 1; i++) {
    for (let j = 0; j < state.tiles[0].length - 1; j++) {
      graphics.rect(50 * i, 50 * j, 50, 50);
      graphics.fill(Color.PURPLE);
      graphics.stroke({ width: 2, color: 0xfeeb77 });
    }
  }
}
