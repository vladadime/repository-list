import {useEffect, useState} from 'react'
import {Header, Pagination, RepositoryList} from '../../components';
import "./HomePage.css";

const sortValues = [
    {
        sortBy: "forks",
        orderBy: "asc",
        value: "fa",
        text: "By fork count ascending"
    }, {
        sortBy: "forks",
        orderBy: "desc",
        value: "fd",
        text: "By fork count descending"
    }, {
        sortBy: "stars",
        orderBy: "asc",
        value: "sa",
        text: "By star count ascending"
    }, {
        sortBy: "stars",
        orderBy: "desc",
        value: "sd",
        text: "By star count descending"
    }
];

const HomePage = () => {
    const [tab,
        setTab] = useState("vue");
    const [gitRepos,
        setGitRepos] = useState([]);
    const [currentPage,
        setCurrentPage] = useState(1);
    const [totalRecords,
        setTotalRecords] = useState(0);
    const [sort,
        setSort] = useState("forks");
    const [order,
        setOrder] = useState("desc");

    const perPage = 10;

    const onSortSelect = (event) => {
        const sortVal = event.target.value;
        const currentSort = sortValues.find((item) => item.value === sortVal);
        if (currentSort) {
            setSort(currentSort.sortBy);
            setOrder(currentSort.orderBy);
        }
    }

    const getGitRepos = async() => {
        const query = `q=${tab}&sort=${sort}&order=${order}&per_page=${perPage}&page=${currentPage}`;
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
    }, [tab, currentPage, sort, order]);

    return (
        <div id="home-page">
            <Header onClick={(event) => changeTab(event)}/>
            <div id="content">
                <div id="repository-list-sort">
                    <div id="sort">
                        <span>Sort By:</span>
                        <select id="select-sort"
                            value={sort.substring(0, 1) + order.substring(0, 1)}
                            onChange={e => onSortSelect(e)}>
                            {sortValues.map((item, index) => (
                                <option key={index} value={item.value}>{item.text}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <RepositoryList data={gitRepos}/> 
                {totalRecords && <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalRecords={totalRecords}
                    perPage={perPage}/>}
            </div>
        </div>
    );
}

export default HomePage