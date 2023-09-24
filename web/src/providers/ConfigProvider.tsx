import React, { createContext, useContext, useEffect, useState } from "react"
import { fetchNui } from "../utils/fetchNui"
import { useNuiEvent } from "../hooks/useNuiEvent"
import { debugShow, isEnvBrowser } from "../utils/misc"
import { Config, ConfigContext } from "../typings/configs"

const ConfigCtx = createContext<ConfigContext | null>(null)

const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<Config>({
    primaryColor: "#DE0059",
    colorScheme: "dark",
    secondaryColor: "#1971C2",
    secondaryShade: 4,
  })

  const [dialog, setDialog] = useState({
    npcName: "",
    npcTag: "",
    npcColor: "#1971C2",
    message: "",
    elements: [],
  })

  const [visible, setVisible] = useState(isEnvBrowser())

  useEffect(() => {
    if (isEnvBrowser()) {
      debugShow()
    }
  }, [])

  useNuiEvent("show", (data) => {
    setVisible(true)
    setDialog((prev) => ({ ...prev, ...data, message: data.msg }))
  })

  useNuiEvent("close", () => {
    setVisible(false)
    fetchNui("close")
  })

  useNuiEvent("changeDialog", (data) => {
    setDialog((prev) => ({
      ...prev,
      message: data.msg,
      elements: data.elements,
    }))
  })

  useNuiEvent("updateMessage", (data) => {
    setDialog((prev) => ({ ...prev, message: data.msg }))
  })

  useEffect(() => {
    const handleEscKeyPressed = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) {
        setVisible(false)
        fetchNui("close")
      }
    }
    window.addEventListener("keydown", handleEscKeyPressed)
    return () => {
      window.removeEventListener("keydown", handleEscKeyPressed)
    }
  }, [visible])

  useEffect(() => {
    if (!isEnvBrowser()) {
      fetchNui<Config>("getConfig").then((data) =>
        setConfig((prev) => ({ ...prev, ...data }))
      )
    }
  }, [])

  return (
    <ConfigCtx.Provider value={{ config, setConfig, visible, ...dialog }}>
      {children}
    </ConfigCtx.Provider>
  )
}

export default ConfigProvider

export const useConfig = () =>
  useContext<ConfigContext>(ConfigCtx as React.Context<ConfigContext>)
