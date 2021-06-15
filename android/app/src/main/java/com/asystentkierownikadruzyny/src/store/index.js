import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import turniejeSlice from './turniejeSlice';
import playerSlice from './playerSlice';

const persistConfig = {
key: 'root',
storage: AsyncStorage,
whiteList:['turnieje', 'players']
}

const reducer = combineReducers({ 
    turnieje: turniejeSlice.reducer, 
    players: playerSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export const persistor = persistStore(store)

export const turniejeActions = turniejeSlice.actions
export const playerActions = playerSlice.actions