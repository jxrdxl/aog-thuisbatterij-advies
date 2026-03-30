declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    gtag: (...args: any[]) => void;
  }
}

export const useTracking = () => {
  const trackEvent = (eventName: string, eventData?: any) => {
    // Meta Pixel
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      try {
        window.fbq('track', eventName, eventData);
      } catch (e) {
        console.warn('Meta Pixel tracking failed:', e);
      }
    }
    
    // Google Analytics
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('event', eventName, eventData);
      } catch (e) {
        console.warn('Google Analytics tracking failed:', e);
      }
    }
  };

  const trackViewContent = (data?: any) => trackEvent('ViewContent', data);
  const trackLead = (data?: any) => trackEvent('Lead', data);
  const trackCompleteRegistration = (data?: any) => trackEvent('CompleteRegistration', data);
  const trackInitiateCheckout = (data?: any) => trackEvent('InitiateCheckout', data);
  const trackContact = (data?: any) => trackEvent('Contact', data);

  return { 
    trackEvent, 
    trackViewContent, 
    trackLead, 
    trackCompleteRegistration, 
    trackInitiateCheckout, 
    trackContact 
  };
};
