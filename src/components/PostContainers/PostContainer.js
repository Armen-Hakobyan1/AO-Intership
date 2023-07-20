import React, {Component} from 'react';
import FirstContainer from './FirstContainer/FirstContainer';
import SecondContainer from './SecondContainer/SecondContainer';
import './PostContainer.css';

export class PostContainer extends Component {
  constructor (props) {
    super (props);
  }

  render() {
    return (
      <div className="post-container">
        <FirstContainer
          posts={this.props.posts}
          disablePost={this.props.disablePost}
          disableTruePost={this.props.disableTruePost}
        />
        <SecondContainer
          posts={this.props.posts}
          disablePost={this.props.disablePost}
          disableTruePost={this.props.disableTruePost}
        />
      </div>
    );
  }
}

export default PostContainer;
