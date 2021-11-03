import { useEffect, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import MarketplaceNFT from '../../components/marketplace/MarketplaceNFT';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';
import useMounted from '../../hooks/useMounted';
import Loader from 'react-loader-spinner';
import { fetchAllNFTs, selectLoadedNFTs, selectMarketPlaceNftsNetworkStatus } from '../../slices/marketplaceNfts';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';

const Marketplace = () => {
  const { settings } = useSettings();
  const authContext = useAuth();
  const mounted = useMounted();
  const [loading, setLoading] = useState(false);
  const marketplaceNFTs = useSelector(selectLoadedNFTs);
  console.log(firebase.auth().currentUser);

  const nftsNetworkStatus = useSelector(selectMarketPlaceNftsNetworkStatus);

  const dispatch = useDispatch();

  const loadNFTs = async () => {
    if (Object.keys(marketplaceNFTs).length === 0) {
      setLoading(true);
      await dispatch(fetchAllNFTs());
      setLoading(false);
    } else {
      await dispatch(fetchAllNFTs());
    }
  };

  useEffect(() => {
    loadNFTs();
  }, []);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
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
                  <MarketplaceNFT nft={NFT} />
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Marketplace;
