# Google Maps API Setup Guide

## 🚀 **Google Maps Integration for Location Selection**

Your booking form now uses Google Maps Places API for dynamic location selection, just like Ola and Uber!

### **Current Status: Temporarily Disabled**
The Google Maps integration is currently disabled so your page loads properly. Location inputs are working as regular text fields.

### **To Enable Google Maps Features:**

### **Step 1: Get Google Maps API Key**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Places API**
4. Create credentials (API Key)
5. **Restrict the API key** to your domain for security

### **Step 2: Enable the Script**
Edit `index.html` and uncomment this line:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY_HERE&libraries=places"></script>
```

### **Step 3: Update BookingModal.jsx**
Replace the location input section in `src/components/BookingModal.jsx`:

**Current (temporary):**
```jsx
<input
  type="text"
  placeholder="Enter pickup location (Google Maps will be enabled soon)"
  value={pickupLocation}
  onChange={(e) => setPickupLocation(e.target.value)}
/>
```

**Replace with:**
```jsx
<LocationInput
  placeholder="Enter pickup location"
  value={pickupLocation}
  onChange={setPickupLocation}
  onPlaceSelect={(place) => setPickupLocation(place.address)}
/>
```

And add this import at the top:
```jsx
import LocationInput from './LocationInput'
```

### **Features You'll Get:**
✅ **Dynamic Location Search**: Type any address in India
✅ **Autocomplete Suggestions**: Google-powered place suggestions
✅ **Ola/Uber-like Experience**: Professional location selection

### **Cost Information:**
- Google Maps API has a generous free tier
- Places API: 1000 requests/day free
- Additional requests: ~$0.017 per request

---

**Your website is currently running at: http://localhost:3000**

The location inputs work as regular text fields for now. Enable Google Maps anytime by following the steps above!

### **Cost Information:**
- Google Maps API has a generous free tier
- Places API: 1000 requests/day free
- Additional requests: ~$0.017 per request

---

**Your website is now running at: http://localhost:3000**

The location inputs will show autocomplete suggestions once you add your Google Maps API key!