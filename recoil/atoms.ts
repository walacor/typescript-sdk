import { atom } from "recoil";

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});

export const user = atom({
  key: "user",
  default: null,
});

export const bottomPopupVisibleState = atom<boolean>({
  key: "bottomPopupVisibleState",
  default: false,
});

export const isUserConfiguredState = atom<boolean>({
  key: "isUserConfiguredState",
  default: false,
});
