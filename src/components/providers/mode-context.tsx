"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define allowed theme types
type Theme = "light" | "dark" | "system";

// Context value type
interface ThemeContextType {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

// Props for the ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Create context with default value (will be overridden by provider)
const ThemeProviderContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Make sure we check window only on client
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type Theme = "light" | "dark" | "system";
// interface ThemeContextType {
//   theme: Theme;
//   setTheme: (newTheme: Theme) => void;
// }

// interface ThemeProviderProps {
//   children: ReactNode;
//   defaultTheme?: Theme;
//   storageKey?: string;
// }

// const ThemeProviderContext = createContext<ThemeContextType | undefined>(
//   undefined
// );
// // const ThemeProviderContext = createContext<ThemeContextType | undefined>({
// //   theme: "system",
// //   setTheme: () => {},
// // });

// export function ThemeProvider({
//   children,
//   defaultTheme = "system",
//   storageKey = "vite-ui-theme",
//   ...props
// }: ThemeProviderProps) {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem(storageKey) || defaultTheme;
//   });

//   useEffect(() => {
//     const root = document.documentElement;
//     root.classList.remove("light", "dark");

//     if (theme === "system") {
//       const prefersDark = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;
//       root.classList.add(prefersDark ? "dark" : "light");
//     } else {
//       root.classList.add(theme);
//     }
//   }, [theme]);

//   const value = {
//     theme,
//     setTheme: (newTheme) => {
//       localStorage.setItem(storageKey, newTheme);
//       setTheme(newTheme);
//     },
//   };

//   return (
//     <ThemeProviderContext.Provider value={value} {...props}>
//       {children}
//     </ThemeProviderContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeProviderContext);

//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }

//   return context;
// }
