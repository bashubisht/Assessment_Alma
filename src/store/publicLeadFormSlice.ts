import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedinUrl?: string;
  countryOfCitizenship?: string;
  visaCategories?: string;
  helpMessage?: string;
  [key: string]: unknown; // For any additional fields
}

interface PublicLeadFormState {
  formData: FormData;
  formSubmitted: boolean;
  isSubmitTriggered: boolean;
  resume: File | null;
  urlError: string;
}

const initialState: PublicLeadFormState = {
  formData: {},
  formSubmitted: false,
  isSubmitTriggered: false,
  resume: null,
  urlError: ''
};

// This thunk will handle the async POST request to /api/leads
export const submitLeadForm = createAsyncThunk(
  'publicLeadForm/submitLeadForm',
  async (leadData: FormData, { rejectWithValue }) => {
    try {
      await axios.post('/api/leads', leadData);
      return leadData; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const publicLeadFormSlice = createSlice({
  name: 'publicLeadForm',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
        if (Object.keys(action.payload).length === 0) {
            state.formData = {};
          } else {
            state.formData = action.payload;
            
            // {
            //   // ...state.formData,
            //   // ...action.payload,
            // };
          }
    },
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
    },
    setIsSubmitTriggered: (state, action: PayloadAction<boolean>) => {
      state.isSubmitTriggered = action.payload;
    },
    setResume: (state, action: PayloadAction<File | null>) => {
      state.resume = action.payload;
    },
    setUrlError: (state, action: PayloadAction<string>) => {
      state.urlError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLeadForm.pending, (state) => {
        state.isSubmitTriggered = true;
      })
      .addCase(submitLeadForm.fulfilled, (state) => {
        state.formSubmitted = true;
      })
      .addCase(submitLeadForm.rejected, (state, action) => {
        console.error('Failed to submit form:', action.payload);
      });
  },
});

export const {
  setFormData,
  setFormSubmitted,
  setIsSubmitTriggered,
  setResume,
  setUrlError,
} = publicLeadFormSlice.actions;

export default publicLeadFormSlice.reducer;