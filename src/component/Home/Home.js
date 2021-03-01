import React from 'react';
import Search from './Search';
import QuickApi from './QuickApi';

const Home = (props) => {
    console.log(props);
    return(
        <React.Fragment>
            <Search/>
            <QuickApi/>
        </React.Fragment>
    )
}

export default Home;