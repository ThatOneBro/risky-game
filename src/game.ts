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
}

export type PlayerInit = { id: number; name?: string };

export class Player {
  id: number;
  name: string;

  constructor(init: PlayerInit) {
    const { id, name } = init;
    this.id = id;
    this.name = name ?? `Player ${id}`;
  }
}

export type GameInit = { tiles: Tile[][]; players: PlayerInit[] };

export class GameState {
  tiles: Tile[][];
  players: Player[];

  constructor(init: GameInit) {
    this.tiles = init.tiles ?? generateTiles(10, 5);
    this.players = init.players.map((playerInit) => new Player(playerInit));
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

export class Game {
  private state: GameState;
  constructor(init: GameInit) {
    this.state = new GameState(init);
  }
  tick(): void {
    this.state = runSystems(this.state);
  }
  getState(): GameState {
    return this.state;
  }
}

function runSystems(game: GameState): GameState {
  // Increase troop count on next turn
  return game;
}

export function getTileByPosition(game: GameState, position: Vec2): Tile {
  return game.tiles[position.x][position.y];
}

export function deepCompareState(state1: GameState, state2: GameState): boolean {
  return JSON.stringify(state1) === JSON.stringify(state2);
}
