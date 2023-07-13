import React, {Component} from 'react';
import './PoolList.css';
import {Posts} from '../../constants/Pool';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';


export class PoolList extends Component {
  constructor() {
    super();
    this.state = {
      posts: Posts,
    };
  }

  componentDidMount() {
    this.RatesSum();
  }

  RatesSum = () => {
    this.setState((posts) => {
      const updatePostsRates = posts.posts.map((post) => {
        const commentRatesSum = post.comments.reduce(
          (total, comment) => total + comment.commentRate,
          0
        );
        post.rate = commentRatesSum;
        return post;
      });
      return { posts: updatePostsRates };
    });
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="pool-list">
        {posts.map((post, postIndex) => {
          return (
            <ul key={postIndex} className="post-item">
              <div className="post-rate">
                <p className='post-star-icon'> <PersonIcon style={{color: 'black'}}/>{post.post}</p>
                <p className='post-star-icon'><StarBorderIcon style={{color: 'yellow'}}  />{post.rate}</p>
              </div>
              <ul className="comment-list">
                {post.comments.map((comment, commentIndex) => (
                  <li key={commentIndex} className="comment-item">
                    <p>{comment.comment}</p>
                    <p className='post-star-icon'><StarBorderIcon style={{color: 'yellow'}} />{comment.commentRate}</p>
                  </li>
                ))}
              </ul>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default PoolList;
