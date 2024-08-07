import ThemeToggler from "../ThemeToggler";

export default function Header() {
  return (
    <div className="w-full h-20 shadow-md bg-[#fff] dark:bg-[#2B3743]">
      <div className="flex flex-column justify-between items-center container mx-auto h-full text-black dark:text-white">
        <p className="text-xl font-semibold">Where in the world?</p>
        <ThemeToggler />
      </div>
    </div>
  )
}