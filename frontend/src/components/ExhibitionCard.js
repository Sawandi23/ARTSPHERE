// src/components/ExhibitionCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/ExhibitionCard.css';


const ExhibitionCard = ({ event }) => {
    const navigate = useNavigate();

    
    
    const handleUpdate = (id) => {
        // Navigate to a form for updating the event
       
        navigate(`/update-event/${id}`);
    };

    const handleDelete = (id) => {
        // Send a request to delete the event
        axios.delete(`http://localhost:3000/events/${id}`)
            .then(() => {
                alert('Event deleted successfully');
               
            })
            .catch(err => console.error('Error deleting event:', err));
    };

    const handleCardClick = () => {
        navigate(`/events/${event._id}`);  // path that matches App.js route
    };
    

    return (
        <div className="exhibition-card" onClick={handleCardClick} > 
          
            <img src={event.image} alt={event.title} className="exhibition-image" />
            <div className="exhibition-info">
            <h2 className="exhibition-title">{event.title}</h2>
                <p className="exhibition-description">{event.description}</p>
                <p className="exhibition-details">{event.date} |       {event.venue}</p>
                
            </div>

            <div className="exhibition-actions">
            <button onClick={(e) => { e.stopPropagation(); handleUpdate(event._id); }} className="update-btn">
            Edit Details
        </button>
        
        <button onClick={(e) => { e.stopPropagation(); handleDelete(event._id); }} className="delete-btn">
            Remove
        </button>

       
            </div>

            
        </div>


    );
};

export default ExhibitionCard;
