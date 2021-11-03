import React from 'react';
import { Modal, Box, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEthers } from '@usedapp/core';
import { ReactComponent as MetaMaskLogo } from '../../../constants/logos/metamask-fox.svg';

function ConnectWalletModal(props) {
  const { activateBrowserWallet } = useEthers();
  const { open, close } = props;

  const metaMaskWalletHandler = () => {
    activateBrowserWallet();
    close(false);
  };
  return (
    <Modal
      open={open}
      onClose={close}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
        >
          Select a wallet provider
        </Typography>
        <Box
          padding={1}
        />
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={metaMaskWalletHandler}
          >
            <MetaMaskLogo />
            <Box
              padding={1}
            />
            Connect a MetaMask wallet?
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

ConnectWalletModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func
};

export default ConnectWalletModal;
