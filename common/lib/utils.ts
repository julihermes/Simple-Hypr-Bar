import { App } from "astal/gtk3";

export function toggleWindow(name: string, app = App) {
  app.toggle_window(name);
}
