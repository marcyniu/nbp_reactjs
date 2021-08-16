import React from "react";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    // This method is important for ReactJS but not used right now
    componentDidMount = () => {}

    render = () => {
        return <div>
                <h2>Welcome to - NBP currency conversion rates in ReactJS</h2>
            </div>
    }
}


export default Home;
