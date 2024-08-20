import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const generations = [
  { id: 'gen1', label: 'Gen 1', imageUrl: process.env.PUBLIC_URL + '/imgs/1.png' },
  { id: 'gen2', label: 'Gen 2', imageUrl: process.env.PUBLIC_URL + '/imgs/2.png' },
  { id: 'gen3', label: 'Gen 3', imageUrl: process.env.PUBLIC_URL + '/imgs/3.png' },
  { id: 'gen4', label: 'Gen 4', imageUrl: process.env.PUBLIC_URL + '/imgs/4.png' },
  { id: 'gen5', label: 'Gen 5', imageUrl: process.env.PUBLIC_URL + '/imgs/5.png' },
  { id: 'gen6', label: 'Gen 6', imageUrl: process.env.PUBLIC_URL + '/imgs/6.png' },
  { id: 'gen7', label: 'Gen 7', imageUrl: process.env.PUBLIC_URL + '/imgs/7.png' },
  { id: 'gen8', label: 'Gen 8', imageUrl: process.env.PUBLIC_URL + '/imgs/8.png' }
];

const Home = () => {
  const [currentGenIndex, setCurrentGenIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleFlipNext = () => {
    setFlipped(true);
    setCurrentGenIndex((prevIndex) => (prevIndex + 1) % generations.length);
    setTimeout(() => {
      setFlipped(false);
    }, 800); // Tempo da animação (0.8s)
  };

  const handleFlipPrev = () => {
    setFlipped(true);
    setCurrentGenIndex((prevIndex) => 
      prevIndex === 0 ? generations.length - 1 : (prevIndex - 1) % generations.length
    );
    setTimeout(() => {
      setFlipped(false);
    }, 800); // Tempo da animação (0.8s)
  };

  const handleCardClick = () => {
    const generationId = generations[currentGenIndex].id;
    navigate(`/pokemon/${generationId}`);
  };

  return (
    <div className="home-container">
      <div className="background-video-container">
        <video autoPlay loop muted className="background-video">
          <source src={process.env.PUBLIC_URL + '/videos/rottomdex_background.mp4'} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
        <div className="video-overlay">
          <img src={process.env.PUBLIC_URL + '/imgs/overlay_image.png'} alt="Overlay" className="overlay-image" />
        </div>
      </div>
      <img 
      src={process.env.PUBLIC_URL + '/imgs/logo.png'} // Substitua 'logo.png' pelo nome do seu arquivo PNG
      alt="Pokédex Interativa"
      className="logo-image"
    />
      <div className="card-carousel">
        <div 
          className={`card ${flipped ? 'flip' : ''}`} 
          onClick={handleCardClick}
          style={{ 
            backgroundImage: `url(${generations[currentGenIndex].imageUrl})`
          }}
        >
        </div>
        <div className="buttons">
          <button onClick={handleFlipPrev} className="flip-button pokebuttonmenos"></button>
          <button onClick={handleFlipNext} className="flip-button pokebuttonmais"></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
