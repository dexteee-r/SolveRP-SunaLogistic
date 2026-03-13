'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb() {
  const pathname = usePathname()
  
  // Don't show breadcrumb on home page
  if (pathname === '/') return null

  const pathSegments = pathname.split('/').filter((segment) => segment !== '')

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
    
    return { label, href }
  })

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100 py-4">
      <div className="container-custom">
        <ol className="flex items-center space-x-2 text-xs font-medium text-gray-500">
          <li className="flex items-center">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" />
              <span>Accueil</span>
            </Link>
          </li>
          
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-primary font-bold truncate max-w-[150px] md:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-primary transition-colors truncate max-w-[100px] md:max-w-none">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
