import React, {useState} from "react";
import Input from "../common/input";


const CreateEventForm = ()=> {
    const [song] = useState();
    return(
        <>
        <Input type='text' id="event_name" name="eventName" labelText="Event Name" required={true} value={song} onChange={()=>{return null}} error={''}/>
        <Input type='text' id="event_location_name" name="eventLocation" labelText="Location Name" required={true} value={song} onChange={()=>{return null}} error={''}/>
        <Input type='text' id="host" name="searchsong" labelText="Search Music" required={true} value={song} onChange={()=>{return null}} error={''}/>
        <Input type='text' id="searchsong" name="searchsong" labelText="Search Music" required={true} value={song} onChange={()=>{return null}} error={''}/>
        <Input type='text' id="searchsong" name="searchsong" labelText="Search Music" required={true} value={song} onChange={()=>{return null}} error={''}/>       
        </>
    )
}

export default CreateEventForm;