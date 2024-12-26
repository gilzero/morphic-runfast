import React from 'react';
import { ModeToggle } from './mode-toggle';
import { IconLogo, SpeedIndicator } from './ui/icons';
import HistoryContainer from './history-container';

const Header: React.FC = () => {
    return (
        <header className="fixed w-full z-50 border-b speed-glass">
            <div className="container max-w-6xl mx-auto">
                <div className="flex h-14 items-center justify-between px-4">
                    <div className="flex items-center space-x-3">
                        <a href="/" className="flex items-center space-x-2 group">
                            <div className="relative">
                                <IconLogo className="w-8 h-8 text-primary-500 transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full animate-pulse" />
                            </div>
                            <span className="font-racing text-xl tracking-tight">
                Run<span className="text-primary-500">Fast</span>
              </span>
                        </a>
                        <div className="flex items-center space-x-2">
                            <div className="h-3 w-px bg-border" />
                            <div className="flex items-center px-2 py-1 rounded-full text-xs speed-badge-fast">
                                <SpeedIndicator className="w-3 h-3 mr-1" speed="fast" />
                                <span className="font-mono">by Dreamer</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <ModeToggle />
                        <div className="w-px h-4 bg-border mx-1" />
                        <HistoryContainer location="header" />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-muted overflow-hidden">
                <div className="w-full h-full bg-primary-500/50 animate-pulse" />
            </div>
        </header>
    );
};

export default Header;
