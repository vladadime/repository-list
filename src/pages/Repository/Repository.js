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
        const gitReposFromServer = await fetch(repoUrl + "/contributors");
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
        <div>
            <h1>Repository: {repositoryName}</h1>
            {Object
                .keys(gitRepo)
                .length && <div>
                    <div>{gitRepo.name}</div>
                    <div>{gitRepo.stargazers_count}</div>
                    <div>{gitRepo.forks_count}</div>
                    <div>{gitRepo.owner.login}</div>
                    <div>{gitRepo.owner.avatar_url}</div>
                    <div>{gitRepo.open_issues_count}</div>
                    <h3>Contributors:</h3>
                    {contributors.map((item) => (
                        <div key={item.id}>
                            <span>{item.login}</span>
                        </div>
                    ))}
                    <h3>Languages:</h3>
                    {Object
                        .keys(languages)
                        .map((item, index) => (
                            <div key={index}>
                                <span>{item}</span>
                            </div>
                        ))}
                </div>
}
        </div>
    )
}

export default Repository
