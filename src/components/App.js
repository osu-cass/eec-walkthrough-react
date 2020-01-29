import React from 'react';
import NavBar from './NavBar';
import SubjectCard from './SubjectCard';
import SubjectIntro from './SubjectIntro';
import Card from './Card';
import CardData from './CardData'
import Filter from './Filter';

import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './App.css'
import BulletPoint from './BulletPoint';
import Sidebar from './Sidebar';

class App extends React.Component {
    state = {
        sidebarVisible: false,
				cards: []
    }

    handleSidebar = () => {
        this.setState({sidebarVisible: !this.state.sidebarVisible});
    }
  
		componentDidMount(){
			//For each card, take its category and assign if its hidden or visible
			CardData.map((cat, i) => {
				let data = {
					category: cat.category,
					hidden: false 
				};
				console.log(this.state.cards);
				var merged = this.state.cards.concat(data);
				console.log(merged);
				this.setState({ cards: merged });	

			});
		}

    render() {
        return (
            <div>
                <NavBar handleSidebar={this.handleSidebar} />
								<button className='btn btn-primary' onClick={() => console.log(this.state.cards)}>Check State</button>	
							{/* Fix the transition on this someday */}
								<Sidebar  
									className={(this.state.sidebarVisible) ? "show" : "hidden"}
									handleSidebar={this.handleSidebar}
								/>
                <div className="container">
                    <SubjectCard 
                        subject="Compressed Air">
                        <Filter />
                    </SubjectCard>
                    <SubjectIntro
                        header="Compressed air is a common utility found in most industrial facilities" 
                        description="Compressed air has been a key industrial utility since the 1800's. It can drive pneumatic cylinders, air motors, diaprham pumps and controls. It is capable of reasonably high force actuation, and is a common required utility in equipment packages. It can be used and is often misused to generate air flow for agitation, blow-off, cooling, and motive force applications. Screw compressors currently comprise the majority of industrial compressed air installations, but reciprocating and centrifugal compressors can be found in older or special installations/applications."
                        img='aircompressor.png'
                    />

                    {/* For each Category/Card */}
                    {
                        CardData.map((cat, i) => {
                            return(
                                <div>
                                    <Card
                                        category={cat.category}
                                        icon={cat.icon}
                                        description={cat.description}
                                    />
                                </div>
                            )
                        })
                    }

                    <SubjectCard
                        subject="Opportunities to Consider"
                    />
                </div>
            </div>
        );
    }
}

export default App;
