import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {HiOutlineChatBubbleOvalLeft} from 'react-icons/hi'
import {BiShareAlt} from 'react-icons/bi'

class UserPostItem extends Component {
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
    return (
      <li className="listItem">
        <div className="miniContainer">
          <img className="profilePic" alt="profile" src={profilePic} />
          <Link to={`/users/${userId}`}>
            <p className="profileName">{userName}</p>
          </Link>
        </div>
        <img alt="post" src={imageUrl} />
        <div>
          <div className="miniContainer">
            <button className="postIcon" type="button">
              <AiOutlineHeart />
            </button>
            <button className="postIcon" type="button">
              <HiOutlineChatBubbleOvalLeft />
            </button>
            <button className="postIcon" type="button">
              <BiShareAlt />
            </button>
          </div>
          <p className="postText" className="likes">
            {likesCount} likes
          </p>
          <p className="postText caption">{caption}</p>
          <p className="postText createdTime">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default UserPostItem
