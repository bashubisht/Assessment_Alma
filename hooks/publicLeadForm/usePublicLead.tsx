import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  AppDispatch,
} from '../.././src/store/store';
import {
  setFormData,
  setFormSubmitted,
  setIsSubmitTriggered,
  setResume,
  setUrlError,
  submitLeadForm,
  FormData,
} from '../.././src/store/publicLeadFormSlice';

interface UsePublicLeadFormResult {
  formSubmitted: boolean;
  isSubmitTriggered: boolean;
  formData: FormData;
  resume: File | null;
  urlError: string;
  setFormData: (data: Partial<FormData>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFormSubmitted: (value: boolean) => void;
  setResume: (file: File | null) => void;
  setIsSubmitTriggered: (value: boolean) => void;
}

const usePublicLeadForm = (): UsePublicLeadFormResult => {
  const dispatch = useDispatch<AppDispatch>();

  // Accessing the Redux state
  const formSubmitted = useSelector(
    (state: RootState) => state.publicLeadForm.formSubmitted
  );
  const formData = useSelector(
    (state: RootState) => state.publicLeadForm.formData
  );
  const isSubmitTriggered = useSelector(
    (state: RootState) => state.publicLeadForm.isSubmitTriggered
  );
  const resume = useSelector(
    (state: RootState) => state.publicLeadForm.resume
  );
  const urlError = useSelector(
    (state: RootState) => state.publicLeadForm.urlError
  );

  // Action dispatchers
  const dispatchSetFormData = (data: FormData) => {
    dispatch(setFormData(data));
  };

  const dispatchSetFormSubmitted = (value: boolean) => {
    dispatch(setFormSubmitted(value));
  };

  const dispatchSetIsSubmitTriggered = (value: boolean) => {
    dispatch(setIsSubmitTriggered(value));
  };

  const dispatchSetResume = (file: File | null) => {
    dispatch(setResume(file));
  };

  // Handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      dispatchSetResume(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setIsSubmitTriggered(true));
    dispatch(setUrlError(''));

    // Validate required fields
    const fieldLabelMap: Record<string, string> = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      linkedinUrl: 'LinkedIn / Personal Website URL',
      countryOfCitizenship: 'Country of Citizenship',
      visaCategories: 'Visa Categories',
      helpMessage: 'How can we help you?',
    };
    const requiredFields = Object.keys(fieldLabelMap);
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      const missingLabels = missingFields.map((field) => fieldLabelMap[field]);
      alert(`Missing required fields: ${missingLabels.join(', ')}`);
      return;
    }

    // Validate URL
    try {
      new URL(formData.linkedinUrl as string);
    } catch {
      dispatch(setUrlError('Please enter a valid URL.'));
      return;
    }

    // Prepare data for submission
    const leadData = {
      ...formData,
      submittedAt: new Date().toLocaleString(),
    };

    // Submit via thunk
    try {
      await dispatch(submitLeadForm(leadData)).unwrap();
      dispatchSetFormSubmitted(true);
  
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return {
    formSubmitted,
    isSubmitTriggered,
    formData,
    resume,
    urlError,
    setFormData: dispatchSetFormData,
    handleSubmit,
    handleFileChange,
    setFormSubmitted: dispatchSetFormSubmitted,
    setResume: dispatchSetResume,
    setIsSubmitTriggered: dispatchSetIsSubmitTriggered
  };
};

export default usePublicLeadForm;