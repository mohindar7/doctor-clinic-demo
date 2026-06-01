/**
 * Dynamic calculation helper to compute clinic's live Open/Closed state.
 * Hardcoded to align with config timings:
 * Monday – Saturday: 9:00 AM – 9:00 PM
 * Sunday: 9:00 AM – 8:00 PM
 *
 * @returns {Object} { isOpen: boolean, text: string, color: string }
 */
export function getClinicStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1-6 is Monday-Saturday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;

  // 9:00 AM = 540 minutes
  const openTime = 9 * 60; 
  
  // Close times:
  // Mon-Sat: 9:00 PM (21:00) = 1260 mins
  // Sunday: 8:00 PM (20:00) = 1200 mins
  let closeTime = 21 * 60; 
  let closeLabel = "9:00 PM";
  
  if (day === 0) {
    closeTime = 20 * 60;
    closeLabel = "8:00 PM";
  }

  const isOpen = currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;

  if (isOpen) {
    return {
      isOpen: true,
      text: `Open Now • Closes at ${closeLabel}`,
      color: '#10B981' // Vibrant Emerald Green for Open
    };
  } else {
    let dayLabel = "tomorrow";
    
    if (day === 6) {
      dayLabel = "tomorrow (Sunday)";
    } else if (day === 0) {
      dayLabel = "tomorrow (Monday)";
    }
    
    // If it's before 9:00 AM today
    if (currentTimeInMinutes < openTime) {
      dayLabel = "today";
    }

    return {
      isOpen: false,
      text: `Closed • Opens at 9:00 AM ${dayLabel}`,
      color: '#EF4444' // Bright Red/Rose for Closed
    };
  }
}
