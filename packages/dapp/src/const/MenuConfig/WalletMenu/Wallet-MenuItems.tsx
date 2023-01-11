import { supportedWallets, Wallet } from '@lifi/wallet-management';
import { Avatar } from '@mui/material';
import { useSettings } from '@transferto/shared/src/hooks';
import { useMemo, useState } from 'react';
import { useMenu } from '../../../providers/MenuProvider';
import { useWallet } from '../../../providers/WalletProvider';
import { MenuListItem } from '../../../types';

const WalletMenuItems = () => {
  const [showWalletIdentityPopover, setShowWalletIdentityPopover] =
    useState<Wallet>();
  const { connect } = useWallet();
  const { ethereum } = window as any;
  const settings = useSettings();
  const menu = useMenu();
  const login = async (wallet: Wallet) => {
    menu.onCloseAllNavbarMenus();

    if (wallet.checkProviderIdentity) {
      const checkResult = wallet.checkProviderIdentity(ethereum);
      if (!checkResult) {
        setShowWalletIdentityPopover(wallet);
        return;
      }
    }
    await connect(wallet);
    settings.onWalletConnect(wallet.name);
    menu.onOpenNavbarWalletMenu(false);
    try {
    } catch (e) {}
  };

  const _supportedWallets = supportedWallets;

  const _WalletMenuItems = useMemo<MenuListItem[]>(() => {
    const _output = [];
    _supportedWallets.map((wallet, index) => {
      _output.push({
        label: wallet.name,
        listIcon: (
          <Avatar
            src={wallet.icon}
            alt={`${wallet.name}-wallet-logo`}
            sx={{ height: '24px', width: '24px' }}
          />
        ),
        onClick: () => {
          login(wallet);
        },
      });
    });
    return _output;
  }, [menu.openNavbarWalletMenu]);

  return _WalletMenuItems;
};

export default WalletMenuItems;
