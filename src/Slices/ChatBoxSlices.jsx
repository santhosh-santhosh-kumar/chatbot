import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
const API_URL = import.meta.env.VITE_API_URI;

console.log(API_URL);
const initialState = {
  messages: [{ text: "Hey there! How can I assist you?", status: "ai" }],
  status: "idle",
  error: null,
};

export const fetchChat = createAsyncThunk("chat/fetchChat", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const postChat = createAsyncThunk(
  "chat/postChat",
  async (chatData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, {
        contents: [
          {
            parts: [
              {
                text: chatData,
              },
            ],
          },
        ],
      });
      const aiReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response";
      //   console.log(aiReply,chatData)
        return {
            user: { text: chatData, status: "user" },
            ai: { text: aiReply, status: "ai" },
          };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

const chatboxSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChat.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.status = "succeeded";
      })

      .addCase(postChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postChat.fulfilled, (state, action) => {
            console.log(action.payload.user,action.payload.ai)
            state.messages.push({...action.payload.user,id:nanoid()});
            state.messages.push({...action.payload.ai,id:nanoid()});
            // const id = state.messages.length + 1;
            // state.messages.push({ id, text: action.payload.user, status: "user" });
            // state.messages.push({ id: id + 1, text: action.payload.ai, status: "bot" });
        state.status = "succeeded";
      })
      .addCase(postChat.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default chatboxSlice.reducer;

export const chatDetails = (state) => state.chat.messages;
