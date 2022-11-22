import React from "react";
import "../resources/default-layout.css";
import {  Dropdown, Menu, Space } from "antd";
import { useNavigate } from "react-router-dom";


function DefaultLayout(props) {
    const nevigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("monthend-db-user"));

  const menu = (
    <Menu
      items={[
        {
          label: (
                <li onClick={()=>{
                    localStorage.removeItem('monthend-db-user');
                    nevigate('/login');

                }}>
                    Logout
                </li>
          ),
        }  

      ]}
    />
  );

  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-item-center">
        <div>
          <h1 className="logo">MontH EnD</h1>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className="btn">{user.name}</button>
          </Dropdown>
        </div>
      </div>

      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
