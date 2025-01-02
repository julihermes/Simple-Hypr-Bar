import { toggleWindow } from "../../common/lib/utils";

export default function ToggleAppLauncher() {
  return <button onClick={() => toggleWindow("AppLauncher")}>󰣇</button>;
}
