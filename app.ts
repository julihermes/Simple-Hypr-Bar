import { App } from "astal/gtk3";
import style from "./style.scss";
import AppLauncher from "./widget/AppLauncher";
import QuickSettings from "./widget/QuickSettings";
import Bar from "./widget/Bar";

App.start({
  css: style,
  main() {
    AppLauncher();
    QuickSettings();
    App.get_monitors().map(Bar);
  },
});
