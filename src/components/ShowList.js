import { Button, Card, FormControl, Table } from "react-bootstrap";
import { useState } from "react";
import DatePicker from 'react-date-picker';
import * as axios from "axios";

import '../App.css';

function VisitorExit() {
  const [ inp_visitor, setIV ] = useState("");
  const [ visitorList, setvList ] = useState([]);
  const [ inp_logs, setIL ] = useState({
    startDate: new Date(),
    endDate: new Date(),
    phno: ""
  });
  const [ logsList, setlList ] = useState([]);

  const getVisitorList = () => {
    if(!inp_visitor) { alert("You should enter atleast First Name or Phone Number to get visitors' list"); return; }
    axios.default.get(`http://localhost:4242/get-visitors/${inp_visitor}`).then(res=>{
      setvList(res.data);
    });
  }

  const getVisitorLogs = () => {
    const { phno } = inp_logs;
    if(!/^[0-9]{10}$/.test(phno)) {
      alert("You should enter a 10-digit mobile number to get visitor logs."); return;
    }
    if(inp_logs.startDate > inp_logs.endDate) {
      alert("Invalid range present. Please check your start date and end date."); return;
    }
    let dt1=inp_logs.startDate; dt1.setHours(0); dt1.setMinutes(0); dt1.setSeconds(0); dt1.setMilliseconds(0);
    let dt2=inp_logs.endDate; dt2.setHours(23); dt2.setMinutes(59); dt2.setSeconds(59); dt2.setMilliseconds(999);
    axios.default.get(`http://localhost:4242/get-logs/${Number(dt1)}/${Number(dt2)}/${phno}`).then(res=>{
      setlList(res.data);
    })
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title style={{display: "flex", justifyContent: "space-between"}}>
            <div>Search Visitors</div>
            <div style={{display:"flex"}}>
              <FormControl style={{maxWidth: "350px"}} value={inp_visitor} onChange={e=>{setIV(e.target.value)}} placeholder="Enter First Name or Phone no."></FormControl>
              <Button onClick={getVisitorList}>Go!</Button>
            </div>
          </Card.Title>
          {visitorList.length ? <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {visitorList.map((vtor,i)=>(
                <tr key={vtor._vid}>
                  <td>{vtor.fname}</td>
                  <td>{vtor.lname}</td>
                  <td>{vtor.phno}</td>
                </tr>
              ))}
            </tbody>
          </Table> : "No visitor data available now."}
        </Card.Body>
      </Card>
      <Card style={{marginTop:"10px"}}>
        <Card.Body>
        <Card.Title>
            <div>Search Logs</div>
            <div style={{display: 'flex', justifyContent: "flex-end"}}>
              <DatePicker style={{maxWidth: "200px"}} readonly={true} value={inp_logs.startDate} clearIcon={null} onChange={e=>{setIL({...inp_logs, startDate: e})}} placeholder="Start Date" />
              <DatePicker style={{maxWidth: "200px"}} readonly={true} value={inp_logs.endDate} clearIcon={null} onChange={e=>{setIL({...inp_logs, endDate: e})}} placeholder="End Date" />
              <FormControl style={{maxWidth: "200px"}} value={inp_logs.phno} onChange={e=>{setIL({...inp_logs, phno: e.target.value})}} placeholder="Phone Number"></FormControl>
              <Button onClick={getVisitorLogs}>Go!</Button>
            </div>
          </Card.Title>
          {logsList.length ? <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>In Time</th>
                <th>Out Time</th>
              </tr>
            </thead>
            <tbody>
              {logsList.map(log=>(
                <tr key={log._vid}>
                  <td>{log.fname}</td>
                  <td>{log.lname}</td>
                  <td>{log.phno}</td>
                  <td>{(new Date(Number(log.intime))).toLocaleString()}</td>
                  <td>{log.outtime!='VOID' ? (new Date(Number(log.outtime))).toLocaleString() : '--'}</td>
                </tr>
              ))}
            </tbody>
          </Table> : "No visitor log data available now."}
        </Card.Body>
      </Card>
    </div>
  );
}

export default VisitorExit;
