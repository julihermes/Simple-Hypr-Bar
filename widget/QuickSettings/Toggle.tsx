import { toggleWindow } from "../../common/lib/utils";
import Audio from "./Audio";
import Battery from "./Battery";
import Wifi from "./Wifi";

export default function ToggleQuickSettings() {
  return (
    <button onClick={() => toggleWindow("QuickSettings")}>
      <box>
        <Wifi />
        <Audio />
        <Battery />
      </box>
    </button>
  );
}
