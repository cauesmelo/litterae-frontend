import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';

interface DaysPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const DaysPicker: React.FC<DaysPickerProps> = ({ name, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  const options: CheckboxOption[] = [
    { id: 'monday', value: 'monday', label: 'SEG' },
    { id: 'tuesday', value: 'tuesday', label: 'TER' },
    { id: 'wednesday', value: 'wednesday', label: 'QUA' },
    { id: 'thursday', value: 'thursday', label: 'QUI' },
    { id: 'friday', value: 'friday', label: 'SEX' },
    { id: 'saturday', value: 'saturday', label: 'SAB' },
    { id: 'sunday', value: 'sunday', label: 'DOM' },
  ];

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);
  return (
    <Container>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            defaultChecked={defaultValue.find((dv: string) => dv === option.id)}
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </Container>
  );
};

export default DaysPicker;
