import { Game, generateTiles } from './game.ts';
import { Renderer } from './render.ts';
import { setupStage } from './stage.ts';
import './style.css';

(document.querySelector<HTMLDivElement>('#app') as HTMLDivElement).innerHTML = `
  <div id="stage"></div>
`;

(async () => {
  const app = await setupStage(document.querySelector<HTMLDivElement>('#stage') as HTMLDivElement);

  const game = new Game({
    tiles: generateTiles(20, 20),
    players: [
      { id: 0, name: 'Player 1' },
      { id: 1, name: 'Player 2' },
    ],
  });

  const renderer = new Renderer(app);
  mainLoop(game, renderer);
})().catch(console.error);

function mainLoop(game: Game, renderer: Renderer) {
  game.tick();
  renderer.render(game.getState());
  requestAnimationFrame(() => mainLoop(game, renderer));
}
