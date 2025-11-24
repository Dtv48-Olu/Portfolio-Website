import React from 'react'

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

interface ProjectCardProps {
  project: Project
  selectedTech: string | null
  zoneType: 'shipped' | 'building' | 'planned'
}

export default function ProjectCard({
  project,
  selectedTech,
  zoneType,
}: ProjectCardProps) {
  const { title, description, progress, techStack, links } = project

  // Get zone-specific card styling
  const getCardStyles = () => {
    switch (zoneType) {
      case 'shipped':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-500/50',
          bg: 'bg-slate-900/80 hover:bg-slate-900',
          shadow: 'hover:shadow-emerald-500/20',
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        }
      case 'building':
        return {
          border: 'border-terminal-green/30 hover:border-terminal-green/50',
          bg: 'bg-slate-900/80 hover:bg-slate-900',
          shadow: 'hover:shadow-terminal-green/20',
          badge: 'bg-terminal-green/20 text-terminal-green border-terminal-green/30',
        }
      case 'planned':
        return {
          border: 'border-blueprint-blue/20 hover:border-blueprint-blue/30',
          bg: 'bg-slate-900/50 hover:bg-slate-900/70',
          shadow: 'hover:shadow-blueprint-blue/10',
          badge: 'bg-blueprint-blue/20 text-blueprint-light border-blueprint-blue/30',
        }
      default:
        return {
          border: 'border-slate-700 hover:border-slate-600',
          bg: 'bg-slate-900 hover:bg-slate-800',
          shadow: 'hover:shadow-slate-500/20',
          badge: 'bg-slate-700 text-slate-300 border-slate-600',
        }
    }
  }

  const styles = getCardStyles()

  return (
    <div
      className={`project-card relative border ${styles.border} ${styles.bg} ${styles.shadow} rounded-xl p-6 shadow-xl backdrop-blur-sm ${
        zoneType === 'planned' ? 'opacity-80' : ''
      }`}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full border ${
            styles.badge
          } ${
            zoneType === 'building' ? 'status-pulse' : ''
          }`}
        >
          {zoneType === 'shipped' && '✓ Shipped'}
          {zoneType === 'building' && '⚡ Building'}
          {zoneType === 'planned' && '○ Planned'}
        </span>

        {/* Progress Percentage (Building only) */}
        {zoneType === 'building' && (
          <span className="text-xs font-mono text-terminal-green">
            {progress}%
          </span>
        )}
      </div>

      {/* Project Title */}
      <h4
        className={`text-xl font-bold mb-3 ${
          zoneType === 'building' ? 'font-mono' : ''
        } ${
          zoneType === 'planned' ? 'text-slate-300' : 'text-slate-100'
        }`}
      >
        {title}
      </h4>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-4 leading-relaxed min-h-[60px]">
        {description}
      </p>

      {/* Progress Bar (Building only) */}
      {zoneType === 'building' && (
        <div className="mb-4">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="progress-bar bg-gradient-to-r from-terminal-green to-green-400 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {techStack.map((tech) => {
          const isSelected =
            selectedTech && tech.toLowerCase() === selectedTech.toLowerCase()
          return (
            <span
              key={tech}
              className={`px-2 py-1 text-xs rounded border transition-all ${
                isSelected
                  ? 'bg-blue-500/30 text-blue-300 border-blue-500 ring-1 ring-blue-500'
                  : zoneType === 'planned'
                  ? 'bg-slate-800/50 text-slate-400 border-slate-700/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {tech}
            </span>
          )
        })}
      </div>

      {/* Action Links */}
      <div className="flex gap-3">
        {links.github && links.github !== '#' && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              zoneType === 'shipped'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-emerald-500/50'
                : zoneType === 'building'
                ? 'bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green border border-terminal-green/30'
                : 'bg-blueprint-blue/20 hover:bg-blueprint-blue/30 text-blueprint-light border border-blueprint-blue/30'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            {zoneType === 'planned' ? 'Planned' : 'View Code'}
          </a>
        )}

        {links.demo && links.demo !== '#' && (
          <a
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-blue-500/50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
        )}

        {links.docs && links.docs !== '#' && (
          <a
            href={links.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Docs
          </a>
        )}
      </div>

      {/* Decorative Corner Accent */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 ${
          zoneType === 'shipped'
            ? 'bg-gradient-to-bl from-emerald-500/10'
            : zoneType === 'building'
            ? 'bg-gradient-to-bl from-terminal-green/10'
            : 'bg-gradient-to-bl from-blueprint-blue/5'
        } rounded-bl-full rounded-tr-xl`}
      ></div>
    </div>
  )
}
