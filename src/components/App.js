import React from 'react';
import NavBar from './NavBar';
import SubjectCard from './SubjectCard';
import SubjectIntro from './SubjectIntro';
import Card from './Card';
import CardData from './CardData'
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="container">
                    <SubjectCard 
                        subject="Compressed Air"
                    />
                    <SubjectIntro
                        header="Compressed air is a common utility found in most industrial facilities" 
                        description="Compressed air has been a key industrial utility since the 1800's. It can drive pneumatic cylinders, air motors, diaprham pumps and controls. It is capable of reasonably high force actuation, and is a common required utility in equipment packages. It can be used and is often misused to generate air flow for agitation, blow-off, cooling, and motive force applications. Screw compressors currently comprise the majority of industrial compressed air installations, but reciprocating and centrifugal compressors can be found in older or special installations/applications."
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
                </div>
            </div>
        );
    }
}

export default App;