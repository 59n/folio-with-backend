'use client'

import { useEffect, useState, useRef } from 'react'
import { siteConfig } from '@/config/site'

type EggType = 'konami' | 'secret' | 'click' | 'rainbow' | null

export default function EasterEgg() {
  const [showEgg, setShowEgg] = useState(false)
  const [eggType, setEggType] = useState<EggType>(null)
  const [sequence, setSequence] = useState<string[]>([])
  const [typedText, setTypedText] = useState('')
  const [titleClicks, setTitleClicks] = useState(0)
  const [rainbowMode, setRainbowMode] = useState(false)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
  ]

  // Secret words
  const secretWords = ['secret', 'hello', 'magic', 'surprise', 'hidden']

  // Konami code detection
  useEffect(() => {
    const showEasterEgg = (type: EggType) => {
      setEggType(type)
      setShowEgg(true)
      setTimeout(() => {
        setShowEgg(false)
        setEggType(null)
      }, 5000)
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      // Skip if modifier keys are pressed (except for rainbow mode)
      if ((e.ctrlKey || e.metaKey || e.altKey) && !(e.shiftKey && e.key === 'r')) return

      const newSequence = [...sequence, e.code]
      const latestSequence = newSequence.slice(-konamiCode.length)

      // Check Konami code
      if (latestSequence.length === konamiCode.length) {
        const matches = latestSequence.every((key, index) => key === konamiCode[index])
        if (matches) {
          showEasterEgg('konami')
          setSequence([])
          return
        }
      }

      // Check secret words
      const newTyped = typedText + e.key.toLowerCase()
      const updatedTyped = newTyped.slice(-20) // Keep last 20 chars
      setTypedText(updatedTyped)

      for (const word of secretWords) {
        if (updatedTyped.endsWith(word)) {
          showEasterEgg('secret')
          setTypedText('')
          return
        }
      }

      // Keep only the last N keys to avoid memory issues
      setSequence(newSequence.slice(-konamiCode.length))
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [sequence, typedText])

  // Rainbow mode toggle (Ctrl/Cmd + Shift + R)
  useEffect(() => {
    const showEasterEgg = (type: EggType) => {
      setEggType(type)
      setShowEgg(true)
      setTimeout(() => {
        setShowEgg(false)
        setEggType(null)
      }, 5000)
    }

    const handleRainbow = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'r') {
        e.preventDefault()
        setRainbowMode(!rainbowMode)
        if (!rainbowMode) {
          showEasterEgg('rainbow')
        }
      }
    }

    window.addEventListener('keydown', handleRainbow)
    return () => window.removeEventListener('keydown', handleRainbow)
  }, [rainbowMode])

  // Export click handler for title
  useEffect(() => {
    const showEasterEgg = (type: EggType) => {
      setEggType(type)
      setShowEgg(true)
      setTimeout(() => {
        setShowEgg(false)
        setEggType(null)
      }, 5000)
    }

    const handleClick = () => {
      setTitleClicks(prev => {
        const newCount = prev + 1
        if (newCount >= 5) {
          showEasterEgg('click')
          return 0
        }
        // Reset counter after 2 seconds
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current)
        }
        clickTimeoutRef.current = setTimeout(() => {
          setTitleClicks(0)
        }, 2000)
        return newCount
      })
    }
    
    ;(window as any).handleTitleClick = handleClick
    return () => {
      delete (window as any).handleTitleClick
    }
  }, [])

  if (!showEgg && !rainbowMode) return null

  const getEggContent = () => {
    switch (eggType) {
      case 'konami':
        return {
          emoji: '🎮',
          title: 'You found the easter egg!',
          message: 'You entered the Konami code!',
          code: '↑ ↑ ↓ ↓ ← → ← → B A',
        }
      case 'secret':
        return {
          emoji: '🔮',
          title: 'Secret discovered!',
          message: 'You typed a secret word!',
          code: 'Try: secret, hello, magic, surprise, hidden',
        }
      case 'click':
        return {
          emoji: '👆',
          title: 'Click master!',
          message: 'You clicked the title 5 times!',
          code: 'Nice clicking skills!',
        }
      case 'rainbow':
        return {
          emoji: '🌈',
          title: 'Rainbow mode activated!',
          message: 'Press Ctrl/Cmd + Shift + R to toggle',
          code: 'Everything is colorful now!',
        }
      default:
        return null
    }
  }

  const content = getEggContent()

  return (
    <>
      {rainbowMode && (
        <div 
          className="fixed inset-0 pointer-events-none z-40 mix-blend-screen opacity-20"
          style={{
            background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
            backgroundSize: '400% 400%',
            animation: 'rainbow 3s ease infinite',
          }}
        />
      )}
      {showEgg && content && (
        <div
          className="easter-egg-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowEgg(false)}
        >
          <div
            className="easter-egg-content relative rounded-lg border p-8 text-center shadow-2xl"
            style={{
              borderColor: siteConfig.colors.button.border,
              backgroundColor: siteConfig.colors.button.background,
              maxWidth: '500px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEgg(false)}
              className="absolute right-4 top-4 text-2xl transition-opacity hover:opacity-70"
              style={{ color: siteConfig.colors.text.secondary }}
            >
              ×
            </button>
            
            <div className="mb-4 text-6xl">{content.emoji}</div>
            <h2 
              className="mb-4 text-2xl font-bold"
              style={{ color: siteConfig.colors.text.primary }}
            >
              {content.title}
            </h2>
            <p 
              className="mb-2 text-sm"
              style={{ color: siteConfig.colors.text.secondary }}
            >
              {content.message}
            </p>
            <p 
              className="text-xs"
              style={{ color: siteConfig.colors.text.muted }}
            >
              {content.code}
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="text-2xl">💖</span>
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

