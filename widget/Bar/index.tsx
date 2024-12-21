import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import ToogleAppLauncher from "../Applauncher/ToogleAppLauncher";
import Workspaces from "./Workspaces";
import FocusedClient from "./FocusedClient";
import Time from "./Time";

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
          <ToogleAppLauncher />
          <Workspaces />
        </box>
        <box>
          <FocusedClient />
        </box>
        <box halign={Gtk.Align.END}>
          <Time />
        </box>
      </centerbox>
    </window>
  );
}
