import './App.css';
import React, { Component } from 'react'
import PoolList from './components/Pool/PoolList';
import PostContainer from './components/PostContainers/PostContainer';

export class App extends Component {
  render() {
    return (
      <div>
        <PoolList />
        <PostContainer/>
      </div>
    )
  }
}

export default App

