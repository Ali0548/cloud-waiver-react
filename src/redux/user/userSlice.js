import {createSlice} from '@reduxjs/toolkit'
import {getMembers, login, updateProfile, updateProfilePicture, userProfile} from './userThunk'
import toast from "react-hot-toast";

const initialUserState = {
  currentUser: null,
  members: null,
  status: 'idle'
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    updateUserProfile: (state, {payload}) => {
      state.currentUser.profile_picture = payload
    },
    resetUser:(state, {payload})=>{
      state.currentUser = null
    }
  },
  extraReducers: (builder) => {
    // Add extra reducers using the builder notation
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        if (typeof payload !== 'string') {
          state.currentUser = payload;
        }
      })
      .addCase(login.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(userProfile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(userProfile.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.currentUser = payload;
      })
      .addCase(userProfile.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateProfile.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.currentUser = payload;
        toast.success('Updated Successfully')
      })
      .addCase(updateProfile.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(getMembers.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getMembers.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.members = payload;
      })
      .addCase(getMembers.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(updateProfilePicture.pending, (state, {payload}) => {
        state.status = 'pending';
      })
      .addCase(updateProfilePicture.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.currentUser.profile_picture = payload.url;
      })
      .addCase(updateProfilePicture.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })
  },
})

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectMember = (state) => state.user.members;

export const {updateUserProfile, resetUser} = userSlice.actions;
export default userSlice.reducer
