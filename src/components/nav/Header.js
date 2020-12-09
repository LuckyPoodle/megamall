import React,{useState} from 'react'
import { Menu ,Badge } from 'antd';
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined
  } from "@ant-design/icons";
import {Link} from 'react-router-dom';

import { useDispatch ,useSelector} from "react-redux";
//we have to access history like this because HEADER IS NOT IN BROWSER ROUTE 
import { useHistory } from "react-router-dom";

import firebase from "firebase";
import Logo from '../logo/Logo';

import Search from "../forms/Search";

  
const { SubMenu, Item } = Menu;


const Header = () => {
 
    const [current,setCurrent]=useState('');//default empty value
    //current is name of our state, is set to whichever you click
    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
        //update state when an item is clicked
      };


      let dispatch = useDispatch();
      let history = useHistory();
      //we can destructure state to user (user because in reducer you name it user)
      let { user, cart } = useSelector((state) => ({ ...state }));
    

      const logout = () => {
        firebase.auth().signOut();

        //update redux state. We have LOGOUT as action type in reducer
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        history.push("/login");
      };
    


    
      //bootstrap class name float-right
    return (
      <>
      <Logo key="logo" />
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
         
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        
        </Item>

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>
  
        {!user && <Item key="register" icon={<UserAddOutlined />} className="float-right">
            <Link to="/register">Register</Link>
        </Item>}
  
       
          {!user &&   <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
        </Item>
}
       

        {user && 
        <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-right">


        {user && user.role==='subscriber' &&  (<Item ><Link to="/user/history" >Dashboard</Link></Item>)}
        {user && user.role==='admin' &&  (<Item ><Link to="/admin/dashboard" >Dashboard</Link></Item>)}

          <Item icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Item>
        </SubMenu>}
    <span key="searchspan" className="float-right p-1">
      <Search />
    </span>
      </Menu>
      
      </>
    )
}

export default Header
