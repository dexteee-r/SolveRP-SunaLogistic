'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

const PAGE_FOOTER_CONFIG: Record<string, { noBgImage?: boolean; bgColor?: string }> = {
  '/hierarchie': { noBgImage: true, bgColor: '#f4e5cc' },
}

export default function FooterWrapper() {
  const pathname = usePathname()
  const config = PAGE_FOOTER_CONFIG[pathname] || {}
  return <Footer noBgImage={config.noBgImage} bgColor={config.bgColor} />
}
