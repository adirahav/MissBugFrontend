
import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'
import { useSelector } from 'react-redux'

export function BugList({ bugs, onRemoveBug, onEditBug }) {
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

  function allowedDelete(bug) { // event bus / context / store
    return loggedinUser && (bug.creator?._id === loggedinUser?._id || loggedinUser?.isAdmin) && onRemoveBug
  }

  function allowEdit(bug) { // event bus / context / store
    return loggedinUser && (bug.creator?._id === loggedinUser?._id || loggedinUser?.isAdmin) && onEditBug
  }

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <div>
            {allowedDelete(bug) && <button onClick={() => { onRemoveBug(bug._id) }}>Delete</button> }
            {allowEdit(bug) && <button onClick={() => { onEditBug(bug) }}>Edit</button>}
            <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
          </div>
          
        </li>
      ))}
    </ul>
  )
}
