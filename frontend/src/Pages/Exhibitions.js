import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExhibitionCard from '../components/ExhibitionCard';
import { useNavigate } from 'react-router-dom';
import '../styles/Exhibitions.css';

const Exhibitions = () => {
    const [pastExhibitions, setPastExhibitions] = useState([]);
    const [currentExhibitions, setCurrentExhibitions] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 

    const navigate = useNavigate();

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

     // Filter exhibitions based on search query 
    const filterExhibitions = (exhibitions) => {
        return exhibitions.filter(event => {
            // Search all fields of the event 
            const eventData = JSON.stringify(event).toLowerCase(); // Convert whole event object to string
            return eventData.includes(searchQuery.toLowerCase()); // Check if the search query exists in the event data
        });
    };

    // Apply filter to each category
    const filteredCurrent = filterExhibitions(currentExhibitions);
    const filteredPast = filterExhibitions(pastExhibitions);
    const filteredUpcoming = filterExhibitions(upcomingEvents);

    return (
        <div className="exhibitions-container">
            <div className="exhibition-container">
                <h1>Explore Our Exhibitions</h1>
                <p className="exhibition-description">
                    Step into a world of artistic brilliance with our exclusive exhibitions, showcasing both emerging and renowned artists. 
                    Explore past, present, and upcoming exhibitions, each offering a distinct journey through creativity, culture, and innovation. 
                    Browse captivating artworks, read artist insights, and secure tickets to witness extraordinary art experiences in person or virtually. 
                    Stay connected with the latest trends in the art world, all in one immersive platform.
                </p>
            </div>

            <input 
                type="text" 
                placeholder="Search Exhibitions or Artists..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            <br />
        
            <h2>Current Exhibitions</h2>
            <br />
            <div className="exhibition-section">
                {filteredCurrent.length > 0 ? 
                    filteredCurrent.map(event => (
                        <ExhibitionCard key={event._id} event={event} />
                    )) : <p>No results found.</p>}
            </div>

            <br />
            <h2>Past Exhibitions</h2>
            <br />
            <div className="exhibition-section">
                {filteredPast.length > 0 ? 
                    filteredPast.map(event => (
                        <ExhibitionCard key={event._id} event={event} />
                    )) : <p>No results found.</p>}
            </div>

            <br />
            <h2>Upcoming Events</h2>
            <br />
            <div className="exhibition-section">
                {filteredUpcoming.length > 0 ? 
                    filteredUpcoming.map(event => (
                        <ExhibitionCard key={event._id} event={event} />
                    )) : <p>No results found.</p>}
            </div>

            <br />
            <div className="add-event-buttons">
                <button onClick={() => navigate('/add-event')} className="add-btn">
                    Add Event
                </button>
            </div>

            {/* New button to navigate to 3D Private Viewing page */}
            <div className="private-viewing-button">
                <button
                    onClick={() => window.location.href = 'http://localhost:3000/#/3d-gallery'}
                    className="add-btn"
                >
                    Explore 3D Private Viewing
                </button>
            </div>
        </div>
    );
};

export default Exhibitions;
