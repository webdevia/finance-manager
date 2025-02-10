import React from 'react';
import { useTheme } from 'src/app/providers/ThemeProvider';

interface DarkButtonProps {
  className?: string;
}

export const DarkThemeButton: React.FC<DarkButtonProps> = ({ className }) => {
  const themeContext = useTheme();

  if (!themeContext) {
    return null;
  }

  const { setDarkTheme } = themeContext;
  return (
    <a className={className} onClick={setDarkTheme}>
      Dark
    </a>
  );
};
