'use client'

import { useState, useMemo } from 'react'
import Hero from '@/components/Hero'
import ProjectZone from '@/components/ProjectZone'
import projectsData from '@/data/projects.json'

interface Project {
  id: string
  title: string
  description: string
  status: 'shipped' | 'building' | 'planned'
  progress: number
  techStack: string[]
  links: {
    github?: string
    demo?: string
    docs?: string
  }
}

export default function Home() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const projects = projectsData as Project[]

  // Extract all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>()
    projects.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }, [projects])

  // Filter projects by status
  const shippedProjects = projects.filter((p) => p.status === 'shipped')
  const buildingProjects = projects.filter((p) => p.status === 'building')
  const plannedProjects = projects.filter((p) => p.status === 'planned')

  // Handle tech filter toggle
  const handleTechClick = (tech: string) => {
    setSelectedTech(selectedTech === tech ? null : tech)
  }

  // Clear filter
  const clearFilter = () => setSelectedTech(null)

  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Tech Filter Bar */}
      {allTechnologies.length > 0 && (
        <section className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              <span className="text-sm font-medium text-slate-400 whitespace-nowrap">
                Filter by tech:
              </span>
              {selectedTech && (
                <button
                  onClick={clearFilter}
                  className="tech-tag bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                >
                  ✕ Clear
                </button>
              )}
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechClick(tech)}
                  className={`tech-tag ${
                    selectedTech === tech
                      ? 'active bg-blue-500 text-white ring-blue-500'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Work Engine Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Work Engine
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A dynamic view of my engineering journey—from production systems to active experiments
            </p>
          </div>

          {/* Zone 1: Shipped Projects */}
          {shippedProjects.length > 0 && (
            <ProjectZone
              title="Shipped"
              subtitle="Production-ready systems I have built"
              icon="🚀"
              projects={shippedProjects}
              selectedTech={selectedTech}
              zoneType="shipped"
            />
          )}

          {/* Zone 2: Building Projects */}
          {buildingProjects.length > 0 && (
            <ProjectZone
              title="In the Lab"
              subtitle="What I am coding right now"
              icon="⚡"
              projects={buildingProjects}
              selectedTech={selectedTech}
              zoneType="building"
            />
          )}

          {/* Zone 3: Planned Projects */}
          {plannedProjects.length > 0 && (
            <ProjectZone
              title="On the Radar"
              subtitle="Technical challenges I am preparing to tackle next"
              icon="🎯"
              projects={plannedProjects}
              selectedTech={selectedTech}
              zoneType="planned"
            />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>
            Built with Next.js & Tailwind CSS • Data-driven architecture •{' '}
            <a
              href="https://github.com/Dtv48-Olu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View on GitHub
            </a>
          </p>
          <p className="mt-2 text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
