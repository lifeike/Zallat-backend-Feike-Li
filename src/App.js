import React, { Component } from "react"
import EmissionOfState from "./components/EmissionOfState"
import Tax from "./components/Tax"
import Highest from "./components/Highest"
import "./App.css"

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Zallat Inc Junior Backend Code Challenge</h1>
        <EmissionOfState />
        <Tax />
        <Highest />
      </div>
    )
  }
}
