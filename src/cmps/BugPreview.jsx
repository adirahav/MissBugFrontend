

export function BugPreview({ bug }) {

    return <article >
        <h4>{bug.title}</h4>
        <h1>🐛</h1>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Reporter: <span>{bug.owner?.fullname}</span></p>
    </article>
}