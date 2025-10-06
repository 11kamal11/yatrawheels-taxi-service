import React, { useEffect, useRef } from 'react'

const LocationInput = ({ placeholder, value, onChange, onPlaceSelect }) => {
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      try {
        // Initialize Google Places Autocomplete
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode'], // Allow all types of places
          componentRestrictions: { country: 'in' }, // Restrict to India
          fields: ['formatted_address', 'geometry', 'name']
        })

        // Add listener for place selection
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace()
          if (place && place.formatted_address) {
            onPlaceSelect({
              address: place.formatted_address,
              name: place.name || place.formatted_address,
              geometry: place.geometry
            })
          }
        })
      } catch (error) {
        console.warn('Google Maps Places API not available:', error)
      }
    } else {
      console.warn('Google Maps API not loaded. Please add a valid API key to index.html')
    }

    return () => {
      if (autocompleteRef.current && window.google && window.google.maps) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [onPlaceSelect])

  const handleInputChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      className="location-input"
      autoComplete="off"
    />
  )
}

export default LocationInput