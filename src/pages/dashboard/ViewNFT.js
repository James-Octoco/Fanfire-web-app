import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ViewNFTCard from '../../components/marketplace/ViewNFTCard';
import Loader from 'react-loader-spinner';
import useMounted from '../../hooks/useMounted';

function ViewNFT() {
  const currentPath = useLocation();
  const pathLocations = currentPath.pathname.split('/');
  const nftId = pathLocations[pathLocations.length - 1];
  const authContext = useAuth();
  const [NFT, setNFT] = useState();
  const [loading, setLoading] = useState(true);
  const mounted = useMounted();

  const getNFT = useCallback(async () => {
    setLoading(true);
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authContext.user.idToken.i}`,
        },
      };

      const response = await fetch(
        `https://europe-west3-fanfire-01.cloudfunctions.net/api/nft/${nftId}`,
        requestOptions
      );
      if (response.status === 200) {
        const json = await response.json();
        setNFT(json);
        setLoading(false);
      } else {
        console.log(`Request failed with error code ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getNFT();
  }, [getNFT]);

  return (
    <>
      {(loading && !NFT) ? <Loader /> : (
        <ViewNFTCard nft={NFT} />
      )}
    </>
  );
}

export default ViewNFT;
