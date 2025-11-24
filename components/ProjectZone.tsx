import React from 'react'
import ProjectCard from './ProjectCard'

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

interface ProjectZoneProps {
  title: string
  subtitle: string
  icon: string
  projects: Project[]
  selectedTech: string | null
  zoneType: 'shipped' | 'building' | 'planned'
}

export default function ProjectZone({
  title,
  subtitle,
  icon,
  projects,
  selectedTech,
  zoneType,
}: ProjectZoneProps) {
  // Filter projects based on selected technology
  const filteredProjects = selectedTech
    ? projects.filter((project) =>
        project.techStack.some(
          (tech) => tech.toLowerCase() === selectedTech.toLowerCase()
        )
      )
    : projects

  // Don't render if no projects match the filter
  if (filteredProjects.length === 0 && selectedTech) {
    return null
  }

  // Get zone-specific styling
  const getZoneStyles = () => {
    switch (zoneType) {
      case 'shipped':
        return {
          border: 'border-emerald-500/30',
          bg: 'bg-slate-900/50',
          titleColor: 'text-emerald-400',
          accentColor: 'from-emerald-500 to-teal-500',
        }
      case 'building':
        return {
          border: 'border-terminal-green/30',
          bg: 'bg-slate-900/50',
          titleColor: 'text-terminal-green',
          accentColor: 'from-green-500 to-emerald-500',
        }
      case 'planned':
        return {
          border: 'border-blueprint-blue/20',
          bg: 'bg-slate-900/30',
          titleColor: 'text-blueprint-blue',
          accentColor: 'from-blue-500 to-cyan-500',
        }
      default:
        return {
          border: 'border-slate-700',
          bg: 'bg-slate-900/50',
          titleColor: 'text-slate-300',
          accentColor: 'from-slate-500 to-slate-700',
        }
    }
  }

  const styles = getZoneStyles()

  return (
    <div className="mb-16 animate-fade-in">
      {/* Zone Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl" role="img" aria-label={title}>
            {icon}
          </span>
          <h3
            className={`text-3xl md:text-4xl font-bold ${styles.titleColor} ${
              zoneType === 'building' ? 'font-mono' : ''
            }`}
          >
            {title}
          </h3>
          <div
            className={`h-1 flex-grow bg-gradient-to-r ${styles.accentColor} opacity-30 rounded-full`}
          ></div>
        </div>
        <p className="text-slate-400 text-lg ml-16">{subtitle}</p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            selectedTech={selectedTech}
            zoneType={zoneType}
          />
        ))}
      </div>

      {/* Project Count Badge */}
      <div className="mt-6 flex justify-end">
        <span className="text-sm text-slate-500">
          {filteredProjects.length}{' '}
          {filteredProjects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>
    </div>
  )
}
