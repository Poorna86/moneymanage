import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../../actions/auth';
import { history } from '../../routers/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <Navbar className="Navbar-bg" expand="lg">
                    <Navbar.Brand href="/">Money Manage</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-5">
                            {history.location.pathname==='/' ? 
                                <Nav.Link as={Link} to="/">Home</Nav.Link> : 
                                <Nav.Link as={Link} to="/dashboard">dashboard</Nav.Link>} 
                            {history.location.pathname==='/dashboard' && <Nav.Link  as={Link} to="/create">add</Nav.Link>}
                            <Nav.Link>
                                <button className="signupBtn active" onClick={this.Authorization}> 
                                    {history.location.pathname==='/' ? 'Login' : 'Logout'} 
                                </button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {history.location.pathname==='/' && 
                  <div className="Nav-header">
                    <h3 className="font-weight-bold">Money Management Application</h3>
                    <p className="text-indent"> It is used to the people who do regular money exchange and no need to save in any local desktop or mobile or physical notepad. It is user friendly for the people who regularly doing money transactions like giving or borrowing money</p>
                  </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()),
    startLogout: () => dispatch(startLogout())
 })

 export default connect(undefined,mapDispatchToProps)(NavbarPage);