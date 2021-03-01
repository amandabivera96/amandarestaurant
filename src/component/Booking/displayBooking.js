import React from 'react';

const BookingView = (props) => {
    const renderTable = ({bookdata}) => {
        if(bookdata){
            return bookdata.map((item) => {
                return(
                    <tr>
                        <td>{item._id}</td>
                        <td>{item.Restaurant}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                    </tr>
                )
            })
        }
    }

    return(
        <div className="container">
            <center><h2>Booking List</h2></center>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Restaurant</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props)}
                </tbody>
            </table>
        </div>
    )
}

export default BookingView;
