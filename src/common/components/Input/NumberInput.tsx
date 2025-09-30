import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

interface NumberInputProps extends TextInputProps {}

export const NumberInput: React.FC<NumberInputProps> = props => {
  const [inputValue, setInputValue] = useState<string | undefined>();

  const formatNumberWithCommas = (text = '') => {
    const rawNumber = text.replace(/[^\d]/g, '');

    const number = parseInt(rawNumber, 10);

    if (isNaN(number)) {
      return '';
    }

    return number.toLocaleString('en-US'); // Use 'en-US' for comma as separator
  };

  const handleChangeText = (text: string) => {
    setInputValue(formatNumberWithCommas(text));
    props.onChangeText?.(text);
  };

  useEffect(() => {
    setInputValue(formatNumberWithCommas(props.value));
  }, [props.value]);

  return (
    <TextInput {...props} onChangeText={handleChangeText} value={inputValue} />
  );
};
