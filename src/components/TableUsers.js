import React, {useEffect, useCallback, useState} from 'react';
import {Table, Button} from 'react-bootstrap';
import {CSVLink} from 'react-csv'

const TableUsers=(props)=>{

    const [dataCSV, setDataCSV]=useState([]);
    
    const scrollPage = useCallback((event) => {
          if ( event.target.documentElement.offsetHeight -(event.target.documentElement.scrollTop + window.innerHeight) < 50) {
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


    const sendToCSV=()=>{
      let arrForCSV=[];
       props.data.slice(0, props.itemsInPage).forEach((el)=>{
        arrForCSV.push(Object.entries(el))
       })
       setDataCSV(arrForCSV);       
    }

    return(
        <div style={{margin:'3% 2% 0 2%'}}> 
             
        <Button variant="dark"  style={{height:'2.5em', position:'fixed',top:'25%', right:'5%'}} onClick={()=>sendToCSV()}>
        <CSVLink data={dataCSV} style={{textDecoration:'none', color:'white'}}>Export to CSV</CSVLink> 
        </Button>
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