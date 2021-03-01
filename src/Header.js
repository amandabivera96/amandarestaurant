import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';

class Header extends Component{
    constructor(props){
        super(props)

        this.state={
            username:''
      
        }
    }

    conditionalButton = () => {
        if(sessionStorage.getItem('username')==null ||sessionStorage.getItem('username')==undefined){
            return(
                <div>
                    <p className="welcome">
                           Welcome to Restaurants!
                    </p>
                </div>
            )
        }
        else{
            return(
                <>
                     <h1 className="welcome">Hi {sessionStorage.getItem('username')}</h1>
                </>
            )
        }
    }
    
    render(){
        return(
            <React.Fragment>
                <div class="border">  
                    {this.conditionalButton()}   
                    <Link to="/"><b class="logo circle">R!</b></Link>
                </div>
                
            </React.Fragment>
        )
    }

    componentDidMount(){
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
                console.log(">>>",data);
                var user = data.login;
                sessionStorage.setItem('username',user)
                this.setState({username:user})
            })   
        }    
    }  
    
}

export default withRouter(Header);