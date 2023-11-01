import { useState, useCallback } from 'react';

export default function useValidationForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChangeForm = (evt) => {
    const input = evt.target;
    const { value, name } = input;

    setValues({ ...values, [name]: value }); 
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity()); 
  };

  const resetFormInputs = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChangeForm, resetFormInputs, setIsValid, errors, isValid };
}