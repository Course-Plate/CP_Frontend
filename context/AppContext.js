// context/AppContext.js
import React from 'react';
import { FontProvider } from './FontContext';
import { PreferencesProvider } from './PreferencesContext';

export function AppProviders({ children }) {
    return (
        <FontProvider>
            <PreferencesProvider>
                {children}
            </PreferencesProvider>
        </FontProvider>
    );
}
