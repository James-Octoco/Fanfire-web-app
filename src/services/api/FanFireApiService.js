import { apiRoutes } from '../../constants/api/apiRoutes';
import { apiUrl } from '../../helper/environmentSettingsHelper';
import { BaseApiService } from './baseApiService';
import firebase from 'firebase';

export class FanFireApiService extends BaseApiService {
  constructor() {
    super(apiUrl());
  }

  _uid = firebase.auth().currentUser?.uid ?? '';

  async fetchUserDetails() {
    this._uid = firebase.auth().currentUser?.uid ?? '';

    const apiResult = await this.get(`${apiRoutes.user.userDetails}/${(this._uid)}`);

    if (!apiResult.isSuccess) {
      return {
        isSuccess: false,
        value: {},
        errorMessage: apiResult.errorMessage,
        httpCode: apiResult.httpCode
      };
    }

    return {
      isSuccess: true,
      value: apiResult.value,
      errorMessage: '',
      httpCode: apiResult.httpCode
    };
  }

  async updatePublicProfile(params) {
    this._uid = firebase.auth().currentUser?.uid ?? '';
    console.log(`${apiRoutes.user.userDetails}/${this._uid}/public-profile`);

    const apiResult = await this.patch(`${apiRoutes.user.userDetails}/${this._uid}/public-profile`, {
      ...params
    });

    if (!apiResult.isSuccess) {
      return {
        isSuccess: false,
        value: {},
        errorMessage: apiResult.errorMessage,
        httpCode: apiResult.httpCode
      };
    }

    return {
      isSuccess: true,
      value: apiResult.value,
      errorMessage: '',
      httpCode: apiResult.httpCode
    };
  }

  async updateProfilePicture(base64FileContent, fileName) {
    this._uid = firebase.auth().currentUser?.uid ?? '';

    const apiResult = await this.patch(`${apiRoutes.user.baseEndpoint}/${this._uid}/profile-picture`, {
      base64FileContent,
      fileName
    });

    if (!apiResult.isSuccess) {
      return {
        isSuccess: false,
        value: {},
        errorMessage: apiResult.errorMessage,
        httpCode: apiResult.httpCode
      };
    }

    return {
      isSuccess: true,
      value: apiResult.value,
      errorMessage: '',
      httpCode: apiResult.httpCode
    };
  }

  async fetchAllNFTs() {
    const apiResult = await this.get(apiRoutes.nft.baseEndpoint);

    if (!apiResult.isSuccess) {
      return {
        isSuccess: false,
        value: {},
        errorMessage: apiResult.errorMessage,
        httpCode: apiResult.httpCode
      };
    }

    return {
      isSuccess: true,
      value: apiResult.value,
      errorMessage: '',
      httpCode: apiResult.httpCode
    };
  }

  async fetchUserNFTs() {
    const apiResult = await this.get(apiRoutes.nft.userNFTs);

    if (!apiResult.isSuccess) {
      return {
        isSuccess: false,
        value: {},
        errorMessage: apiResult.errorMessage,
        httpCode: apiResult.httpCode
      };
    }

    return {
      isSuccess: true,
      value: apiResult.value,
      errorMessage: '',
      httpCode: apiResult.httpCode
    };
  }

  async fetchUserWallet() {
    const apiResult = await this.get(apiRoutes.wallet.baseEndpoint);
    if (!apiResult.isSuccess) {
      return {
        isSuccess: false,
        value: {},
        errorMessage: apiResult.errorMessage,
        httpCode: apiResult.httpCode
      };
    }

    return {
      isSuccess: true,
      value: apiResult.value,
      errorMessage: '',
      httpCode: apiResult.httpCode
    };
  }

  async fetchNFT(nftId) {
    const apiResult = await this.get(`${apiRoutes.nft.baseEndpoint}/${nftId}`);

    if (!apiResult.isSuccess) {
      return {
        isSuccess: false,
        value: {},
        errorMessage: apiResult.errorMessage,
        httpCode: apiResult.httpCode
      };
    }

    return {
      isSuccess: true,
      value: apiResult.value,
      errorMessage: '',
      httpCode: apiResult.httpCode
    };
  }

  async likeNFT(nftId) {
    const apiResult = await this.patch(`${apiRoutes.nft.baseEndpoint}/${nftId}/like`);
    if (!apiResult.isSuccess) {
      return {
        isSuccess: false,
        value: {},
        errorMessage: apiResult.errorMessage,
        httpCode: apiResult.httpCode
      };
    }

    return {
      isSuccess: true,
      value: apiResult.value,
      errorMessage: apiResult.errorMessage,
      httpCode: apiResult.httpCode
    };
  }

  async unlikeNFT(nftId) {
    const apiResult = await this.patch(`${apiRoutes.nft.baseEndpoint}/${nftId}/unlike`);

    if (!apiResult.isSuccess) {
      return {
        isSuccess: false,
        value: {},
        errorMessage: apiResult.errorMessage,
        httpCode: apiResult.httpCode
      };
    }

    return {
      isSuccess: true,
      value: apiResult.value,
      errorMessage: apiResult.errorMessage,
      httpCode: apiResult.httpCode
    };
  }
}
