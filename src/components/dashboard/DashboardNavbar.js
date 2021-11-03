import { Link as RouterLink, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, IconButton, Toolbar, Button, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import MenuIcon from '../../icons/Menu';
import AccountPopover from './AccountPopover';
import Logo from '../Logo';
import { formatEther } from '@ethersproject/units';
import Identicon from '../../icons/Identicon';
import { useEffect, useState } from 'react';
import { useEthers, useEtherBalance, useContractCall } from '@usedapp/core';
import ConnectWalletModal from '../widgets/modals/ConnectWalletModal';
import WalletAccountModal from '../widgets/modals/WalletAccountModal';
import ABI from '../../constants/ABIs/contractABI.json';
import { utils } from 'ethers';

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === 'light' && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    color: theme.palette.primary.contrastText
  }),
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none'
  }),
  zIndex: theme.zIndex.drawer + 100
}));

const DashboardNavbar = (props) => {
  const { onSidebarMobileOpen, ...other } = props;
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);

  const connectWalletBackdropClickHandler = () => {
    setShowConnectModal(false);
  };

  const accountModalBackdropClickHandler = () => {
    setShowAccountModal(false);
  };

  const connectWalletHandler = () => {
    setShowConnectModal(true);
  };

  const accountClickHandler = () => {
    setShowAccountModal(true);
  };

  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar sx={{ minHeight: 64 }}>
        <ConnectWalletModal
          open={showConnectModal}
          close={connectWalletBackdropClickHandler}
        />
        <WalletAccountModal
          open={showAccountModal}
          close={accountModalBackdropClickHandler}
        />
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              lg: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <RouterLink to="/">
          <Logo
            sx={{
              display: {
                lg: 'inline',
                xs: 'none'
              },
              height: 40,
              width: 40
            }}
          />
        </RouterLink>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2
          }}
        />
        {/* <LanguagePopover />
        <Box sx={{ ml: 1 }}>
          <ContentSearch />
        </Box>
        <Box sx={{ ml: 1 }}>
          <ContactsPopover />
        </Box>
        <Box sx={{ ml: 1 }}>
          <NotificationsPopover />
        </Box> */}
        <Box sx={{ ml: 2 }}>
          <NavLink
            to="/marketplace"
            style={{
              color: 'pallette.primary.main',
              textDecoration: 'none'
            }}
            activeStyle={{
              textDecoration: 'underline'
            }}
          >
            Marketplace
          </NavLink>
        </Box>
        {account && (
          <Box sx={{ ml: 2 }}>
            <NavLink
              to="/myNFTs"
              style={{
                color: '#01ab56',
                textDecoration: 'none'
              }}
              activeStyle={{
                textDecoration: 'underline'
              }}
            >
              My NFTs
            </NavLink>
          </Box>
        )}
        <Box sx={{ ml: 2 }}>
          <AccountPopover />
        </Box>
        {account ? (
          <Box
            display="flex"
            alignItems="center"
            backgroundColor="background.paper"
            height="50px"
            borderRadius={1}
            padding={1}
          >
            <Box
              px="3"
            >
              <Typography
                color="white"
                fontSize="md"
              >
                {`${etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} `}
                ETH
              </Typography>
            </Box>
            <Box
              padding={1}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={accountClickHandler}
            >
              {account && `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`}
              <Box
                padding={1}
              />
              <Identicon />
            </Button>
          </Box>
        ) : (
          <>
            <Box
              padding={1}
            />
            <Button
              color="primary"
                            // startIcon={<PlusIcon fontSize="small" />}
              variant="contained"
              onClick={connectWalletHandler}
            >
              Connect Wallet
            </Button>
          </>
        )}
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

DashboardNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default DashboardNavbar;
