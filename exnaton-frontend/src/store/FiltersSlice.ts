import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface FiltersState {
	muids: { muid: string }[];
	selectedMuid: string | null;
	startDate: string | null;
	endDate: string | null;
	timeInterval: string;
	loading: boolean;
	error: string | null;
}

const initialState: FiltersState = {
	muids: [],
	selectedMuid: null,
	startDate: null,
	endDate: null,
	timeInterval: "daily",
	loading: false,
	error: null,
};

export const fetchMuids = createAsyncThunk("filters/fetchMuids", async () => {
	const response = await axios.get("http://localhost:3001/energy-readings/muid");
	return response.data;
});

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setSelectedMuid(state, action: PayloadAction<string | null>) {
			state.selectedMuid = action.payload;
		},
		setStartDate(state, action: PayloadAction<string | null>) {
			state.startDate = action.payload;
		},
		setEndDate(state, action: PayloadAction<string | null>) {
			state.endDate = action.payload;
		},
		setTimeInterval(state, action: PayloadAction<string>) {
			state.timeInterval = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMuids.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMuids.fulfilled, (state, action) => {
				state.loading = false;
				state.muids = action.payload;
			})
			.addCase(fetchMuids.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch muids";
			});
	},
});

export const { setSelectedMuid, setStartDate, setEndDate, setTimeInterval } = filtersSlice.actions;

export default filtersSlice.reducer;
