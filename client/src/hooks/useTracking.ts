import { useCallback } from "react";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    gtag: (...args: any[]) => void;
  }
}

export const useTracking = () => {
  const trackEvent = useCallback((eventName: string, eventData?: any) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      try {
        window.fbq('track', eventName, eventData);
      } catch (e) {
        console.warn('Meta Pixel tracking failed:', e);
      }
    }

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('event', eventName, eventData);
      } catch (e) {
        console.warn('Google Analytics tracking failed:', e);
      }
    }
  }, []);

  const trackViewContent = useCallback((data?: any) => trackEvent('ViewContent', data), [trackEvent]);
  const trackLead = useCallback((data?: any) => trackEvent('Lead', data), [trackEvent]);
  const trackCompleteRegistration = useCallback((data?: any) => trackEvent('CompleteRegistration', data), [trackEvent]);
  const trackInitiateCheckout = useCallback((data?: any) => trackEvent('InitiateCheckout', data), [trackEvent]);
  const trackContact = useCallback((data?: any) => trackEvent('Contact', data), [trackEvent]);

  return {
    trackEvent,
    trackViewContent,
    trackLead,
    trackCompleteRegistration,
    trackInitiateCheckout,
    trackContact,
  };
};
