import React from 'react';
import FirstContainer from './FirstContainer/FirstContainer';
import SecondContainer from './SecondContainer/SecondContainer';
import './PostContainer.css';

const PostContainer = ({postsData, disablePost, disableTruePost}) => {
  return (
    <div className="post-container">
      <FirstContainer
        postsData={postsData}
        disablePost={disablePost}
        disableTruePost={disableTruePost}
      />
      <SecondContainer
        postsData={postsData}
        disablePost={disablePost}
        disableTruePost={disableTruePost}
      />
    </div>
  );
};

export default PostContainer;
