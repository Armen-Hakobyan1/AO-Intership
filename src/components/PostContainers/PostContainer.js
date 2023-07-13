import React, { Component } from 'react'
import FirstContainer from './FirstContainer/FirstContainer'
import SecondContainer from './SecondContainer/SecondContainer'
import './PostContainer.css';
import { Posts } from '../../constants/Pool';

export class PostContainer extends Component {
  constructor() {
    super();
    this.state = {
      posts: Posts,
    };
  }

  disablePost = (posts) => {
    posts.map((post) => {
      this.state.posts.forEach((el) => {
        if (post && el.id === post.id) {
          return (el.disabled = true);
        }
      })
    })
  }

  disableTruePost = (post) => {
      this.state.posts.forEach((el) => {
        if (el.id === post.id) {
          return (el.disabled = false);
        }
      })
  }

  render() {
    return (
      <div className='post-container'>
        <FirstContainer posts={this.state.posts} disablePost={this.disablePost} disableTruePost={this.disableTruePost} />
        <SecondContainer posts={this.state.posts} disablePost={this.disablePost} disableTruePost={this.disableTruePost} />
      </div>
    )
  }
}

export default PostContainer
