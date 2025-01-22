import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import styles from '../../pages/styles/public-lead-form.module.css';

interface CustomCubeIconRendererProps {
  uischema: any;
}

const CustomCubeIconRenderer: React.FC<CustomCubeIconRendererProps> = () => {
  return (
    <div className={styles['icon-wrapper']}>
      <div className={styles['cube-icon']} />
    </div>
  );
};

export const customCubeIconRenderer: JsonFormsRendererRegistryEntry = {
  tester: (uischema) => (uischema.type === 'CustomCubeIcon' ? 1 : -1),
  renderer: withJsonFormsControlProps(CustomCubeIconRenderer),
};
