export const useTracking = () => {
  const trackEvent = (eventName: string, eventData?: any) => {
    // Meta Pixel
    if (window.fbq) {
      window.fbq('track', eventName, eventData);
    }
    
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }
  };

  return { trackEvent };
};
