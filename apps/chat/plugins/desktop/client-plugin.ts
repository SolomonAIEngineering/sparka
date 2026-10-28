import type { ChatClientPlugin } from "@/lib/plugin-contracts";
import { DesktopAuthForm } from "./auth-form";
import { ElectronAuthHandler } from "./auth-handler";
import { signOutDesktop } from "./sign-out";

export const desktopClient = () =>
  ({
    id: "desktop",
    layout: ElectronAuthHandler,
    authentication: { Form: DesktopAuthForm, signOut: signOutDesktop },
  }) satisfies ChatClientPlugin;
