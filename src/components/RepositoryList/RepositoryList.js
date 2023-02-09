import {Link} from "react-router-dom";
import "./RepositoryList.css";

const RepositoryList = ({data}) => {

    return (
        <div id="repository-list">
            <h1>Repository list</h1>
            {data.length && data.map((item) => (
                <div id="repository-card" key={item.id}>
                    <Link
                        className="repo-card-item"
                        to={`/repository/${item.owner.login}/${item.name}`}>{item.name}</Link>
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