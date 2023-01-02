import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Slide, Typography } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useTheme } from '@mui/material/styles';
import { useSettings } from '@transferto/shared/src/hooks';
import { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import { useMenu } from '../../providers/MenuProvider';
import {
  MenuHeaderAppBar,
  MenuHeaderAppWrapper,
  NavbarExternalBackground,
  NavbarMenuList,
  NavbarPaper,
  NavbarPopper,
} from './Navbar.styled';

interface NavbarMenuProps {
  openSubMenu: string;
  anchorRef: any; // TODO: Replace this any with the correct type
  bgColor: string;
  handleClose: (event: MouseEvent | TouchEvent) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isScrollable?: boolean;
  scrollableMainLayer?: boolean;
  label?: string;
  open: boolean;
  children: any;
}

const NavbarMenuMobile = ({
  isScrollable,
  handleClose,
  open,
  bgColor,
  setOpen,
  anchorRef,
  scrollableMainLayer,
  label,
  openSubMenu,
  children,
}: NavbarMenuProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const settings = useSettings();
  const menu = useMenu();

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    !!open && (
      <>
        <NavbarExternalBackground />
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <NavbarPopper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            <NavbarPaper
              isDarkMode={isDarkMode}
              openSubMenu={openSubMenu !== 'none'}
              bgColor={bgColor}
              isScrollable={!!label}
              scrollableMainLayer={scrollableMainLayer}
            >
              <ClickAwayListener
                onClickAway={(event) => {
                  handleClose(event);
                  menu.onCloseAllNavbarMenus();
                }}
              >
                <NavbarMenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  component={openSubMenu === 'none' ? 'ul' : 'div'}
                >
                  {!!label ? (
                    <MenuHeaderAppWrapper>
                      <MenuHeaderAppBar
                        component="div"
                        elevation={0}
                        scrollableMainLayer={scrollableMainLayer}
                        isScrollable={isScrollable}
                      >
                        <IconButton
                          size="medium"
                          aria-label="settings"
                          edge="start"
                          sx={{
                            color: theme.palette.text.primary,
                            position: 'absolute',
                          }}
                          onClick={() => {
                            menu.onOpenNavbarWalletMenu(
                              !menu.openNavbarWalletMenu,
                            );
                          }}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                        <Typography
                          variant={'lifiBodyMediumStrong'}
                          width={'100%'}
                          align={'center'}
                          flex={1}
                          noWrap
                        >
                          {label}
                        </Typography>
                      </MenuHeaderAppBar>
                    </MenuHeaderAppWrapper>
                  ) : null}
                  {children}
                </NavbarMenuList>
              </ClickAwayListener>
            </NavbarPaper>
          </NavbarPopper>
        </Slide>
      </>
    )
  );
};

export default NavbarMenuMobile;
