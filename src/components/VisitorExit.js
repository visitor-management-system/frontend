import { Button, Card, FormControl, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import * as axios from "axios";

import '../App.css';

function VisitorExit() {
  const [ fname, setFname ] = useState("");
  const [ lname, setLname ] = useState("");
  const [ phno, setPhno ] = useState("");
  const [ checkOutTime, setCheckoutTime ] = useState({
    hr: 0,
    min: 0
  });

  const setVisitorExitInfo = () => {
    if(!fname || !lname || !phno) {
      alert("Please fill all the fields for the check-out form."); return;
    }
    if(!/^[0-9]{10}$/.test(phno)) {
      alert("Phone number in check-out form should have exactly 10 digits."); return;
    }
    let dt = new Date();
    dt.setHours(checkOutTime.hr); dt.setMinutes(checkOutTime.min);
    axios.default.post('http://localhost:4242/set-visitor-exit',{
      fname,lname,phno,
      outtime: Number(dt)
    }).then(res=>{
      if(res.data != "success")
        alert(res.data);
    })
  }

  return (
    <Card className={"cards"}>
      <Card.Body>
        <Card.Title>Enter visitor check-out info</Card.Title>
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
        <label>Check-out time</label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>hr: </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl readOnly={true} value={checkOutTime.hr}></FormControl>
          <DropdownButton className={"custom-dropdown"} as={InputGroup.Append} variant="outline-primary" title="Select Hour">
            {new Array(24).fill(0).map((e,i)=>{
              return <Dropdown.Item onSelect={()=>{setCheckoutTime({...checkOutTime, hr: i})}}>{i}</Dropdown.Item>
            })}
          </DropdownButton>
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>min: </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl readOnly={true} value={checkOutTime.min}></FormControl>
          <DropdownButton className={"custom-dropdown"} as={InputGroup.Append} variant="outline-primary" title="Select Minute">
            {new Array(60).fill(0).map((e,i)=>{
              return <Dropdown.Item onSelect={()=>{setCheckoutTime({...checkOutTime, min: i})}}>{i}</Dropdown.Item>
            })}
          </DropdownButton>
        </InputGroup>
        <Button onClick={setVisitorExitInfo}>Submit</Button>
      </Card.Body>
    </Card>
  );
}

export default VisitorExit;
