import React, { Component } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
export class App extends Component {
  render() {
    return (
      <>
        <Sidebar />
        <Main/>
      </>
    )
  }
}

export default App