/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				atkinson: ['"Atkinson Hyperlegible"', 'sans-serif'],
				mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
						code: {
							backgroundColor: '#0f172a',
							color: '#60a5fa',
							fontWeight: '500',
							fontSize: '0.9rem',
							fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Consolas, monospace',
							padding: '0.125rem 0.5rem',
							borderRadius: '0.375rem',
							border: '1px solid #334155',
							wordWrap: 'break-word',
							hyphens: 'none',
						},
						pre: {
							backgroundColor: '#0f172a',
							border: '1px solid #334155',
							borderRadius: '0.5rem',
							fontSize: '0.875rem',
							lineHeight: '1.8',
							padding: '1.5rem',
							margin: '1.5rem 0',
							overflow: 'auto',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
						},
						'pre code': {
							backgroundColor: 'transparent',
							border: 'none',
							padding: '0',
							fontSize: '0.875rem',
							color: '#e2e8f0',
						},
						blockquote: {
							backgroundColor: 'rgba(15, 23, 42, 0.4)',
							borderLeft: '4px solid #60a5fa',
							fontStyle: 'italic',
							quotes: 'none',
							margin: '2rem 0',
							padding: '1.5rem 2rem',
							borderRadius: '0 0.5rem 0.5rem 0',
						},
						'blockquote p': {
							color: '#e2e8f0',
							fontSize: '1.1rem',
							lineHeight: '1.7',
							margin: '0',
						},
						hr: {
							borderColor: '#374151',
							marginTop: '3rem',
							marginBottom: '3rem',
						},
						strong: {
							color: '#f8fafc',
							fontWeight: '600',
						},
						em: {
							color: '#e2e8f0',
							fontStyle: 'italic',
						},
						'code, kbd, samp': {
							fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Consolas, monospace',
						},
						'blockquote p:first-of-type::before': {
							content: '""',
						},
						'blockquote p:last-of-type::after': {
							content: '""',
						},
						h1: {
							fontSize: '2.5rem',
							fontWeight: '700',
							color: '#f8fafc',
							marginTop: '0',
							marginBottom: '1.5rem',
							lineHeight: '1.2',
							letterSpacing: '-0.025em',
						},
						h2: {
							fontSize: '2rem',
							fontWeight: '700',
							color: '#f8fafc',
							marginTop: '3rem',
							marginBottom: '1.25rem',
							lineHeight: '1.3',
							letterSpacing: '-0.025em',
						},
						h3: {
							fontSize: '1.625rem',
							fontWeight: '600',
							color: '#f8fafc',
							marginTop: '2.5rem',
							marginBottom: '1rem',
							lineHeight: '1.4',
						},
						h4: {
							fontSize: '1.375rem',
							fontWeight: '600',
							color: '#e2e8f0',
							marginTop: '2rem',
							marginBottom: '0.75rem',
							lineHeight: '1.4',
						},
						h5: {
							fontSize: '1.125rem',
							fontWeight: '600',
							color: '#e2e8f0',
							marginTop: '1.5rem',
							marginBottom: '0.5rem',
							lineHeight: '1.5',
						},
						h6: {
							fontSize: '1rem',
							fontWeight: '600',
							color: '#cbd5e1',
							marginTop: '1.5rem',
							marginBottom: '0.5rem',
							lineHeight: '1.5',
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
						},
						a: {
							color: '#60a5fa',
							textDecoration: 'none',
							fontWeight: '500',
							borderRadius: '0.125rem',
							transition: 'all 0.15s ease-in-out',
							'&:hover': {
								color: '#93c5fd',
								textDecoration: 'underline',
								textDecorationThickness: '2px',
								textUnderlineOffset: '3px',
							},
							'&:focus': {
								outline: '2px solid #60a5fa',
								outlineOffset: '2px',
								textDecoration: 'underline',
							},
							'&:visited': {
								color: '#a78bfa',
							},
						},
						p: {
							color: '#d1d5db',
							marginBottom: '1.25rem',
							lineHeight: '1.8',
						},
						ul: {
							listStyleType: 'disc',
							marginTop: '1rem',
							marginBottom: '1.5rem',
							paddingLeft: '1.5rem',
						},
						ol: {
							listStyleType: 'decimal',
							marginTop: '1rem',
							marginBottom: '1.5rem',
							paddingLeft: '1.5rem',
						},
						li: {
							marginTop: '0.5rem',
							marginBottom: '0.5rem',
							lineHeight: '1.7',
							color: '#d1d5db',
						},
						'ul > li': {
							paddingLeft: '0.25rem',
						},
						'ol > li': {
							paddingLeft: '0.25rem',
						},
						'ul > li::marker': {
							color: '#60a5fa',
							fontSize: '1.1em',
						},
						'ol > li::marker': {
							color: '#60a5fa',
							fontWeight: '600',
						},
						'li > ul, li > ol': {
							marginTop: '0.75rem',
							marginBottom: '0.75rem',
						},
						table: {
							width: '100%',
							marginTop: '2rem',
							marginBottom: '2rem',
							borderCollapse: 'collapse',
							fontSize: '0.875rem',
							lineHeight: '1.6',
						},
						thead: {
							borderBottom: '2px solid #374151',
						},
						'thead th': {
							color: '#f8fafc',
							fontWeight: '600',
							textAlign: 'left',
							padding: '0.75rem 1rem',
							backgroundColor: '#1f2937',
							fontSize: '0.875rem',
							letterSpacing: '0.05em',
							textTransform: 'uppercase',
						},
						'tbody tr': {
							borderBottom: '1px solid #374151',
							'&:hover': {
								backgroundColor: '#1f2937',
							},
						},
						'tbody tr:last-child': {
							borderBottom: 'none',
						},
						'tbody td': {
							padding: '0.875rem 1rem',
							color: '#d1d5db',
							verticalAlign: 'top',
						},
						'thead th:first-child, tbody td:first-child': {
							paddingLeft: '1.5rem',
						},
						'thead th:last-child, tbody td:last-child': {
							paddingRight: '1.5rem',
						},
					},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
	darkMode: 'class',
}
