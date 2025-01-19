import { bind } from "astal";
import AstalBattery from "gi://AstalBattery";

export default function Battery() {
  const bat = AstalBattery.get_default();
  // visible={bind(bat, "isPresent")}
  return <icon className="Battery" icon={bind(bat, "batteryIconName")} />;
}
