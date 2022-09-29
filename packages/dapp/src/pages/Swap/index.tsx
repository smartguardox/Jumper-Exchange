import { LiFiWidget, WidgetConfig } from '@lifi/widget';
import { Box, Grid } from '@mui/material';
import { useMemo } from 'react';

export default function Swap() {
  const widgetConfig: WidgetConfig = useMemo(() => {
    return {
      // walletManagement: {
      //   signer: signer,
      //   connect: async () => {
      //     let promiseResolver
      //     const loginAwaiter = new Promise<void>((resolve) => (promiseResolver = resolve))

      //     setShowConnectModal({ show: true, promiseResolver })

      //     await loginAwaiter
      //     if (account.signer) {
      //       return account.signer!
      //     } else {
      //       throw Error('No signer object after login')
      //     }
      //   },
      //   disconnect: async () => {
      //     disconnect()
      //   },
      //   switchChain: async (reqChainId: number) => {
      //     await switchChain(reqChainId)
      //     if (account.signer) {
      //       return account.signer!
      //     } else {
      //       throw Error('No signer object after chain switch')
      //     }
      //   },
      //   addToken: async (token: Token, chainId: number) => {
      //     await switchChainAndAddToken(chainId, token)
      //   },
      //   addChain: async (chainId: number) => {
      //     return addChain(chainId)
      //   },
      // },

      containerStyle: {
        border: `1px solid rgb(234, 234, 234)`,
        borderRadius: '16px',
        maxHeight: '770px',
      },

      // theme: {
      //   palette: {
      //     primary: {
      //       main: theme.palette.brandPrimary.dark,
      //     },
      //     secondary: {
      //       main: theme.palette.brandSecondary.main,
      //     },
      //     background: {
      //       default: theme.palette.background.default,
      //     },
      //   },
      // },
    };
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ m: 8 }}>
        <LiFiWidget config={widgetConfig} />
      </Box>
    </Grid>
  );
}
