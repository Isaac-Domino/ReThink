'use client'

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

const NextThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
	return (
		<ThemeProvider
			{...props}
			attribute="class"
			enableSystem
			defaultTheme="system"
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
};

export default NextThemeProvider;
