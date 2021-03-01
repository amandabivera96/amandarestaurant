import React from 'react';
import {Link} from 'react-router-dom';
import './listing.css';

const ListingDisplay = (props) => {
    const renderList = ({restaurantList}) =>{
        if(restaurantList){
            if(restaurantList.length>0){
                return restaurantList.map((item) =>{
                    return(
                        <div id="containerstart">
                            <div class="container1 col-lg-7 col-md-6 col-sm-8 col-xs-12 ">
                                <div class="imagebox"> 
                                    <img src={item.thumb} class="image"/>
                                </div>
                                
                                <div>
                                    <span id="subhead"><Link to={`/details/${item._id}`}>
                                            {item.name}</Link></span>
                                </div>
                                <div>
                                    <span id="fort">{item.locality}</span>
                                </div>
                                <div>
                                    <span id="shop">{item.address}</span>
                                </div>  
                                
                               
                                <div class="path"> 
                                </div> 
                                <div class="cost">
                                    <p>CUISINES:</p>
                                    <p>COST FOR TWO:</p>
                                </div>
                                <div class="bakery">
                                    <p>{item.Cuisine[0].name},{item.Cuisine[1].name}</p>
                                    <p><i class="fa fa-inr" aria-hidden="true"> {item.cost}</i></p>
                                </div>    
                            </div>    
                        </div>
                    )
                })
            }else{
                return(
                    <div>
                        <center>
                            <h2 id="subhead">No Data on this Filter</h2>
                        </center>
                    </div>
                )
            }
           
        }else{
            return(
                <div className="loader">
                    <img src="/images/spinloader.gif"/>
                </div>
            )
        }
    }

    return(
        <React.Fragment>
            {renderList(props)}
        </React.Fragment>
    )
}

export default ListingDisplay;