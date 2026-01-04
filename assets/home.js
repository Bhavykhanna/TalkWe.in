document.addEventListener("DOMContentLoaded", () => {
  const scroller = document.querySelector(".ss-list");
  if (!scroller) return;

  let isDragging = false;
  let startX;
  let scrollStart;

  // Desktop drag
  scroller.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - scroller.offsetLeft;
    scrollStart = scroller.scrollLeft;
    scroller.classList.add("dragging");
  });

  const stopDrag = () => {
    isDragging = false;
    scroller.classList.remove("dragging");
  };

  scroller.addEventListener("mouseup", stopDrag);
  scroller.addEventListener("mouseleave", stopDrag);

  scroller.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scroller.offsetLeft;
    const walk = (x - startX) * 1.5; // drag speed
    scroller.scrollLeft = scrollStart - walk;
  });

  // Touch support (mobile/tablet)
  let touchStartX = 0;
  let touchScrollStart = 0;

  scroller.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollStart = scroller.scrollLeft;
  });

  scroller.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX) * 1.5;
    scroller.scrollLeft = touchScrollStart - walk;
  });
});
