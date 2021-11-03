import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// import { NavLink } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Link,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '../../icons/ArrowRight';
import ImageIcon from '../../icons/Image';
import Moralis from 'moralis';
import NFTOwnerModal from '../widgets/modals/NFTOwnerModal';

const MarketplaceNFT = (props) => {
  const { nft } = props;
  const [showModal, setShowModal] = useState(false);

  const backdropClickHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <NFTOwnerModal
          open={showModal}
          close={backdropClickHandler}
          nft={nft}
        />
      )}
      <Card>
        <CardHeader
          sx={{ pb: 0 }}
          title={(
            nft.publicURL
              ? (
                <Box
                  sx={{
                    display: 'flex',

                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      alignItems: 'center',
                      backgroundColor: 'background.default',
                      display: 'flex',
                      height: 200,
                      justifyContent: 'center',
                      overflow: 'hidden',
                      width: 200,
                      '& img': {
                        height: 'auto',
                        width: '100%'
                      }
                    }}
                  >
                    <img
                      alt="Product"
                      src={nft.publicURL}
                    />
                  </Box>
                </Box>
              )
              : (
                <Box
                  sx={{
                    alignItems: 'center',
                    backgroundColor: 'background.default',
                    display: 'flex',
                    height: 100,
                    justifyContent: 'center',
                    width: 100
                  }}
                >
                  <ImageIcon fontSize="small" />
                </Box>
              )
          )}
        />
        <CardContent>
          <Divider sx={{ mb: 2 }} />
          <Typography
            color="textPrimary"
            variant="h6"
          >
            {nft.name}
          </Typography>
          <Box>
            <Button
              color="primary"
              // endIcon={<ArrowRightIcon fontSize="small" />}
              variant="text"
              onClick={(event) => setShowModal(true)}
            >
              Owned By
            </Button>
          </Box>
          <Box
            sx={{
              height: 80
            }}
          >
            <Typography
              color="textSecondary"
            >
              {nft.description}
            </Typography>
          </Box>
          <Divider />
          <Divider />
          <Box
            sx={{
              alignItems: 'flex-end',
              display: 'flex',
              flexDirection: 'column',
              pt: 2
            }}
          >
            <Link
              component={RouterLink}
              params={{ nft }}
              to={`/${nft._id}`}
              style={{
                textDecoration: 'none'
              }}
            >
              <Button
                color="primary"
                endIcon={<ArrowRightIcon fontSize="small" />}
                variant="text"
              >
                View
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
MarketplaceNFT.propTypes = {
  nft: PropTypes.object
};
export default MarketplaceNFT;
