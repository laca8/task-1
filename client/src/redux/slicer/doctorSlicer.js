import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import doctorService from "../service/doctorService";
const initialState = {
  doctors: [],
  loading: false,
  error: null,
  success: false,
};
export const addDocotr = createAsyncThunk("addDoctor", async (row, api) => {
  try {
    console.log(row);

    const config = {
      headers: {
        //"Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      },
    };

    return await doctorService.createDoctor(row, config);
  } catch (error) {
    console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const fetchDoctors = createAsyncThunk("fetchDoctors", async (_, api) => {
  try {
    return await doctorService.getDoctors();
  } catch (error) {
    console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const removeDoctor = createAsyncThunk(
  "removeDoctor",
  async (id, api) => {
    try {
      return await doctorService.deleteDoctor(id);
    } catch (error) {
      console.log(error);
      return api.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDocotr.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDocotr.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(addDocotr.fulfilled, (state) => {
        (state.loading = false), (state.success = true), (state.error = null);
      })
      .addCase(removeDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeDoctor.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(removeDoctor.fulfilled, (state) => {
        (state.loading = false), (state.success = true), (state.error = null);
      })
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        (state.loading = false),
          (state.doctors = action.payload),
          (state.error = null);
      });
  },
});
export default doctorSlice.reducer;
