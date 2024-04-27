import { Graphics } from 'pixi.js';
import { generateTiles, initGame, runGameLoop } from './game.ts';
import { render } from './render.ts';
import { setupStage } from './stage.ts';
import './style.css';

(document.querySelector<HTMLDivElement>('#app') as HTMLDivElement).innerHTML = `
  <div id="stage"></div>
`;

(async () => {
  const app = await setupStage(document.querySelector<HTMLDivElement>('#stage') as HTMLDivElement);
  initGame({
    tiles: generateTiles(20, 20),
    players: [
      { id: 0, name: 'Player 1' },
      { id: 1, name: 'Player 2' },
    ],
  });

  const graphics = new Graphics();
  app.stage.addChild(graphics);

  mainLoop(graphics);
})().catch(console.error);

function mainLoop(graphics: Graphics) {
  const state = runGameLoop();
  render(graphics, state);
  requestAnimationFrame(() => mainLoop(graphics));
}
