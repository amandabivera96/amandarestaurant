import React,{Component} from 'react';
import axios from 'axios';

const url = "https://amandarest.herokuapp.com/rest?mealtype="

class SortFilter extends Component{
  sortfilter = (event) => {
        let mealId = sessionStorage.getItem('mealId')
        let sort = event.target.value
        let sortUrl;
        if(sort==''){
            sortUrl=`${url}${mealId}`;
        }else{
            sortUrl=`${url}${mealId}&sort=${sort}`;
        }
        axios.get(sortUrl)
            .then((response) => {this.props.restPerSort(response.data)})
    }
    render(){
        return(
            <React.Fragment>
               <center className="sub">Sort</center>
                    <div onChange={this.sortfilter}>
                        <label className="radio list">
                            <input type="radio" value="1" name="sort"/>Price low to high 
                        </label>
                        <label className="radio list">
                            <input type="radio" value="-1" name="sort"/>Price high to low
                        </label>
                    </div>
            </React.Fragment>
        )
    }
}

export default SortFilter;