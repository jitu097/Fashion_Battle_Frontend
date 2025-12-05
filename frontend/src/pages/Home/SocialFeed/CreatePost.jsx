import React, { useState, useRef, useEffect } from 'react'
import './CreatePost.css'

/**
 * CreatePost Component
 * 
 * Instagram-style post creation modal with:
 * - Image/Video upload
 * - Image adjustment and filters
 * - Caption with hashtag support
 * - Location tagging
 * - Draw on image
 * - Tag people on image
 * - Add text to image
 */
const CreatePost = ({ isOpen, onClose, onPostCreated }) => {
  // Step management
  const [step, setStep] = useState('select')
  
  // File management
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileType, setFileType] = useState(null)
  
  // Post details
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [hashtags, setHashtags] = useState([])
  
  // Filter and adjustments
  const [filter, setFilter] = useState('none')
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  
  // Image transformation (zoom, rotation, position)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  
  // Drawing mode
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawingColor, setDrawingColor] = useState('#ffffff')
  const [drawingSize, setDrawingSize] = useState(3)
  const [drawings, setDrawings] = useState([])
  const [currentDrawing, setCurrentDrawing] = useState([])
  
  // Tag people mode
  const [isTaggingPeople, setIsTaggingPeople] = useState(false)
  const [tags, setTags] = useState([])
  const [currentTag, setCurrentTag] = useState(null)
  const [tagInputValue, setTagInputValue] = useState('')
  
  // Add text mode
  const [isAddingText, setIsAddingText] = useState(false)
  const [textElements, setTextElements] = useState([])
  const [currentText, setCurrentText] = useState(null)
  const [textInputValue, setTextInputValue] = useState('')
  const [textColor, setTextColor] = useState('#ffffff')
  const [textSize, setTextSize] = useState(24)
  const [draggingTextIndex, setDraggingTextIndex] = useState(null)
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })
  
  // Refs
  const fileInputRef = useRef(null)
  const imageRef = useRef(null)
  const canvasRef = useRef(null)
  const drawingCanvasRef = useRef(null)

  const filters = [
    { name: 'none', label: 'Original' },
    { name: 'grayscale', label: 'Grayscale' },
    { name: 'sepia', label: 'Sepia' },
    { name: 'vintage', label: 'Vintage' },
    { name: 'warm', label: 'Warm' },
    { name: 'cool', label: 'Cool' },
    { name: 'dramatic', label: 'Dramatic' }
  ]

  const drawingColors = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']

  // Effect to render final canvas with all edits
  useEffect(() => {
    if (selectedFile && fileType === 'image' && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        
        // Draw base image with filters
        ctx.filter = getFilterString()
        ctx.drawImage(img, 0, 0)
        ctx.filter = 'none'
        
        // Draw all drawings
        drawings.forEach(drawing => {
          ctx.strokeStyle = drawing.color
          ctx.lineWidth = drawing.size
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.beginPath()
          drawing.points.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x, point.y)
            } else {
              ctx.lineTo(point.x, point.y)
            }
          })
          ctx.stroke()
        })
        
        // Draw all text elements
        textElements.forEach(text => {
          ctx.fillStyle = text.color
          ctx.font = `${text.size}px Arial`
          ctx.fillText(text.text, text.x, text.y)
        })
      }
      
      img.src = selectedFile
    }
  }, [selectedFile, fileType, drawings, textElements, filter, brightness, contrast, saturation])

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const type = file.type.startsWith('image') ? 'image' : 'video'
      setFileType(type)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedFile(reader.result)
        setStep('edit')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  /**
   * Handle mouse down to start dragging image
   */
  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      })
    }
  }

  /**
   * Handle mouse move to drag image
   */
  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  /**
   * Handle mouse up to stop dragging
   */
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  /**
   * Handle touch start for mobile dragging
   */
  const handleTouchStart = (e) => {
    if (zoom > 1) {
      setIsDragging(true)
      const touch = e.touches[0]
      setDragStart({
        x: touch.clientX - imagePosition.x,
        y: touch.clientY - imagePosition.y
      })
    }
  }

  /**
   * Handle touch move for mobile dragging
   */
  const handleTouchMove = (e) => {
    if (isDragging && zoom > 1) {
      const touch = e.touches[0]
      setImagePosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      })
    }
  }

  /**
   * Handle touch end for mobile dragging
   */
  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  /**
   * Reset image position when zoom changes
   */
  const handleZoomChange = (newZoom) => {
    setZoom(newZoom)
    if (newZoom <= 1) {
      setImagePosition({ x: 0, y: 0 })
    }
  }

  /**
   * Handle caption text change and extract hashtags
   * Automatically detects and extracts hashtags (words starting with #)
   */
  const handleCaptionChange = (e) => {
    const text = e.target.value
    setCaption(text)
    
    // Extract all hashtags from the caption
    const hashtagMatches = text.match(/#\w+/g)
    if (hashtagMatches) {
      setHashtags(hashtagMatches)
    } else {
      setHashtags([]) // Clear hashtags if none found
    }
  }

  // Drawing functions
  const startDrawing = (e) => {
    if (!isDrawing) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) / rect.width
    const y = ((e.clientY || e.touches?.[0]?.clientY) - rect.top) / rect.height
    
    setCurrentDrawing([{ x, y }])
  }

  const draw = (e) => {
    if (!isDrawing || currentDrawing.length === 0) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) / rect.width
    const y = ((e.clientY || e.touches?.[0]?.clientY) - rect.top) / rect.height
    
    setCurrentDrawing([...currentDrawing, { x, y }])
    
    // Draw on temporary canvas
    if (drawingCanvasRef.current) {
      const canvas = drawingCanvasRef.current
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      
      ctx.strokeStyle = drawingColor
      ctx.lineWidth = drawingSize
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      if (currentDrawing.length === 1) {
        ctx.beginPath()
        ctx.moveTo(x * rect.width, y * rect.height)
      } else {
        const prevPoint = currentDrawing[currentDrawing.length - 2]
        ctx.beginPath()
        ctx.moveTo(prevPoint.x * rect.width, prevPoint.y * rect.height)
        ctx.lineTo(x * rect.width, y * rect.height)
        ctx.stroke()
      }
    }
  }

  const endDrawing = () => {
    if (currentDrawing.length > 0) {
      setDrawings([...drawings, { points: currentDrawing, color: drawingColor, size: drawingSize }])
      setCurrentDrawing([])
      
      // Clear temporary canvas
      if (drawingCanvasRef.current) {
        const canvas = drawingCanvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  const clearDrawings = () => {
    setDrawings([])
    setCurrentDrawing([])
    if (drawingCanvasRef.current) {
      const canvas = drawingCanvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const undoLastDrawing = () => {
    if (drawings.length > 0) {
      setDrawings(drawings.slice(0, -1))
    }
  }

  // Tag people functions
  const handleImageClickForTag = (e) => {
    if (!isTaggingPeople) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setCurrentTag({ x, y, username: '' })
  }

  const handleTagSubmit = () => {
    if (currentTag && tagInputValue.trim()) {
      setTags([...tags, { ...currentTag, username: tagInputValue.trim() }])
      setCurrentTag(null)
      setTagInputValue('')
    }
  }

  const handleTagCancel = () => {
    setCurrentTag(null)
    setTagInputValue('')
  }

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  // Add text functions
  const handleImageClickForText = (e) => {
    if (!isAddingText) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setCurrentText({ x, y, text: '', color: textColor, size: textSize })
  }

  const handleTextSubmit = () => {
    if (currentText && textInputValue.trim()) {
      setTextElements([...textElements, { ...currentText, text: textInputValue.trim() }])
      setCurrentText(null)
      setTextInputValue('')
    }
  }

  const handleTextCancel = () => {
    setCurrentText(null)
    setTextInputValue('')
  }

  const removeText = (index) => {
    setTextElements(textElements.filter((_, i) => i !== index))
  }

  // Drag text functions
  const handleTextMouseDown = (e, index) => {
    e.stopPropagation()
    setDraggingTextIndex(index)
    const rect = imageRef.current.getBoundingClientRect()
    setDragStartPos({
      x: e.clientX,
      y: e.clientY
    })
  }

  const handleTextMouseMove = (e) => {
    if (draggingTextIndex === null) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const deltaX = ((e.clientX - dragStartPos.x) / rect.width) * 100
    const deltaY = ((e.clientY - dragStartPos.y) / rect.height) * 100

    setTextElements(prev => prev.map((text, i) => 
      i === draggingTextIndex 
        ? { ...text, x: text.x + deltaX, y: text.y + deltaY }
        : text
    ))

    setDragStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleTextMouseUp = () => {
    setDraggingTextIndex(null)
  }

  useEffect(() => {
    if (draggingTextIndex !== null) {
      document.addEventListener('mousemove', handleTextMouseMove)
      document.addEventListener('mouseup', handleTextMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleTextMouseMove)
        document.removeEventListener('mouseup', handleTextMouseUp)
      }
    }
  }, [draggingTextIndex, dragStartPos])

  // Toggle modes
  const toggleDrawMode = () => {
    setIsDrawing(!isDrawing)
    setIsTaggingPeople(false)
    setIsAddingText(false)
  }

  const toggleTagMode = () => {
    setIsTaggingPeople(!isTaggingPeople)
    setIsDrawing(false)
    setIsAddingText(false)
  }

  const toggleTextMode = () => {
    setIsAddingText(!isAddingText)
    setIsDrawing(false)
    setIsTaggingPeople(false)
  }

  const handleBack = () => {
    if (step === 'edit') {
      setStep('select')
      setSelectedFile(null)
      setFileType(null)
    } else if (step === 'details') {
      setStep('edit')
    }
  }

  const handleNext = () => {
    if (step === 'edit') {
      setStep('details')
    }
  }

  const handlePost = () => {
    const newPost = {
      id: Date.now(),
      image: selectedFile,
      caption,
      location,
      hashtags,
      filter,
      timestamp: new Date().toISOString()
    }
    
    if (onPostCreated) {
      onPostCreated(newPost)
    }
    
    handleClose()
  }

  const handleClose = () => {
    // Reset all states
    setStep('select')
    setSelectedFile(null)
    setFileType(null)
    setCaption('')
    setLocation('')
    setHashtags([])
    setFilter('none')
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setZoom(1)
    setRotation(0)
    setImagePosition({ x: 0, y: 0 })
    setIsDragging(false)
    setIsDrawing(false)
    setDrawings([])
    setCurrentDrawing([])
    setIsTaggingPeople(false)
    setTags([])
    setCurrentTag(null)
    setTagInputValue('')
    setIsAddingText(false)
    setTextElements([])
    setCurrentText(null)
    setTextInputValue('')
    onClose()
  }

  const getFilterString = () => {
    let filterString = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
    
    switch (filter) {
      case 'grayscale':
        filterString += ' grayscale(100%)'
        break
      case 'sepia':
        filterString += ' sepia(80%)'
        break
      case 'vintage':
        filterString += ' sepia(40%) contrast(110%) brightness(95%)'
        break
      case 'warm':
        filterString += ' sepia(20%) saturate(120%)'
        break
      case 'cool':
        filterString += ' hue-rotate(180deg) saturate(90%)'
        break
      case 'dramatic':
        filterString += ' contrast(150%) brightness(90%) saturate(130%)'
        break
      default:
        break
    }
    
    return filterString
  }

  const getFilterStyle = () => {
    // Return combined style object with filter, transform, and position
    return {
      filter: getFilterString(),
      transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoom}) rotate(${rotation}deg)`,
      cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : isDrawing ? 'crosshair' : isTaggingPeople || isAddingText ? 'pointer' : 'default',
      transition: isDragging ? 'none' : 'transform 0.3s ease'
    }
  }

  if (!isOpen) return null

  return (
    <div className="create-post-overlay" onClick={handleClose}>
      <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          {/* Left Side - Back Button */}
          {step !== 'select' && (
            <button className="header-btn back-btn" onClick={handleBack} aria-label="Go back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* Center - Title */}
          <h2 className="modal-title">
            {step === 'select' && 'Create New Post'}
            {step === 'edit' && 'Edit'}
            {step === 'details' && 'New Post'}
          </h2>
          
          {/* Right Side - Action Buttons */}
          <div className="header-right-actions">
            {step === 'edit' && (
              <button className="header-btn next-btn" onClick={handleNext}>
                Next
              </button>
            )}
            {step === 'details' && (
              <button className="header-btn share-btn" onClick={handlePost}>
                Share
              </button>
            )}
            <button className="header-btn close-btn" onClick={handleClose} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Step 1: Select File */}
          {step === 'select' && (
            <div className="select-step">
              <div className="upload-area">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="upload-title">Drag photos and videos here</h3>
                <button className="browse-btn" onClick={handleBrowseClick}>
                  {/* Desktop text - Shows on large screens */}
                  <span className="browse-text-desktop">Select from the computer</span>
                  {/* Mobile/Tablet text - Shows on smaller devices */}
                  <span className="browse-text-mobile">Select from device</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="file-input"
                />
              </div>
            </div>
          )}

          {/* Step 2: Edit Image */}
          {step === 'edit' && selectedFile && (
            <div className="edit-step">
              <div 
                className="preview-area"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div className="image-container">
                  {fileType === 'image' ? (
                    <>
                      <img
                        ref={imageRef}
                        src={selectedFile}
                        alt="Preview"
                        className="preview-media"
                        style={getFilterStyle()}
                        onMouseDown={isDrawing ? startDrawing : handleMouseDown}
                        onMouseMove={isDrawing ? draw : undefined}
                        onMouseUp={isDrawing ? endDrawing : undefined}
                        onClick={isTaggingPeople ? handleImageClickForTag : isAddingText ? handleImageClickForText : undefined}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        draggable={false}
                      />
                      
                      {/* Drawing Canvas Overlay */}
                      {isDrawing && (
                        <canvas
                          ref={drawingCanvasRef}
                          className="drawing-canvas"
                          width={imageRef.current?.offsetWidth || 800}
                          height={imageRef.current?.offsetHeight || 600}
                        />
                      )}
                      
                      {/* Display existing drawings */}
                      <svg className="drawings-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {drawings.map((drawing, index) => (
                          <polyline
                            key={index}
                            points={drawing.points.map(p => `${p.x * 100},${p.y * 100}`).join(' ')}
                            fill="none"
                            stroke={drawing.color}
                            strokeWidth={drawing.size / 10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ))}
                      </svg>
                      
                      {/* Display tags */}
                      {tags.map((tag, index) => (
                        <div
                          key={index}
                          className="image-tag"
                          style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                        >
                          <div className="tag-marker"></div>
                          <div className="tag-label">
                            @{tag.username}
                            <button
                              onClick={() => removeTag(index)}
                              className="tag-remove"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {/* Current tag being placed */}
                      {currentTag && (
                        <div
                          className="image-tag current-tag"
                          style={{ left: `${currentTag.x}%`, top: `${currentTag.y}%` }}
                        >
                          <div className="tag-marker"></div>
                          <div className="tag-input-container">
                            <input
                              type="text"
                              value={tagInputValue}
                              onChange={(e) => setTagInputValue(e.target.value)}
                              placeholder="Tag someone..."
                              className="tag-input"
                              autoFocus
                              onKeyPress={(e) => e.key === 'Enter' && handleTagSubmit()}
                            />
                            <button onClick={handleTagSubmit} className="tag-confirm">✓</button>
                            <button onClick={handleTagCancel} className="tag-cancel">×</button>
                          </div>
                        </div>
                      )}
                      
                      {/* Display text elements */}
                      {textElements.map((text, index) => (
                        <div
                          key={index}
                          className={`image-text ${draggingTextIndex === index ? 'dragging' : ''}`}
                          style={{
                            left: `${text.x}%`,
                            top: `${text.y}%`,
                            color: text.color,
                            fontSize: `${text.size / 10}vw`,
                            cursor: 'move'
                          }}
                          onMouseDown={(e) => handleTextMouseDown(e, index)}
                        >
                          {text.text}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeText(index)
                            }}
                            className="text-remove"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      
                      {/* Current text being added */}
                      {currentText && (
                        <div
                          className="image-text current-text"
                          style={{ left: `${currentText.x}%`, top: `${currentText.y}%` }}
                        >
                          <div className="text-input-container">
                            <input
                              type="text"
                              value={textInputValue}
                              onChange={(e) => setTextInputValue(e.target.value)}
                              placeholder="Type text..."
                              className="text-input"
                              style={{ color: textColor }}
                              autoFocus
                              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                            />
                            <button onClick={handleTextSubmit} className="text-confirm">✓</button>
                            <button onClick={handleTextCancel} className="text-cancel">×</button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <video
                      src={selectedFile}
                      className="preview-media"
                      style={getFilterStyle()}
                      controls
                    />
                  )}
                </div>
              </div>

              <div className="editing-panel">
                {/* Tool Selection */}
                <div className="edit-section">
                  <h3 className="section-title">Tools</h3>
                  <div className="tools-grid">
                    <button
                      className={`tool-btn ${isDrawing ? 'active' : ''}`}
                      onClick={toggleDrawMode}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Draw
                    </button>
                    <button
                      className={`tool-btn ${isTaggingPeople ? 'active' : ''}`}
                      onClick={toggleTagMode}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Tag People
                    </button>
                    <button
                      className={`tool-btn ${isAddingText ? 'active' : ''}`}
                      onClick={toggleTextMode}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      Add Text
                    </button>
                  </div>
                </div>
                
                {/* Drawing Controls */}
                {isDrawing && (
                  <div className="edit-section">
                    <h3 className="section-title">Drawing Options</h3>
                    <div className="drawing-controls">
                      <div className="control-group">
                        <label className="control-label">Color</label>
                        <div className="color-picker">
                          {drawingColors.map(color => (
                            <button
                              key={color}
                              className={`color-option ${drawingColor === color ? 'active' : ''}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setDrawingColor(color)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label">Size: {drawingSize}px</label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={drawingSize}
                          onChange={(e) => setDrawingSize(parseInt(e.target.value))}
                          className="adjustment-slider"
                        />
                      </div>
                      <div className="drawing-actions">
                        <button onClick={undoLastDrawing} className="action-btn" disabled={drawings.length === 0}>
                          Undo
                        </button>
                        <button onClick={clearDrawings} className="action-btn" disabled={drawings.length === 0}>
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Text Controls */}
                {isAddingText && (
                  <div className="edit-section">
                    <h3 className="section-title">Text Options</h3>
                    <div className="text-controls">
                      <div className="control-group">
                        <label className="control-label">Color</label>
                        <div className="color-picker">
                          {drawingColors.map(color => (
                            <button
                              key={color}
                              className={`color-option ${textColor === color ? 'active' : ''}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setTextColor(color)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label">Size: {textSize}px</label>
                        <input
                          type="range"
                          min="16"
                          max="72"
                          value={textSize}
                          onChange={(e) => setTextSize(parseInt(e.target.value))}
                          className="adjustment-slider"
                        />
                      </div>
                      <p className="hint-text">Click on the image to add text</p>
                    </div>
                  </div>
                )}

                {/* Filters */}
                <div className="edit-section">
                  <h3 className="section-title">Filters</h3>
                  <div className="filters-grid">
                    {filters.map((f) => (
                      <button
                        key={f.name}
                        className={`filter-option ${filter === f.name ? 'active' : ''}`}
                        onClick={() => setFilter(f.name)}
                      >
                        <div className="filter-preview">
                          <img src={selectedFile} alt={f.label} className={`filter-${f.name}`} />
                        </div>
                        <span className="filter-label">{f.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adjustments */}
                <div className="edit-section">
                  <h3 className="section-title">Adjustments</h3>
                  
                  <div className="adjustment-control">
                    <label className="control-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Brightness
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={brightness}
                      onChange={(e) => setBrightness(e.target.value)}
                      className="adjustment-slider"
                    />
                    <span className="control-value">{brightness}%</span>
                  </div>

                  <div className="adjustment-control">
                    <label className="control-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Contrast
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={contrast}
                      onChange={(e) => setContrast(e.target.value)}
                      className="adjustment-slider"
                    />
                    <span className="control-value">{contrast}%</span>
                  </div>

                  <div className="adjustment-control">
                    <label className="control-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Saturation
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(e.target.value)}
                      className="adjustment-slider"
                    />
                    <span className="control-value">{saturation}%</span>
                  </div>

                  {/* Zoom Control with Buttons */}
                  <div className="adjustment-control">
                    <label className="control-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      Zoom
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                      className="adjustment-slider"
                    />
                    <span className="control-value">{Number(zoom).toFixed(1)}x</span>
                    <div className="zoom-buttons">
                      {/* Zoom Out Button */}
                      <button
                        type="button"
                        onClick={() => handleZoomChange(Math.max(1, zoom - 0.5))}
                        className="zoom-btn"
                        disabled={zoom <= 1}
                        title="Zoom out"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                        </svg>
                      </button>
                      {/* Zoom In Button */}
                      <button
                        type="button"
                        onClick={() => handleZoomChange(Math.min(3, zoom + 0.5))}
                        className="zoom-btn"
                        disabled={zoom >= 3}
                        title="Zoom in"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </button>
                      {/* Reset Zoom Button */}
                      <button
                        type="button"
                        onClick={() => handleZoomChange(1)}
                        className="zoom-btn reset-btn"
                        disabled={zoom === 1}
                        title="Reset zoom"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Hint text for dragging when zoomed */}
                  {zoom > 1 && (
                    <div className="drag-hint">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                      </svg>
                      <span>Drag image to reposition</span>
                    </div>
                  )}

                  <div className="adjustment-control">
                    <label className="control-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Rotation
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="adjustment-slider"
                    />
                    <span className="control-value">{rotation}°</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Add Details */}
          {step === 'details' && selectedFile && (
            <div className="details-step">
              <div className="details-preview">
                {fileType === 'image' ? (
                  <img
                    src={selectedFile}
                    alt="Final preview"
                    className="final-preview-media"
                    style={getFilterStyle()}
                  />
                ) : (
                  <video
                    src={selectedFile}
                    className="final-preview-media"
                    style={getFilterStyle()}
                  />
                )}
              </div>

              <div className="details-form">
                {/* Caption Input - White text on dark background */}
                <div className="form-group">
                  <textarea
                    className="caption-input"
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={handleCaptionChange}
                    rows={4}
                    maxLength={2200} /* Instagram caption limit */
                  />
                  {/* Character counter */}
                  <div className="caption-meta">
                    <span className="char-count">{caption.length}/2200</span>
                  </div>
                  {/* Display extracted hashtags */}
                  {hashtags.length > 0 && (
                    <div className="hashtags-preview">
                      {hashtags.map((tag, index) => (
                        <span key={index} className="hashtag-chip">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Input - White text on dark background */}
                <div className="form-group">
                  <div className="input-with-icon">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="text"
                      className="location-input"
                      placeholder="Add location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="post-options">
                  <button className="option-btn" onClick={toggleDrawMode}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>Draw</span>
                  </button>

                  <button className="option-btn" onClick={toggleTagMode}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Tag People</span>
                  </button>

                  <button className="option-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <span>Add Hashtags</span>
                  </button>

                  <button className="option-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <span>Add Music</span>
                  </button>
                </div>

                <div className="accessibility-section">
                  <button className="accessibility-btn">
                    <span>Accessibility</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <p className="accessibility-text">
                    Alt text describes your photos for people with visual impairments.
                  </p>
                </div>

                <div className="advanced-settings">
                  <button className="settings-btn">
                    <span>Advanced Settings</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreatePost
 