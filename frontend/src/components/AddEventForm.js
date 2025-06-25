import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddEventForm.css';

const AddEventForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        category: 'current',
        ticketsAvailable: '',
        ticketPrice: '',
        image: ''
    });
    
    //  Added state for title validation
    const [titleError, setTitleError] = useState('');
    const [message, setMessage] = useState('');

    //  Updated title validation function
    const handleTitleChange = (e) => {
        const forbiddenChars = /[@#$%^&*]/;
        const { value } = e.target;
    if (forbiddenChars.test(value)) {
           setTitleError("You can't use special characters");
         } else {
             setTitleError('');
             setFormData({ ...formData, title: value });
         }
     };

  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.venue || formData.ticketsAvailable === '' || !formData.ticketPrice || !formData.image) {
            setMessage('Please fill in all fields.');
            return;
        }

        if (isNaN(formData.ticketsAvailable) || formData.ticketsAvailable < 0) {
            setMessage('Please enter a valid number for tickets available (0 or more).');
            return;
        }

        if (isNaN(formData.ticketPrice) || formData.ticketPrice <= 0) {
            setMessage('Please enter a valid price for the ticket.');
            return;
        }

        const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/;
        if (!urlPattern.test(formData.image)) {
            setMessage('Please enter a valid image URL (png, jpg, jpeg, gif, webp).');
            return;
        }

        try {
            await axios.post('http://localhost:3000/events', formData);
            setMessage('Exhibition added successfully!');
            setTimeout(() => navigate('/Exhibitions'), 1000);
        } catch (error) {
            setMessage('Failed to add exhibition. Try again.');
        }
    };

    return (
        <div className="add-form-container">
            <h2>Add New Exhibition</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleTitleChange} required />
                {titleError && <p className="error-message">{titleError}</p>} {/* NEW: Display error message */}

                <label htmlFor="description">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />

                <label htmlFor="date">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                <label htmlFor="time">Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />

                <label htmlFor="venue">Venue</label>
                <input type="text" name="venue" value={formData.venue} onChange={handleChange} required />

                <label htmlFor="category">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="past">Past</option>
                    <option value="current">Current</option>
                    <option value="upcoming">Upcoming</option>
                </select>

                <label htmlFor="ticketsAvailable">Tickets Available</label>
                <input type="number" name="ticketsAvailable" value={formData.ticketsAvailable} onChange={handleChange} required min="0" />

                <label htmlFor="ticketPrice">Ticket Price</label>
                <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} required min="1" />

                <label htmlFor="image">Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} required />

                <button type="submit">Add Exhibition</button>
            </form>
        </div>
    );
};

export default AddEventForm;
