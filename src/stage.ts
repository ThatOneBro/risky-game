import { Application } from 'pixi.js';

export async function setupStage(container: HTMLDivElement): Promise<Application> {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ antialias: true, resizeTo: container });

  // Append the application canvas to the document body
  container.appendChild(app.canvas);

  return app;
}
