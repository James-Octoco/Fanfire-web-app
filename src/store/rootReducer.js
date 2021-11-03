import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from '../slices/calendar';
import { reducer as chatReducer } from '../slices/chat';
import { reducer as kanbanReducer } from '../slices/kanban';
import { reducer as mailReducer } from '../slices/mail';
import marketplaceNftsReducer from '../slices/marketplaceNfts';
import userWalletReducer from '../slices/userWallet';
import userReducer from '../slices/user';
import userNftsReducer from '../slices/userNfts';

const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  marketplace: marketplaceNftsReducer,
  userWallet: userWalletReducer,
  user: userReducer,
  userNfts: userNftsReducer
});

export default rootReducer;
