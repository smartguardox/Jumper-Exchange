'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from 'src/theme';
import { useCookies } from 'react-cookie';
import {
  formatConfig,
  formatTheme,
  getAvailableThemeMode,
} from '@/hooks/usePartnerThemeV2';
import { deepmerge } from '@mui/utils';
import { useSettingsStore } from '@/stores/settings';

function getPartnerTheme(themes: any[], activeTheme: string) {
  return themes?.find((d) => d.attributes.uid === activeTheme)?.attributes;
}

function getMuiTheme(themes: any[], activeTheme: string) {
  if (['dark', 'system'].includes(activeTheme)) {
    return darkTheme;
  } else if (activeTheme === 'light') {
    return lightTheme;
  }

  const partnerTheme = getPartnerTheme(themes, activeTheme);

  if (!partnerTheme) {
    return lightTheme;
  }

  const formattedTheme = formatTheme(partnerTheme);
  const baseTheme =
    getAvailableThemeMode(partnerTheme) === 'light' ? lightTheme : darkTheme;

  return deepmerge(baseTheme, formattedTheme.activeMUITheme);
}

/**
 * Your app's theme provider component.
 * 'use client' is essential for next-themes to work with app-dir.
 */
export function ThemeProviderV2({
  children,
  activeTheme,
  themes,
  ...props
}: any) {
  const { resolvedTheme, forcedTheme, ...props2 } = useTheme();
  const [cookie, setCookie] = useCookies(['theme']);
  const [partnerThemes, setPartnerThemes] = useSettingsStore((state) => [
    state.partnerThemes,
    state.setPartnerThemes,
    state.setActiveTheme,
  ]);
  const [configTheme, setConfigTheme] = useSettingsStore((state) => [
    state.configTheme,
    state.setConfigTheme,
  ]);

  const [currentTheme, setCurrentTheme] = useState(
    getMuiTheme(themes, forcedTheme || resolvedTheme || activeTheme),
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setPartnerThemes(themes);
  }, []);

  // console.log('INTHEMEPROVIDERV2', resolvedTheme, activeTheme, currentTheme, themes);

  useEffect(() => {
    const themeToUse = forcedTheme || resolvedTheme || activeTheme;
    console.log('themeToUse', themeToUse, getMuiTheme(themes, themeToUse));

    setCurrentTheme(getMuiTheme(themes, themeToUse));
    setConfigTheme(formatConfig(getPartnerTheme(themes, themeToUse)));
    setCookie('theme', themeToUse);
  }, [resolvedTheme]);

  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>
    </>
  );
}