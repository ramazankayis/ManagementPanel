import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
};

export const getAllUsers = createAsyncThunk("users", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // http isteği olmaz ise
    handleDeleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
    addUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now(),
      };

      state.users = [...state.users, newUser];
    },
    updateUser: (state, action) => {
      const { id, name, username, email, website, address } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.username = username;
        existingUser.email = email;
        existingUser.website = website;
        existingUser.address = address;
      }
    },
  },
  extraReducers: (builder) => {
    // http isteklerinde kullanılır.
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});
export const { handleDeleteUser, addUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
