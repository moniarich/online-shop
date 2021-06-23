import React, { useState } from "react";
import { Nav, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";


const Menu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Nav pills className="Logo">
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret style={{color: "#fff",backgroundColor:"#011a00", fontFamily:"Roboto"}}>
            Menu
          </DropdownToggle>
          <DropdownMenu style={{color:"#011a00", direction: "unset"}}>
                <DropdownItem header style={{color:"#011a00", direction: "unset", fontFamily:"Roboto"}}>Hemp Oil</DropdownItem>
                <DropdownItem > <a href={`/product/4`} style={{color:"#011a00", direction: "unset"}}>Hempdew</a></DropdownItem>
                <DropdownItem><a href={`/product/5`} style={{color:"#011a00", direction: "unset"}}>Green Stem</a></DropdownItem>
                <DropdownItem divider />
                <DropdownItem header style={{color:"#011a00", direction: "unset", fontFamily:"Roboto"}}> Hemp Tablets</DropdownItem>
                <DropdownItem><a href={`/product/6`} style={{color:"#011a00", direction: "unset"}}>Hofigal</a></DropdownItem>
                <DropdownItem><a href={`/product/7`} style={{color:"#011a00", direction: "unset"}}>Bulk CBD Oil Softgels</a></DropdownItem>
                <DropdownItem divider/>
                <DropdownItem header style={{color:"#011a00", direction: "unset", fontFamily:"Roboto"}}>Ointment</DropdownItem>
                <DropdownItem><a href={`/product/8`} style={{color:"#011a00", direction: "unset"}}>Puraganic</a></DropdownItem>
                <DropdownItem><a href={`/product/9`} style={{color:"#011a00", direction: "unset"}}>GreenPeople</a></DropdownItem>
                <DropdownItem><a href={`/product/10`} style={{color:"#011a00", direction: "unset"}}>Hemp Healing Skin Ointment</a></DropdownItem>
                <DropdownItem><a href={`/product/11`} style={{color:"#011a00", direction: "unset"}}>Neviss</a></DropdownItem>
                <DropdownItem divider/>
                <DropdownItem header style={{color:"#011a00", direction: "unset", fontFamily:"Roboto"}}>Hemp sweets</DropdownItem>
                <DropdownItem><a href={`/product/1`}style={{color:"#011a00", direction: "unset"}}>Premium Hemp Gummies</a></DropdownItem>
                <DropdownItem><a href={`/product/2`}style={{color:"#011a00", direction: "unset"}}>Organic Hemp Chocolate</a></DropdownItem>
                <DropdownItem><a href={`/product/3`}style={{color:"#011a00", direction: "unset"}}>Infused Gummies</a></DropdownItem>
                <DropdownItem divider/>
              </DropdownMenu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default Menu;
