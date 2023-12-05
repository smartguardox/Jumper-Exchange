import { useTheme } from '@mui/material';
import { useSettingsStore } from '../../stores';
import { WidgetWrapper } from '../Widget/Widget.style';
import { OnRamperIFrame } from './index';

function removeHash(str: string) {
  if (str.startsWith('#')) {
    return str.substring(1);
  }
  return str;
}

interface OnramperProps {
  handleCloseWelcomeScreen: () => void;
}

export const OnRamper = ({ handleCloseWelcomeScreen }: OnramperProps) => {
  const theme = useTheme();
  const welcomeScreenClosed = useSettingsStore(
    (state) => state.welcomeScreenClosed,
  );
  const onRamperConfig = {
    apiKey: import.meta.env.VITE_ONRAMPER_API_KEY,
    defaultCrypto: 'ETH',
    themeName: theme.palette.mode === 'light' ? 'light' : 'dark',
    containerColor: removeHash(theme.palette.surface1.main),
    background: removeHash(theme.palette.surface1.main),
    primaryColor: removeHash(theme.palette.primary.main),
    secondaryColor: removeHash(
      theme.palette.mode === 'light' ? theme.palette.grey[100] : '#302B52',
    ),
    cardColor: removeHash(theme.palette.surface2.main),
    primaryTextColor: removeHash(
      theme.palette.mode === 'light'
        ? theme.palette.black.main
        : theme.palette.white.main,
    ),
    secondaryTextColor: removeHash(
      theme.palette.mode === 'light'
        ? theme.palette.primary.main
        : theme.palette.white.main,
    ),
    borderRadius: 0.75,
    wgBorderRadius: 1.5,
  };

  const searchParams = new URLSearchParams(
    Object.entries(onRamperConfig).map(([key, value]) => [key, String(value)]),
  );
  const onRamperSrc = `https://buy.onramper.com/?${searchParams.toString()}`;
  return (
    <WidgetWrapper
      welcomeScreenClosed={welcomeScreenClosed}
      className="widget-wrapper"
    >
      <div>
        <OnRamperIFrame
          src={onRamperSrc}
          height="630px"
          width="392px"
          title="Onramper widget"
          allow="accelerometer; autoplay; camera; gyroscope; payment"
        ></OnRamperIFrame>
      </div>
    </WidgetWrapper>
  );
};
