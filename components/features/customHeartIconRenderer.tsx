import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import styles from '../../pages/styles/public-lead-form.module.css';

interface CustomHeartIconRendererProps {
  uischema: any;
}

const CustomHeartIconRenderer: React.FC<CustomHeartIconRendererProps> = () => {
    return (
      <div className={styles['icon-wrapper']}>
        <div className={styles['heart-icon']} />
      </div>
    );
  };
  
  export const customHeartIconRenderer: JsonFormsRendererRegistryEntry = {
    tester: (uischema) => (uischema.type === 'CustomHeartIcon' ? 1 : -1),
    renderer: withJsonFormsControlProps(CustomHeartIconRenderer),
  };