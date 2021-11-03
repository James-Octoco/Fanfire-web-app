import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Link,
  Card,
  CardContent,
  Divider,
  List,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Tab,
  TableCell,
  useMediaQuery
} from '@material-ui/core';
import ArrowRightIcon from '../../icons/ArrowRight';
import ImageIcon from '../../icons/Image';
import ClipboardIcon from '../../icons/Clipboard';
import Moralis from 'moralis';
import NFTOwnerModal from '../widgets/modals/NFTOwnerModal';
import Loader from 'react-loader-spinner';

const ViewNFTCard = (props) => {
  const { nft } = props;
  const [showModal, setShowModal] = useState(false);
  const [NFTHistory, setNFTHistory] = useState();
  const [loading, setLoading] = useState(false);

  Moralis.initialize('RR5fbRzuUyuqRp9CP2kRQWQKlOyxeBLp0qvSHSLM');
  Moralis.serverURL = 'https://7pyckhr0wtzl.moralishost.com:2053/server';

  const getNFTTransactionHistory = async () => {
    setLoading(true);
    const history = await Moralis.Web3API.token.getWalletTokenIdTransfers({
      chain: nft.blockchain,
      order: 'block_number.DESC',
      address: nft.contractAddress,
      token_id: nft.tokenId
    });
    setNFTHistory(history.result);
    setLoading(false);
  };

  useEffect(() => {
    getNFTTransactionHistory();
  }, []);

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
        <CardContent>
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  padding: 4,
                  alignItems: 'center'
                }}
              >
                {(
              nft.publicURL
                ? (
                  <Box
                    sx={{
                      alignItems: 'center',
                      backgroundColor: 'background.default',
                      display: 'flex',
                      height: 300,
                      justifyContent: 'center',
                      overflow: 'hidden',
                      width: 300,
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
              </Box>
              <Box
                sx={{
                  width: '100%',
                  padding: 4,
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="h4"
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
                    height: 150
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        width: '50%',
                        float: 'left',
                      }}
                    >
                      <Typography
                        color="textSecondary"
                        variant="overline"
                      >
                        {nft.additionalInfo ? nft.additionalInfo : 'No additional info provided' }
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        float: 'right',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        width: '50%',
                      }}
                    >
                      <Typography
                        color="textSecondary"
                        variant="overline"
                      >
                        {nft.additionalInfo ? nft.additionalInfo : 'No additional info provided' }
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      height: 60
                    }}
                  />
                  <Box>
                    <Typography>
                      {nft.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 10
                    }}
                  />
                </Box>
                <Divider />
                <Box
                  sx={{
                    pading: 1
                  }}
                />
                <Box
                  sx={{
                    height: 100,
                  }}
                >
                  <Typography
                    color="textPrimary"
                    variant="h6"
                  >
                    Awards
                  </Typography>
                  <List
                    disablePadding
                    sx={{ pt: 2 }}
                  >
                    <Typography
                      key={1}
                    >
                      Add awards/metadata here
                    </Typography>
                  </List>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{ padding: 1 }}
            >
              <Typography
                color="textPrimary"
                variant="h6"
              >
                NFT Details:
              </Typography>
              <Box
                sx={{
                  padding: 1
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  m: 1
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Blockchain
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  {nft.blockchain}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  m: 1
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Token ID
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  {nft.tokenId}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  m: 1
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Contract Address
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  <Button
                    color="primary"
                    startIcon={<ClipboardIcon fontSize="small" />}
                    variant="text"
                    onClick={() => { navigator.clipboard.writeText(`${nft.contractAddress}`); }}
                  />
                  {nft.contractAddress ? `${nft.contractAddress.slice(0, 5)}...${nft.contractAddress.slice(nft.contractAddress.length - 3, nft.contractAddress.length)}` : 'Unknown'}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  m: 1
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Owner Address
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  <Button
                    color="primary"
                    startIcon={<ClipboardIcon fontSize="small" />}
                    variant="text"
                    onClick={() => { navigator.clipboard.writeText(`${nft.ownerAddress}`); }}
                  />
                  {nft.ownerAddress ? `${nft.ownerAddress.slice(0, 5)}...${nft.ownerAddress.slice(nft.ownerAddress.length - 3, nft.ownerAddress.length)}` : 'Unknown'}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  m: 1
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Created On
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  {(nft.createdAt).slice(0, 10)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  m: 1
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Updated On
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  {(nft.updatedAt).slice(0, 10)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Box
        sx={{ padding: 1 }}
      />
      <Card>
        <CardContent>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            Transaction History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Event
                  </TableCell>
                  <TableCell>
                    Price
                  </TableCell>
                  <TableCell>
                    From
                  </TableCell>
                  <TableCell>
                    To
                  </TableCell>
                  <TableCell>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <Loader
                  type="Circles"
                />
              ) : (
                <TableBody>
                  {NFTHistory && NFTHistory.map((event) => (
                    <TableRow
                      key={event.block_number}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        {event.from_address === '0x0000000000000000000000000000000000000000' ? 'Minted' : 'Transferred' }
                      </TableCell>
                      <TableCell>
                        {event.value}
                      </TableCell>
                      <TableCell>
                        {`${event.from_address.slice(0, 5)}...${event.from_address.slice(event.from_address.length - 3, event.from_address.length)}`}
                      </TableCell>
                      <TableCell>
                        {`${event.to_address.slice(0, 5)}...${event.to_address.slice(event.to_address.length - 3, event.to_address.length)}`}
                      </TableCell>
                      <TableCell>
                        {event.block_timestamp.slice(0, 10)}
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              )}
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};
ViewNFTCard.propTypes = {
  nft: PropTypes.object
};
export default ViewNFTCard;
