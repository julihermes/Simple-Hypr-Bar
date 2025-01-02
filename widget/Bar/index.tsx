import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import ToggleAppLauncher from "../AppLauncher/Toggle";
import Workspaces from "./Workspaces";
import FocusedClient from "./FocusedClient";
import Wifi from "./Wifi";
import Time from "./Time";
import Audio from "./Audio";
import Battery from "./Battery";
import SysTray from "./SysTray";

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
          <Wifi />
          <Audio />
          <Battery />
          <Time />
        </box>
      </centerbox>
    </window>
  );
}
