import React, { useState, useEffect } from "react";
import Input,  {RangeInput} from "../common/input";
import Switch from "../common/switch";
import { SelectedSuggestion, Suggestion } from "../common/suggestionsArray";
import SuggestionInput from "../common/suggestionsArray";
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
    const [attendance, setAttendance] = useState({
        dj: "",
        appearance: "",
        mc: "",
        performances: ""
    });
    const [selectedDJs, setSelectedDJs] = useState([]);
    const [selectedAppearances, setSelectedAppearances] = useState([]);
    const [selectedMCs, setSelectedMCs] = useState([]);
    const [selectedPerformances, setSelectedPerformances] = useState([]);
    const [tickets, setTickets] = useState([{ name: "", quantity: "" }]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedDayOption, setSelectedDayOption] = useState("");
    const [musicRequests, setMusicRequests] = useState({
        price:0,
        genre:'',
        playtime:'',
    })


    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [focusedInput, setFocusedInput] = useState(""); // Track focused input
    const [showSuggestions, setShowSuggestions] = useState("")

    //set suggestions as to be displayed
    useEffect(() => {
        // Filter suggestions based on focused input
        const filterSuggestions = () => {
            let filteredSuggestions = [];
            switch (focusedInput) {
                case "dj":
                    filteredSuggestions = djNames.filter(name =>
                        name.toLowerCase().includes(attendance.dj.toLowerCase())
                    );
                    break;
                case "appearance":
                    filteredSuggestions = kenyanCelebrities.filter(name =>
                        name.toLowerCase().includes(attendance.appearance.toLowerCase())
                    );
                    break;
                case "mc":
                    filteredSuggestions = kenyanMCs.filter(name =>
                        name.toLowerCase().includes(attendance.mc.toLowerCase())
                    );
                    break;
                case "performances":
                    filteredSuggestions = kenyanCelebrities.filter(name =>
                        name.toLowerCase().includes(attendance.performances.toLowerCase())
                    );
                    break;
                default:
                    break;
            }
            setSuggestions(filteredSuggestions);
        };

        // Show suggestions if input value is not empty
        if (attendance.dj || attendance.appearance || attendance.mc || attendance.performances) {
            setShowSuggestions(true);
            filterSuggestions();
        } else {
            setShowSuggestions(false);
        }
    }, [attendance, focusedInput]);

    // Function to handle adding new ticket inputs
    const addTicket = () => {
        setTickets([...tickets, { name: "", quantity: "" }]);
    };


    // Function to handle file upload
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const images = files.map(file => URL.createObjectURL(file));
        setUploadedImages([...uploadedImages, ...images]);
    };

    // Function to remove an uploaded image
    const removeImage = (index) => {
        const updatedImages = [...uploadedImages];
        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);
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
            attending:{
                "dj":selectedDJs,
                "performance":selectedPerformances,
                "appearances":selectedAppearances,
                "mc":selectedMCs,
            }

        }
    }

    return (
        <>
            <Switch name='pass' onSwitch={(name, isChecked) => { console.log(name + " input for " + " is now " + isChecked) }} isOn={false} />


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
                <SuggestionInput suggestions={kenyanCelebrities} name="appearance" onChange={(value)=>{console.log(value); }}/>
                <SuggestionInput suggestions={kenyanMCs} name="mc" onChange={(value)=>{console.log(value); }}/>
                <SuggestionInput suggestions={djNames} name="dj" onChange={(value)=>{console.log(value); }}/>
                <SuggestionInput suggestions={kenyanCelebrities} name="performance" onChange={(value)=>{console.log(value); }}/>

            </div>


            <div className="music-requests-container">
                <Input type='number' id='request_price' name="price" labelText='music request price/song played' onChange={(name, value)=>{setMusicRequests({...musicRequests, price:value})}}/>
                <Input type='text' id='genre' name="genre" labelText='genre-catalogue' onChange={(name, value)=>{setMusicRequests({...musicRequests, genre:value})}}/>
                <RangeInput type='range' id='playtime' min={30} max={240}steps={30} name="playtime" labelText='Play time per request' onChange={(name, value)=>{setMusicRequests({...musicRequests, playtime:value})}}/>
            </div>



            <div className="images-container">
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                <div>
                    {uploadedImages.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Uploaded ${index}`} style={{ width: "100px", height: "100px" }} />
                            <button onClick={() => removeImage(index)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>



            <div className="repetition-container">
                <select value={selectedDayOption} onChange={(e) => setSelectedDayOption(e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="dayOfWeek">Exact Day of Week</option>
                    <option value="today">Today</option>
                    <option value="exactDate">Exact Date</option>
                </select>                
            </div>



            <div className="tickets-container">
                {tickets.map((ticket, index) => (
                    <div key={index}>
                        <input type="text" value={ticket.name} placeholder="Ticket Name" onChange={(name, value) => {
                            const newTickets = [...tickets];
                            newTickets[index].name = value;
                            setTickets(newTickets);
                        }} />
                        <input type="number" value={ticket.quantity} placeholder="Quantity" onChange={(name, value) => {
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
