import type { ChatClientPlugin } from "@/lib/plugin-contracts";
import { ElectronAuthHandler } from "./auth-handler";

export const desktopClient = () =>
  ({
    id: "desktop",
    layout: ElectronAuthHandler,
  }) satisfies ChatClientPlugin;
