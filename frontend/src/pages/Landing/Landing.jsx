import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../../assets/logo.svg'
import './Landing.css'

/**
 * Landing
 * First page users see. Displays the Fashion Battle logo with dancing
 * animations. After a few seconds, automatically redirects to the login page.
 *
 * Implementation notes:
 * - Uses framer-motion for smooth animation sequences
 * - Includes dramatic dance motion (bounce + spin + scale)
 * - Staggered letter animations for "FASHIONBATTLE" text
 * - Auto-redirects to /login after 6 seconds
 */
const Landing = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Show the dancing logo for 6 seconds, then redirect to login
    const timer = setTimeout(() => {
      navigate('/login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  // Couple dance motion: FASTER + MORE DRAMATIC - includes spin!
  const danceVariants = {
    idle: {
      y: [0, -25, 5, -30, 0],
      rotate: [0, -12, 360, 8, 0], // Added full 360° spin!
      scale: [1, 1.08, 0.92, 1.06, 1],
      transition: {
        duration: 2.2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  }

  // Letter stagger animation: FASTER reveal
  const letterVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.7, rotate: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: 0,
      transition: { duration: 0.4, ease: 'backOut' }
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <main className="landing-root" aria-label="Landing animation">
      <section className="landing-stage">
        {/* Decorative background lights (pure CSS) */}
        <div className="stage-lights">
          <span className="light light--one" />
          <span className="light light--two" />
          <span className="light light--three" />
          <span className="light light--four" />
          <span className="light light--five" />
        </div>

        {/* Dancing logo - inline SVG with animations */}
        <div className="dance-wrap">
          <div className="logo-container">
            <motion.img 
              src={logo}
              alt="Fashion Battle Logo"
              className="logo-image"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                rotate: { 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </div>
          <div className="fashion-dance-container">
            <div className="fashion-dance-stage">
              <svg 
                className="fashion-dance-svg"
                viewBox="0 0 300 200"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dancing Couple Group - Animated */}
                <motion.g 
                  id="dancers-group" 
                  transform="translate(0,200) scale(0.1,-0.1)"
                  variants={danceVariants}
                  initial="idle"
                  animate="idle"
                  style={{ transformOrigin: '50% 50%' }}
                >
                  {/* Main dancing couple silhouette */}
                  <path 
                    id="couple-silhouette" 
                    fill="#000000" 
                    stroke="none"
                    d="M470 1779 c-102 -85 -128 -99 -177 -99 -28 0 -34 -3 -23 -10 23 -15
69 -12 100 7 27 15 29 15 55 -5 15 -12 34 -22 41 -22 8 0 14 -6 14 -14 0 -8
12 -28 26 -45 28 -34 26 -64 -7 -82 -45 -24 -99 34 -79 85 11 31 1 33 -31 8
-21 -18 -22 -20 -6 -43 25 -35 20 -78 -12 -127 -32 -47 -52 -119 -50 -185 1
-35 4 -26 22 52 27 115 43 131 138 137 l64 4 -65 -18 c-77 -21 -90 -28 -90
-49 0 -13 11 -14 68 -10 l67 6 -46 -13 c-26 -7 -52 -16 -58 -20 -17 -11 -13
-36 5 -36 24 0 12 -48 -36 -145 -42 -85 -70 -184 -70 -249 0 -53 8 -41 21 30
10 61 39 158 44 152 2 -2 -3 -28 -11 -58 -16 -60 -19 -135 -5 -110 5 8 12 42
16 75 9 83 25 155 34 155 4 0 4 -33 0 -72 -11 -101 -11 -148 0 -148 4 0 11 46
15 103 9 132 20 170 57 201 48 41 75 34 175 -41 49 -36 91 -68 93 -69 7 -6
-218 -217 -269 -253 -31 -22 -64 -35 -94 -38 -59 -7 -48 -25 12 -21 l47 3 13
-55 c28 -108 85 -285 89 -274 2 7 -10 64 -27 129 -36 140 -37 167 -7 225 52
104 79 21 79 -243 0 -98 1 -177 3 -175 2 2 11 71 19 153 25 232 79 454 123
501 22 24 28 25 86 19 68 -7 92 5 85 42 -4 20 -43 23 -109 9 -33 -7 -41 -4
-111 52 -41 33 -84 64 -96 71 -29 16 -84 14 -108 -4 -22 -17 -34 -19 -34 -5 0
5 14 16 30 25 45 23 40 47 -7 40 -35 -5 -33 -4 15 16 69 27 63 44 -14 42 l-59
-1 40 13 c22 7 47 14 56 14 9 1 24 10 34 21 17 18 17 20 1 26 -10 4 -46 4 -82
1 -35 -4 -64 -3 -64 1 0 18 25 31 51 25 36 -7 76 18 85 52 5 21 9 23 20 14 8
-7 17 -9 20 -6 3 3 -11 17 -31 33 -54 41 -59 56 -44 132 10 53 18 72 42 93 26
23 31 50 9 49 -4 -1 -45 -32 -92 -71z m35 -36 c-16 -67 -54 -91 -79 -50 -9 16
-5 23 24 48 45 38 64 38 55 2z m390 -618 c0 -13 -41 -19 -63 -10 -15 6 -15 8
3 16 25 10 60 7 60 -6z m-220 -165 c-13 -38 -29 -104 -36 -145 -15 -85 -19
-80 -39 39 l-13 78 54 49 c30 26 55 48 56 49 1 0 -9 -31 -22 -70z"
                  />
                  
                  <path 
                    id="couple-detail-1"
                    fill="#000000"
                    d="M311 1513 c-10 -42 -30 -173 -31 -196 0 -5 4 -6 9 -3 10 7 46 234 38
242 -2 3 -10 -17 -16 -43z"
                  />
                  
                  <path 
                    id="couple-detail-2"
                    fill="#000000"
                    d="M570 1423 c0 -2 33 -20 73 -39 l72 -35 -65 5 c-51 4 -61 3 -46 -6 27
-15 156 -24 156 -10 0 6 -6 14 -12 19 -19 12 -178 71 -178 66z"
                  />
                  
                  <path 
                    id="couple-detail-3"
                    fill="#000000"
                    d="M284 1182 c2 -52 9 -99 15 -105 8 -8 9 8 5 59 -11 120 -24 151 -20 46z"
                  />
                </motion.g>

                {/* Text group: FASHIONBATTLE letters - Staggered reveal */}
                <motion.g 
                  id="text-group" 
                  transform="translate(0,200) scale(0.1,-0.1)" 
                  fill="#000000" 
                  stroke="none"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.path variants={letterVariants} id="letter-F" d="M795 671 c-3 -5 0 -13 6 -16 7 -5 8 -21 4 -43 -4 -20 -7 -63 -8 -96 -2 -48 1 -61 13 -61 11 0 16 13 18 48 3 45 5 47 33 47 19 0 29 5 29 15 0 10 -10 15 -28 15 -26 0 -28 2 -24 34 4 32 7 35 40 38 19 2 37 9 40 16 5 15 -113 18 -123 3z"/>
                  
                  <motion.path variants={letterVariants} id="letter-A1" d="M959 615 c-12 -36 -29 -65 -36 -65 -16 0 -18 -17 -2 -22 7 -2 7 -12 -1 -32 -7 -19 -7 -33 -1 -39 15 -15 28 0 35 38 6 28 11 35 31 35 20 0 24 -5 27 -37 2 -26 8 -39 20 -41 14 -3 16 5 14 47 -1 28 -6 54 -9 58 -4 3 -7 25 -7 49 0 55 -8 74 -30 74 -13 0 -24 -18 -41 -65z m41 -25 c0 -29 -4 -40 -15 -40 -18 0 -18 7 -4 49 15 41 19 39 19 -9z"/>
                  
                  <motion.path variants={letterVariants} id="letter-S" d="M1107 662 c-10 -10 -17 -33 -17 -50 0 -26 7 -36 40 -57 41 -26 53 -58 25 -69 -23 -8 -43 3 -47 27 -4 31 -34 29 -30 -2 4 -37 21 -51 63 -51 28 0 41 5 49 19 18 35 11 57 -30 90 -42 34 -50 60 -24 82 13 10 17 10 25 -2 5 -8 9 -20 9 -26 0 -7 7 -13 15 -13 17 0 20 23 5 51 -14 25 -61 25 -83 1z"/>
                  
                  <motion.path variants={letterVariants} id="letter-H" d="M1250 627 c0 -29 -5 -58 -11 -64 -7 -7 -7 -13 -1 -17 5 -3 7 -26 4 -51 -4 -37 -2 -45 12 -45 11 0 16 9 16 29 0 44 10 61 34 61 20 0 23 -5 22 -41 -1 -23 4 -44 10 -46 13 -4 22 45 30 155 5 60 3 72 -9 72 -11 0 -18 -16 -22 -55 -7 -50 -9 -55 -33 -55 -24 0 -25 1 -19 55 5 50 4 55 -14 55 -16 0 -19 -7 -19 -53z"/>
                  
                  <motion.path variants={letterVariants} id="letter-I" d="M1410 671 c0 -6 5 -13 11 -17 15 -9 4 -165 -12 -175 -17 -10 -1 -29 26 -29 25 0 46 21 28 27 -17 6 -4 166 14 176 7 5 11 12 8 18 -8 12 -75 12 -75 0z"/>
                  
                  <motion.path variants={letterVariants} id="letter-O" d="M1548 669 c-19 -11 -48 -96 -48 -141 0 -49 16 -68 58 -68 60 0 77 23 88 114 5 43 3 61 -10 81 -18 27 -56 33 -88 14z m67 -99 c-12 -81 -53 -117 -76 -66 -8 17 -8 39 1 80 14 67 36 86 63 54 15 -18 17 -32 12 -68z"/>
                  
                  <motion.path variants={letterVariants} id="letter-N" d="M1685 618 c-12 -128 -11 -163 5 -163 12 0 16 17 20 75 l5 75 25 -74 c22 -65 41 -93 56 -79 7 8 12 38 19 136 7 79 5 92 -8 92 -12 0 -17 -17 -22 -77 -4 -43 -8 -82 -9 -88 -2 -5 -13 29 -26 78 -18 68 -27 87 -41 87 -14 0 -19 -12 -24 -62z"/>
                  
                  <motion.path variants={letterVariants} id="letter-B" d="M1857 674 c-3 -3 -1 -14 4 -23 7 -10 7 -45 1 -101 -5 -47 -6 -89 -1 -94 5 -5 27 -4 54 4 69 19 99 76 54 101 l-21 11 21 14 c27 20 28 69 2 84 -21 11 -104 14 -114 4z m81 -20 c28 -8 29 -38 0 -58 -33 -23 -38 -20 -38 24 0 42 1 43 38 34z m8 -104 c19 0 18 -19 -3 -42 -26 -29 -53 -23 -53 10 0 33 8 45 28 37 7 -3 20 -5 28 -5z"/>
                  
                  <motion.path variants={letterVariants} id="letter-A2" d="M2065 619 c-10 -33 -24 -63 -29 -65 -15 -6 -17 -106 -3 -101 7 2 16 20 21 40 7 29 15 37 31 37 18 0 24 -7 29 -40 4 -28 11 -40 22 -40 14 0 15 7 10 39 -4 25 -2 42 5 47 8 5 8 8 0 13 -6 4 -15 34 -19 67 -6 49 -10 59 -28 62 -17 2 -23 -7 -39 -59z m39 -26 c6 -39 4 -43 -15 -43 -16 0 -20 4 -14 18 3 9 9 30 12 45 7 34 9 32 17 -20z"/>
                  
                  <motion.path variants={letterVariants} id="letter-T1" d="M2176 673 c-14 -14 -4 -23 24 -23 l30 0 -6 -72 c-11 -118 -10 -123 6 -123 8 0 16 9 17 20 1 11 5 55 8 98 l7 77 60 0 59 0 -7 -82 c-4 -46 -7 -89 -8 -98 -1 -8 6 -15 14 -15 12 0 17 21 24 98 l8 97 29 0 c19 0 29 5 29 15 0 12 -24 14 -144 14 -79 0 -146 -2 -150 -6z"/>
                  
                  <motion.path variants={letterVariants} id="letter-T2" d="M2487 573 c-3 -60 -2 -111 2 -115 10 -11 97 6 93 17 -1 6 -17 10 -35 11 -17 0 -31 5 -31 10 1 5 5 48 9 97 6 82 6 87 -13 87 -17 0 -20 -10 -25 -107z"/>
                  
                  <motion.path variants={letterVariants} id="letter-E" d="M2623 570 c-2 -122 0 -126 66 -112 52 11 54 34 2 26 l-41 -7 0 36 c0 34 2 36 38 39 20 2 36 7 34 13 -1 5 -16 8 -32 7 -29 -3 -30 -2 -30 37 l0 41 40 0 c29 0 40 4 40 15 0 12 -13 15 -57 15 l-58 0 -2 -110z"/>
                </motion.g>
              </svg>
            </div>
          </div>
        </div>

        {/* Brand text below the animation */}
        <div className="landing-brand">
          <h1 className="landing-title">Fashion Battle</h1>
          <p className="landing-sub">Quick. Playful. Competitive.</p>
        </div>
      </section>
    </main>
  )
}

export default Landing
