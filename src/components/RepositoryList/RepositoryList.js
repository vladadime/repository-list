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
                    <div className="repository-card" key={item.id}>
                        <div className="repository-card-header">
                            <img className="user-avatar" src={item.owner.avatar_url} alt={item.name} />
                            <h3 className="username">{item.owner.login}</h3>
                        </div>
                        <div className="repository-card-body">
                            <Link to={`/repository/${item.owner.login}/${item.name}`}><h2 className="repo-name">{item.name}</h2></Link>
                            <div className="repo-stats">
                                <span className="fork-count"><p className="fork-icon">&#9282;</p> {item.forks_count} forks</span>
                                <span className="star-count"><p className="star-icon">&#9733;</p> {item.stargazers_count} stars</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RepositoryList