[GtkTemplate(ui="/widgets/Bar/ui/Bar.ui")]
public class SimpleHypr.Bar : Astal.Window {

    public Bar() {
        anchor = TOP | LEFT | RIGHT;
        exclusivity = EXCLUSIVE;
        add_css_class("Bar");
        present();
    }
}