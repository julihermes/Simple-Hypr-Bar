[GtkTemplate(ui="/widgets/Bar/ui/Clock.ui")]
public class SimpleHypr.Clock : Gtk.Box {
    AstalIO.Time timer;
    public string clock { get; set; }
    [GtkChild] unowned Gtk.Popover popover;
    [GtkChild] unowned Gtk.Calendar calendar;

    construct {
        timer = AstalIO.Time.interval(1000, null);
        timer.now.connect(() => {
            clock = new DateTime.now_local().format("%H:%M");
        });

        // everytime popover is opened, select current day
        popover.notify["visible"].connect(() => {
            if (popover.visible) {
                calendar.select_day(new DateTime.now_local());
            }
        });
    }

    public override void dispose() {
        timer.cancel();
        timer.dispose();
        base.dispose();
    }
}