import {
  Resolution,
  ResolutionName,
  ResolutionString,
} from "~/types/resolution.ts";

const NameToValue: Record<ResolutionName, Resolution> = {
  "Native": [3840, 2160],
  "16:10": [2560, 1600],
  "4:3": [2048, 1536],
};

const ValueToName = new Map(
  Object.entries(NameToValue).map(
    ([key, value]) =>
      [value.join("/"), key] as [ResolutionString, ResolutionName],
  ),
);

export const setResolution = async (resolution: ResolutionName) => {
  const [width, height] = NameToValue[resolution];

  const command = new Deno.Command("powershell", {
    args: [`./ChangeScreenResolution.exe /w=${width} /h=${height} /f=240 /d=0`],
  });
  const { code, stdout } = await command.output();

  // error
  if (!code) {
    const text = new TextDecoder().decode(stdout);
    return console.error(text);
  }

  console.log(
    "Successfully changed resolution to",
    resolution,
    [width, height].join("/"),
  );
};

const decodeText = (text: string) => parseInt(text.split("\r")[0].trim());

export const getResolution = async (): Promise<ResolutionName | undefined> => {
  const command = new Deno.Command("powershell", {
    args: ["Get-DisplayResolution"],
  });

  const { stdout } = await command.output();
  const resolutions = new TextDecoder().decode(stdout).split(":");
  const resolution = [decodeText(resolutions[3]), decodeText(resolutions[4])]
    .join("/") as ResolutionString;
  const resolutionName = ValueToName.get(resolution);
  console.log(
    "Current Resolution",
    resolutionName,
    resolution,
  );

  return resolutionName;
};

export const changeResolution = async () => {
  const resolution = await getResolution();

  if (!resolution) {
    throw new Error("Failed to get valid resolution");
  }

  if (resolution === "Native") {
    await setResolution("16:10");
  }

  if (resolution === "16:10") {
    await setResolution("Native");
  }
};
