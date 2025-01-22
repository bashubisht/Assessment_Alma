
import React from 'react';
import type { NextPage } from 'next';
import TextAreaControl, { textAreaControlTester } from '../components/features/customRender';
import usePublicLeadForm from '../hooks/publicLeadForm/usePublicLead';
import styles from '../pages/styles/public-lead-form.module.css';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { customCubeIconRenderer } from '../components/features/customCubeIconRenderer';
import { customHeartIconRenderer } from '../components/features/customHeartIconRenderer';

// Schemas
import { schema, uischema } from '../src/schemas/leadFormSchema';

const theme = createTheme({
  components: {
    MuiFormGroup: {
      styleOverrides: {
        root: {
          flexDirection: 'column',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '10px',
          marginTop: '10px',
        },
      },
    }
  },
});

const PublicLeadForm: NextPage = () => {
  const {
    formSubmitted,
    isSubmitTriggered,
    formData,
    resume,
    setFormData,
    handleSubmit,
    handleFileChange,
    setFormSubmitted,
    setResume,
    setIsSubmitTriggered
  } = usePublicLeadForm();

  const allRenderers = [
    ...materialRenderers,
    { tester: textAreaControlTester, renderer: TextAreaControl },
    customCubeIconRenderer,
    customHeartIconRenderer,
  ];

  if (formSubmitted) {
    return (
      <div className={styles['thank-you-container']}>
        <div className={styles['thank-you-icon']} />
        <h1 className={styles['thank-you-title']}>Thank You</h1>
        <p className={styles['thank-you-message']}>
          Your information was submitted to our team of immigration attorneys. Expect an email from{' '}
          <strong>hello@tryalma.ai</strong>.
        </p>
        <button
          className={styles['thank-you-button']}
          onClick={() => {
            setFormSubmitted(false);
            setFormData({});
            setResume(null);
            setIsSubmitTriggered(false);
          }}
        >
          Go Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className={styles['body-container']}>
      <div className={styles['header-container']}>
        <div className={styles.logo}>almǎ</div>
        <div>
          <header className={styles['form-header']}>
            <h1 className={styles['main-heading']}>
              Get An Assessment
              <br />
              Of Your Immigration Case
            </h1>
          </header>
        </div>
      </div>

      <div>
        <div className={styles['icon-container']}>
          <div className={styles['thank-you-icon-1']}></div>
        </div>

        <div className={styles['icon-thank-you-icon']}></div>
        <h2 className={styles['heading-2']}>Want to understand your visa options?</h2>
        <p className={styles['subheading']}>
          Submit the form below and our team of experienced attorneys will
          <br />
          review your information and send a preliminary assessment of your
          <br />
          case based on your goals.
        </p>
      </div>

      <div className={styles['form-container']}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <ThemeProvider theme={theme}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={formData}
              renderers={allRenderers}
              onChange={({ data }) => setFormData(data)}
              validationMode={isSubmitTriggered ? "ValidateAndShow" : "ValidateAndHide"}
            />
          </ThemeProvider>

          {/* Upload Resume Section */}
          <div className={styles.uploadSection}>
            <label className={styles.uploadLabel}>Upload Resume/CV</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="resume-upload"
            />
            <button
              type="button"
              className={styles.uploadButton}
              onClick={() => document.getElementById('resume-upload')?.click()}
            >
              {resume ? <span> Re-Upload File </span> : <span> Upload File </span>}
            </button>
            {resume && <p className={styles.fileName}>Uploaded: {resume.name}</p>}
          </div>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublicLeadForm;