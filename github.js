// github.js
class GitHubProjects {
  constructor(username) {
    this.username = username;
    this.apiUrl = `https://api.github.com/users/${username}/repos`;
  }

  async fetchRepositories() {
    try {
      const response = await fetch(this.apiUrl);
      const repos = await response.json();
      return repos.filter((repo) => !repo.fork); // Exclude forked repositories
    } catch (error) {
      console.error("Error fetching repositories:", error);
      return [];
    }
  }

  createProjectCard(repo) {
    return `
      <div class="project-card" data-topics="${repo.topics?.join(" ") || ""}">
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available"}</p>
        <div class="project-stats">
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🔄 ${repo.forks_count}</span>
        </div>
        <div class="project-topics">
          ${repo.topics?.map((topic) => `<span class="topic">${topic}</span>`).join("") || ""}
        </div>
        <a href="${repo.html_url}" target="_blank" class="project-link">View Project</a>
      </div>
    `;
  }

  async displayProjects() {
    const projectGrid = document.querySelector(".project-grid");
    const repos = await this.fetchRepositories();

    if (repos.length === 0) {
      projectGrid.innerHTML = "<p>No repositories found</p>";
      return;
    }

    const projectCards = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map((repo) => this.createProjectCard(repo))
      .join("");

    projectGrid.innerHTML = projectCards;
    this.setupFilters(repos);
  }

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
