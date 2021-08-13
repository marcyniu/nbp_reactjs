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

    fetchTableJsonData = async (tableName) => {
        try {
            let url = 'http://api.nbp.pl/api/exchangerates/tables/' + tableName + '/?format=json'
            let response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('HTTP error! status: ' + response.status + '. Original message: ' + response.statusText);
            }
        } catch(error) {
            this.setState(
                {
                    isLoaded: true,
                    error
                }
            );
        }
        
    }

    componentDidMount = () => {
        //fetch data:
        this.fetchTableJsonData('A').then(result => {
            if (typeof result !== 'undefined' && typeof result[0] !== 'undefined') {
                this.setState({
                    isLoaded: true,
                    no: result[0].no,
                    effectiveDate: result[0].effectiveDate,
                    table: result[0].table,
                    rates: result[0].rates
                })
            }
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
                        {rates.map((rate, idx) => (
                            <tr key={idx}>
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
