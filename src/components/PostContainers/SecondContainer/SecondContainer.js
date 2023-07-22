import React from 'react';
import Button from '@mui/material/Button';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from 'react';
import './SecondContainer.css';

const SecondContainer = ({postsData, disablePost, disableTruePost}) => {
  const [highestRatedPost, setHighestRatedPost] = useState ([]);
  const [reversePosts, setReversePosts] = useState (false);

  const handleSortClick = () => {
    setReversePosts (!reversePosts);
  };

  const deleteButtonClick = post => {
    disableTruePost (post);

    const updatedPosts = highestRatedPost.filter (
      el => el && el.id !== post.id
    );
    setHighestRatedPost (updatedPosts);
  };

  const handleButtonClick = () => {
    let highestRate = 0;
    let highestPost = null;

    const arr = postsData.reduce ((acc, post) => {
      if (post.rate > highestRate && !post.disabled) {
        highestRate = post.rate;
        highestPost = post;
      }
      return [highestPost];
    }, []);
    setHighestRatedPost ([...highestRatedPost, ...arr]);
    disablePost (arr);
  };

  const sortedPosts = reversePosts
    ? [...highestRatedPost].reverse ()
    : highestRatedPost;

  return (
    <div className="second-container">
      <div className="second-buttons">
        <Button
          onClick={handleButtonClick}
          variant="contained"
          style={{margin: '11px', maxWidth: '64px', maxHeight: '36.5px'}}
        >
          +
        </Button>
        <Button
          onClick={handleSortClick}
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
                  <StarHalfIcon style={{color: 'yellow'}} />
                  {post.rate / 2}
                </div>
                <div key={postIndex + '3'}>
                  <IconButton
                    onClick={() => deleteButtonClick (post)}
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
};

export default SecondContainer;
