import { WalletCardContainer } from '@/components/Menus';
import {
  CustomAccordion,
  CustomAvatarGroup,
  TypographyPrimary,
  TypographySecondary,
} from '@/components/Portfolio/Portfolio.styles';
import generateKey from '@/app/lib/generateKey';
import AccordionSummary from '@mui/material/AccordionSummary';
import {
  AccordionDetails,
  Grid,
  Skeleton,
  Tooltip,
  Avatar as MuiAvatar,
  Divider,
  Box,
} from '@mui/material';
import Image from 'next/image';
import type { ExtendedTokenAmountWithChain } from '@/utils/getTokens';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  WalletAvatar,
  WalletCardBadge,
} from '@/components/Menus/WalletMenu/WalletCardV2.style';
import { useMainPaths } from '@/hooks/useMainPaths';
import { useParams, useRouter } from 'next/navigation';
import { useWidgetCacheStore } from '@/stores/widgetCache';
import { currencyFormatter, decimalFormatter } from '@/utils/formatNumbers';
import PortfolioTokenChainButton from '@/components/Portfolio/PortfolioTokenChainButton';
import { useMenuStore } from 'src/stores/menu';

interface PortfolioTokenProps {
  token: ExtendedTokenAmountWithChain;
}

function PortfolioToken({ token }: PortfolioTokenProps) {
  const { lng } = useParams();
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const { t } = useTranslation();
  const { isMainPaths } = useMainPaths();
  const router = useRouter();
  const setFrom = useWidgetCacheStore((state) => state.setFrom);
  const { setWalletMenuState } = useMenuStore((state) => state);

  const hasMultipleChains = token.chains.length > 1;

  const handleChange = (_: React.ChangeEvent<{}>, expanded: boolean) => {
    if (!hasMultipleChains) {
      setFrom(token.address, token.chainId);
      setWalletMenuState(false);

      if (!isMainPaths) {
        router.push('/');
      }
      return;
    }
    setExpanded(expanded);
  };

  return (
    <WalletCardContainer
      sx={{
        padding: '0!important',
      }}
    >
      <CustomAccordion
        expanded={isExpanded}
        disableGutters
        onChange={handleChange}
      >
        <AccordionSummary
          sx={{
            padding: 0,
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
          }}
        >
          <Grid container display="flex" alignItems="center">
            <Grid item xs={2}>
              {hasMultipleChains ? (
                <MuiAvatar>
                  {!token?.logoURI ? (
                    <>?</>
                  ) : (
                    <Image
                      width={40}
                      height={40}
                      src={token.logoURI}
                      alt={token.name}
                    />
                  )}
                </MuiAvatar>
              ) : (
                <>
                  <WalletCardBadge
                    overlap="circular"
                    className="badge"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      !hasMultipleChains ? (
                        <MuiAvatar
                          alt={token?.chainName || 'chain-name'}
                          src={token?.chainLogoURI || ''}
                          sx={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid white',
                          }}
                        />
                      ) : (
                        <Skeleton variant="circular" />
                      )
                    }
                  >
                    <WalletAvatar src={token.logoURI} />
                  </WalletCardBadge>
                </>
              )}
            </Grid>
            <Grid item xs={5}>
              <TypographyPrimary>{token.symbol}</TypographyPrimary>
              {!hasMultipleChains ? (
                <TypographySecondary>{token.name}</TypographySecondary>
              ) : isExpanded ? (
                <TypographySecondary sx={{ paddingY: '2px' }}>
                  {t('navbar.walletMenu.numberOfChains', {
                    numberOfChains: token.chains?.length,
                  })}
                </TypographySecondary>
              ) : (
                <CustomAvatarGroup spacing={6} max={15}>
                  {token.chains.map((chain) => (
                    <Tooltip
                      title={chain.name}
                      key={`${token.symbol}-${chain.address}`}
                    >
                      <MuiAvatar
                        alt={chain.chainName}
                        src={chain.chainLogoURI}
                        sx={{ width: '12px', height: '12px' }}
                      />
                    </Tooltip>
                  ))}
                </CustomAvatarGroup>
              )}
            </Grid>
            <Grid item xs={5} style={{ textAlign: 'right' }}>
              <TypographyPrimary>
                {decimalFormatter(lng).format(token.cumulatedBalance ?? 0)}
              </TypographyPrimary>
              <TypographySecondary>
                {currencyFormatter(lng).format(token.cumulatedTotalUSD ?? 0)}
              </TypographySecondary>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            margin: 0,
            padding: 0,
          }}
        >
          <Box
            sx={{
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Divider
              sx={{
                opacity: 0.3,
                width: '95%',
              }}
            />
            {token.chains.map((tokenWithChain) => (
              <PortfolioTokenChainButton
                key={generateKey(tokenWithChain.address)}
                token={tokenWithChain}
              />
            ))}
          </Box>
        </AccordionDetails>
      </CustomAccordion>
    </WalletCardContainer>
  );
}

export default memo(PortfolioToken);