import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { WindowProps } from "astal/gtk3/widget";

export interface PopupWindowProps extends WindowProps {
  name: string;
  halign?: Gtk.Align;
  valign?: Gtk.Align;
}

export default function PopupWindow({
  name,
  halign = Gtk.Align.END,
  valign = Gtk.Align.START,
  application = App,
  visible = false,
  ...props
}: PopupWindowProps) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;
  return (
    <window
      name={name}
      className={`popup-window ${name} ${props.className}`}
      application={application}
      visible={visible}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      exclusivity={Astal.Exclusivity.IGNORE}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.ON_DEMAND}
      {...props}
      onKeyPressEvent={(self, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape)
          App.toggle_window(self.name);
      }}
      onButtonPressEvent={(self, e) => App.toggle_window(self.name)}
    >
      <eventbox
        onButtonPressEvent={(_, e) => true}
        halign={halign}
        valign={valign}
      >
        {props.child}
      </eventbox>
    </window>
  );
}
