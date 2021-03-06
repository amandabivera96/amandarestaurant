import React,{Component} from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import ListingDisplay from './listingDisplay'
import Header from '../../Header';
import CuisineFilter from '../Filters/cuisineFilter'
import CostFilter from '../Filters/costFilter'
import SortFilter from '../Filters/sortFilter'


const url = "https://amandarest.herokuapp.com/rest?mealtype="

class ListingApi extends Component{
    constructor(props){
        super(props)

        this.state={
            restlist:[],
            offset:0,
            restData:[],
            perPage:2,
            currentPage:0
        }

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage:selectedPage,
            offset:offset
        },()=>{
            this.loadMoreData();
        })
    }

    loadMoreData(){
        const data = this.state.restData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            restlist:slice
        })
    }

    setDataFilter = (sortedData) => {
        this.setState({restlist:sortedData})
    }

    render(){
        console.log(this.props.match.params.id)
        console.log(this.state.restlist)
        return(
            <div className="row">
                <Header/>
                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <nav className="navbar navbar-default container3">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#edureka">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="" className="filters">Filter</a>
                            </div>
                            <div className="collapse navbar-collapse" id="edureka">
                                <ul className="nav navbar-nav">
                                    <center>
                                        <CuisineFilter restPerCuisine = {(data) => {this.setDataFilter(data)}}/>
                                    
                                        <CostFilter restPerCost={(data) => {this.setDataFilter(data)}}/>

                                        <SortFilter restPerSort = {(data) => {this.setDataFilter(data)}}/>
                                    </center>
                                </ul>
                            </div>
                        </div>
                    </nav>     
                </div>
                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                    <ListingDisplay restaurantList={this.state.restlist}/>
                </div>
                <div style={{textAlign:'left'}}>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                </div>
            </div>
        )
    }

    componentDidMount(){
        var mealId = this.props.match.params.id
        sessionStorage.setItem('mealId',mealId)
        fetch(`${url}${mealId}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                restlist:slice,
                restData:data})
        })
    }
}

export default ListingApi;
                