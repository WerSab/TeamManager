import {createSlice} from '@reduxjs/toolkit';
let data = [
  {
    category: 'basic',
    id: 0,
    name: 'Jan Kowalski',
  },
  {
    category: 'reserve',
    id: 1,
    name: 'Andrzej Nowak',
  },
  {
    category: 'basic',
    id: 2,
    name: 'Anna Słowik',
  },
  {
    category: 'reserve',
    id: 3,
    name: 'Ignacy Drozd',
  },
  {
    category: 'basic',
    id: 4,
    name: 'Bolesław Jasiński',
  },
  {
    category: 'reserve',
    id: 5,
    name: 'Kajetan Kot',
  },
  {
    category: 'basic',
    id: 6,
    name: 'Prokop Marchewka',
  },
  {
    category: 'basic',
    id: 7,
    name: 'Zofia Kowal',
  },
  {
    category: 'basic',
    id: 8,
    name: 'Teresa Gawryś',
  },
  {
    category: 'basic',
    id: 9,
    name: 'Tadeusz Słowik',
  },
];
const playerSlice = createSlice({
  name: 'players',
  initialState: data,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    addTeam: (state, action) => [...state, action.payload],
    deleteElement: (state, action) => {
      let items = state;
      let filtered = items.filter(element => {
        return element.id !== action.payload;
      });
      return filtered;
    },
  },
});
export default playerSlice;