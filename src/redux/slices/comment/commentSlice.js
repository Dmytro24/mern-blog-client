import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../../utils/axios';

const initialState = {
  comments: [],
  isLoading: false,
  status: null,
};

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment, userName, userAvatar }) => {
    try {
      
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
        userName,
        userAvatar,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async ( postId ) => {
    try {
      const { data } = await axios.delete(`/comments/${postId}`,  postId );

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getPostComments = createAsyncThunk('comment/getPostComments', async (postId) => {
  try {
    const { data } = await axios.get(`/posts/comments/${postId}`);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // createComment
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
      state.status = action.payload.message;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });

    // deleteComment
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter((comment) => comment._id !== action.payload._id);
      state.status = action.payload.message;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });

    // getPostComments
    builder.addCase(getPostComments.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getPostComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(getPostComments.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });
  },
});

export default commentSlice.reducer;
