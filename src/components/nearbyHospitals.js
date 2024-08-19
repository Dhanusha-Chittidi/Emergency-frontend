import React,{useEffect, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";

const Container=styled.div`
    width : 100%;
    text-align : center;
`;
const Cards=styled.div`
    display : flex;
    flex-wrap : wrap;
    align-items : center;
    justify-content : center;
    gap : 20px;
`;
const Card=styled.div`
    background-color : rgba(0,150,150,0.7);
    border : 2px solid white;
    border-radius : 8px;
    width : 250px;
    height : 400px;
`;
const Search=styled.div`
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

export const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]); // storing hospitals data
  const [radius, setRadius] = useState(400);  // Radius
  const[message,setMessage]=useState('');   //Error message
  const [lat, setLat] = useState(null);    //Latitude
  const [long, setLong] = useState(null);  //Longitude
  const [loading, setLoading] = useState(false); //To Check Loading

//Determining Latitude and longitude 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      
    });
  }, []); 
  
  //Fetching nearby Hospitals based on radius, latitude and longitude provided
  const fetchHospitals = async () => {
    console.log(lat,long);
    if (lat && long) {  // Ensure lat and long are available
      setLoading(true);
      try {
        const apiKey = process.env.REACT_APP_LOCATION_IQ_API_KEY; 
        console.log(apiKey);
        const url = `https://eu1.locationiq.com/v1/nearby?key=${apiKey}&lat=${lat}&lon=${long}&tag=hospital&radius=${radius}&format=json`;
        
  
        const response = await axios.get(url);
        
        if(response.data.length > 0){
          setHospitals(response.data); 
          setMessage('');
        }else{
          setHospitals([]);
          setMessage("No Hospitals found on Specified radius!!!")
        }

      } catch (error) {
        if(error.response && error.response.status===404){
          setHospitals([]);
          setMessage("No Hospitals found on Specified radius!!!!")
        }else{
        setMessage("Error fetching hospitals:", error);
        }
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Latitude and Longitude are not set yet.");
    }
  };
  

  return (
    <Container>
      <h1>Find Near By Hospitals</h1>
      <Search>
      <input 
        type="number"  
        onChange={(e) => setRadius(e.target.value)} 
        placeholder="Enter radius in meters" 
        style={{background : "white",
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginRight: "10px",marginBottom: "10px"}}
      />
      <button onClick={fetchHospitals} style={{background : "#008080",
          padding: "10px 20px",
          color : "white",
          fontSize: "16px",
          border : "0px",
          cursor : "pointer",
          borderRadius: "6px",
          marginRight: "10px"}}>Fetch Hospitals</button>
      </Search>

      {loading && <p>Loading hospitals...</p>}
      {message && <p>{message}</p>}

      <Cards>
        {hospitals.map((hospital, index) => (
          <Card>
            <img src="images/location.jpeg" alt ="location" width="250px" height ="200px"/>
            <h3>{hospital.name}</h3>
            <p>{hospital.display_name}</p>
            <p>Distance: {hospital.distance}</p>
          </Card>
        ))}
      </Cards>

    </Container>
  );
};

export default NearbyHospitals;

