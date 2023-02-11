import {Link} from "react-router-dom";
import "./RepositoryList.css";

const RepositoryList = ({data}) => {

    return (
        <div id="repository-list">
            <div id="title">
                <h1>Repository list</h1>
            </div>
            <div id="list">
                {data && data.map((item) => (
                    <div id="repository-card" key={item.id}>
                        <Link
                            className="repo-card-item"
                            to={`/repository/${item.owner.login}/${item.name}`}>{item.name}</Link>
                        <div className="repo-card-item"><span className="star-icon">&#9733;</span> <span>{item.stargazers_count} stars</span></div>
                        <div className="repo-card-item"><span className="fork-icon">&#9282;</span> <span>{item.forks_count} forks</span></div>
                        <div className="repo-card-item">Username: {item.owner.login}</div>
                        <img width="50px" height="50px" src={item.owner.avatar_url} alt={item.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RepositoryList