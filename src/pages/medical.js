import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NearbyHospitals} from "../components/nearbyHospitals"
export const Medical = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmergencies, setFilteredEmergencies] = useState([]);
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  useEffect(() => {
    // Fetch all emergencies on initial load
    axios.get('https://emergency-website-backend.onrender.com/emergencies')
      .then(response => {
        setEmergencies(response.data);
        setFilteredEmergencies(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setFilteredEmergencies(emergencies);
    } else {
      try {
        const response = await axios.get(`https://emergency-website-backend.onrender.com/searchByName?name=${searchTerm}`);
        setFilteredEmergencies(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCardClick = (emergency) => {
    setSelectedEmergency(emergency);
  };

  const handleBackToList = () => {
    setSelectedEmergency(null);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmergencies(emergencies);
    }
  }, [searchTerm, emergencies]);

  return (
    <div>

      {selectedEmergency ? (
        <div className="emergency-details" >
          <button onClick={handleBackToList}>Back to Emergencies</button>
          <h2 style={{color : "#008080"}}>{selectedEmergency.name}</h2>
          <p>{selectedEmergency.overview}</p>
          <h3>Immediate Steps</h3>
          <ul>
            {selectedEmergency.immediate_steps.map((step, index) => (
              <li key={index}>{index + 1}. {step}</li>
            ))}
          </ul>
          <h3>Dos</h3>
          <ul>
            {selectedEmergency.dos.map((item, index) => (
              <li key={index}>{index + 1}. {item}</li>
            ))}
          </ul>
          <h3>Don'ts</h3>
          <ul>
            {selectedEmergency.donts.map((item, index) => (
              <li key={index}>{index + 1}. {item}</li>
            ))}
          </ul>
          <h3>When to Call</h3>
          <ul>
            {selectedEmergency.when_to_call.map((item, index) => (
              <li key={index}>{index + 1}. {item}</li>
            ))}
          </ul>
          <h3>First Aid</h3>
          <ul>
            {selectedEmergency.first_aid.map((item, index) => (
              <li key={index}>{index + 1}. {item}</li>
            ))}
          </ul>
          <h3>Important Contacts</h3>
          <ul>
            {selectedEmergency.important_contacts.map((item, index) => (
              <li key={index}>{index + 1}. {item}</li>
            ))}
          </ul>
          <h3>Additional Resources</h3>
          <ul>
            {selectedEmergency.additional_resources.map((item, index) => (
              <li key={index}>{index + 1}. <a href={item} target="_blank" rel="noopener noreferrer">{item}</a></li>
            ))}
          </ul>
        
          
        </div>
      ) : (
     <div>
      <div className='heading'>
        <h1> Medical Emergency Guide</h1>
        <input 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
        <div className="container" style={{color : "#2C3E50"}}>
          {filteredEmergencies.map(emergency => (
            <div className="card" key={emergency.id} onClick={() => handleCardClick(emergency)}>
              <img src={`images/medicals/${emergency.name}.jpeg`} alt={emergency.name} />
              <h2 style={{color : "#000000"}} >{emergency.name}</h2>
            </div>
          ))}
        </div>
         <NearbyHospitals/>
        </div>
      )}
    </div>

  );
};

export default Medical;
