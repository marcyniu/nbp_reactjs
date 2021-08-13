import React from "react";

class TableA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isLoading: false,
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
                    isLoading: false,
                    error
                }
            );
        }
        
    }

    // This method is important for ReactJS but not used right now
    componentDidMount = () => {}

    getData = () => {
        this.setState({
            isLoaded: false,
            isLoading: true
        });

        //fetch data:
        this.fetchTableJsonData('A').then(result => {
            if (typeof result !== 'undefined' && typeof result[0] !== 'undefined') {
                this.setState({
                    isLoaded: true,
                    isLoading: false,
                    no: result[0].no,
                    effectiveDate: result[0].effectiveDate,
                    table: result[0].table,
                    rates: result[0].rates
                })
            }
        });
    }

    displayTable = () => {
        const {isLoaded, isLoading, error, effectiveDate, no, table, rates} = this.state;
        return (
            <div>
                <br></br>

                <button type="button" className="btn btn-primary" onClick={this.getData}>Get data</button>

                <br></br>
                <br></br>

                {
                            // When - no data:
                            !isLoaded &&
                                <h1><br></br></h1>
                }

                {
                            // When - loading...:
                            isLoaded && !isLoading &&
                                <h1>Table: <b>{table} #{no}</b> date: <b>{effectiveDate}</b></h1>
                }
            
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>Currency</th>
                            <th>Code</th>
                            <th>Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Table:
                            isLoaded &&
                                    rates.map((rate, idx) => (
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
                                    ))
                        }

                        {
                            // When - no data:
                            !isLoaded && !isLoading &&
                                <tr><td colSpan="3">No data...</td></tr>        
                        }

                        {
                            // When - loading...:
                            !isLoaded && isLoading &&
                                <tr><td colSpan="3">Loading...</td></tr>
                        }

                        {
                            // When - error:
                            isLoaded && error &&
                                <tr><td colSpan="3" style={{color: "#FF0000"}}>Error: {error.message}</td></tr>
                        }                      
                    </tbody>
                </table>
            </div>
        );  
    }


    render = () => {
        return this.displayTable()
    }
}


export default TableA;
