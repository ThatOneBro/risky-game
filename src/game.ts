import { Color, getRandomColor } from './render';
import { randomInt } from './util';

export const STARTING_TROOPS = 2;
export const GROWTH_PERCENTAGE = 0.1;

export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export type TileInit = {
  position: Vec2;
  troopCount?: number;
  occupant?: Player;
};

export class Tile {
  position: Vec2;
  troopCount = 0;
  occupant: Player | null;

  constructor(init: TileInit) {
    const { position, troopCount, occupant } = init;
    this.position = position;
    this.troopCount = troopCount ?? 0;
    this.occupant = occupant ?? null;
  }

  isOccupied(): boolean {
    return !!this.occupant;
  }
}

export type PlayerInit = { id: number; name?: string; color: Color };

export class Player {
  id: number;
  name: string;
  color: Color;

  constructor(init: PlayerInit) {
    const { id, name } = init;
    this.id = id;
    this.name = name ?? `Player ${id}`;
    this.color = init.color;
  }
}

export type GameInit = { tiles: Tile[][]; players: (Partial<PlayerInit> & { id: number })[]; round?: number };

export class Game {
  tiles: Tile[][];
  assignedColors: Set<Color>;
  players: Player[];
  round: number;
  playerTurnsRemaining: Player[];

  occupied: Set<Tile>;

  state = 0;

  constructor(init: GameInit) {
    this.tiles = init.tiles ?? generateTiles(10, 5);
    this.assignedColors = new Set();
    this.players = init.players.map((playerInit) => new Player({ ...playerInit, color: this.assignColor() }));
    this.round = 0;
    this.playerTurnsRemaining = [];

    this.occupied = new Set();

    for (const player of this.players) {
      let randomTile: Tile;
      do {
        randomTile = this.getRandomTile();
      } while (randomTile.isOccupied());

      randomTile.occupant = player;
      randomTile.troopCount += STARTING_TROOPS;
      this.occupied.add(randomTile);
    }

    this.maybeStartNewRound();
  }

  private assignColor(): Color {
    const { assignedColors } = this;

    let randomColor: Color;
    do {
      randomColor = getRandomColor();
    } while (assignedColors.has(randomColor));

    assignedColors.add(randomColor);
    return randomColor;
  }

  getRandomTile(): Tile {
    const tiles = this.tiles;
    const randomX = randomInt(0, tiles.length - 1);
    const randomY = randomInt(0, tiles[0].length - 1);
    return tiles[randomX][randomY];
  }

  getTileByPosition(x: number, y: number): Tile {
    const tiles = this.tiles;
    if (x < 0 || x >= tiles.length || y < 0 || y >= tiles[0].length) {
      throw new Error(`${x},${y} in out of bounds!`);
    }
    return tiles[x][y];
  }

  private maybeStartNewRound(): void {
    if (this.playerTurnsRemaining.length) {
      return;
    }
    this.playerTurnsRemaining.push(...this.players);
    this.round++;
    for (const tile of this.occupied) {
      tile.troopCount += Math.ceil(tile.troopCount * GROWTH_PERCENTAGE);
    }
  }

  peekNextPlayerTurn(): Player {
    if (!this.playerTurnsRemaining.length) {
      throw new Error('No player currently taking a turn!');
    }
    return this.playerTurnsRemaining[0];
  }

  completePlayerTurn(): Player {
    if (!this.playerTurnsRemaining.length) {
      throw new Error('No player currently taking a turn!');
    }
    const player = this.playerTurnsRemaining.shift() as Player;
    this.maybeStartNewRound();
    this.state += 1;
    return player;
  }
}

export function generateTiles(x: number, y: number, defaultTileState?: TileInit): Tile[][] {
  const tiles = [] as Tile[][];
  for (let i = 0; i < x; i++) {
    const row = [];
    for (let j = 0; j < y; j++) {
      row[j] = new Tile({ ...defaultTileState, position: new Vec2(i, j) });
    }
    tiles[i] = row;
  }
  return tiles;
}
