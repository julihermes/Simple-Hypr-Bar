[GtkTemplate(ui="/widgets/Bar/ui/Workspaces.ui")]
public class SimpleHypr.Workspaces : Gtk.Box {
    public AstalHyprland.Hyprland hypr;
    [GtkChild] unowned Gtk.Box wsBox;

    construct {
        hypr = AstalHyprland.get_default();
        hypr.notify["workspaces"].connect(syncWs);
        syncWs();
    }

    void syncWs() {
        var child = wsBox.get_first_child();
        while (child != null){
            wsBox.remove(child);
            child = wsBox.get_first_child();
        } 

        var workspaces = hypr.workspaces;
        workspaces.sort((a,b) => a.id - b.id);
        foreach (var ws in workspaces) {
            // filter out special workspaces
            if (!(ws.id >= -99 && ws.id <= -2)) {
                wsBox.append(new WsButton(hypr, ws));
            }
        }
    }

    public override void dispose() {
        hypr.dispose();
        base.dispose();
    }

    class WsButton : Astal.Bin {
        public WsButton(AstalHyprland.Hyprland hypr, AstalHyprland.Workspace ws) {
            var btn = new Gtk.Button() {
                visible = true,
                label = ws.id.to_string()
            };
            btn.clicked.connect(ws.focus);

            if (hypr.focused_workspace == ws) {
                btn.add_css_class("focused");
            }

            hypr.notify["focused-workspace"].connect(() => {
                if (hypr.focused_workspace == ws) {
                    btn.add_css_class("focused");
                } else {
                    btn.remove_css_class("focused");
                }
            });

            child = btn;
        }
    }
}