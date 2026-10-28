import { isElectronRenderer } from "./electron-auth";

export const desktopNavigation = (): boolean => isElectronRenderer();
