import { createSlice } from '@reduxjs/toolkit';

const dragSlice = createSlice({
  name: 'drag',
  initialState: {
    /** 是否插入 */
    isInsert: false,
  },
  reducers: {
    setIsInsert: (state, action) => {
      state.isInsert = action.payload;
    },
  },
  extraReducers: {},
});

export const { setIsInsert } = dragSlice.actions;

export default dragSlice;
