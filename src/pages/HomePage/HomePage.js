import {useEffect, useState} from 'react'
import {Header, RepositoryList} from '../../components';
import "./HomePage.css";

const HomePage = () => {
    const [tab,
        setTab] = useState("angular");
    const [gitRepos,
        setGitRepos] = useState([]);
    const [currentPage,
        setCurrentPage] = useState(1);
    const [totalRecords,
        setTotalRecords] = useState(0);
    const [pageNumbers,
        setPageNumbers] = useState([]);
    const [active,
        setActive] = useState(0);
    const perPage = 10;

    const navigate = (item) => {
        setActive(item);
        setCurrentPage(item);
    }

    const getGitRepos = async() => {
        const query = `q=${tab}&sort=forks&order=desc&per_page=${perPage}&page=${currentPage}`;
        const reposUrl = `https://api.github.com/search/repositories?q=${query}`;

        const gitReposFromServer = await fetch(reposUrl);
        const data = await gitReposFromServer.json();
        setTotalRecords(data.total_count);
        setPageNumbers([...Array(Math.ceil(totalRecords / perPage)).keys()].slice(1));
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
            <RepositoryList data={gitRepos}/>
            <ul id="repository-list-pagination">
                {pageNumbers.map((item) => (
                    <li
                        key={item}
                        onClick={() => navigate(item)}
                        className={active === item
                        ? 'active'
                        : ''}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage