// src/App.js
import './App.css';
import './styles/variables.css';


import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Exhibitions from './Pages/Exhibitions';

import EventDetails from './Pages/EventDetails';
import AddEventForm from './components/AddEventForm';
import UpdateEventForm from './components/UpdateEventForm';
import Gallery3DPage from './Pages/3DGalleryPage';
import ARViewerPage from './Pages/ARViewerPage';

import UserExhibitions from './Pages/UserExhibitions';
//import UserDashboard from './Pages/UserDashboard';



function App() {
  return (
    <Router>
      <Navbar />
     
      <Routes>
      <Route path="/" element={<Exhibitions />} />  
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/add-event" element={<AddEventForm />} />
        <Route path="/update-event/:id" element={<UpdateEventForm />} />
        <Route path="/3d-gallery" element={<Gallery3DPage />} />
        <Route path="/ar-viewer" element={<ARViewerPage />} />
        <Route path="/user-exhibitions" element={<UserExhibitions />} />



       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
