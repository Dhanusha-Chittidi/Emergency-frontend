import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Styled components

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  margin-left: 0;
  background-color: #008080;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 2px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 5px;
`;

const AppName = styled.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const NavItems = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 30px;

  @media screen and (max-width: 600px) {
    display: none; /* Hide the regular navigation items on small screens */
  }
`;

const NavItem = styled(NavLink)`
  color: white;
  margin-right: 20px;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  border-bottom: 3px solid transparent;

  &:hover {
    background-color: #fff;
    color: #008080;
  }

  &.active {
    border-color: white;
  }
`;

const MenuIcon = styled.div`
  display: none;

  @media screen and (max-width: 600px) {
    display: block;
    font-size: 30px;
    color: white;
    cursor: pointer;
    margin-left: auto;
    margin-right : 30px;
  }
`;

const MobileMenuNav = styled.nav`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  right: 50px;
  background-color: rgb(0,128,128);
  border-radius: 8px;
  padding: 10px;
    z-index: 101;
  @media screen and (min-width: 601px) {
    display: none; 
  }
`;

const MenuList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: block;
  padding: 10px;

  &:hover {
    color: #ddd;
  }
`;

// Navbar component
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <NavbarContainer>
      <LogoContainer>
        <Logo src="./images/logo.jpeg" alt="CrisisAid Logo" />
        <AppName>EmergenSure</AppName>
      </LogoContainer>
      
      {/* Regular Nav Items (visible on larger screens) */}
      <NavItems>
        <NavItem to="/">Medicals</NavItem>
        <NavItem to="/disaster">Disasters</NavItem>
      </NavItems>

      {/* Mobile Menu Icon (visible on smaller screens) */}
      <MenuIcon onClick={toggleMenu}>
        &#9776;
      </MenuIcon>

      {/* Mobile Menu (visible on smaller screens when the menu icon is clicked) */}
      <MobileMenuNav isOpen={isMenuOpen}>
        <MenuList>
          <li>
            <MenuItem to="/" onClick={closeMenu}>Medicals</MenuItem>
          </li>
          <li>
            <MenuItem to="/disaster" onClick={closeMenu}>Disasters</MenuItem>
          </li>
        </MenuList>
      </MobileMenuNav>
    </NavbarContainer>
  );
};
