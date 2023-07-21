import React from 'react';
import {posts} from '../../constants/Pool';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import Pagination from '@mui/material/Pagination';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import {Search, StyledInputBase} from '../../constants/MaterialUi';
import PostContainer from '../PostContainers/PostContainer';
import {useState, useEffect} from 'react';
import './PoolList.css';

const PoolList = () => {
  const [postsData, setPostsData] = useState ([]);
  const [currentPage, setCurrentPage] = useState (1);
  const [postsPerPage] = useState (3);
  const [searchQuery, setSearchQuery] = useState ('');

  useEffect (() => {
    calculateRate ();
    setPostsData (posts);
    window.scrollTo ({top: 0, behavior: 'smooth'});
  }, []);

  const calculateRate = () => {
    setPostsData (prevPosts => {
      const updatedPosts = prevPosts.map (post => {
        const commentcalculateRate = post.comments.reduce (
          (total, comment) => total + comment.commentRate,
          0
        );
        post.rate = commentcalculateRate;
        return post;
      });
      return updatedPosts;
    });
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage (pageNumber);
  };

  const handleSearchChange = event => {
    setSearchQuery (event.target.value);
  };

  const handleAddComment = (event, postIndex) => {
    if (event.key === 'Enter') {
      const comment = event.target.value;

      setPostsData (prevPosts => {
        const updatedPosts = [...prevPosts];
        const updatedPost = {...updatedPosts[postIndex]};
        const updatedComments = [...updatedPost.comments];

        updatedComments.push ({
          comment: comment,
          commentRate: 0,
        });

        updatedPost.comments = updatedComments;
        updatedPosts[postIndex] = updatedPost;

        return updatedPosts;
      });

      event.target.value = '';
    }
  };

  const handleAddRate = (event, postIndex, commentIndex) => {
    const updatedPosts = [...postsData];
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
    setPostsData (updatedPosts);
  };

  const disablePost = postsData => {
    setPostsData (prevPosts => {
      return prevPosts.map (
        post =>
          postsData.some (el => el.id === post.id)
            ? {...post, disabled: true}
            : post
      );
    });
  };

  const disableTruePost = post => {
    setPostsData (prevPosts => {
      const updatedPosts = prevPosts.map (el => {
        if (el.id === post.id) {
          return {...el, disabled: false};
        }
        return el;
      });
      return updatedPosts;
    });
  };

  const filteredPosts = postsData.filter (post =>
    post.comments.some (comment =>
      comment.comment.toLowerCase ().includes (searchQuery.toLowerCase ())
    )
  );

  const pageCount = Math.ceil (filteredPosts.length / postsPerPage);

  useEffect (
    () => {
      if (searchQuery !== '') {
        window.scrollTo ({top: 0, behavior: 'smooth'});
      }
    },
    [searchQuery]
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice (indexOfFirstPost, indexOfLastPost);

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
              value={searchQuery}
              onChange={handleSearchChange}
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
                          handleAddRate (event, postIndex, commentIndex)}
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
                onKeyDown={event => handleAddComment (event, postIndex)}
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
          onChange={handlePageChange}
        />
      </div>
      <PostContainer
        postsData={postsData}
        disablePost={disablePost}
        disableTruePost={disableTruePost}
      />
    </div>
  );
};

export default PoolList;
