import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./styles/index.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)
