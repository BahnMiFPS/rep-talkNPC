// Will return whether the current environment is in a regular browser

import { ShowData } from "../typings/configs"
import { debugData } from "./debugData"

// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative

// Basic no operation function
export const noop = () => {}

export const USDollar = new Intl.NumberFormat()

export const debugShow = () => {
  debugData<ShowData>([
    {
      action: "show",
      data: {
        npcColor: "red",
        npcName: "Rep Scripts",
        npcTag: "Construction Worker",
        msg: "Hello, my name is Chip Peterson! \n \n I'm in charge of the site, how can I help you?",
        elements: [
          { label: "What kind of place is this?" },
          { label: "I want to work for you" },
          { label: "Getting my salary" },
          { label: "Goodbye" },
        ],
      },
    },
  ])
}
