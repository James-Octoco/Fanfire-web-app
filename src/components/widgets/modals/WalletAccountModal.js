import React from 'react';
import { Modal, Box, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEthers } from '@usedapp/core';
import Identicon from '../../../icons/Identicon';
import Clipboard from '../../../icons/Clipboard';

function WalletAccountModal(props) {
  const { account, deactivate } = useEthers();
  const { open, close } = props;

  const deactivateClickHandler = () => {
    deactivate();
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
          Account
        </Typography>
        <Box
          border={1}
          borderRadius={1}
          padding={1}
          borderColor="primary.main"
        >
          <Box
            display="flex"
            alignItems="center"
          >
            <Typography
              color="textSecondary"
              variant="subtitle2"
              padding={1}
            >
              Connected with Metamask
            </Typography>
            <Box
              marginRight={6}
            />
            <Button
              onClick={deactivateClickHandler}
            >
              Change
            </Button>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            padding={1}
          >
            {account && `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`}
            <Box
              padding={1}
            />
            <Identicon />
          </Box>
          <Box
            display="flex"
            alignItems="center"
          >
            <Button
              onClick={() => { navigator.clipboard.writeText(`${account}`); }}
            >
              <Clipboard
                color="red"
              />
              Copy to clipboard
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

WalletAccountModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func
};

export default WalletAccountModal;
