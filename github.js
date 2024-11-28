
  setupFilters(repos) {
    const topics = new Set();
    repos.forEach((repo) => {
      if (repo.topics) {
        repo.topics.forEach((topic) => topics.add(topic));
      }
    });

    const filterContainer = document.getElementById("project-filters");
    const filters = ["all", ...topics];

    filterContainer.innerHTML = filters
      .map(
        (filter) => `
        <button class="filter-btn ${filter === "all" ? "active" : ""}"
                data-filter="${filter}">
          ${filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      `,
      )
      .join("");

    this.addFilterEventListeners();
  }

  addFilterEventListeners() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Filter projects
        const projects = document.querySelectorAll(".project-card");
        projects.forEach((project) => {
          if (filter === "all") {
            project.style.display = "block";
          } else {
            const projectTopics = project.dataset.topics?.split(" ") || [];
            project.style.display = projectTopics.includes(filter)
              ? "block"
              : "none";
          }
        });
      });
    });
  }
}
