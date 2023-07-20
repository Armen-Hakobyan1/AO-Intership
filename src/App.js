import './App.css';
import React, { Component } from 'react'
import PoolList from './components/Pool/PoolList';

export class App extends Component {
  render() {
    return (
      <div>
        <PoolList />
      </div>
    )
  }
}

export default App

