import React from 'react';

function ExhibitionList() {
  return (
    <div>
   
    </div>
  )
}

useEffect(() => {
  fetch("http://localhost:3000/events")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched data from backend:", data); // 👈 THIS LINE
      setEvents(data);
    })
    .catch((err) => console.error("Error fetching events:", err));
}, []);


export default ExhibitionList;
