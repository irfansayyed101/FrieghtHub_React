import React, {Component} from 'react';
import '../components/css/header.css';

class Header extends Component {
    render(){
        return (
            <div className="container-fluid" id="headerBG">
                <div id="header">
                    <div className="logo">
                    <img  src="https://freighthub.com/wp-content/themes/freighthub/img/logo/logo.svg" width="183px" height="25px" title="ANZ Logo" alt="ANZ Logo"/> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
