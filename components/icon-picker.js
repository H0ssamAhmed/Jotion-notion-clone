"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";


export const IconPicker = ({ onChange, children, asChild }) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || "light";

  const themeMap = {
    'dark': Theme.DARK,
    'light': Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <>
      <Popover>
        <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
        <PopoverContent className="p-0 w-full  z-[100] border-none shadow-none">
          <EmojiPicker
            theme={theme}
            height={450}
            width={350}
            onEmojiClick={(data) => onChange(data.emoji)}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
