import React from "react";
import { useHistory } from "react-router-dom";
import { Itens } from "./itens-menu";
import { FaCat } from "react-icons/fa";

import "./header.css";

const Index = ({ isAuthenticated, setAuthentication }) => {
  const history = useHistory();

  const signOut = () => {
    window.localStorage.clear();
    setAuthentication(false);
  };
  return (
    <nav className="nav-items">
      <h1 className="nav-logo">
        Jumpy Cat <FaCat />
      </h1>
      <div className="menu-icon"></div>
      <ul className="menu-nav">
        {Itens.map((item, index) => {
          return (
            <li key={index}>
              {item.title === "Login" && isAuthenticated ? (
                <button className={item.class} onClick={signOut}>
                  Logout
                </button>
              ) : (
                <button
                  className={item.class}
                  onClick={() => {
                    history.push(item.url);
                  }}
                >
                  {item.title}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Index;
