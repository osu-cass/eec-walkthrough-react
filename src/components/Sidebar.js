import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
		onDismiss = () => {
			this.props.handleSidebar();
		}

    render() {
        return (
            <div className={"wrapper "+this.props.className}>
                <nav id="sidebar">
                    <div id="dismiss" onClick={this.onDismiss}>
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
        );
    }
}

export default Sidebar;
