import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context'
import './NavLinks.css';
import { useHistory } from 'react-router-dom';
const NavLinks = props => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  function onLgout() {
    console.log(history)
    auth.logout()
    history.push('/auth')

  }
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>主页</NavLink>
    </li>
    {auth.isLoggedIn && (<> <li>
      <NavLink to="/profile">个人信息</NavLink>
    </li>
      <li>
        <NavLink to="/mypost">我的发布</NavLink>
      </li>
      <li>
        <NavLink to="/create">创建发布</NavLink>
      </li></>
    )}



    {/* <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li> */}

    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">登录/注册</NavLink>
      </li>
    )}

    {auth.isLoggedIn && (
      <li>
        <button onClick={onLgout}>下线</button>
      </li>
    )}
  </ul>
};

export default NavLinks;