document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".ss-list");
  const prev = document.querySelector(".ss-prev");
  const next = document.querySelector(".ss-next");

  if (!list || !prev || !next) return;

  const gap = 20; // match your CSS gap
  const imgWidth = list.querySelector("img").offsetWidth + gap;

  prev.addEventListener("click", () => {
    list.scrollBy({ left: -imgWidth, behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    list.scrollBy({ left: imgWidth, behavior: "smooth" });
  });
});
