[GtkTemplate(ui="/widgets/Bar/ui/FocusedClient.ui")]
public class SimpleHypr.FocusedClient : Gtk.Box {
    public string focusedClient { get; set; }
    public AstalHyprland.Hyprland hypr;

    construct {
        hypr = AstalHyprland.get_default();
        hypr.bind_property("focused_client", this, "focusedClient", BindingFlags.SYNC_CREATE, (_, src, ref target) => {
            target.set_string(hypr.focused_client.title.to_string());
            return true;
        });
    }

    public override void dispose() {
        hypr.dispose();
        base.dispose();
    }
}