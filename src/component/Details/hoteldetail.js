import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Tab,Tabs,TabList,TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import './details.css';
import Header from '../../Header';

const url = "https://amandarest.herokuapp.com/rest"

class Details extends Component{
    constructor(props){
        super(props)
        
        this.state={
            details:{
                "Cuisine":[
                    {
                        "name":''
                    },
                    {
                        "name":''
                    } 
                ]
            }

        }
    }


    render(){
        console.log(this.state.details)
        console.log(this.props.match.params.id)
        return(
            <div className="row">
                <Header/>
                <div>
                    <div className="container2 col-lg-7 col-md-6 col-sm-8 col-xs-12">
                        <div className="detailimgbox">
                            <img src={this.state.details.thumb} className="detailimage"/>    
                        </div>
                        <div className="detail">
                            <div>
                                <h2 id="subhead1">{this.state.details.name} 
                                <Link className="btn btn-success order"to={`/booking/${this.state.details.name}`}>Place Online Order</Link>
                                <Link className="btn btn-danger back" to={`/`}>Back</Link></h2>
                                
                            </div>
                            <div id="head">
                                <Tabs>
                                    <TabList>
                                        <Tab>Overview</Tab>
                                        <Tab>Contact</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <div>
                                            <div><h4>About This Place</h4></div>
                                            <br/>
                                            <div>Cuisine : {this.state.details.Cuisine[0].name},{this.state.details.Cuisine[1].name}</div>
                                            <div>Cost for Two : <i class="fa fa-inr" aria-hidden="true">{this.state.details.cost}</i> </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div>
                                            <div><h4>Contact This Place</h4></div>
                                            <br/>
                                            <div>Phone : {this.state.details.contact_number}</div>
                                            <div>Locality : {this.state.details.locality}</div>
                                            <div>Address : {this.state.details.address}</div>
                                        </div>
                                    </TabPanel>
                                </Tabs>
                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        const hotelId =  this.props.match.params.id
        axios.get(`${url}/${hotelId}`)
        .then((res) =>  {
            this.setState({details:res.data[0]})
        })
    }
}

export default Details;