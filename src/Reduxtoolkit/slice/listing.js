import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PropertListing } from "../../api/ListingApis";


// Async thunk for fetching listings
export const fetchListings = createAsyncThunk("listings/fetchListings", async (_, { rejectWithValue }) => {
  try {
    const response = await PropertListing.getListing();
    if (response.data.success) {
      return {
        listings: response.data.deals,
      };
    }
    return rejectWithValue("Failed to fetch listings");
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const listingSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.listings = action.payload.listings;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default listingSlice.reducer;
