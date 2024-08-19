import { useEffect,useState } from "react";
import axios from "axios";

export const Disaster = () => {
    const [disasters, setDisasters] = useState([]);
    const [filteredDisasters, setFilteredDisasters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDisaster, setSelectedDisaster] = useState('');

    useEffect(() => {
        axios.get('https://emergency-website-backend.onrender.com/getDisaster').then((response) => {
            setDisasters(response.data);
            setFilteredDisasters(response.data);
        }).catch((err) => console.log(err));
    }, []);

    const handleSearch = async () => {
        if (searchTerm.trim === ' ') setFilteredDisasters(disasters);
        else {
            try {
                const response = await axios.get(`https://emergency-website-backend.onrender.com/search?name=${searchTerm}`);
                setFilteredDisasters(response.data);
            } catch (e) {
                console.log(e);
            }
        }
    }
    const handleCardClick = (emergency) => {
        setSelectedDisaster(emergency);
    }
    const handlebackToList = () => {
        setSelectedDisaster(null);;
    }

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredDisasters(disasters);
        }
    }, [searchTerm, disasters])

    return (selectedDisaster ? (<div className="emergency-details"  >
        <button onClick={handlebackToList}>Back to Emergencies</button>
        <h2 style={{ color: "green" }}>{selectedDisaster.name}</h2>
        <h5>{selectedDisaster.description}</h5>
        <h3> First Steps</h3>
        <ul>
            {selectedDisaster.first_steps.map((dis,index ) => (
                <li key={index}>{index + 1}.{dis}</li>
            ))}
        </ul>
        <h3>Dos</h3>
        <ul>
            {selectedDisaster.dos.map((dis,index ) => (
                <li key={index}>{index + 1}.{dis}</li>
            ))}
        </ul>
        <h3>Donts</h3>
        <ul>
            {selectedDisaster.donts.map((dis,index ) => (
                <li key={index}>{index + 1}.{dis}</li>
            ))}
        </ul>
        <h3>Resources</h3>
        <ul>
            {selectedDisaster.resources.map((dis,index ) => (
                <li key={index}><a href={dis} target="_blank" rel="noopener noreferrer">{dis}</a></li>
            ))}
        </ul>

    </div>) : (<div>
        <div className="heading">
            <h1> Disaster Emergency Guide</h1>
            <input type="text" placeholder="Search By Disaster Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
        <div className="container" style={{ color: "#2C3E50" }}>
            {filteredDisasters.map(emergency => (
                <div className="card" key={emergency.id} onClick={() => handleCardClick(emergency)}>
                    <img src={`images/disasters/${emergency.name}.jpeg`} alt={emergency.name}/>
                    <h2 style={{ color: "#000000" }} >{emergency.name}</h2>
                </div>
            ))}
        </div>
    </div>

    ));
}
export default Disaster;