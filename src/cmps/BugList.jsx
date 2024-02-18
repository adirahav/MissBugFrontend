
import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'
import { userService } from '../services/user.service'

export function BugList({ bugs, onRemoveBug, onEditBug }) {
  const loggedinUser = userService.getLoggedinUser()

  function isAllowed(bug) { // event bus / context / store
    return loggedinUser && bug.owner?._id === loggedinUser?._id || loggedinUser?.isAdmin
  }

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <div>
            {isAllowed(bug) && <button onClick={() => {onRemoveBug(bug._id)}}>Delete</button>}
            {isAllowed(bug) && <button onClick={() => {onEditBug(bug)}}>Edit</button>}
            <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
          </div>
          
        </li>
      ))}
    </ul>
  )
}
