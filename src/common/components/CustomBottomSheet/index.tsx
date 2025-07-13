import React, {
  useCallback,
  useRef,
  useImperativeHandle,
  useEffect,
  useMemo,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme } from 'react-native-paper';
import { Keyboard, StyleSheet } from 'react-native';
import { ThemeSpacings } from '../../../config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
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

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.8}
      />
    ),
    [],
  );

  const insetProps = useMemo(
    () => ({
      bottomInset: index === 0 ? insets.bottom : undefined,
      topInset: index === 3 ? insets.top : undefined,
    }),
    [index, insets],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={index}
      snapPoints={['50%', '80%', '100%']}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: theme.colors.onSurface }}
      backgroundStyle={{ backgroundColor: theme.colors.surface }}
      keyboardBehavior="interactive"
      backdropComponent={renderBackdrop}
      {...insetProps}
    >
      <BottomSheetView style={styles.container}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: ThemeSpacings.md,
    flex: 1,
  },
});
