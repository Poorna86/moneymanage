import React from 'react';
import NavBarPage from './Navbar/NavBarBootstrap';

class HomePage extends React.Component {
    componentDidMount() {
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
          };
    };
    render () {
        return(
            <div>
                <NavBarPage />
            </div>
        );
    }
}

export default HomePage;