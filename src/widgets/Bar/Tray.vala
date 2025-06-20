[GtkTemplate(ui="/widgets/Bar/ui/Tray.ui")]
public class SimpleHypr.Tray : Gtk.Box {
    public AstalTray.Tray tray;
    HashTable<string, TrayButton> trayItems;

    construct {
        tray = AstalTray.get_default();
        trayItems = new HashTable<string, TrayButton>(str_hash, str_equal);
        tray.item_added.connect(onTrayItemAdded);
        tray.item_removed.connect(onTrayItemRemoved);
    }

    void onTrayItemAdded(AstalTray.Tray tray, string id) {
        var button = new TrayButton(id);
        trayItems.set(id, button);
        this.append(button);
    }

    void onTrayItemRemoved(string id) {
        var button = trayItems.get(id);
        this.remove(button);
        trayItems.remove(id);
    }

    class TrayButton : Astal.Bin {
        AstalTray.TrayItem item;
        Gtk.Popover popover;
        Gtk.Image image;

        public TrayButton(string id) {
            var tray = AstalTray.get_default();
            item = tray.get_item(id);

            image = new Gtk.Image();
            popover = new Gtk.PopoverMenu.from_model(item.menu_model);

            child = new Gtk.MenuButton() {
                child = image,
                popover = popover,
            };

            item.bind_property("gicon", image, "gicon", BindingFlags.SYNC_CREATE);
            popover.insert_action_group("dbusmenu", item.action_group);
            item.notify["action-group"].connect(onActionGroup);
        }

        void onActionGroup() {
            popover.insert_action_group("dbusmenu", item.action_group);
        }

        public override void dispose() {
            item.notify.disconnect(onActionGroup);
        }
    }

    public override void dispose() {
        tray.item_added.disconnect(onTrayItemAdded);
        tray.item_removed.disconnect(onTrayItemRemoved);
        foreach (var button in trayItems.get_values()) {
            button.dispose();
        }
        base.dispose();
    }
}