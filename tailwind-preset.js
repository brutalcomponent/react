/**
 * @file tailwind-preset.js
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Thu Sep 11 2025
 *
 * @description
 * Brutal component Tailwind preset - just add to your config!
 */
module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
                brutal: ['JetBrains Mono', 'monospace'], // Alias for brutal typography
            },
            colors: {
                // Monochrome
                'brutal-black': '#000000',
                'brutal-white': '#FFFFFF',
                'brutal-gray': {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#E5E5E5',
                    300: '#D4D4D4',
                    400: '#A3A3A3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },
                // Soft pastels
                'brutal-pink': '#FFD6E8',
                'brutal-peach': '#FFE5D6',
                'brutal-yellow': '#FFF3D6',
                'brutal-mint': '#D6FFE5',
                'brutal-sky': '#D6EDFF',
                'brutal-lavender': '#E8D6FF',
                'brutal-coral': '#FFD6D6',
            },
            boxShadow: {
                'brutal-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
                'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
                'brutal-md': '6px 6px 0px 0px rgba(0,0,0,1)',
                'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
                'brutal-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
            },
            animation: {
                'brutal-bounce': 'brutal-bounce 0.3s ease-in-out',
                'brutal-shake': 'brutal-shake 0.3s ease-in-out',
                'brutal-rotate': 'brutal-rotate 0.3s ease-in-out',
                'wave': 'wave 2s ease-in-out infinite',
                'slide-in-right': 'slide-in-right 0.3s ease-out',
                'scale-in': 'scale-in 0.2s ease-out',
            },
            keyframes: {
                'brutal-bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-4px)' },
                },
                'brutal-shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-2px)' },
                    '75%': { transform: 'translateX(2px)' },
                },
                'brutal-rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-1deg)' },
                },
                'wave': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '25%': { transform: 'translateY(-8px) rotate(-5deg)' },
                    '75%': { transform: 'translateY(5px) rotate(5deg)' },
                },
                'slide-in-right': {
                    from: { transform: 'translateX(100%) rotate(5deg)', opacity: '0' },
                    to: { transform: 'translateX(0) rotate(1deg)', opacity: '1' },
                },
                'scale-in': {
                    from: { transform: 'scale(0.95)', opacity: '0' },
                    to: { transform: 'scale(1)', opacity: '1' },
                },
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(-5px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
