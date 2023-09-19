import { MantineColor } from "@mantine/core"

export interface Config {
  primaryColor: string | MantineColor
  primaryShade?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  secondaryColor: string | MantineColor
  secondaryShade?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  colorScheme?: "dark" | "light"
}
export interface Elements {
  value?: number
  label: string
}
export interface ConfigContext {
  config: Config
  setConfig: (config: Config) => void
  visible?: boolean
  npcName: string
  npcTag?: string
  npcColor?: string
  message: string
  elements: Elements[]
}

export interface ShowData {
  npcName: string
  npcTag: string
  npcColor?: string
  msg: string
  elements: Elements[]
}
