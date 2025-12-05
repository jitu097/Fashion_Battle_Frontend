import React, { useState, useRef } from 'react'
import Navbar from '../../../components/Navbar'
import './tryonHome.css'

/**
 * Try-On Home Component
 * Modern AI-powered virtual try-on experience with drag & drop functionality
 */
const TryonHome = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [garmentImage, setGarmentImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  
  const fileInputRef = useRef(null)
  const garmentInputRef = useRef(null)

  // Sample garment options
  const sampleGarments = [
    {
      id: 1,
      name: 'Summer Dress',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      category: 'Dresses'
    },
    {
      id: 2,
      name: 'Denim Jacket',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=300&h=400&fit=crop',
      category: 'Jackets'
    },
    {
      id: 3,
      name: 'Floral Top',
      image: 'https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?w=300&h=400&fit=crop',
      category: 'Tops'
    },
    {
      id: 4,
      name: 'Elegant Blouse',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      category: 'Tops'
    }
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0])
    }
  }

  const handleImageUpload = (file) => {
    if (file && file.type.substr(0, 5) === 'image') {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0])
    }
  }

  const selectGarment = (garment) => {
    setGarmentImage(garment)
  }

  const processTryOn = async () => {
    if (!uploadedImage || !garmentImage) return
    
    setIsProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setResult('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop')
      setIsProcessing(false)
    }, 3000)
  }

  const resetTryOn = () => {
    setUploadedImage(null)
    setGarmentImage(null)
    setResult(null)
    setIsProcessing(false)
  }

  return (
    <div className="tryon-page">
      <Navbar activePage="Try On AI" />
      
      <div className="tryon-container">
        {/* Header Section */}
        <header className="tryon-header">
          <div className="header-content">
            <h1 className="tryon-title">
              AI Virtual Try-On
              <span className="title-badge">NEW</span>
            </h1>
            <p className="tryon-subtitle">
              Experience fashion like never before. Upload your photo and try on any outfit instantly with our advanced AI technology.
            </p>
          </div>
        </header>

        {/* Main Try-On Interface */}
        <main className="tryon-main">
          <div className="tryon-workflow">
            
            {/* Step 1: Upload Photo */}
            <section className="workflow-step">
              <div className="step-header">
                <div className="step-number">1</div>
                <h3 className="step-title">Upload Your Photo</h3>
              </div>
              
              <div 
                className={`upload-zone ${dragActive ? 'drag-active' : ''} ${uploadedImage ? 'has-image' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="uploaded-preview">
                    <img src={uploadedImage} alt="Uploaded" className="preview-image" />
                    <button className="change-photo-btn" onClick={(e) => {
                      e.stopPropagation()
                      setUploadedImage(null)
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="upload-content">
                    <div className="upload-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h4 className="upload-title">Drop your photo here</h4>
                    <p className="upload-text">or click to browse</p>
                    <span className="upload-formats">JPG, PNG up to 10MB</span>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="file-input"
                />
              </div>
            </section>

            {/* Step 2: Choose Garment */}
            <section className="workflow-step">
              <div className="step-header">
                <div className="step-number">2</div>
                <h3 className="step-title">Choose Garment</h3>
              </div>
              
              <div className="garment-grid">
                {sampleGarments.map((garment) => (
                  <div
                    key={garment.id}
                    className={`garment-card ${garmentImage?.id === garment.id ? 'selected' : ''}`}
                    onClick={() => selectGarment(garment)}
                  >
                    <div className="garment-image-wrapper">
                      <img src={garment.image} alt={garment.name} className="garment-image" />
                      <div className="garment-overlay">
                        <span className="garment-category">{garment.category}</span>
                      </div>
                    </div>
                    <div className="garment-info">
                      <h4 className="garment-name">{garment.name}</h4>
                    </div>
                    {garmentImage?.id === garment.id && (
                      <div className="selected-indicator">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Step 3: Generate Result */}
            <section className="workflow-step">
              <div className="step-header">
                <div className="step-number">3</div>
                <h3 className="step-title">Try On Result</h3>
              </div>
              
              <div className="result-section">
                {!result ? (
                  <div className="result-placeholder">
                    {uploadedImage && garmentImage ? (
                      <button 
                        className={`tryon-btn ${isProcessing ? 'processing' : ''}`}
                        onClick={processTryOn}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <div className="processing-spinner"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Generate Try-On
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="placeholder-content">
                        <div className="placeholder-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="placeholder-text">Upload a photo and select a garment to see the magic!</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="result-display">
                    <div className="result-image-wrapper">
                      <img src={result} alt="Try-on result" className="result-image" />
                      <div className="result-actions">
                        <button className="action-btn download-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </button>
                        <button className="action-btn share-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          Share
                        </button>
                        <button className="action-btn reset-btn" onClick={resetTryOn}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Try Another
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="features-title">Why Choose Our AI Try-On?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">Get results in seconds with our optimized AI processing</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="feature-title">Realistic Results</h3>
              <p className="feature-description">Advanced AI technology for photorealistic try-on experiences</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="feature-title">Privacy First</h3>
              <p className="feature-description">Your photos are processed securely and never stored</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TryonHome
