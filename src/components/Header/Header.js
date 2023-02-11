import "./Header.css";

const Header = ({onClick}) => {
    const tabs = ["React", "Vue", "Angular"];

    return (
        <nav id="navbar">
            <ul id="navbar-list">
                {tabs.map((item, index) => (
                    <li className="navbar-item" key={index} onClick={onClick}><span>{item}</span></li>
                ))}
            </ul>
        </nav>
    )
}

export default Header