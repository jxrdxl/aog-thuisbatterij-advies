// Declaratie voor Meta Pixel en Google Analytics
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface TrackingEventData {
  [key: string]: any;
}

export const useTracking = () => {
  const trackEvent = (eventName: string, eventData?: TrackingEventData) => {
    // Meta Pixel tracking
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', eventName, eventData);
    }
    
    // Google Analytics tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, eventData);
    }

    // Google Tag Manager dataLayer tracking
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: eventName,
        ...eventData
      });
    }
  };

  // Specific tracking methods for common events
  const trackLead = (data?: TrackingEventData) => {
    trackEvent('Lead', {
      content_name: 'Gratis Energierapport',
      content_category: 'Thuisbatterij Advies',
      value: 240,
      currency: 'EUR',
      ...data
    });
  };

  const trackInitiateCheckout = (data?: TrackingEventData) => {
    trackEvent('InitiateCheckout', {
      content_name: 'Energierapport Aanvraag',
      content_category: 'Thuisbatterij Advies',
      value: 240,
      currency: 'EUR',
      ...data
    });
  };

  const trackContact = (data?: TrackingEventData) => {
    trackEvent('Contact', {
      content_name: 'Direct Contact',
      content_category: 'Thuisbatterij Advies',
      ...data
    });
  };

  const trackViewContent = (data?: TrackingEventData) => {
    trackEvent('ViewContent', {
      content_name: 'Energierapport Pagina',
      content_category: 'Thuisbatterij Advies',
      ...data
    });
  };

  const trackAddToCart = (data?: TrackingEventData) => {
    trackEvent('AddToCart', {
      content_name: 'Formulier Stap Voltooid',
      content_category: 'Thuisbatterij Advies',
      ...data
    });
  };

  const trackCompleteRegistration = (data?: TrackingEventData) => {
    trackEvent('CompleteRegistration', {
      content_name: 'Gratis Energierapport Aangevraagd',
      value: 240,
      currency: 'EUR',
      ...data
    });
  };

  const trackCustomEvent = (eventName: string, data?: TrackingEventData) => {
    trackEvent(eventName, data);
  };

  return {
    trackEvent,
    trackLead,
    trackInitiateCheckout,
    trackContact,
    trackViewContent,
    trackAddToCart,
    trackCompleteRegistration,
    trackCustomEvent
  };
};
