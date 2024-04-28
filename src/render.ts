import { Application, Graphics, Text, TextOptions } from 'pixi.js';
import { Game, Tile } from './game';
import { randomInt } from './util';

export const TILE_SIZE = 50;

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
  prevState: number;
  tileText: Map<Tile, Text>;

  constructor(app: Application) {
    this.app = app;
    this.graphics = new Graphics();
    this.prevState = -1;
    this.tileText = new Map();

    app.stage.addChild(this.graphics);
  }

  render(game: Game): void {
    const { prevState } = this;
    if (prevState === game.state) {
      return;
    }
    this.rerender(game);
    this.prevState = game.state;
  }

  private rerender(game: Game): void {
    const { app, graphics, tileText } = this;

    graphics.clear();
    for (let i = 0; i < game.tiles.length; i++) {
      for (let j = 0; j < game.tiles[0].length; j++) {
        const tile = game.tiles[i][j];
        graphics
          .rect(TILE_SIZE * i, TILE_SIZE * j, TILE_SIZE, TILE_SIZE)
          .fill(tile.occupant?.color ?? Color.UNOCCUPIED)
          .stroke({ width: 2, color: 0xfeeb77 });

        if (tile.troopCount) {
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
          text.x = TILE_SIZE * i + TILE_SIZE * 0.35;
          text.y = TILE_SIZE * j + TILE_SIZE * 0.25;
        }
      }
    }
  }
}
