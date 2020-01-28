import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
    state = {
        active: false
    }

    componentDidMount(){
        this.setState({active: !this.state.active});
    }

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper">
                <nav id="sidebar" className={this.state.active ? 'active' : ''}>
                    <div id="dismiss" onClick={() => this.setState({active: !this.state.active})}>
                        <i className="fas fa-arrow-left"></i>
                    </div>

                    <div className="sidebar-header">
                        <h3>Directory</h3>
                    </div>

                    <ul className="list-unstyled components">
                        <li>
                            <a href="#">Subjects</a>
                            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                            <ul className="collapse list-unstyled" id="pageSubmenu">
                                <li>
                                    <a href="#">Compressed Air</a>
                                </li>
                                <li>
                                    <a href="#">Steam</a>
                                </li>
                                <li>
                                    <a href="#">Stuff</a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="list-unstyled CTAs">
                        <li>
                            <a href="#" className="article">Back to Page</a>
                        </li>
                    </ul>
                </nav>

            </div>
                <div className={this.state.active ? 'overlay active': 'overlay'} onClick={() => this.setState({active: !this.state.active})}></div>
            </div>
        );
    }
}

export default Sidebar;