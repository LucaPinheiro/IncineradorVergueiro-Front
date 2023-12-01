export function removeEventWithAnimation(eventCard) {
    eventCard.style.transition = "opacity 0.3s";
    eventCard.style.opacity = "0";
  
    setTimeout(() => {
      eventCard.remove();
    }, 500);
  }
  