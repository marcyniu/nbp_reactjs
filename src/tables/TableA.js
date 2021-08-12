import React from "react";

class TableA extends React.Component {

    componentDidMount = () => {
        console.log('componentDidMount');
        fetch('http://api.nbp.pl/api/exchangerates/tables/A/')
            .then(data => {
                console.log(data)
            })
    }

    render = () => {
        return <h1>This is my table.</h1>;
    }
}


export default TableA;
