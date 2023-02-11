import {useEffect, useState} from 'react'
import {Header, Pagination, RepositoryList} from '../../components';
import "./HomePage.css";

const HomePage = () => {
    const [tab,
        setTab] = useState("vue");
    const [gitRepos,
        setGitRepos] = useState([]);
    const [currentPage,
        setCurrentPage] = useState(1);
    const [totalRecords,
        setTotalRecords] = useState(0);

    const perPage = 10;

    const getGitRepos = async() => {
        const query = `q=${tab}&sort=forks&order=desc&per_page=${perPage}&page=${currentPage}`;
        const reposUrl = `https://api.github.com/search/repositories?q=${query}`;

        const gitReposFromServer = await fetch(reposUrl);
        const data = await gitReposFromServer.json();
        setTotalRecords(data.total_count);
        setGitRepos(data.items);
    }

    const changeTab = (event) => {
        const tabName = event
            .target
            .innerText
            .toLowerCase();
        if (tab !== tabName) {
            setTab(tabName);
        }
    }

    useEffect(() => {
        getGitRepos();
    }, [tab, currentPage]);

    return (
        <div>
            <Header onClick={(event) => changeTab(event)}/>
            <RepositoryList data={gitRepos}/> {totalRecords && <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalRecords={totalRecords}
                perPage={perPage}/>}
        </div>
    );
}

export default HomePage