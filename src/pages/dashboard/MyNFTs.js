import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import MarketplaceNFT from '../../components/marketplace/MarketplaceNFT';
import {
  OverviewInbox,
  OverviewLatestTransactions,
  OverviewPrivateWallet,
  OverviewTotalBalance,
  OverviewTotalTransactions,
  OverviewWeeklyEarnings
} from '../../components/dashboard/overview';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import Moralis from 'moralis';
import { fetchAllNFTs, selectLoadedNFTs, selectMarketPlaceNftsNetworkStatus } from '../../slices/marketplaceNfts';
import { useDispatch, useSelector } from 'react-redux';
import { ConsoleLogger } from '@aws-amplify/core';
import Loader from 'react-loader-spinner';
import { useEthers } from '@usedapp/core';

const MyNFTs = (props) => {
  const { account } = useEthers();
  const [loading, setLoading] = useState(false);
  const { settings } = useSettings();
  const marketplaceNFTs = useSelector(selectLoadedNFTs);

  const dispatch = useDispatch();

  const getUserNfts = async () => {
    await dispatch(fetchAllNFTs());
  };

  useEffect(() => {
    gtm.push({ event: 'page_view' });
    getUserNfts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard: Overview | Material Kit Pro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
              spacing={3}
              item
              xs={12}
            >
              <Grid item>
                <Typography
                  color="textPrimary"
                  variant="h5"
                >
                  Marketplace
                </Typography>
              </Grid>
            </Grid>
            {loading ? (<Loader type="Circles" />) : (
              marketplaceNFTs && marketplaceNFTs.map((NFT) => (
                <Grid
                  key={NFT._id}
                  item
                  md={2}
                  xs={12}
                >
                  {NFT.ownerId === account.toLowerCase()
                  && <MarketplaceNFT nft={NFT} />}
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MyNFTs;
