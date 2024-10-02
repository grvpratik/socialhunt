import { useEffect, useState } from 'react'

declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                colorScheme: 'light' | 'dark'
            }
        }
    }
}

export function useTelegramTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            setTheme(window.Telegram.WebApp.colorScheme)
        }
    }, [])

    return theme
}