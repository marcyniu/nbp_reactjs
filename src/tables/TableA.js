import React from "react";

class TableA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            effectiveDate: null,
            no: null,
            table: null,
            rates: []
        };
    }

    componentDidMount = () => {
        console.log('componentDidMount');
        fetch('http://api.nbp.pl/api/exchangerates/tables/A/?format=json')
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    no: result[0].no,
                    effectiveDate: result[0].effectiveDate,
                    table: result[0].table,
                    rates: result[0].rates
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    displayErrorMessage = () => {
        const { error } = this.state;
        return <div>Error: {error.message}</div>
    }

    displayLoadingMessage = () => (
        <div>Loading...</div>
    )

    displayTable = () => {
        const {effectiveDate, no, table, rates} = this.state;
        return (
            <div>
                <h1>Table {table} #{no} for {effectiveDate}</h1>
            
                <table>
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Code</th>
                            <th>Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map(rate => (
                            <tr key={rate.currency}>
                                <td>
                                    {rate.currency}
                                </td>
                                <td>
                                    {rate.code}
                                </td>
                                <td>
                                    {rate.mid}
                                </td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );  
    }

    render = () => {
        const { error, isLoaded } = this.state;
        if (error) {
            return this.displayErrorMessage()
        } else if (!isLoaded) {
            return this.displayLoadingMessage()
        } else {
            return this.displayTable()
        }
        
    }
}


export default TableA;
