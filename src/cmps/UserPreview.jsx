export function UserPreview({ user }) {

    const userAvatar = `https://ui-avatars.com/api/?background=random&name=${user.username}`
    return <article >
        <h4>{user.fullname}</h4>
        <h1><img src={userAvatar} /></h1>
        <p>Username: <span>{user.username}</span></p>
        <p>Score: <span>{user.score}</span></p>
    </article>
}