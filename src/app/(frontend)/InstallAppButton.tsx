'use client'

import { useEffect, useState } from 'react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallAppButton({ className = '' }: { className?: string }) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)

    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  }, [])

  if (!installPrompt) {
    return null
  }

  return (
    <button
      className={`hidden min-h-[46px] cursor-pointer items-center justify-center rounded-md bg-[#f2bd2b] px-[18px] py-3 font-[850] text-[#17221f] disabled:cursor-not-allowed disabled:opacity-60 max-[760px]:inline-flex max-[760px]:min-h-[38px] max-[760px]:w-full max-[760px]:px-2.5 max-[760px]:py-[9px] max-[760px]:text-[0.82rem] [@media(display-mode:standalone)]:!hidden ${className}`}
      disabled={isInstalling}
      onClick={async () => {
        setIsInstalling(true)
        await installPrompt.prompt()
        await installPrompt.userChoice
        setInstallPrompt(null)
        setIsInstalling(false)
      }}
      type="button"
    >
      Install app
    </button>
  )
}
