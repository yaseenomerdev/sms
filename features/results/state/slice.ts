import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "./model";
import {
  archiveResult,
  deleteResult,
  fetchMoreResults,
  fetchResults,
  getResultById,
  saveResult,
  sendResultToSms,
} from "./thunk";

const initialState = {
  results: [] as Result[],
  loading: false,
  error: null as string | null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchResults.fulfilled,
      (state, action: PayloadAction<Result[]>) => {
        state.results = [...action.payload];
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(fetchResults.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // fetch more result
    builder.addCase(fetchMoreResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchMoreResults.fulfilled,
      (state, action: PayloadAction<Result[]>) => {
        state.results = [...state.results, ...action.payload];
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(fetchMoreResults.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(saveResult.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveResult.fulfilled, (state, action) => {
      const result = action.payload;
      const index = state.results.findIndex((r) => r.id === result.id);
      if (index === -1) {
        state.results = [...state.results, result];
      } else {
        state.results = state.results.map((r) =>
          r.id === result.id ? result : r
        );
      }
      state.loading = false;
      state.error = null;
    });

    builder.addCase(saveResult.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(deleteResult.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteResult.fulfilled, (state, action) => {
      state.results = state.results.filter((r) => r.id !== action.payload);
      state.loading = false;
      state.error = null;
    });

    builder.addCase(deleteResult.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(archiveResult.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(archiveResult.fulfilled, (state, action) => {
      const { id, archive } = action.payload;
      state.loading = false;
      state.results = state.results.filter((r) => (archive ? r.id !== id : r));
      state.error = null;
    });

    builder.addCase(archiveResult.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(sendResultToSms.pending, (state, action) => {
      state.loading = true;
      state.results = state.results.map((r) =>
        r.id === action.meta.arg.id ? { ...r, sending: true } : r
      );
    });

    builder.addCase(sendResultToSms.fulfilled, (state, action) => {
      state.loading = false;
      state.results = state.results.map((r) => {
        if (r.id === action.payload.id) {
          return { ...r, sentForClient: true, sending: false };
        }
        return r;
      });
      state.error = null;
    });

    builder.addCase(sendResultToSms.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
      state.results = state.results.map((r) => {
        if (r.id === action.meta.arg.id) {
          return { ...r, sentForClient: false, sending: false };
        }
        return r;
      });
    });
  },
});

export const resultReducer = resultsSlice.reducer;
