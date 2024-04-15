import React, { useState, useEffect } from "react";
import Input,  {RangeInput, ImageInput} from "../common/input";
import Switch from "../common/switch";
import SuggestionInput from "../common/suggestionsArray";
import Select from "../common/select";


const djNames = [
    "DJ Spinz",
    "DJ Snake",
    "DJ Khaled",
    "DJ Mustard",
    "DJ Premier",
    "DJ Jazzy Jeff",
    "DJ Shadow",
    "DJ Scratch",
    "DJ Zedd",
    "DJ Tiesto",
    "DJ Steve Aoki",
    "DJ Armin van Buuren",
    "DJ Diplo",
    "DJ Marshmello",
    "DJ Calvin Harris",
    "DJ David Guetta",
    "DJ Afrojack",
    "DJ Dillon Francis",
    "DJ Martin Garrix",
    "DJ Deadmau5"
];

const kenyanCelebrities = [
    "Lupita Nyong'o",
    "Sauti Sol",
    "Eric Omondi",
    "Nameless",
    "Willy Paul",
    "Octopizzo",
    "Akothee",
    "Bahati",
    "Size 8",
    "Vera Sidika",
    "Betty Kyallo",
    "Diamond Platnumz",
    "Churchill",
    "Khaligraph Jones",
    "Huddah Monroe",
    "Avril",
    "King Kaka",
    "Redsan",
    "DJ Creme",
    "Nyashinski"
];

const kenyanMCs = [
    "Mwalimu Rachel",
    "Willis Raburu",
    "Shaffie Weru",
    "Tina Kaggia",
    "Maina Kageni",
    "Jalang'o",
    "Mbusii",
    "Alex Mwakideu",
    "Babu Owino",
    "Robert Alai",
    "Betty Opondo",
    "Kenyatta Hill",
    "Eddie Butita",
    "Jessy Junction",
    "MC Jessy",
    "Caroline Mutoko",
    "Shix Kapienga",
    "Jua Cali",
    "DJ Mo",
    "DJ Kriss Darlin"
];

const CreateEventForm = () => {
    const [eventTitle, setEventTitle] = useState("");
    const [eventLocationName, setEventLocationName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [foccused, setFoccused] = useState('');
    const [attendance, setAttendance] = useState({ attendance: {} });
    const [tickets, setTickets] = useState([{ name: "", quantity: "" }]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedDayOption, setSelectedDayOption] = useState("");
    const [musicRequests, setMusicRequests] = useState({
        allowed:false,
        price:0,
        genre:'',
        playtime:'',
    })



    // Function to handle adding new ticket inputs
    const addTicket = () => {
        setTickets([...tickets, { name: "", quantity: "" }]);
    };


    const updateAttendance = (name, value) => {
        setAttendance(prevState => ({
            ...prevState,
            attendance: {
                ...prevState.attendance,
                value
            }
        }));
    };
    
    
      


    // Function to handle file upload
    const handleImageUpload = (value) => {
        const files = Array.from(value);
        const images = files.map(file => URL.createObjectURL(file));
        setUploadedImages([...uploadedImages, ...images]);
    };
    

    // Function to remove an uploaded image
    const removeImage = (index) => {
        const updatedImages = [...uploadedImages];
        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);
    };

    const shouldShow=(input)=>{
        setFoccused(input)
    }

    const getDayOfWeek = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        return days[today.getDay()];
    };
    

    const submitData = ()=>{
        const event={
            name:eventTitle,
            location:eventLocationName,
            time:{
                start:startTime,
                stop:endTime,
            },
            images:uploadedImages,
            musicRequest:{
                genre:'',
                price:0,
                playtime:0,
            },
            tickets:tickets,
            attending:attendance
        }
    }

    return (
        <>


            <div className="details-container">
                <Input type='text' id="event_title" name="eventTitle" labelText="Event Title" required={true} value={eventTitle} onChange={(name, value) => setEventTitle(value)} error={''} />
                <Input type='text' id="event_location_name" name="eventLocationName" labelText="Location Name" required={true} value={eventLocationName} onChange={(name, value) => setEventLocationName(value)} error={''} />
            </div>

            
            <div className="time-container">
                <label>Start Time:</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <label>End Time:</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>


            <div className="in-attendance-container">
                <label>Attendance:</label>
                <SuggestionInput isShown={foccused} suggestions={kenyanCelebrities} name="appearance" onChange={(name, value)=>{updateAttendance(name, value)}} shouldShow={shouldShow}/>
                <SuggestionInput isShown={foccused} suggestions={kenyanMCs} name="mc" onChange={(name, value)=>{updateAttendance(name, value)}} shouldShow={shouldShow}/>
                <SuggestionInput isShown={foccused} suggestions={djNames} name="dj" onChange={(name, value)=>{updateAttendance(name, value)}} shouldShow={shouldShow}/>
                <SuggestionInput isShown={foccused} suggestions={kenyanCelebrities} name="performance" onChange={(name, value)=>{updateAttendance(name, value)}} shouldShow={shouldShow}/>

            </div>

            <Switch name='pass' onSwitch={(name, isChecked) => {setMusicRequests(prevState => ({...prevState, allowed:isChecked}))}} isOn={musicRequests.allowed} />

            {musicRequests.allowed && (
                    <div className="music-requests-container">
                        <Input type='number' id='request_price' name="price" labelText='music request price/song played' onChange={(name, value)=>{setMusicRequests({...musicRequests, price:value})}}/>
                        <Input type='text' id='genre' name="genre" labelText='genre-catalogue' onChange={(name, value)=>{setMusicRequests({...musicRequests, genre:value})}}/>
                        <RangeInput type='range' id='playtime' min={30} max={240}steps={30} name="playtime" labelText='Play time per request' onChange={(name, value)=>{setMusicRequests({...musicRequests, playtime:value})}}/>
                    </div>
                )

            }


            



            <div className="images-container">
                <ImageInput name='images' onChange={(name, images)=>handleImageUpload(images)}/>
            </div>



            <div className="repetition-container">
                <Select name='repetition' labelText='When would it happen again'value={selectedDayOption} 
                options={[
                    { value: 'today', label: 'Today only' },
                    { value: getDayOfWeek(), label: `Every (${getDayOfWeek()})` },
                    { value: 'exactDate', label: 'Exact Date' } 
                  ]}
                  onChange={(name, value) => setSelectedDayOption(value)}/>             
            </div>




            <div className="tickets-container">
                {tickets.map((ticket, index) => (
                    <div className="ticket-category" key={index}>
                        <Input type="text" value={ticket.name} placeholder="Ticket Name" onChange={(name, value) => {
                            const newTickets = [...tickets];
                            newTickets[index].name = value;
                            setTickets(newTickets);
                        }} />
                        <Input type="number" value={ticket.quantity} placeholder="Quantity" onChange={(name, value) => {
                            const newTickets = [...tickets];
                            newTickets[index].quantity = value;
                            setTickets(newTickets);
                        }} />
                    </div>
                ))}
                <button onClick={addTicket}>Add Ticket</button>
            </div>


            <button onClick={submitData}></button>

            <style jsx>{`

            
            `}</style>
        </>
    )
}

export default CreateEventForm;
