import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./Repository.css";

const Repository = () => {
    const params = useParams();
    const [gitRepo,
        setGitRepo] = useState({});
    const [contributors,
        setContributos] = useState([]);
    const [languages,
        setLanguages] = useState([]);
    const user = params.user;
    const repositoryName = params.repo;
    const repoUrl = `https://api.github.com/repos/${user}/${repositoryName}`;

    const getGitRepository = async() => {
        const gitReposFromServer = await fetch(repoUrl);
        const data = await gitReposFromServer.json();
        setGitRepo(data);
    };

    const getContributors = async() => {
        const gitReposFromServer = await fetch(repoUrl + "/contributors?q=per_page=10");
        const data = await gitReposFromServer.json();
        setContributos(data);
    };

    const getLanguages = async() => {
        const gitReposFromServer = await fetch(repoUrl + "/languages");
        const data = await gitReposFromServer.json();
        setLanguages(data);
    };

    useEffect(() => {
        getGitRepository();
        getContributors();
        getLanguages();
    }, []);

    return (
        <div id="repository-page">
            {Object
                .keys(gitRepo)
                .length && <div id="repository-container">
                    <div id="repository-info-container">
                        <div id="profile-picture-container">
                            <img id="profile-picture" src={gitRepo.owner.avatar_url} alt="User Avatar"/>
                        </div>
                        <div id="repository-info">
                            <div id="repository-name">Repository name:{gitRepo.name}</div>
                            <div id="repository-stats">
                                <div className="repo-stat">
                                    <span className="repo-label-title">Username: </span>
                                    <span className="repo-stat-value">{gitRepo.owner.login}</span>
                                </div>
                                <div className="repo-stat">
                                    <span className="star-icon">&#9733;</span>
                                    <span className="repo-stat-value">{gitRepo.stargazers_count} stars</span>
                                </div>
                                <div className="repo-stat">
                                    <span className="fork-icon">&#9282;</span>
                                    <span className="repo-stat-value">{gitRepo.forks_count} forks</span>
                                </div>
                                <div className="repo-stat">
                                    <span className="repo-label-title">Open Issues:</span>
                                    <span className="repo-stat-value">{gitRepo.open_issues_count} issues</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="languages-list">
                        <h2>Programming Languages:</h2>
                        {Object
                            .keys(languages)
                            .map((item, index) => (
                                <div className="language" key={index}>{item}</div>
                            ))}
                    </div>

                    <div id="contributors-list">
                        <h2>Contributors:</h2>
                        {contributors.map((item) => (
                            <div className="contributor" key={item.id}>
                                <img
                                    className="contributor-avatar"
                                    src={item.avatar_url}
                                    alt="Contributor Avatar"/>
                                <div className="contributor-name">{item.login}</div>
                            </div>
                        ))}
                    </div>
                </div>}
        </div>
    )
}

export default Repository
