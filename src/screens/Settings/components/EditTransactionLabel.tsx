import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Text, TextInput } from 'react-native-paper';
import { Icon } from '../../../common/components';
import globalStyles from '../../../common/styles/global.styles';
import { ThemeSpacings } from '../../../config/theme';
import {
  addTransactionLabel,
  removeTransactionLabel,
  selectTransactionLabels,
} from '../../../store/features/settings/settings.slice';

export const EditTransactionLabel = () => {
  const transactionLabels = useSelector(selectTransactionLabels);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = () => {
    dispatch(addTransactionLabel({ name: text }));
    setText('');
  };

  const handleChipClose = (text: string) => {
    dispatch(removeTransactionLabel({ name: text }));
  };
  return (
    <View
      style={[
        globalStyles.flex,
        globalStyles.column,
        globalStyles.fullWidth,
        { gap: ThemeSpacings.md },
      ]}
    >
      <Text variant="titleMedium">Customize Transaction Labels</Text>
      <TextInput
        mode="outlined"
        left={
          <TextInput.Icon icon={props => <Icon name="Styles" {...props} />} />
        }
        right={
          text?.trim() && (
            <TextInput.Icon
              icon={props => <Icon name="Check" {...props} />}
              onPress={handleSubmit}
            />
          )
        }
        value={text}
        onChangeText={setText}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        style={globalStyles.fullWidth}
      />
      <View style={[globalStyles.row, { gap: 16, flexWrap: 'wrap' }]}>
        {Object.values(transactionLabels).map(label => {
          return (
            <Chip
              closeIcon={() => (
                <View style={{ position: 'absolute', right: -2, top: 4 }}>
                  <Icon name="Close" color="#fff" />
                </View>
              )}
              onLongPress={() => console.log('Pressed')}
              key={label.name}
              style={{ position: 'relative' }}
              onClose={() => handleChipClose(label.name)}
              mode="outlined"
            >
              {label.name}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};
