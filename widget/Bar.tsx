import { GLib, Variable, bind } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import Applauncher from "./Applauncher";
import Hyprland from "gi://AstalHyprland";

function Workspaces() {
  const hypr = Hyprland.get_default();

  return (
    <box className="Workspaces">
      {bind(hypr, "workspaces").as((wss) =>
        wss
          .filter((ws) => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              className={bind(hypr, "focusedWorkspace").as((fw) =>
                ws === fw ? "focused" : "",
              )}
              onClicked={() => ws.focus()}
            >
              {ws.id}
            </button>
          )),
      )}
    </box>
  );
}

function FocusedClient() {
  const hypr = Hyprland.get_default();
  const focused = bind(hypr, "focusedClient");

  return (
    <box className="Focused" visible={focused.as(Boolean)}>
      {focused.as(
        (client) =>
          client && <label label={bind(client, "title").as(String)} />,
      )}
    </box>
  );
}

function Time({ format = "%X" }) {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(format)!,
  );

  return (
    <label className="Time" onDestroy={() => time.drop()} label={time()} />
  );
}

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
          <button onClick={Applauncher}>󰣇</button>
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
