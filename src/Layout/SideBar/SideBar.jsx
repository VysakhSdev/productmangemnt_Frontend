import React from "react";
import MenuItem from "./MenuItem";

function Sidebar() {
  const menus = [

   
  
    { title: "Products", icon: "fab fa-product-hunt", route:"/" },
    
  ];

  return (
    <>
      <div className="vertical-menu" style={{ width: "250px" }}>
        <div data-simplebar className="h-100">
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              {menus.map((menu, index) => {
                return <MenuItem key={index} menu={menu} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
