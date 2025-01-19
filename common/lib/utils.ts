import { App } from "astal/gtk3";

export function toggleWindow(name: string, app: any = App) {
  app.toggle_window(name);
}
