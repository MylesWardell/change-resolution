import { changeResolution } from "~/resolution.ts";

const main = async () => {
  await changeResolution();
};

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await main();
}
