import React,{Component} from 'react';
import axios from 'axios';
import ViewBooking from './displayBooking';
import Header from '../../Header';

const url="https://amandarest.herokuapp.com/orders"

class DisplayApi extends Component{
    constructor(){
        super()

        this.state={
            booking:''
        }
    }

    render(){
        return(
            <div>
                <Header/>
                <ViewBooking bookdata={this.state.booking}/>
            </div>
        )
    }

    componentDidMount(){
        axios.get(url).then((res) => {this.setState({booking:res.data})})
    }

}

export default DisplayApi;