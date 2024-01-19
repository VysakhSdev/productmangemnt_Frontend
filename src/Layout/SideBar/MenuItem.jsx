import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";

function MenuItem({ menu }) {
  const navigate = useNavigate();

  if (menu.subs) {
    return <MenuDropdown menu={menu} />;
  }

  return menu.icon ? (
    <li className='sidebar-item'>
      <a 
        href={undefined}
        className="waves-effect"
        onClick={() => {
          return navigate(`${menu.route}`);
        }}>
        <i className={menu.icon} />
        <span>{menu.title}</span>
      </a>
    </li>
  ) : (
    <li className="menu-title" key="t-apps">
      {menu.title}
    </li>
  );
}

export default MenuItem;
