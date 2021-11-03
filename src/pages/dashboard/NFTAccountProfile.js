import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton, Link,
  Tab,
  Tabs,
  Tooltip,
  Typography
} from '@material-ui/core';
import UploadIcon from '../../icons/Upload';
import blueGrey from '@material-ui/core/colors/blueGrey';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import EditPublicProfileModal from '../../components/widgets/modals/EditPublicProfileModal';
import { socialApi } from '../../__fakeApi__/socialApi';
import { SocialConnections, SocialTimeline } from '../../components/dashboard/social';
import useMounted from '../../hooks/useMounted';
import DotsVerticalIcon from '../../icons/DotsVertical';
import gtm from '../../lib/gtm';
import {
  fetchUserDetails,
  updatePublicProfile,
  updateProfilePicture,
  selectPublicProfile,
  selectUserStatus,
  selectPublicProfileCreated
} from '../../slices/user';
import { fetchUserWallet, selectUserWallet } from '../../slices/userWallet';
import { useDispatch, useSelector } from 'react-redux';
import { useEthers } from '@usedapp/core';

const tabs = [
  { label: 'Owned NFTs', value: 'ownedNFTs' },
  { label: 'Created NFTs', value: 'createdNFTs' }
];

const NFTAccountProfile = () => {
  const accountLocation = useLocation();
  const mounted = useMounted();
  const [currentTab, setCurrentTab] = useState('ownedNFTs');
  const [profile, setProfile] = useState(null);
  const [connectedStatus, setConnectedStatus] = useState('not_connected');
  const [loading, setLoading] = useState(false);
  const publicProfile = useSelector(selectPublicProfile);
  const [userWebsite, setUserWebsite] = useState(publicProfile.website);
  const userNetworkStatus = useSelector(selectUserStatus);
  const publicProfileCreated = useSelector(selectPublicProfileCreated);
  const accNumber = accountLocation.pathname.slice(8);

  const dispatch = useDispatch();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    const { website } = publicProfile;
    const urlValid = (website.substring(0, 6) === 'http://') || (website.substring(0, 7) === 'https://');
    if (!urlValid) {
      setUserWebsite(`http://${website}`);
    } else {
      setUserWebsite(website);
    }
  }, [publicProfile]);

  const getUserDetails = async () => {
    await dispatch(fetchUserDetails());
  };

  const getUserWallet = async () => {
    await dispatch(fetchUserWallet());
  };

  useEffect(() => {
    getUserDetails();
    getUserWallet();
  }, []);

  const getProfile = useCallback(async () => {
    try {
      const data = await socialApi.getProfile();

      if (mounted.current) {
        setProfile(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleConnectToggle = () => {
    setConnectedStatus((prevConnectedStatus) => (prevConnectedStatus === 'not_connected'
      ? 'pending'
      : 'not_connected'));
  };

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!profile) {
    return null;
  }
  function openTab() {
    window.open('https://play.google.com/store/apps/details?id=com.drishya');
  }
  return (
    <>
      <Helmet>
        <title>Dashboard: Social Profile | Material Kit Pro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%'
        }}
      >
        <Box
          style={{ backgroundImage: `url(${profile.cover})` }}
          sx={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: 460,
            position: 'relative',
            '&:before': {
              backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)',
              content: '" "',
              height: '100%',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '100%'
            },
            '&:hover': {
              '& button': {
                visibility: 'visible'
              }
            }
          }}
        >
          <Button
            startIcon={<AddPhotoIcon fontSize="small" />}
            sx={{
              backgroundColor: blueGrey[900],
              bottom: {
                lg: 24,
                xs: 'auto'
              },
              color: 'common.white',
              position: 'absolute',
              right: 24,
              top: {
                lg: 'auto',
                xs: 24
              },
              visibility: 'hidden',
              '&:hover': {
                backgroundColor: blueGrey[900]
              }
            }}
            variant="contained"
          >
            Change Cover
          </Button>
        </Box>
        <Container maxWidth="lg">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 1,
              position: 'relative'
            }}
          >
            <Avatar
              src={publicProfile.imageUri ?? <AddPhotoIcon fontSize="small" />}
              sx={{
                border: (theme) => `4px solid ${theme.palette.background.default}`,
                height: 120,
                left: 24,
                position: 'absolute',
                top: -60,
                width: 120
              }}
            />
            <Box sx={{ ml: '160px' }}>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                {publicProfile.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="overline"
              >
                {publicProfile.bio}
              </Typography>
              <Typography
                color="textPrimary"
                variant="body1"
              >
                <a
                  href={userWebsite}
                  target="_blank"
                  rel="noreferrer noopener"
                  color="primary"
                  role="button"
                >
                  {publicProfile.website}
                </a>
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: {
                  md: 'block',
                  xs: 'none'
                }
              }}
            >
              {connectedStatus === 'not_connected' && (
                <Button
                  color="primary"
                  onClick={handleConnectToggle}
                  size="small"
                  sx={{ ml: 1 }}
                  variant="outlined"
                >
                  Connect
                </Button>
              )}
              {connectedStatus === 'pending' && (
                <Button
                  color="primary"
                  onClick={handleConnectToggle}
                  size="small"
                  sx={{ ml: 1 }}
                  variant="outlined"
                >
                  Pending
                </Button>
              )}
              <Button
                color="primary"
                component={RouterLink}
                size="small"
                sx={{ ml: 1 }}
                to="/dashboard/chat"
                variant="contained"
              >
                Send Message
              </Button>
            </Box>
            <Tooltip title="More options">
              <IconButton sx={{ ml: 1 }}>
                <DotsVerticalIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
        <Box sx={{ mt: 3 }}>
          <Container maxWidth="lg">
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
            <Divider />
            <Box sx={{ py: 3 }}>
              {currentTab === 'ownedNFTs' && <SocialTimeline profile={profile} />}
              {currentTab === 'createdNFTs' && <SocialConnections />}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default NFTAccountProfile;
