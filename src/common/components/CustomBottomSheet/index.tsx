import React, {
  useCallback,
  useRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from 'react-native-paper';
import { Keyboard, StyleSheet } from 'react-native';
import { ThemeSpacings } from '../../../config/theme';

export interface CustomBottomSheetHandles {
  present: () => void;
  dismiss: () => void;
}

interface CustomBottomSheetProps {
  initialIndex?: number;
  children: React.ReactNode;
}

export const CustomBottomSheet = React.forwardRef<
  CustomBottomSheetHandles,
  CustomBottomSheetProps
>((props, ref) => {
  const { initialIndex = 0, children } = props;
  const [previousIndex, setPreviousIndex] = React.useState(initialIndex);
  const [index, setIndex] = React.useState(initialIndex);
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => {
      bottomSheetRef.current?.present();
      setIndex(0);
      setPreviousIndex(0);
    },
    dismiss: () => {
      bottomSheetRef.current?.dismiss();
      // Reinitialize the sheet so that it can be presented again
      setIndex(-1);
    },
  }));

  const handleSheetChanges = useCallback((index: number) => {
    setIndex(index);
  }, []);

  const handleKeyboardDidShow = useCallback(() => {
    setPreviousIndex(index);
    setIndex(2);
  }, [index]);

  const handleKeyboardDidHide = useCallback(() => {
    setIndex(previousIndex || 0);
  }, [previousIndex]);

  useEffect(() => {
    const keyboardSubscription = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    const keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );
    return () => {
      keyboardSubscription.remove();
      keyboardDidHideSubscription.remove();
    };
  }, [index]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={index}
      snapPoints={['50%', '85%', '100%']}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: theme.colors.onSurface }}
      backgroundStyle={{ backgroundColor: theme.colors.surface }}
      keyboardBehavior="interactive"
    >
      <BottomSheetView style={styles.container}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ThemeSpacings.md,
    flex: 1,
  },
});
