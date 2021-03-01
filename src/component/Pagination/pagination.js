import React,{ useState, useEffect, Component } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';

const url = "http://localhost:9900/rest?mealtype=1"

class Pagination extends Component{
    pagination = (event) => {
        let mealId = sessionStorage.getItem('mealId')
        axios.get(`${url}${mealId}`)
        .then((response) => {this.props.restPerLimit(response.data)})
    }
    render(){
        return(
            <div>
                {this.pagination}
            </div>
        )
    }
    
}

export default Pagination;