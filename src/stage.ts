import { Application } from 'pixi.js';

export async function setupStage(container: HTMLDivElement): Promise<Application> {
  const app = new Application();
  await app.init({ antialias: true, resizeTo: container });
  container.appendChild(app.canvas);
  return app;
}
