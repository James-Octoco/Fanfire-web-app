import { subDays, subHours } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  Modal
} from '@material-ui/core';
import ChatAltIcon from '../../../icons/ChatAlt';
import CreditCardIcon from '../../../icons/CreditCard';
import ShoppingCartIcon from '../../../icons/ShoppingCart';
import PropTypes from 'prop-types';
import Identicon from '../../../icons/Identicon';
import Moralis from 'moralis';
import Loader from 'react-loader-spinner';
import { useEthers } from '@usedapp/core';

const now = new Date();

const iconsMap = {
  item_shipped: ShoppingCartIcon,
  new_message: ChatAltIcon,
  order_placed: CreditCardIcon
};

const NFTOwnerModal = (props) => {
  const { account } = useEthers();
  const [nftOwner, setNFTOwner] = useState('');
  const [loading, setLoading] = useState(true);
  const { open, close, nft } = props;

  Moralis.initialize('RR5fbRzuUyuqRp9CP2kRQWQKlOyxeBLp0qvSHSLM');
  Moralis.serverURL = 'https://7pyckhr0wtzl.moralishost.com:2053/server';

  const getNFTOwners = async (NFT) => {
    setLoading(true);
    const nftOwnerResponse = await Moralis.Web3API.token.getNFTOwners({
      chain: NFT.blockchain,
      address: NFT.contractAddress,
      token_id: NFT.tokenId
    });
    setNFTOwner(nftOwnerResponse.result);
    setLoading(false);
  };

  useEffect(() => {
    getNFTOwners(nft);
  }, []);

  return (
    <Modal
      open={open}
      onClose={close}
    >
      <Box
        sx={{
          backgroundColor: 'transparent',
          minHeight: '100%',
          p: 3
        }}
      >
        <Paper
          elevation={12}
          sx={{
            backgroundColor: 'gray',
            maxWidth: 300,
            mx: 'auto'
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              {nftOwner.length === 1 ? 'Owner' : 'Owners'}
            </Typography>
          </Box>
          <List disablePadding>
            {loading
              ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Loader
                    type="Circles"
                  />
                </Box>
              ) : (
                nftOwner && nftOwner.map((owner) => (
                  <ListItem
                    divider
                    key={owner.owner_of}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText'
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={(
                        <Link
                          color="textPrimary"
                          sx={{ cursor: 'pointer' }}
                          underline="none"
                          variant="subtitle2"
                        >
                          {account && owner.owner_of === account.toLowerCase() ? ('You') : `${owner.owner_of.slice(0, 5)}...${owner.owner_of.slice(owner.owner_of.length - 3, owner.owner_of.length)}`}
                        </Link>
                      )}
                      secondary={owner.description}
                    />
                  </ListItem>
                ))
              )}
          </List>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1
            }}
          >
            <Button
              color="primary"
              size="small"
              variant="text"
              onClick={close}
            >
              Close
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

NFTOwnerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
  nft: PropTypes.object
};

export default NFTOwnerModal;
