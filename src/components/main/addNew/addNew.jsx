import { useState } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { PageTitle } from './addNew.styled';
import HorizontalStepper from './stepper/stepper';
import AddDetails from './addDetails/addDetails';
import AddPhoto from './addPhoto/addPhoto';
import AlertNotify from '../../onError/alert';
import Result from './result/result';

export default function AddNew() {
  const [activeStep, setActiveStep] = useState(0);
  const { error, isLoading, response } = useProducts();

  const handleStep = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <PageTitle>Add new product</PageTitle>
      <HorizontalStepper activeStep={activeStep} />
      {error && <AlertNotify error={error} />}
      {activeStep === 0 && <AddDetails onSuccess={handleStep} />}
      {activeStep === 1 && !isLoading && (
        <AddPhoto onSuccess={handleStep} id={response.id} />
      )}
      {activeStep === 2 && !isLoading && (
        <Result onSuccess={() => setActiveStep(0)} product={response} />
      )}
    </>
  );
}
