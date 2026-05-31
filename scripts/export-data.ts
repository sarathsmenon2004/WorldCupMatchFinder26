import { writeFile } from "node:fs/promises";

import { broadcasterData } from "../src/data/broadcasters";
import { groups } from "../src/data/groups";
import { scheduleData } from "../src/data/schedule";

async function main() {
  await writeFile("data/broadcasters.json", `${JSON.stringify(broadcasterData, null, 2)}\n`);
  await writeFile("data/schedule.json", `${JSON.stringify(scheduleData, null, 2)}\n`);
  await writeFile("data/groups.json", `${JSON.stringify(groups, null, 2)}\n`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
