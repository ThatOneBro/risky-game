import { Application } from 'pixi.js';
import { Game, generateTiles } from './game.ts';
import { Renderer } from './render.ts';
import './style.css';

(async () => {
  const container = document.querySelector<HTMLDivElement>('#stage') as HTMLDivElement;
  const app = new Application();
  await app.init({ antialias: true, resizeTo: container, preference: 'webgpu' });

  container.appendChild(app.canvas);

  const game = new Game({
    tiles: generateTiles(8, 8),
    players: [
      { id: 0, name: 'Player 1' },
      { id: 1, name: 'Player 2' },
    ],
  });

  const renderer = new Renderer(app);
  mainLoop(game, renderer);
})().catch(console.error);

function mainLoop(game: Game, renderer: Renderer) {
  renderer.render(game);
  requestAnimationFrame(() => mainLoop(game, renderer));
}
