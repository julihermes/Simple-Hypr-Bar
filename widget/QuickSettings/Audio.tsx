import { bind } from "astal";
import Wp from "gi://AstalWp";

export default function Audio() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;
  const mic = Wp.get_default()?.audio.defaultMicrophone!;

  return (
    <box>
      <icon
        tooltipText={bind(speaker, "volume").as(
          (p) => `${Math.floor(p * 100)} %`,
        )}
        className="Audio"
        icon={bind(speaker, "volumeIcon")}
      />
      <icon
        tooltipText={bind(mic, "volume").as((p) => `${Math.floor(p * 100)} %`)}
        className="Audio"
        icon={bind(mic, "volumeIcon")}
      />
    </box>
  );
}
