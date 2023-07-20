import React, {Component} from 'react';
import Button from '@mui/material/Button';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './SecondContainer.css';

export class SecondContainer extends Component {
  constructor (props) {
    super (props);
    this.state = {
      highestRatedPost: [],
    };
  }

  handleSortClick = () => {
    this.setState (prevState => ({
      reversePosts: !prevState.reversePosts,
    }));
  };

  deleteButtonClick = post => {
    this.props.disableTruePost (post);

    const updatedPosts = this.state.highestRatedPost.filter (
      el => el && el.id !== post.id
    );

    this.setState ({highestRatedPost: updatedPosts});
  };

  handleButtonClick = () => {
    let highestRate = 0;
    let highestPost = null;

    const arr = this.props.posts.reduce ((acc, post) => {
      if (post.rate > highestRate && !post.disabled) {
        highestRate = post.rate;
        highestPost = post;
      }
      return [highestPost];
    }, []);
    this.setState ({
      highestRatedPost: [...this.state.highestRatedPost, ...arr],
    });
    this.props.disablePost (arr);
  };

  render () {
    const {highestRatedPost, reversePosts} = this.state;
    const sortedPosts = reversePosts
      ? [...highestRatedPost].reverse ()
      : highestRatedPost;
    return (
      <div className="second-container">
        <div className="second-buttons">
          <Button
            onClick={this.handleButtonClick}
            variant="contained"
            style={{margin: '11px', maxWidth: '64px', maxHeight: '36.5px'}}
          >
            +
          </Button>
          <Button
            onClick={this.handleSortClick}
            variant="contained"
            style={{margin: '11px', maxWidth: '64px', maxHeight: '36.5px'}}
          >
            sort
          </Button>
        </div>
        <div>
          {sortedPosts.map (
            (post, postIndex) =>
              post &&
              <div key={postIndex} className="post-delete-button">
                <div key={postIndex + '1'} className="post-name">
                  {post.post}
                  <div key={postIndex + '2'} className="post-item-rate">
                    <StarHalfIcon style={{color: 'yellow'}} />{post.rate / 2}
                  </div>
                  <div key={postIndex + '3'}>
                    <IconButton
                      onClick={() => this.deleteButtonClick (post)}
                      aria-label="delete"
                      size="small"
                    >
                      <DeleteIcon variant="outlined" color="error" />
                    </IconButton>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
    );
  }
}

export default SecondContainer;
