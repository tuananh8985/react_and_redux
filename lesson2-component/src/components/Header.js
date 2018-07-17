import React, { Component } from 'react';

class Header extends Component{
    render(){
        return (
           <nav className="navbar navbar-inverse">
               <a className="navbar-brand">Bai 2:Component</a>
               <ul className="nav navbar-nav">
                   <li>
                       <a>Trang chu</a>
                   </li>
                   <li className="active">
                       <a>Danh muc san pham</a>
                   </li>
               </ul>
           </nav>
          );
    }
}

export default Header;