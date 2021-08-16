import React from "react";

class ConversionTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pickedTable: 'A',
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
        this.fetchTableJsonData(this.state.pickedTable).then(result => {
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

    handleSelectChange = (event) => {
        this.setState({
            pickedTable: event.target.value,
            isLoaded: false,
            rates: []
        });
    }

    displayTable = () => {
        const {isLoaded, isLoading, error, effectiveDate, no, pickedTable, rates} = this.state;
        return (
            <div>
                <br></br>

                <div className="mb-3 row">
                    <label className="col-sm-1 col-form-label">Picke table:</label>
                    <div className="col-sm-1">
                        <select className="form-select" value={this.state.pickedTable} onChange={this.handleSelectChange}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={this.getData}>Get courses</button>
                    </div>
                </div>              

                <br></br>

                {
                    // When - no data:
                    !isLoaded &&
                        <h1><br></br></h1>
                }

                {
                    // When - loading...:
                    isLoaded && !isLoading &&
                        <h1>Table: <b style={{color: "#0d6efd"}}>{no}</b> &nbsp;&nbsp;&nbsp; efective date: <b style={{color: "#0d6efd"}}>{effectiveDate}</b></h1>
                }
                <table className="table">
                    <thead className="table-dark">

                    {
                        // Table head:
                        pickedTable === 'C'
                        ? <tr>
                            <th>Currency</th>
                            <th>Code</th>
                            <th>Ask</th>
                            <th>Bid</th>
                          </tr>
                        : <tr>
                            <th>Currency</th>
                            <th>Code</th>
                            <th>Course</th>
                          </tr>
                    }
            
                    </thead>
                    <tbody>

                    {
                        // Table body:
                        pickedTable === 'C'
                        ? rates.map((rate, idx) => (
                            <tr key={idx}>
                                <td>{rate.currency}</td>
                                <td>{rate.code}</td>
                                <td>{rate.ask}</td>
                                <td>{rate.bid}</td>
                            </tr>
                        ))
                        : rates.map((rate, idx) => (
                            <tr key={idx}>
                                <td>{rate.currency}</td>
                                <td>{rate.code}</td>
                                <td>{rate.mid}</td> 
                            </tr>
                        ))
                    }
                
                    {
                        // When - no data:
                        !isLoaded && !isLoading &&
                            <tr><td colSpan="4">No data...</td></tr>        
                    }

                    {
                        // When - loading...:
                        !isLoaded && isLoading &&
                            <tr><td colSpan="4">Loading...</td></tr>
                    }

                    {
                        // When - error:
                        isLoaded && error &&
                            <tr><td colSpan="4" style={{color: "#FF0000"}}>Error: {error.message}</td></tr>
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


export default ConversionTable;
