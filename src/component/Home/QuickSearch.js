import React from 'react';
import './QuickSearch.css';
import {Link} from 'react-router-dom';

const QuickSearch = (props) => {
        const renderList = ({quickData}) => {
            if(quickData){
                return quickData.map((item) => {
                    return(
                        <Link to={`/listing/${item._id}`}>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div class="tileContainer">
                                    <div class="tileComponent1">
                                        <img src={`images/${item.name}.png`}className="imagestyle"/>
                                    </div>
                                    <div class="tileComponent2">
                                        <div class="componentHeading">
                                            {item.name}
                                        </div>
                                        <div class="componentSubHeading">
                                            Start Your Day with Exclusive {item.name} Options
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        }
        return(
            <div class="container"> 
                <p class="QuickSearchHeading">
                    Quick Searches
                </p>
                <p class="QuickSearchSubHeading">
                    Discover Restaurants By Meal Type
                </p>
                {renderList(props)}
            </div>

        )  
 }


export default QuickSearch;