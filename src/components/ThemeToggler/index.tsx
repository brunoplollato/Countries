"use client"
import { Button } from '@nextui-org/button';
import { useTheme } from "next-themes";
import MoonIcon from '../Icons/moon';


export default function ThemeToggler() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <Button
      startContent={<MoonIcon />}
      onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
      className="bg-transparent hover:bg-transparent text-black dark:text-white"
    >
      Dark Mode
    </Button>
  )
}