import {Component} from 'react'
import {Link} from 'react-router-dom'

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
    } = userPostDetails
    const {imageUrl, caption} = postDetails
    return (
      <li>
        <div>
          <img alt="post" src={imageUrl} />
          <Link to={`/users/${userId}`}>
            <p>{userName}</p>
          </Link>
        </div>
      </li>
    )
  }
}

export default UserPostItem
