// Production performance monitoring setup
import { getPerformance, trace } from 'firebase/performance';

let perf: any = null;

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  try {
    perf = getPerformance();
  } catch (error) {
    console.warn('Performance monitoring not available:', error);
  }
}

export const trackPageLoad = (pageName: string) => {
  if (!perf) return;
  
  const pageLoadTrace = trace(perf, `page_load_${pageName}`);
  pageLoadTrace.start();
  
  // Auto-stop trace after 10 seconds
  setTimeout(() => {
    pageLoadTrace.stop();
  }, 10000);
  
  return pageLoadTrace;
};

export const trackVideoLoad = (videoId: string) => {
  if (!perf) return;
  
  const videoTrace = trace(perf, `video_load_${videoId}`);
  videoTrace.start();
  return videoTrace;
};

export const trackPaymentFlow = (step: string) => {
  if (!perf) return;
  
  const paymentTrace = trace(perf, `payment_${step}`);
  paymentTrace.start();
  return paymentTrace;
};