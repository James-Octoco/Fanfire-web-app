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

// import { ReactComponent as Logo} from '../../constants/logos/MetaMask_Fox.svg';

const Overview = () => {
  const { settings } = useSettings();
  const authContext = useAuth();
  const mounted = useMounted();
  const [marketplaceNFTs, setMarketplaceNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNFTs = useCallback(async () => {
    setLoading(true);
    try {
      const NFTRequestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authContext.user.idToken.i}`,
        },
      };

      const NFTResponse = await fetch(
        'https://europe-west3-fanfire-01.cloudfunctions.net/api/nft',
        NFTRequestOptions
      );
      if (NFTResponse.status === 200) {
        const json = await NFTResponse.json();
        if (mounted.current) {
          setMarketplaceNFTs(json);
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.log(`Request failed with error code ${NFTResponse.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getNFTs();
  }, [getNFTs]);

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
                  md={6}
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

export default Overview;
