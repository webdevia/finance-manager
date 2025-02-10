import React from 'react';
import { useTheme } from 'src/app/providers/ThemeProvider';

interface LightButtonProps {
  className?: string;
}

export const LightThemeButton: React.FC<LightButtonProps> = ({ className }) => {
  const themeContext = useTheme();

  if (!themeContext) {
    return null;
  }

  const { setLightTheme } = themeContext;
  return (
    <a className={className} onClick={setLightTheme}>
      Light
    </a>
  );
};
