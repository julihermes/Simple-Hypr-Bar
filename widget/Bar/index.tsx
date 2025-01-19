import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import ToggleAppLauncher from "../AppLauncher/Toggle";
import Workspaces from "./Workspaces";
import FocusedClient from "./FocusedClient";
import SysTray from "./SysTray";
import Time from "./Time";
import ToggleQuickSettings from "../QuickSettings/Toggle";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox>
        <box halign={Gtk.Align.START}>
          <ToggleAppLauncher />
          <Workspaces />
        </box>
        <box>
          <FocusedClient />
        </box>
        <box halign={Gtk.Align.END}>
          <SysTray />
          <Time />
          <ToggleQuickSettings />
        </box>
      </centerbox>
    </window>
  );
}
