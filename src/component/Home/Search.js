import React,{Component} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import './Search.css';

const url = "https://amandarest.herokuapp.com/city";
const rurl = "https://amandarest.herokuapp.com/rest?city=";

class Search extends Component{
    constructor(props){
        super(props)

        this.state={
            city:'',
            rest:'',
            username:''
        }
    }

    //Display City in option
    renderCity = (data) => {
        if(data){
            return data.map((item) => {
                return(
                <option value={item.city}>{item.city_name}</option>
                )
            })
        }
    }

    //Display restaurant on city selection
    renderRest = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option value={item._id}>{item.name} | {item.locality}</option>
                )
            })
        }
    }

    handleCity=(event) => {
        console.log(event.target.value);
        const cityId = event.target.value;
        fetch(`${rurl}${cityId}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => this.setState({rest:data}))
    }

    handleRest=(event) => {
        this.props.history.push(`/details/${event.target.value}`)
    }


    conditionalButton = () => {
        if(sessionStorage.getItem('username')==null ||sessionStorage.getItem('username')==undefined){
            return (
                <>
                    <div className="form-group style">
                        <a href='https://github.com/login/oauth/authorize?client_id=101017abec898942ad79'><img src="/images/github.png" className="social_logo"/> Continue with Github</a>
                    </div>
                    <div className="form-group style">
                        <a href='https://accounts.google.com/o/oauth2/auth?client_id=206960869725-e8v32ivau55tbje13rdkiimojvognddb.apps.googleusercontent.com'><img src="images/gmail.png" className="social_logo"/> Continue with Gmail</a>
                    </div>
                    
                </>
            )
        }
        else{
            return(
                <>
                     Hi {this.state.username} You have successfully Login with Github
                </>
            )
        }
    }

    render(){
        return(
            <React.Fragment>
            <div class="imagecontainer">
                <div>
                    <a href="#" className="cra rec" data-target="#signup" data-toggle="modal">Create an account</a>
                    <a href="#" className="log" data-target="#login" data-toggle="modal">Login</a>   
                </div>
                <div id="login" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Login</h4>
                            </div>
                            <div className="modal-body style">   
                                {this.conditionalButton()}
                                
                                <div className="form-group style">
                                    <a href="https://www.facebook.com/" target="_blank"><img src="images/facebook.png"  className="social_logo"/> Continue with Facebook</a>
                                </div>
                            </div>
                            <div className="modal-footer style">
                                <p>Don't Have Account?<a href="" className="text-danger"> Sign Up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="signup" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Sign Up</h4>
                            </div>
                            <div className="modal-body style">
                                {this.conditionalButton()}
                                
                                <div className="form-group style">
                                    <a href="https://www.facebook.com/" target="_blank"><img src="images/facebook.png" className="social_logo"/> Continue with Facebook</a>
                                </div>
                            </div>
                            <div className="modal-footer style">
                                <p>Already have an account?<a href="" className="text-danger"> Login</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="logo">
                    <b>R!</b>
                </div>
                <div id="heading">
                    Find Best Restaurants,Cafes and Bars
                </div>
                <div className="locationselector">
                    <select className="dropdown1" required onChange={this.handleCity}>
                        <option value="" disabled selected hidden>Please select a Location</option>
                        {this.renderCity(this.state.city)}
                    </select>
                    <select className="dropdown1" required onChange={this.handleRest}>
                        <option value="" disabled selected hidden>Search for Restaurants</option>
                        {this.renderRest(this.state.rest)}
                    </select>
                    
                </div>
            </div>
            </React.Fragment>
        )
    }

    componentDidMount(){
        console.log("<<<>>>",this.props.location.search)
        const code=(this.props.location.search).split('=')[1];
        if(code){
            let requestData = {
                code:code
            }
            fetch('http://localhost:6500/users',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(">>>",data)
                var user = data.login;
                sessionStorage.setItem('username',user)
                fetch(url,{method:'GET'})
                .then((res) => res.json())
                .then((data) => this.setState({username:user}))
            })
        }

            axios.get(url).then((res) => {this.setState({city:res.data})})
        }  
}

export default withRouter(Search);