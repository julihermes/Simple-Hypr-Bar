import Apps from "gi://AstalApps";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { Variable } from "astal";
import PopupWindow from "../../common/widget/PopupWindow";
import { toggleWindow } from "../../common/lib/utils";

const { CENTER } = Gtk.Align;
const MAX_ITEMS = 5;

function hide() {
  toggleWindow("AppLauncher");
}

function AppButton({ app }: { app: Apps.Application }) {
  return (
    <button
      className="AppButton"
      onClicked={() => {
        hide();
        app.launch();
      }}
    >
      <box>
        <icon icon={app.iconName} />
        <box valign={CENTER} vertical>
          <label className="name" truncate xalign={0} label={app.name} />
          {app.description && (
            <label
              className="description"
              wrap
              xalign={0}
              label={app.description}
            />
          )}
        </box>
      </box>
    </button>
  );
}

export default function AppLauncher() {
  const apps = new Apps.Apps();
  const text = Variable("");
  const list = text((text) => apps.fuzzy_query(text).slice(0, MAX_ITEMS));
  const onEnter = () => {
    apps.fuzzy_query(text.get())?.[0].launch();
    hide();
  };

  return (
    <PopupWindow name="AppLauncher" halign={CENTER} onShow={() => text.set("")}>
      <box>
        <box hexpand={false} vertical>
          <eventbox heightRequest={100} onClick={hide} />
          <box widthRequest={500} className="launcher" vertical>
            <entry
              placeholderText="Search"
              text={text()}
              onChanged={(self) => text.set(self.text)}
              onActivate={onEnter}
            />
            <box spacing={6} vertical>
              {list.as((list) => list.map((app) => <AppButton app={app} />))}
            </box>
            <box
              halign={CENTER}
              className="not-found"
              vertical
              visible={list.as((l) => l.length === 0)}
            >
              <icon icon="system-search-symbolic" />
              <label label="No match found" />
            </box>
          </box>
          <eventbox expand onClick={hide} />
        </box>
      </box>
    </PopupWindow>
  );
}
