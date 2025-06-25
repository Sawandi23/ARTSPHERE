// src/pages/UserExhibitions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExhibitionCardUser from '../components/ExhibitionCardUser';
import '../styles/Exhibitions.css';

const UserExhibitions = () => {
    const [pastExhibitions, setPastExhibitions] = useState([]);
    const [currentExhibitions, setCurrentExhibitions] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/events?category=past')
            .then(res => setPastExhibitions(res.data))
            .catch(err => console.error(err));

        axios.get('http://localhost:3000/events?category=current')
            .then(res => setCurrentExhibitions(res.data))
            .catch(err => console.error(err));

        axios.get('http://localhost:3000/events?category=upcoming')
            .then(res => setUpcomingEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="exhibitions-container">
            <div className="exhibition-container">
                <h1>Explore Our Exhibitions</h1>
                <p className="exhibition-description">
                    Discover past, present, and future exhibitions. View artworks, read artist insights, and attend virtually or in person.
                </p>
            </div>

            <h2>Current Exhibitions</h2>
            <div className="exhibition-section">
                {currentExhibitions.map(event => (
                    <ExhibitionCardUser key={event._id} event={event} />
                ))}
            </div>

            <h2>Past Exhibitions</h2>
            <div className="exhibition-section">
                {pastExhibitions.map(event => (
                    <ExhibitionCardUser key={event._id} event={event} />
                ))}
            </div>

            <h2>Upcoming Events</h2>
            <div className="exhibition-section">
                {upcomingEvents.map(event => (
                    <ExhibitionCardUser key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default UserExhibitions;
