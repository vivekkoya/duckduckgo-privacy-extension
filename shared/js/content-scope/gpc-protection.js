import { defineProperty } from './utils'

// Set Global Privacy Control property on DOM
export function init (args) {
    try {
        // If GPC on, set DOM property to true if not already true
        if (args.globalPrivacyControlValue) {
            defineProperty(Navigator.prototype, 'globalPrivacyControl', {
                get: () => true,
                configurable: true,
                enumerable: true
            })
        } else {
            // If GPC off, don't override if DOM property has
            // already been set by browser or other extension
            if (Navigator.prototype.hasOwnProperty('globalPrivacyControl')) return
            defineProperty(Navigator.prototype, 'globalPrivacyControl', {
                get: () => false,
                configurable: true,
                enumerable: true
            })
        }
    } catch {
        // Ignore exceptions that could be caused by conflicting with other extensions
    }
}
