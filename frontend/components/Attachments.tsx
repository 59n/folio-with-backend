'use client'

import { siteConfig } from '@/config/site'

interface Attachment {
  name: string
  url: string
  size?: string
  type?: string
}

interface AttachmentsProps {
  attachments: Attachment[]
  position?: 'top' | 'bottom'
}

export default function Attachments({ attachments, position = 'bottom' }: AttachmentsProps) {
  if (!attachments || attachments.length === 0) {
    return null
  }

  const getFileIcon = (type?: string, name?: string) => {
    if (!type && name) {
      const ext = name.split('.').pop()?.toLowerCase()
      type = ext
    }

    switch (type?.toLowerCase()) {
      case 'pdf':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        )
      case 'zip':
      case 'rar':
      case '7z':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )
      case 'doc':
      case 'docx':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        )
      case 'xls':
      case 'xlsx':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        )
      case 'txt':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  return (
    <div className={`my-8 ${position === 'top' ? 'mb-8' : 'mt-8'}`}>
      <h3 className="mb-4 text-lg font-semibold text-white">Attached Files</h3>
      <div className="space-y-3">
        {attachments.map((attachment, index) => (
          <a
            key={index}
            href={attachment.url}
            target={attachment.url.startsWith('http') ? '_blank' : undefined}
            rel={attachment.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-900/50"
            style={{
              borderColor: siteConfig.colors.card.border,
              backgroundColor: siteConfig.colors.card.background,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = siteConfig.colors.card.hover.border
              e.currentTarget.style.backgroundColor = siteConfig.colors.card.hover.background
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = siteConfig.colors.card.border
              e.currentTarget.style.backgroundColor = siteConfig.colors.card.background
            }}
          >
            <div className="flex-shrink-0" style={{ color: siteConfig.colors.text.secondary }}>
              {getFileIcon(attachment.type, attachment.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {attachment.name}
              </p>
              {attachment.size && (
                <p className="text-xs" style={{ color: siteConfig.colors.text.muted }}>
                  {attachment.size}
                </p>
              )}
            </div>
            <div className="flex-shrink-0" style={{ color: siteConfig.colors.text.muted }}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

