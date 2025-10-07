"use client"

import { Moon, Sun, Palette, Zap, Grid, Layers, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const themes = [
    {
      name: "Light",
      value: "light",
      icon: Sun,
      description: "Clean and bright interface",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Dark",
      value: "dark",
      icon: Moon,
      description: "Easy on the eyes",
      color: "from-gray-600 to-gray-800",
    },
    // {
    //   name: "Divi",
    //   value: "divi",
    //   icon: Palette,
    //   description: "Elegant purple design theme",
    //   color: "from-purple-500 to-purple-700",
    // },
    // {
    //   name: "Astra",
    //   value: "astra",
    //   icon: Zap,
    //   description: "Modern blue professional theme",
    //   color: "from-blue-500 to-indigo-600",
    // },
    // {
    //   name: "GeneratePress",
    //   value: "generatepress",
    //   icon: Grid,
    //   description: "Clean minimalist design",
    //   color: "from-green-500 to-emerald-600",
    // },
    // {
    //   name: "Neve",
    //   value: "neve",
    //   icon: Layers,
    //   description: "Sophisticated dark blue theme",
    //   color: "from-slate-600 to-slate-800",
    // },
    // {
    //   name: "Kalium",
    //   value: "kalium",
    //   icon: Sparkles,
    //   description: "Premium gold accent theme",
    //   color: "from-amber-500 to-orange-600",
    // },
  ]

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const getCurrentIcon = () => {
    const currentTheme = themes.find((t) => t.value === theme)
    return currentTheme?.icon || Sun
  }

  const CurrentIcon = getCurrentIcon()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 px-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <CurrentIcon className="h-[1.2rem] w-[1.2rem] transition-all duration-200" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Design Themes</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred design style</p>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon
            const isActive = theme === themeOption.value
            return (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className={`flex items-center space-x-3 px-3 py-3 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-r ${themeOption.color} text-white shadow-sm`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{themeOption.name}</span>
                    {isActive && <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {themeOption.description}
                  </p>
                </div>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
