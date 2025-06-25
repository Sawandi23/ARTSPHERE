// src/pages/Gallery3DPage.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const Gallery3DPage = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const [artworks, setArtworks] = useState([]);

  // Scene setup on mount
  useEffect(() => {
    const mountNode = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#121212');
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 10);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(ambientLight, directionalLight);

    // Room
    const roomSize = 12;
    const room = new THREE.Mesh(
      new THREE.BoxGeometry(roomSize, 8, roomSize),
      new THREE.MeshStandardMaterial({ color: '#0d0d0d', side: THREE.BackSide })
    );
    scene.add(room);

    // Raycaster for click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, cameraRef.current);

      const intersects = raycaster.intersectObjects(scene.children);
      const clicked = intersects.find((obj) => obj.object.userData?.fullImage);

      if (clicked) {
        const img = new Image();
        img.src = clicked.object.userData.fullImage;
        img.style.position = 'fixed';
        img.style.top = 0;
        img.style.left = 0;
        img.style.width = '100vw';
        img.style.height = '100vh';
        img.style.objectFit = 'contain';
        img.style.backgroundColor = 'rgba(187, 182, 182, 0.95)';
        img.style.zIndex = 9999;
        img.onclick = () => document.body.removeChild(img);
        document.body.appendChild(img);
      }
    };
    window.addEventListener('click', onClick);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('click', onClick);
      if (mountNode) mountNode.removeChild(renderer.domElement);
    };
  }, []);

  // Add artworks dynamically when state updates
  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;
    const textureLoader = new THREE.TextureLoader();

    artworks.forEach(({ url, position, title }) => {
      textureLoader.load(url, (texture) => {
        const imageWidth = texture.image.width;
        const imageHeight = texture.image.height;
        const aspectRatio = imageWidth / imageHeight;
        const height = 2.5;
        const width = height * aspectRatio;

        const art = new THREE.Mesh(
          new THREE.PlaneGeometry(width, height),
          new THREE.MeshBasicMaterial({ map: texture })
        );
        art.position.set(...position);
        art.userData = { fullImage: url, title };
        scene.add(art);

        // Create canvas-based label
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = '24px Arial';
        canvas.width = ctx.measureText(title).width + 20;
        canvas.height = 60;
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText(title, 10, 40);

        const textTexture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: textTexture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2, 0.5, 1);
        sprite.position.set(position[0], position[1] - (height / 2 + 0.6), position[2] + 0.01);
        scene.add(sprite);
      });
    });
  }, [artworks]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).slice(0, 3);
    const spacing = 4;
    const centerOffset = ((files.length - 1) * spacing) / 2;

    const newArtworks = files.map((file, index) => ({
      url: URL.createObjectURL(file),
      position: [index * spacing - centerOffset, 2.5, -5],
      title: file.name.split('.')[0],
    }));
    setArtworks(newArtworks);
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
};

export default Gallery3DPage;