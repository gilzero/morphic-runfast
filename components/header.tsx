import React from 'react'
import { ModeToggle } from './mode-toggle'
import { IconLogo, SpeedIndicator } from './ui/icons'
import { cn } from '@/lib/utils'
import HistoryContainer from './history-container'
import { Button } from './ui/button'

export const Header: React.FC = async () => {
    return (
        <header className="fixed w-full z-50 border-b speed-glass">
            <div className="container max-w-6xl mx-auto">
                <div className="flex h-14 items-center justify-between px-4">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-3">
                        <a href="/" className="flex items-center space-x-2 group">
                            <div className="relative">
                                <IconLogo className="w-8 h-8 text-primary-500 transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full animate-pulse" />
                            </div>
                            <span className="font-racing text-xl tracking-tight hidden sm:block">
                Run<span className="text-primary-500">Fast</span>
              </span>
                        </a>

                        {/* Performance Badge */}
                        <div className="hidden md:flex items-center space-x-2">
                            <div className="h-3 w-px bg-border" /> {/* Separator */}
                            <div className="flex items-center px-2 py-1 rounded-full text-xs speed-badge-fast">
                                <SpeedIndicator className="w-3 h-3 mr-1" speed="fast" />
                                <span className="font-mono">45ms</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-2">
                        {/* Model Selector Badge */}
                        <div className="hidden sm:flex items-center">
                            <div className="px-2 py-1 text-xs rounded-full border bg-secondary-500/10 text-secondary-500">
                                GPT-4
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center space-x-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-primary-500/10 hover:text-primary-500"
                            >
                                <span className="sr-only">Command Menu</span>
                                <kbd className="text-xs">⌘K</kbd>
                            </Button>
                            <ModeToggle />
                            <div className="w-px h-4 bg-border mx-1" /> {/* Separator */}
                            <HistoryContainer location="header" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-muted overflow-hidden">
                <div className="w-full h-full bg-primary-500/50 animate-pulse" />
            </div>
        </header>
    )
}

export default Header