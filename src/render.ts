import { Application, Graphics, Text, TextOptions } from 'pixi.js';
import { GameState, Tile, deepCompareState } from './game';
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
  tileText: Map<Tile, Text>;

  constructor(app: Application) {
    this.app = app;
    this.graphics = new Graphics();
    this.prevState = null;
    this.tileText = new Map();

    app.stage.addChild(this.graphics);
  }

  render(state: GameState): void {
    const { prevState } = this;
    if (prevState && deepCompareState(prevState, state)) {
      return;
    }
    this.rerender(state);
    this.prevState = state;
  }

  private rerender(state: GameState): void {
    const { app, graphics, tileText } = this;

    graphics.clear();
    for (let i = 0; i < state.tiles.length; i++) {
      for (let j = 0; j < state.tiles[0].length; j++) {
        const tile = state.tiles[i][j];
        graphics
          .rect(TILE_SIZE * i, TILE_SIZE * j, TILE_SIZE, TILE_SIZE)
          .fill(tile.occupant?.color ?? Color.UNOCCUPIED)
          .stroke({ width: 2, color: 0xfeeb77 });

        if (tile.troopCount) {
          console.log(tile);
          const oldText = tileText.get(tile);
          if (oldText) {
            app.stage.removeChild(oldText);
          }
          const text = new Text({
            text: tile.troopCount.toString(),
            style: {
              fontSize: 24,
              fill: 0xffffff,
              align: 'center',
            },
          } satisfies TextOptions);
          app.stage.addChild(text);
          text.x = TILE_SIZE * i + TILE_SIZE / 3;
          text.y = TILE_SIZE * j + TILE_SIZE / 5.5;
        }
      }
    }
  }
}
