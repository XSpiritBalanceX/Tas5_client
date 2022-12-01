import React, {useEffect, useCallback} from 'react';
import {Table} from 'react-bootstrap';

const TableUsers=(props)=>{
    

    const scrollPage = useCallback((event) => {
          if ( event.target.documentElement.offsetHeight -(event.target.documentElement.scrollTop + window.innerHeight) < 100) {
            props.setItem((prevState) => prevState + 10);
          }
          // eslint-disable-next-line
        },[props.setItem]);
    
      useEffect(() => {
        document.addEventListener("scroll", scrollPage);
    
        return () => document.removeEventListener("scroll", scrollPage);
      }, [scrollPage]);

    let oneUser=props.data&&props.data.slice(0, props.itemsInPage).map((el, ind)=>{
        return( <tr key={ind}>
            <td>{ind+1}</td>
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.address}</td>
            <td>{el.phoneNumber}</td>
        </tr>)
    });

    return(
        <div style={{marginTop:'3%'}}> 
            <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Full name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {oneUser}          
        </tbody>
      </Table></div>
    )
}

export default TableUsers;