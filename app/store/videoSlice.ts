import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  fileUrl: string | null;
  fileName: string | null;
  thumbnail: string | null;
  scenes: any[];
}

const initialState: VideoState = {
  fileUrl: null,
  fileName: null,
  thumbnail: null,
  scenes: [],
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoFile(state, action: PayloadAction<{ url: string; name: string }>) {
      state.fileUrl = action.payload.url;
      state.fileName = action.payload.name;
    },
    setThumbnail(state, action: PayloadAction<string>) {
      state.thumbnail = action.payload;
    },
    setScenes(state, action: PayloadAction<any[]>) {
      state.scenes = action.payload;
    },
  },
});

export const { setVideoFile, setThumbnail, setScenes } = videoSlice.actions;
export default videoSlice.reducer;
