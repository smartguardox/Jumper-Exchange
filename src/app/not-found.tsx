import initTranslations from '@/app/i18n';
import { getCookies } from '@/app/lib/getCookies';
import { Logo } from '@/components/Navbar/Logo/Logo';
import { NavbarContainer } from '@/components/Navbar/Navbar.style';
import { NavbarButtons } from '@/components/Navbar/NavbarButtons';
import { NotFoundComponent } from '@/components/NotFound/NotFound';
import { PoweredBy } from '@/components/PoweredBy';
import TranslationsProvider from '@/providers/TranslationProvider';
import { Link } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { cookies } from 'next/headers';
import RouterLink from 'next/link';
import { defaultNS, namespaces } from 'src/i18n';
import Background from '@/components/Background';

export default async function NotFound() {
  const { activeThemeMode } = getCookies();
  const cookiesHandler = cookies();
  const locale = cookiesHandler.get('NEXT_LOCALE')?.value ?? 'en';

  const { resources } = await initTranslations(locale, namespaces);

  return (
    <>
      <AppRouterCacheProvider>
        {/*<ThemeProvider themeMode={activeThemeMode} activeTheme="jumper">*/}
        <TranslationsProvider
          namespaces={[defaultNS]}
          locale={locale}
          resources={resources}
        >
          <Background />

          <NavbarContainer>
            <Link component={RouterLink} href="/">
              <Logo variant="default" />
            </Link>
            <NavbarButtons />
          </NavbarContainer>
          <NotFoundComponent />
        </TranslationsProvider>
        {/*</ThemeProvider>*/}
      </AppRouterCacheProvider>
    </>
  );
}
