import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../../actions/auth';
import { history } from '../../routers/AppRouter';

class NavbarPage extends React.Component {
   constructor(props) {
      super(props)
   }
   state = {
       clicked: false,
   }
   Authorization = event => {
      {history.location.pathname==='/' ? 
        this.props.startLogin() :
        this.props.startLogout()}
      event.preventDefault();
   }
   handleClick = () => {
       this.setState ({clicked: !this.state.clicked})
   }

    render() {
    return (
        <div>
           <nav className="NavbarItems ">
               <h1 className="navbar-logo">Money Manage <i className="fab fa-react" ></i></h1>
               <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fa fa-times' : 'fa fa-bars'}></i>
               </div> 
               <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                  <li className="nav-links">
                     <NavLink to="/" className="is-active" exact={true}>Home </NavLink>
                  </li> 
                  <li className="nav-links">
                     <NavLink to="/create" className="is-active" >Add </NavLink>
                  </li>
                  <li className="nav-links">
                     <NavLink to="/edit" className="is-active" >Edit </NavLink>
                  </li>
                  <li className="nav-links">
                     <NavLink to="/help" className="is-active" >Help</NavLink>
                  </li>
                  <li className="nav-links-mobile">
                     <button className="signupBtn active" onClick={this.Authorization}> 
                        {history.location.pathname==='/' ? 'Login' : 'Logout'} 
                     </button>
                  </li>
               </ul> 
           </nav>      
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
   startLogin: () => dispatch(startLogin()),
   startLogout: () => dispatch(startLogout())
})

export default connect(undefined,mapDispatchToProps)(NavbarPage);