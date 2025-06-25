import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ARViewingPage.css';

const ARViewingPage = () => {
  const arContainerRef = useRef(null); // Reference to the AR view container
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const loadAR = async () => {
      try {
        // ✅ Check if MindAR is loaded (scripts must be in index.html)
        if (!window.MINDAR || !window.MINDAR.IMAGE) {
          throw new Error("MindAR script not loaded. Make sure you included the script tags in index.html.");
        }

        // ✅ Create AR scene using MindAR
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
          container: arContainerRef.current,
          imageTargetSrc: '/targets.mind', // Target image reference (must be built using MindAR tool)
        });

        const { renderer, scene, camera } = mindarThree;

        // ✅ Track the first image target (index 0)
        const anchor = mindarThree.addAnchor(0);

        // ✅ Load a JPG image from public folder
        const texture = new window.THREE.TextureLoader().load('/logo.jpg'); // Replace with your own file if needed

        // ✅ Create a flat plane with the image
        const geometry = new window.THREE.PlaneGeometry(1, 1); // 1x1 meter plane
        const material = new window.THREE.MeshBasicMaterial({ map: texture });
        const imagePlane = new window.THREE.Mesh(geometry, material);

        // ✅ Attach the image plane to the anchor (so it appears on the tracked image)
        anchor.group.add(imagePlane);

        // ✅ Start the AR experience
        await mindarThree.start();

        // ✅ Render loop
        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });
      } catch (err) {
        console.error("AR Loading Error:", err);
        alert("Failed to load AR. Please check the console for more details.");
      }
    };

    loadAR();

    // ✅ Cleanup on page unload
    return () => {
      const container = arContainerRef.current;
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="ar-viewing-wrapper">
      <h2>Private AR Viewing Room</h2>
      <div ref={arContainerRef} className="ar-container" />
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
    </div>
  );
};

export default ARViewingPage;
