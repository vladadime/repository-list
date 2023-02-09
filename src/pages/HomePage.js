import {useEffect, useState} from 'react'
import {Header, RepositoryList} from '../components';

const HomePage = () => {
    const [tab,
        setTab] = useState("angular");
    const [gitRepos,
        setGitRepos] = useState([]);

    const getGitRepos = async() => {
        const query = `q=${tab}&sort=forks&order=desc`;
        const reposUrl = `https://api.github.com/search/repositories?q=${query}`;

        const gitReposFromServer = await fetch(reposUrl);
        const data = await gitReposFromServer.json();
        setGitRepos(data.items);
    }

    const changeTab = (event) => {
        const tabName = event.target.innerText.toLowerCase();
        if(tab !== tabName) {
            setTab(tabName);
        }
    } 
    
    useEffect(() => {
        getGitRepos();
    }, [tab]);

    return (
        <div>
            <Header onClick={(event) => changeTab(event)}/>
            <RepositoryList data={gitRepos}/>
        </div>
    );
}

export default HomePage