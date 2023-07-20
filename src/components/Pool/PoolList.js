import React, {Component} from 'react';
import {posts} from '../../constants/Pool';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import Pagination from '@mui/material/Pagination';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import {Search, StyledInputBase} from '../../constants/MaterialUi';
import './PoolList.css';
import PostContainer from '../PostContainers/PostContainer';

export class PoolList extends Component {
  constructor () {
    super ();
    this.state = {
      posts: posts,
      currentPage: 1,
      postsPerPage: 3,
      searchQuery: '',
      searched: false,
    };
  }

  componentDidMount () {
    this.calculateRate ();
    window.scrollTo ({top: 0, behavior: 'smooth'});
  }

  calculateRate = () => {
    this.setState (prevState => {
      const updatedPosts = prevState.posts.map (post => {
        const commentcalculateRate = post.comments.reduce (
          (total, comment) => total + comment.commentRate,
          0
        );
        post.rate = commentcalculateRate;
        return post;
      });
      return {posts: updatedPosts};
    });
  };

  handlePageChange = (event, pageNumber) => {
    this.setState ({currentPage: pageNumber});
  };

  handleSearchChange = event => {
    this.setState ({searchQuery: event.target.value});
  };

  handleAddComment = (event, postIndex) => {
    if (event.key === 'Enter') {
      const comment = event.target.value;

      this.setState (prevState => {
        const updatedPosts = [...prevState.posts];
        const updatedPost = {...updatedPosts[postIndex]};
        const updatedComments = [...updatedPost.comments];

        updatedComments.push ({
          comment: comment,
          commentRate: 0,
        });

        updatedPost.comments = updatedComments;
        updatedPosts[postIndex] = updatedPost;

        return {posts: updatedPosts};
      });

      event.target.value = '';
    }
  };

  handleAddRate = (event, postIndex, commentIndex) => {
    const {posts} = this.state;

    const updatedPosts = [...posts];
    const updatedPost = {...updatedPosts[postIndex]};
    const updatedComments = [...updatedPost.comments];
    const updatedComment = {...updatedComments[commentIndex]};

    updatedComment.commentRate += 1;
    updatedComments[commentIndex] = updatedComment;
    updatedPost.comments = updatedComments;

    const newRate = updatedPost.comments.reduce (
      (total, comment) => total + comment.commentRate,
      0
    );
    updatedPost.rate = newRate;

    updatedPosts[postIndex] = updatedPost;
    this.setState ({
      posts: updatedPosts,
    });
  };

  disablePost = posts => {
    posts.map (post => {
      this.state.posts.forEach (el => {
        if (post && el.id === post.id) {
          return (el.disabled = true);
        }
      });
    });
  };

  disableTruePost = post => {
    this.state.posts.forEach (el => {
      if (el.id === post.id) {
        return (el.disabled = false);
      }
    });
  };

  render () {
    const { posts, searchQuery } = this.state;
    const {currentPage, postsPerPage} = this.state;
    const filteredPosts = posts.filter (post =>
      post.comments.some (comment =>
        comment.comment.toLowerCase ().includes (searchQuery.toLowerCase ())
      )
    );

    const searched = searchQuery !== '';

    const pageCount = Math.ceil (filteredPosts.length / postsPerPage);

    if (searched) {
      window.scrollTo ({top: 0, behavior: 'smooth'});
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice (
      indexOfFirstPost,
      indexOfLastPost
    );
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Search>
              <SearchIcon />
              <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
                type="text"
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <div className="pool-list">
          {currentPosts.map ((post, postIndex) => {
            return (
              <ul key={postIndex} className="post-item">
                <div className="post-rate">
                  <p className="post-star-icon">
                    {' '}<PersonIcon style={{color: 'black'}} />{post.post}
                  </p>
                  <p className="post-star-icon">
                    <StarBorderIcon style={{color: 'yellow'}} />{post.rate}
                  </p>
                </div>
                <ul className="comment-list">
                  {post.comments.map ((comment, commentIndex) => (
                    <li key={commentIndex} className="comment-item">
                      <p>{comment.comment}</p>
                      <p className="post-star-icon">
                        <StarBorderIcon
                          id={`comment-${postIndex}`}
                          onClick={event =>
                            this.handleAddRate (event, postIndex, commentIndex)}
                          style={{color: 'yellow'}}
                        />
                        {comment.commentRate}
                      </p>
                    </li>
                  ))}
                </ul>
                <TextField
                  id={`comment-${postIndex}`}
                  label="Add comment"
                  variant="filled"
                  sx={{marginLeft: '550px'}}
                  onKeyDown={event => this.handleAddComment (event, postIndex)}
                />
                <hr style={{backgroundColor: 'black'}} />
              </ul>
            );
          })}
        </div>
        <div className="button-page">
          <Pagination
            style={{margin: '30px'}}
            color="primary"
            shape="rounded"
            page={currentPage}
            count={
              filteredPosts.length < 3
                ? pageCount
                : Math.ceil (posts.length / postsPerPage)
            }
            onChange={this.handlePageChange}
          />
        </div>
        <PostContainer
          posts={posts}
          disablePost={this.disablePost}
          disableTruePost={this.disableTruePost}
        />
      </div>
    );
  }
}

export default PoolList;
