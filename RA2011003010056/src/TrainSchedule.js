import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainSchedule = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const registerCompany = async () => {
      try {
        const registrationData = {
          companyName: 'Train Central',
          ownerName: "Ashutosh Kumar Ojha",
          rollNo: "RA2011003010056",
          ownerEmail: "ao4586@srmist.edu.in",
          accessCode: 'TzEfMS'
        };

        const response = await axios.post('http://20.244.56.144/train/register', registrationData);
        const { clientID, clientSecret } = response.data;

        const authData = {
          companyName: 'Train Central',
          clientID: '1737aa38-4177-4ae8-960b-7b13414d940f',
          ownerName: "Ashutosh Kumar Ojha",
          ownerEmail: "ao4586@srmist.edu.in",
          rollNo: "RA2011003010056",
          clientSecret: 'YXaTiOVSdOpkYnIE'
        };
        const authResponse = await axios.post('http://20.244.56.144/train/auth', authData);
        const accessToken = authResponse.data.access_token;

        const config = {
          headers: {
            Authorization: `${accessToken}`
          }
        };

        const trainsResponse = await axios.get('http://20.244.56.144:80/train/trains', config);
        setTrains(trainsResponse.data);
      } catch (error) {
        console.error('Error fetching train data:', error.message);
      }
    };

    registerCompany();
  }, []);

  return (
    <div>
      <h1>Train Schedule</h1>
      <ul>
        {trains.map(train => (
          <li key={train.trainNumber}>
            Train Name: {train.trainName}, Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainSchedule;