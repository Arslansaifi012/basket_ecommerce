
import axios from 'axios' ;



// const TRACKING_API = import.meta.env.VITE_BACKEND_URL + '/api/track';

export const trackEvent = async (token, eventType, data = {} ) =>{
    const payload ={
        event: eventType,
        metadata: data,
        timestamp: new Date().toISOString(),
        url: window.location.pathname,
    };
    console.log(payload,'this is my payload function');
    

    try {
       await axios.post(TRACKING_API, payload, {
            headers:{token}
        })
        
    } catch (error) {
        console.log(error.message) ;
        
    }
} 