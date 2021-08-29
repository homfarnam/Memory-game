import React from "react"
import { Route, Switch } from "react-router-dom"
import Game from "./pages/Game"
import Home from "./pages/Home"
import Score from "./pages/Score"

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/score" component={Score} />
        <Route path="/game" component={Game} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  )
}

export default App
