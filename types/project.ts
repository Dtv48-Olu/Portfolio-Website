export interface Project {
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

export interface ProjectZoneProps {
  title: string
  subtitle: string
  icon: string
  projects: Project[]
  selectedTech: string | null
  zoneType: 'shipped' | 'building' | 'planned'
}

export interface ProjectCardProps {
  project: Project
  selectedTech: string | null
  zoneType: 'shipped' | 'building' | 'planned'
}

export type ProjectStatus = 'shipped' | 'building' | 'planned'

export interface ZoneStyles {
  border: string
  bg: string
  titleColor: string
  accentColor: string
  shadow?: string
  badge?: string
}
