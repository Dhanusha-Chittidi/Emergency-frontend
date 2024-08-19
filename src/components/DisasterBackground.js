import styled from 'styled-components';

const DisasterBackgroundContainer = styled.div`
  background-image: url('images/background_disaster.jpeg'); 
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  min-height: 1vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px; 
`;

export default DisasterBackgroundContainer;