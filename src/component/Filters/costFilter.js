import React,{Component} from 'react';
import axios from 'axios';

const url = "https://amandarest.herokuapp.com/rest?mealtype="
class CostFilter extends Component{
    Costfilter = (event) => {
        let mealId=sessionStorage.getItem('mealId')
        let cost = (event.target.value).split(',');
        let lcost = cost[0];
        let hcost = cost[1];
        let costUrl;
        if(cost==''){
            costUrl=`${url}${mealId}`
        }else{
            costUrl=`${url}${mealId}&lcost=${lcost}&hcost=${hcost}`
        }
        axios.get(costUrl)
            .then((response) => {this.props.restPerCost(response.data)})

    }

    render(){
        return(
            <React.Fragment>
               <center className="sub">Cost For Two</center>
                    <div onChange={this.Costfilter}>
                        <label className="radio list">
                            <input type="radio" value="" name="cost"/>All
                        </label>
                        <label className="radio list">
                            <input type="radio" name="cost" value="0,250"/>Less than <i class="fa fa-inr" aria-hidden="true"> 250</i>
                        </label>
                        <label className="radio list">
                            <input type="radio" name="cost" value="250,500"/><i class="fa fa-inr" aria-hidden="true"> 250</i> to <i class="fa fa-inr" aria-hidden="true"> 500</i>
                        </label>
                        <label className="radio list">
                            <input type="radio" name="cost" value="500,750"/><i class="fa fa-inr" aria-hidden="true"> 500</i> to <i class="fa fa-inr" aria-hidden="true"> 750</i>
                        </label>
                        <label className="radio list">
                            <input type="radio" name="cost" value="750,1000"/><i class="fa fa-inr" aria-hidden="true"> 750</i> to <i class="fa fa-inr" aria-hidden="true"> 1000</i>
                        </label>
                        <label className="radio list">
                            <input type="radio" name="cost" value="1000"/>Above <i class="fa fa-inr" aria-hidden="true"> 1000</i>
                        </label>      
                    </div>
            </React.Fragment>
        )
    }
}

export default CostFilter;