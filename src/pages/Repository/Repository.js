import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const Repository = () => {
    const params = useParams();
    const [gitRepo,
        setGitRepo] = useState({});
    const user = params.user;
    const repositoryName = params.repo;
    const repoUrl = `https://api.github.com/repos/${user}/${repositoryName}`;

    const getGitRepository = async() => {
        const gitReposFromServer = await fetch(repoUrl);
        const data = await gitReposFromServer.json();
        setGitRepo(data);
    };

    useEffect(() => {
        getGitRepository();
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
                </div>
}
        </div>
    )
}

export default Repository
