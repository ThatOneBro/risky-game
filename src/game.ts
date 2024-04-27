export type Vec2 = {
  x: number;
  y: number;
};

export type Tile = {
  position: Vec2;
  troopCount: number;
};

export type TileState = Tile & { position: never };

export type Player = {
  id: number;
  name?: string;
};

export type GameState = {
  tiles: Tile[][];
};

export type GameInit = Partial<GameState> & { players: Player[] };

let game: GameState;

function createTile(tileState: Partial<Tile> & { position: Vec2 }): Tile {
  return { position: tileState?.position, troopCount: tileState?.troopCount ?? 0 };
}

export function generateTiles(x: number, y: number, defaultTileState?: Partial<TileState>): Tile[][] {
  const tiles = [] as Tile[][];

  for (let i = 0; i < x; i++) {
    const row = [];
    for (let j = 0; j < y; j++) {
      row[j] = createTile({ ...defaultTileState, position: { x: i, y: j } });
    }
    tiles[i] = row;
  }

  return tiles;
}

export function getTileByPosition(game: GameState, position: Vec2): Tile {
  return game.tiles[position.x][position.y];
}

function runSystems(game: GameState): GameState {
  // Increase troop count on next turn
  return game;
}

// Consider passing an array of events to apply
export function runGameLoop(): GameState {
  return runSystems(game);
}

export function initGame(init: GameInit): void {
  game = { tiles: init.tiles ?? generateTiles(10, 5) };
}
