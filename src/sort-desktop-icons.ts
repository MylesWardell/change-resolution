import {  } from "litebot";

export const sortDesktopIcons = async () => {
  const command = new Deno.Command("powershell", {
    args: [
      `$sortOrder = "${sortOrder}";`,
      "(New-Object -ComObject shell.application).toggleDesktop();",
      "Start-Sleep -Milliseconds 500;",
      "$WshShell = New-Object -ComObject WScript.Shell",
      "Start-Sleep -Milliseconds 500;",
      '$WshShell.SendKeys("+{F10}");'
    ],
  });
  const { code, stdout } = await command.output();
};
