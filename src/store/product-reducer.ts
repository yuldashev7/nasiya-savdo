import { createSlice } from '@reduxjs/toolkit';

interface userT {
  name: string;
  id: string;
}

interface initalStateT {
  userList: userT[];
}

const initialState: initalStateT = {
  userList: [],
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default productReducer.reducer;
