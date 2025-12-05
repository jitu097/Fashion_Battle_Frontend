import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import './battleHome.css';

const BattleHome = () => {
  const [currentBattle, setCurrentBattle] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [battleStats, setBattleStats] = useState({ left: 0, right: 0 });
  const [isVoting, setIsVoting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample battle data
  const sampleBattles = [
    {
      id: 1,
      title: "Street Style Showdown",
      description: "Which outfit screams street fashion louder?",
      leftOutfit: {
        id: 'outfit1',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
        title: 'Urban Chic',
        user: '@fashionista_maya',
        votes: 847
      },
      rightOutfit: {
        id: 'outfit2',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
        title: 'Casual Cool',
        user: '@style_alex',
        votes: 923
      },
      endTime: Date.now() + 86400000, // 24 hours from now
      category: 'Street Style',
      totalVotes: 1770
    }
  ];

  const featuredBattles = [
    {
      id: 2,
      title: "Formal vs Casual Friday",
      leftImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      rightImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop',
      votes: 2341,
      timeLeft: '2h 15m'
    },
    {
      id: 3,
      title: "Summer Vibes Battle",
      leftImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      rightImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop',
      votes: 1856,
      timeLeft: '5h 42m'
    },
    {
      id: 4,
      title: "Night Out Showdown",
      leftImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop',
      rightImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      votes: 3127,
      timeLeft: '12h 8m'
    }
  ];

  useEffect(() => {
    setCurrentBattle(sampleBattles[0]);
    
    // Timer countdown
    const timer = setInterval(() => {
      if (currentBattle) {
        const now = Date.now();
        const timeRemaining = currentBattle.endTime - now;
        
        if (timeRemaining > 0) {
          const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft('Battle Ended');
          setShowResults(true);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentBattle]);

  const handleVote = async (outfitId) => {
    if (userVote || isVoting) return;
    
    setIsVoting(true);
    setUserVote(outfitId);
    
    // Simulate API call
    setTimeout(() => {
      if (outfitId === 'outfit1') {
        setBattleStats(prev => ({ ...prev, left: prev.left + 1 }));
      } else {
        setBattleStats(prev => ({ ...prev, right: prev.right + 1 }));
      }
      setIsVoting(false);
      setShowResults(true);
    }, 1000);
  };

  const resetBattle = () => {
    setUserVote(null);
    setShowResults(false);
    setBattleStats({ left: 0, right: 0 });
  };

  if (!currentBattle) {
    return (
      <div className="battle-page">
        <Navbar activePage="Battle" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Battle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="battle-page">
      <Navbar activePage="Battle" />
      
      <div className="battle-container">
        {/* Battle Header */}
        <div className="battle-header">
          <div className="header-content">
            <div className="battle-badge">
              <span className="badge-icon">⚡</span>
              <span>Live Battle</span>
            </div>
            <h1 className="battle-title">{currentBattle.title}</h1>
            <p className="battle-description">{currentBattle.description}</p>
            
            <div className="battle-meta">
              <div className="battle-category">
                <span className="category-icon">🏷️</span>
                {currentBattle.category}
              </div>
              <div className="battle-timer">
                <span className="timer-icon">⏰</span>
                {timeLeft}
              </div>
              <div className="battle-participants">
                <span className="participants-icon">👥</span>
                {currentBattle.totalVotes.toLocaleString()} votes
              </div>
            </div>
          </div>
        </div>

        {/* Main Battle Arena */}
        <div className="battle-arena">
          <div className="battle-vs-container">
            {/* Left Outfit */}
            <div className={`battle-outfit left ${userVote === 'outfit1' ? 'voted' : ''} ${showResults ? 'show-results' : ''}`}>
              <div className="outfit-card" onClick={() => handleVote('outfit1')}>
                <div className="outfit-image-wrapper">
                  <img 
                    src={currentBattle.leftOutfit.image} 
                    alt={currentBattle.leftOutfit.title}
                    className="outfit-image"
                  />
                  {userVote === 'outfit1' && (
                    <div className="vote-overlay">
                      <div className="vote-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {showResults && (
                    <div className="results-overlay">
                      <div className="vote-percentage">
                        {Math.round((currentBattle.leftOutfit.votes / currentBattle.totalVotes) * 100)}%
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="outfit-info">
                  <h3 className="outfit-title">{currentBattle.leftOutfit.title}</h3>
                  <p className="outfit-user">{currentBattle.leftOutfit.user}</p>
                  <div className="outfit-stats">
                    <span className="vote-count">{currentBattle.leftOutfit.votes.toLocaleString()} votes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VS Divider */}
            <div className="vs-divider">
              <div className="vs-circle">
                <span className="vs-text">VS</span>
              </div>
              <div className="vs-line"></div>
            </div>

            {/* Right Outfit */}
            <div className={`battle-outfit right ${userVote === 'outfit2' ? 'voted' : ''} ${showResults ? 'show-results' : ''}`}>
              <div className="outfit-card" onClick={() => handleVote('outfit2')}>
                <div className="outfit-image-wrapper">
                  <img 
                    src={currentBattle.rightOutfit.image} 
                    alt={currentBattle.rightOutfit.title}
                    className="outfit-image"
                  />
                  {userVote === 'outfit2' && (
                    <div className="vote-overlay">
                      <div className="vote-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {showResults && (
                    <div className="results-overlay">
                      <div className="vote-percentage">
                        {Math.round((currentBattle.rightOutfit.votes / currentBattle.totalVotes) * 100)}%
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="outfit-info">
                  <h3 className="outfit-title">{currentBattle.rightOutfit.title}</h3>
                  <p className="outfit-user">{currentBattle.rightOutfit.user}</p>
                  <div className="outfit-stats">
                    <span className="vote-count">{currentBattle.rightOutfit.votes.toLocaleString()} votes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Battle Actions */}
          {!userVote && (
            <div className="battle-actions">
              <p className="vote-instruction">Tap on your favorite outfit to vote!</p>
            </div>
          )}

          {showResults && (
            <div className="battle-results">
              <div className="results-header">
                <h3>Battle Results</h3>
                <button className="new-battle-btn" onClick={resetBattle}>
                  <span>New Battle</span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                </button>
              </div>
              <div className="results-bars">
                <div className="result-bar left">
                  <div className="bar-fill" style={{ width: `${(currentBattle.leftOutfit.votes / currentBattle.totalVotes) * 100}%` }}></div>
                </div>
                <div className="result-bar right">
                  <div className="bar-fill" style={{ width: `${(currentBattle.rightOutfit.votes / currentBattle.totalVotes) * 100}%` }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Featured Battles */}
        <div className="featured-battles">
          <div className="section-header">
            <h2 className="section-title">More Battles</h2>
            <p className="section-subtitle">Join other exciting fashion battles</p>
          </div>
          
          <div className="battles-grid">
            {featuredBattles.map(battle => (
              <div key={battle.id} className="featured-battle-card">
                <div className="battle-images">
                  <div className="battle-image-wrapper">
                    <img src={battle.leftImage} alt="Outfit 1" className="battle-preview-image" />
                  </div>
                  <div className="mini-vs">VS</div>
                  <div className="battle-image-wrapper">
                    <img src={battle.rightImage} alt="Outfit 2" className="battle-preview-image" />
                  </div>
                </div>
                
                <div className="featured-battle-info">
                  <h3 className="featured-battle-title">{battle.title}</h3>
                  <div className="featured-battle-stats">
                    <span className="featured-votes">{battle.votes.toLocaleString()} votes</span>
                    <span className="featured-time">{battle.timeLeft} left</span>
                  </div>
                </div>
                
                <button className="join-battle-btn">
                  <span>Join Battle</span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleHome;
