import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App"
import ConfigProvider from "./providers/ConfigProvider"
import { isEnvBrowser } from "./utils/misc"
const root = document.getElementById("root")
if (isEnvBrowser()) {
  root!.style.backgroundImage = 'url("https://i.imgur.com/U1gtR52.jpeg")'
  // root!.style.backgroundColor = "white"

  root!.style.backgroundSize = "cover"
  root!.style.backgroundRepeat = "no-repeat"
  root!.style.backgroundPosition = "center"
}

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
