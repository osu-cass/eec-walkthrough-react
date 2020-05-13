import React from 'react'
import ResourceTidbit from './ResourceTidbit'

class ResourceCard extends React.Component {
    state = {
        tidbits: [],
        loaded: false
    }

    componentDidMount() {
        fetch(`/cards/resources/${this.props.categoryid}`)	//gets all tdibits for this card
            .then(res => res.json())
            .then(tidbits => this.setState({ tidbits: tidbits }))
            .then(() => this.setState({ loaded: true }));
    }

    generateTidbits() {
        let jsx = this.state.tidbits.map((tidbit) => {
            return (
                <ResourceTidbit
                    resourceType={tidbit.ResourceType}
                    URL={tidbit.LinkURL}
                    URLText={tidbit.LinkText}
                    description={tidbit.Description}
                />
            );
        });
        return jsx;
    }

    render() {
        return this.state.loaded && (
            <div className={`my-2 pl-3 pt-2 bg-light card rounded shadow-sm ${this.props.checkFilter}`}>
                <div
                    id="header"
                    className="d-flex justify-content-between border-bottom border-gray"
                >
                    <div>
                        <h5 className='font-weight-bold'>{this.props.category}</h5>
                        {this.generateTidbits()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResourceCard
