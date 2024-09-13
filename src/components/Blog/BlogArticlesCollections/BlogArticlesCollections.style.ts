import type { Breakpoint, GridProps, IconButtonProps } from '@mui/material';
import { Box, Grid, IconButton, Typography } from '@mui/material';

import { getContrastAlphaColor } from '@/utils/colors';
import { alpha, styled } from '@mui/material/styles';
import { urbanist } from 'src/fonts/fonts';

export const BlogArticlesCollectionsContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  color:
    theme.palette.mode === 'light'
      ? theme.palette.black.main
      : theme.palette.white.main,
  textDecoration: 'unset',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  backgroundColor: theme.palette.bgSecondary.main,
  borderRadius: '32px',
  cursor: 'pointer',
  transition: 'background-color 250ms',
  marginBottom: theme.spacing(14.5),
  padding: theme.spacing(2),
  margin: theme.spacing(6, 2, 0),
  boxShadow: theme.palette.shadow.main,
  ':last-of-type': {
    marginBottom: theme.spacing(6),
  },
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    margin: theme.spacing(2, 8, 0),
    padding: theme.spacing(3),
    ':last-of-type': {
      marginBottom: theme.spacing(2),
    },
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    padding: theme.spacing(4),
    margin: theme.spacing(12, 8, 0),
    ':last-of-type': {
      marginBottom: theme.spacing(12),
    },
  },
  [theme.breakpoints.up('lg' as Breakpoint)]: {
    padding: theme.spacing(6),
  },
  [theme.breakpoints.up('xl' as Breakpoint)]: {
    margin: `${theme.spacing(12, 'auto', 0)}`,
    maxWidth: theme.breakpoints.values.xl,
    ':last-of-type': {
      marginBottom: theme.spacing(12),
    },
  },
}));

interface ArticlesGridProps extends GridProps {
  active: boolean;
}

export const ArticlesGrid = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ArticlesGridProps>(({ theme, active }) => ({
  ...(active && {
    margin: theme.spacing(2, 'auto'),
    display: 'grid',
    // marginTop: `calc(${theme.spacing(5)} + ${theme.spacing(8)} + ${theme.spacing(6)} )`, // title height + tabs container + actual offset
    paddingBottom: 0,
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    gap: theme.spacing(3),
    [theme.breakpoints.up('md' as Breakpoint)]: {
      gridTemplateColumns: '1fr 1fr',
      gap: theme.spacing(4),
    },
    [theme.breakpoints.up('lg' as Breakpoint)]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    [theme.breakpoints.up('xl' as Breakpoint)]: {
      maxWidth: theme.breakpoints.values.xl,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
}));

export interface PaginationIndexButtonProps
  extends Omit<IconButtonProps, 'isDarkMode' | 'isWide' | 'component'> {
  active: boolean;
}

export const PaginationIndexButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<PaginationIndexButtonProps>(({ theme, active }) => ({
  ...(active
    ? {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[800]
            : theme.palette.grey[300],
      }
    : {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[800]
            : theme.palette.grey[400],
      }),
  width: 40,
  height: 40,
  ...(active && {
    '& .MuiTouchRipple-root': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.alphaDark100.main
          : theme.palette.alphaLight300.main,
      zIndex: -1,
    },
  }),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? getContrastAlphaColor(theme, '12%')
        : getContrastAlphaColor(theme, '4%'),
  },
}));

export const PaginationButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[500],
  width: 40,
  height: 40,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? getContrastAlphaColor(theme, '12%')
        : getContrastAlphaColor(theme, '4%'),
  },
}));

export const BlogArticlesCollectionsTitle = styled(Typography)(({ theme }) => ({
  fontFamily: urbanist.style.fontFamily,
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export const CategoryTabPanelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  color:
    theme.palette.mode === 'light'
      ? theme.palette.black.main
      : theme.palette.white.main,
  textDecoration: 'unset',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  backgroundColor: theme.palette.bgSecondary.main,
  boxShadow: theme.palette.shadow.main,
  borderRadius: '32px',
  cursor: 'pointer',
  padding: theme.spacing(6),
  transition: 'background-color 250ms',
  margin: theme.spacing(6, 2),
  marginBottom: theme.spacing(14.5),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.white.main, 1)
        : alpha(theme.palette.white.main, 0.2),
  },
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    padding: theme.spacing(12, 8),
    margin: theme.spacing(8),
    marginBottom: theme.spacing(14.5),
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    padding: theme.spacing(12, 8),
    marginTop: theme.spacing(12),
  },
  [theme.breakpoints.up('xl' as Breakpoint)]: {
    margin: theme.spacing(12, 'auto'),
    marginBottom: theme.spacing(14.5),
    maxWidth: theme.breakpoints.values.xl,
  },
}));