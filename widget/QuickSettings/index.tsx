import Apps from "gi://AstalApps";
import { Gtk } from "astal/gtk3";
import { Variable } from "astal";
import PopupWindow from "../../common/widget/PopupWindow";
import { toggleWindow } from "../../common/lib/utils";

const { CENTER } = Gtk.Align;
const MAX_ITEMS = 5;

export default function QuickSettings() {
  return (
    <PopupWindow name="QuickSettings">
      <box>
        <box hexpand={false} vertical>
          <eventbox heightRequest={100} />
          <box widthRequest={500} vertical>
            <label label={"teste"} />
          </box>
          <eventbox expand />
        </box>
      </box>
    </PopupWindow>
  );
}
