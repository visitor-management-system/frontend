import { Button, Card, FormControl, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import * as axios from "axios";

import '../App.css';

function VisitorEntry() {
  const [ fname, setFname ] = useState("");
  const [ lname, setLname ] = useState("");
  const [ phno, setPhno ] = useState("");
  const [ checkInTime, setCheckinTime ] = useState({
    hr: 0,
    min: 0
  });

  const addVisitorEntryInfo = () => {
    if(!fname || !lname || !phno) {
      alert("Please fill all the fields for the check-in form."); return;
    }
    if(!/^[0-9]{10}$/.test(phno)) {
      alert("Phone number in check-in form should have exactly 10 digits."); return;
    }
    let dt = new Date();
    dt.setHours(checkInTime.hr); dt.setMinutes(checkInTime.min);
    axios.default.post('http://localhost:4242/add-visitor-entry',{
      fname,lname,phno,
      intime: Number(dt)
    }).then(res=>{
      if(res.data != "success")
        alert(res.data);
    })
  }

  return (
    <Card className={"cards"}>
      <Card.Body>
        <Card.Title>Enter visitor check-in info</Card.Title>
        <FormControl
          placeholder="First Name"
          value={fname}
          onChange={e=>{setFname(e.target.value)}}
        />
        <FormControl
          placeholder="Last Name"
          value={lname}
          onChange={e=>{setLname(e.target.value)}}
        />
        <FormControl
          placeholder="Phone Number"
          value={phno}
          onChange={e=>{setPhno(e.target.value)}}
        />
        <label>Check-in time</label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>hr: </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl readOnly={true} value={checkInTime.hr}></FormControl>
          <DropdownButton className={"custom-dropdown"} as={InputGroup.Append} variant="outline-primary" title="Select Hour">
            {new Array(24).fill(0).map((e,i)=>{
              return <Dropdown.Item onSelect={()=>{setCheckinTime({...checkInTime, hr: i})}}>{i}</Dropdown.Item>
            })}
          </DropdownButton>
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>min: </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl readOnly={true} value={checkInTime.min}></FormControl>
          <DropdownButton className={"custom-dropdown"} as={InputGroup.Append} variant="outline-primary" title="Select Minute">
            {new Array(60).fill(0).map((e,i)=>{
              return <Dropdown.Item onSelect={()=>{setCheckinTime({...checkInTime, min: i})}}>{i}</Dropdown.Item>
            })}
          </DropdownButton>
        </InputGroup>
        <Button onClick={addVisitorEntryInfo}>Submit</Button>
      </Card.Body>
    </Card>
  );
}

export default VisitorEntry;
