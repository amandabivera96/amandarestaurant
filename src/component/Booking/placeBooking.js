import React,{Component} from 'react';
import Header from '../../Header';

const bookingurl="https://amandarest.herokuapp.com/placeorder";

class PlaceBooking extends Component{
    constructor(props){
        super(props)

        this.state={
        
            Restaurant:this.props.match.params.name,
            name:sessionStorage.getItem('username'),
            phone:'',
            address:''
        }
    }

    handleSubmit = () => {
        console.log(this.state)
        fetch(bookingurl,
            {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state)
            })
            .then(this.props.history.push('/viewbooking'))
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
        return(
            <React.Fragment>
                <Header/>
                <br/>
                <div className="container">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h4>Place Order</h4>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label>Restaurant Name</label>
                                <input name="Restaurant" value={this.state.Restaurant} readOnly className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input name="name" value={this.state.name} readOnly className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input name="phone" value={this.state.phone} className="form-control" onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input name="address" value={this.state.address} className="form-control" onChange={this.handleChange} required/>
                            </div>
                            <button className="btn btn-success" onClick={this.handleSubmit}>
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>   
        )
    }
}

export default PlaceBooking;