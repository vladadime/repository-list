import "./Header.css";

const Header = ({onClick}) => {
    const tabs = ["React", "Vue", "Angular"];

    return (
      <header id="header">
          <ul id="tabs">
              {tabs.map((item, index) => (
                <li className="tab-item" key={index} onClick={onClick}>{item}</li>
              ))}  
          </ul>
          <hr />
      </header>
    )
  }

export default Header