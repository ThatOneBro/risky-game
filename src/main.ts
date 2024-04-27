import { setupCounter } from './counter.ts';
import './style.css';

(document.querySelector<HTMLDivElement>('#app') as HTMLDivElement).innerHTML = `
  <div>
    <h1>Pixi</h1>
    <div class="stage"></div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter') as HTMLButtonElement);
