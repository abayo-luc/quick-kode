import React, {useCallback, useRef, useImperativeHandle} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {ThemeSpacings} from '../../../config/theme';

export interface CustomBottomSheetHandles {
  open: (index?: number) => void;
  close: () => void;
}

interface CustomBottomSheetProps {
  initialIndex?: number;
  children: React.ReactNode;
}

export const CustomBottomSheet = React.forwardRef<
  CustomBottomSheetHandles,
  CustomBottomSheetProps
>((props, ref) => {
  const {initialIndex = -1, children} = props;
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    open: (index = 0) => bottomSheetRef.current?.snapToIndex(index),
    close: () => bottomSheetRef.current?.close(),
  }));

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={initialIndex}
      snapPoints={['25%', '50%', '100%']}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      handleIndicatorStyle={{backgroundColor: theme.colors.onSurface}}
      backgroundStyle={{backgroundColor: theme.colors.surface}}>
      <BottomSheetView style={styles.container}>{children}</BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ThemeSpacings.md,
    flex: 1,
  },
});
