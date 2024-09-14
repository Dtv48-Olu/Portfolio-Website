document.addEventListener("DOMContentLoaded", function () {
  const skillBars = document.querySelectorAll(".skill-progress");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = `${progress}%`;
    });
  }

  // Animate skill bars when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  const skillsSection = document.getElementById("skills");
  observer.observe(skillsSection);
});
