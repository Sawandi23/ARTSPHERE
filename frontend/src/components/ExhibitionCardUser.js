// src/components/ExhibitionCardUser.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExhibitionCard.css';

const ExhibitionCardUser = ({ event }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/events/${event._id}`);
    };

    return (
        <div className="exhibition-card" onClick={handleCardClick}>
            <img src={event.image} alt={event.title} className="exhibition-image" />
            <div className="exhibition-info">
                <h2 className="exhibition-title">{event.title}</h2>
                <p className="exhibition-description">{event.description}</p>
                <p className="exhibition-details">{event.date} | {event.venue}</p>
            </div>
        </div>
    );
};

export default ExhibitionCardUser;
