import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'

import './index.css'

class UserPostItem extends Component {
  state = {isLiked: false}

  render() {
    const {userPostDetails} = this.props
    const {
      userName,
      profilePic,
      postDetails,
      likesCount,
      comments,
      userId,
      createdAt,
    } = userPostDetails
    const {imageUrl, caption} = postDetails
    const {isLiked} = this.state
    return (
      <li className="listItem">
        <div className="miniContainer">
          <img
            className="profilePic"
            alt="post author profile"
            src={profilePic}
          />
          <Link className="linkName" to={`/users/${userId}`}>
            <p className="profileName">{userName}</p>
          </Link>
        </div>
        <img className="post" alt="post" src={imageUrl} />
        <div className="postDetailsContainer">
          <div className="miniContainer miniContainerPadding">
            {isLiked ? (
              <button
                // testid="unLikeIcon"
                className="postIcon likeIcon"
                type="button"
              >
                <FcLike />
              </button>
            ) : (
              <button
                /* testid="likeIcon" */ className="postIcon"
                type="button"
              >
                <BsHeart />
              </button>
            )}
            <button className="postIcon" type="button">
              <FaRegComment />
            </button>
            <button className="postIcon" type="button">
              <BiShareAlt />
            </button>
          </div>
          <p className="postText likes">{likesCount} likes</p>
          <p className="postText caption">{caption}</p>
          <ul className="commentsUl">
            {comments.map(eachComment => (
              <li className="commentListItem" key={eachComment.commentedUserId}>
                <p className="postText">
                  {eachComment.commentedUsername}{' '}
                  <span className="caption"> {eachComment.comment}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className="postText createdTime">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default UserPostItem
