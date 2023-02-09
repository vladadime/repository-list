import "./Header.css";

const Header = () => {
    return (
        <header id="header">
            <ul id="tabs">
                <li className="tab-item">React</li>
                <li className="tab-item">Vue</li>
                <li className="tab-item">Angular</li>
            </ul>
            <hr/>
        </header>
    )
}

export default Header