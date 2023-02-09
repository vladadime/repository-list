import {useEffect, useState} from 'react'
import {Header, RepositoryList} from '../components';

const HomePage = () => {

    const [gitRepos,
        setGitRepos] = useState([]);

    useEffect(() => {
        const getGitRepos = async() => {
            const query = `q=react&sort=forks&order=desc`;
            const reposUrl = `https://api.github.com/search/repositories?q=${query}`;

            const gitReposFromServer = await fetch(reposUrl);
            const data = await gitReposFromServer.json();
            setGitRepos(data.items);
        }
        getGitRepos();
    }, []);

    return (
        <div>
            <Header/>
            <RepositoryList data={gitRepos}/>
        </div>
    );
}

export default HomePage