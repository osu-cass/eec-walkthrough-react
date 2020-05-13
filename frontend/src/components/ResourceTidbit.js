import React from 'react'
import Edit from './Edit'
import BulletPoint from './BulletPoint'

class ResourceTidbit extends React.Component {
    render() {
        return (
            <div className="mt-2">
                <div className={`mb-2`}>
                    <i className={`fas fa-info  mr-2`}></i>
                    <span>
                        {this.props.resourceType}
                    </span>
                    <div className='pl-5 mt-2'>

                        <i className="fas fa-copy mr-2" /><a href={this.props.URL} className="text-primary"> {this.props.URLText} </a> <br></br>
                        {this.props.description}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResourceTidbit
