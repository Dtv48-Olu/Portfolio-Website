#!/usr/bin/env node

/**
 * Project Data Validator
 *
 * Validates the projects.json file to ensure:
 * - Valid JSON syntax
 * - Required fields are present
 * - Data types are correct
 * - Values are within acceptable ranges
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');

// Validation rules
const requiredFields = ['id', 'title', 'description', 'status', 'progress', 'techStack', 'links'];
const validStatuses = ['shipped', 'building', 'planned'];

let errorCount = 0;
let warningCount = 0;

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  errorCount++;
  log(`❌ ERROR: ${message}`, 'red');
}

function warning(message) {
  warningCount++;
  log(`⚠️  WARNING: ${message}`, 'yellow');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

function validateProject(project, index) {
  const projectLabel = project.title || `Project #${index + 1}`;

  // Check for required fields
  for (const field of requiredFields) {
    if (!(field in project)) {
      error(`${projectLabel}: Missing required field "${field}"`);
    }
  }

  // Validate id
  if (project.id) {
    if (typeof project.id !== 'string') {
      error(`${projectLabel}: "id" must be a string`);
    }
    if (!/^[a-z0-9-]+$/.test(project.id)) {
      warning(`${projectLabel}: "id" should be kebab-case (lowercase letters, numbers, and hyphens only)`);
    }
  }

  // Validate title
  if (project.title) {
    if (typeof project.title !== 'string') {
      error(`${projectLabel}: "title" must be a string`);
    }
    if (project.title.length > 50) {
      warning(`${projectLabel}: Title is quite long (${project.title.length} chars). Consider keeping it under 50 characters.`);
    }
  }

  // Validate description
  if (project.description) {
    if (typeof project.description !== 'string') {
      error(`${projectLabel}: "description" must be a string`);
    }
    if (project.description.length > 200) {
      warning(`${projectLabel}: Description is long (${project.description.length} chars). Consider keeping it under 200 characters.`);
    }
    if (project.description.length < 20) {
      warning(`${projectLabel}: Description is quite short (${project.description.length} chars). Add more detail.`);
    }
  }

  // Validate status
  if (project.status) {
    if (typeof project.status !== 'string') {
      error(`${projectLabel}: "status" must be a string`);
    }
    if (!validStatuses.includes(project.status)) {
      error(`${projectLabel}: "status" must be one of: ${validStatuses.join(', ')}`);
    }
  }

  // Validate progress
  if ('progress' in project) {
    if (typeof project.progress !== 'number') {
      error(`${projectLabel}: "progress" must be a number, not a string`);
    }
    if (project.progress < 0 || project.progress > 100) {
      error(`${projectLabel}: "progress" must be between 0 and 100`);
    }
    if (project.status === 'shipped' && project.progress !== 100) {
      warning(`${projectLabel}: Shipped projects should have progress=100`);
    }
    if (project.status === 'planned' && project.progress !== 0) {
      warning(`${projectLabel}: Planned projects should have progress=0`);
    }
  }

  // Validate techStack
  if (project.techStack) {
    if (!Array.isArray(project.techStack)) {
      error(`${projectLabel}: "techStack" must be an array`);
    } else {
      if (project.techStack.length === 0) {
        warning(`${projectLabel}: "techStack" is empty. Add at least one technology.`);
      }
      if (project.techStack.length > 8) {
        warning(`${projectLabel}: "techStack" has ${project.techStack.length} items. Consider limiting to 6-8 most important technologies.`);
      }
      project.techStack.forEach((tech, i) => {
        if (typeof tech !== 'string') {
          error(`${projectLabel}: techStack[${i}] must be a string`);
        }
      });
    }
  }

  // Validate links
  if (project.links) {
    if (typeof project.links !== 'object' || Array.isArray(project.links)) {
      error(`${projectLabel}: "links" must be an object`);
    } else {
      const validLinkKeys = ['github', 'demo', 'docs'];
      const linkKeys = Object.keys(project.links);

      linkKeys.forEach(key => {
        if (!validLinkKeys.includes(key)) {
          warning(`${projectLabel}: Unknown link type "${key}". Valid types: ${validLinkKeys.join(', ')}`);
        }
        if (typeof project.links[key] !== 'string') {
          error(`${projectLabel}: links.${key} must be a string`);
        }
        if (project.links[key] && project.links[key] !== '#') {
          if (!project.links[key].startsWith('http://') && !project.links[key].startsWith('https://')) {
            warning(`${projectLabel}: links.${key} should start with http:// or https://`);
          }
        }
      });

      // Check for GitHub link on shipped/building projects
      if ((project.status === 'shipped' || project.status === 'building') &&
          (!project.links.github || project.links.github === '#')) {
        warning(`${projectLabel}: ${project.status} projects should have a GitHub link`);
      }
    }
  }
}

function checkDuplicateIds(projects) {
  const ids = {};
  projects.forEach((project, index) => {
    if (project.id) {
      if (ids[project.id]) {
        error(`Duplicate ID found: "${project.id}" (projects #${ids[project.id]} and #${index + 1})`);
      } else {
        ids[project.id] = index + 1;
      }
    }
  });
}

function generateStats(projects) {
  const stats = {
    total: projects.length,
    shipped: projects.filter(p => p.status === 'shipped').length,
    building: projects.filter(p => p.status === 'building').length,
    planned: projects.filter(p => p.status === 'planned').length,
    technologies: new Set(),
  };

  projects.forEach(project => {
    if (Array.isArray(project.techStack)) {
      project.techStack.forEach(tech => stats.technologies.add(tech));
    }
  });

  return stats;
}

// Main validation function
function validateProjects() {
  log('\n🔍 Validating projects.json...\n', 'blue');

  // Check if file exists
  if (!fs.existsSync(projectsPath)) {
    error(`File not found: ${projectsPath}`);
    return false;
  }

  // Read and parse JSON
  let projects;
  try {
    const data = fs.readFileSync(projectsPath, 'utf8');
    projects = JSON.parse(data);
    success('Valid JSON syntax');
  } catch (err) {
    error(`Invalid JSON: ${err.message}`);
    return false;
  }

  // Check if it's an array
  if (!Array.isArray(projects)) {
    error('projects.json must contain an array of projects');
    return false;
  }

  if (projects.length === 0) {
    warning('No projects found in projects.json');
  }

  log(''); // Empty line

  // Validate each project
  projects.forEach((project, index) => {
    validateProject(project, index);
  });

  // Check for duplicate IDs
  checkDuplicateIds(projects);

  // Generate and display stats
  const stats = generateStats(projects);
  log('\n📊 Project Statistics:', 'cyan');
  info(`   Total Projects: ${stats.total}`);
  info(`   🚀 Shipped: ${stats.shipped}`);
  info(`   ⚡ Building: ${stats.building}`);
  info(`   🎯 Planned: ${stats.planned}`);
  info(`   💻 Unique Technologies: ${stats.technologies.size}`);

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  if (errorCount === 0 && warningCount === 0) {
    success('✨ All validations passed! Your projects.json is perfect!');
    return true;
  } else {
    if (errorCount > 0) {
      log(`\n❌ Found ${errorCount} error(s)`, 'red');
    }
    if (warningCount > 0) {
      log(`⚠️  Found ${warningCount} warning(s)`, 'yellow');
    }
    log('\nPlease fix the errors before deploying.', 'yellow');
    return errorCount === 0;
  }
}

// Run validation
const isValid = validateProjects();
process.exit(isValid ? 0 : 1);
