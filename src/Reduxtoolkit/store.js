import { configureStore } from "@reduxjs/toolkit";
import listing from "./slice/listing";

export const store = configureStore({
  reducer: {
    listings: listing,
  },
});
