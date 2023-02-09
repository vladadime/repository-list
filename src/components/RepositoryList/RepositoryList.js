import "./RepositoryList.css";

const RepositoryList = ({data}) => {

  return (
    <div id="repository-list">
        <h1>Repository list</h1>
        {data.length}
        {data.length && data.map((item) => (
            <div id="repository-card" key={item.id}>
                <div className="repo-card-item">{item.name}</div>
                <div className="repo-card-item">Stars: {item.stargazers_count}</div>
                <div className="repo-card-item">Forks: {item.forks_count}</div>
                <div className="repo-card-item">Username: {item.owner.login}</div>
                <div className="repo-card-item">Avatar: {item.owner.avatar_url}</div>
            </div>
        ))}
    </div>
  )
}

export default RepositoryList