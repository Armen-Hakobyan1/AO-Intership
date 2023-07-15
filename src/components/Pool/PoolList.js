import React, {Component} from 'react';
import './PoolList.css';
import {Posts} from '../../constants/Pool';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export class PoolList extends Component {
  constructor () {
    super ();
    this.state = {
      posts: Posts,
      currentPage: 1,
      postsPerPage: 3,
      searchQuery: '',
      searched: false,
    };
  }

  componentDidMount () {
    this.RatesSum ();
    window.scrollTo ({top: 0, behavior: 'smooth'});
  }

  RatesSum = () => {
    this.setState (posts => {
      const updatePostsRates = posts.posts.map (post => {
        const commentRatesSum = post.comments.reduce (
          (total, comment) => total + comment.commentRate,
          0
        );
        post.rate = commentRatesSum;
        return post;
      });
      return {posts: updatePostsRates};
    });
  };

  handlePageChange = (event, pageNumber) => {
    this.setState ({currentPage: pageNumber});
  };

  handleSearchChange = event => {
    this.setState ({searchQuery: event.target.value});
  };

  render () {
    const {posts, searchQuery} = this.state;
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
                        <StarBorderIcon style={{color: 'yellow'}} />
                        {comment.commentRate}
                      </p>
                    </li>
                  ))}
                </ul>
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
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            margin: '40px',
            marginLeft: '350px',
            border: '1px solid black',
            borderRadius: '10px',
          }}
        >
          <TextField
            style={{backgroundColor: 'rgb(90 91 93)'}}
            fullWidth
            label="Search..."
            id="fullWidth"
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        </Box>
      </div>
    );
  }
}

export default PoolList;
