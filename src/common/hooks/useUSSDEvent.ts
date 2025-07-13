import { useCallback, useEffect, useRef, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import {
  extractMomoUSSDData,
  MOMO_USSD_CODES,
} from '../helpers/ussd.momo.helper';
import { useDispatch } from 'react-redux';
import { setMoMoBalance } from '../../store/features/momo/momo.slice';
import { addHistoryEntry } from '../../store/features/history/history.slice';

// Access the native USSD module and create an event emitter
const { UssdModule } = NativeModules;
const emitter = new NativeEventEmitter(UssdModule);

export const useUSSDEvent = () => {
  const dispatch = useDispatch();

  // State for current USSD message and loading/error flags
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  // State for tracking the current action name (e.g., 'SEND_MONEY', 'CHECK_BALANCE')
  const [currentActionName, setCurrentActionName] = useState<
    keyof typeof MOMO_USSD_CODES | null
  >(null);

  // Ref to store the previous message without triggering re-renders
  const prevMessageRef = useRef<string | null>(null);

  // Helper: Reset state and mark error if needed
  const resetEventState = (isError: boolean) => {
    setIsLoading(true);
    setFailed(isError);
    setCurrentMessage(null);
  };

  // Helper: Dispatch parsed USSD data into Redux store
  const handlePersistEventData = (
    data: IMomoExtractedData,
    eventName: keyof typeof MOMO_USSD_CODES,
  ) => {
    switch (eventName) {
      case 'CHECK_BALANCE':
        if (data.balance) {
          dispatch(setMoMoBalance(data.balance));
        }
        break;

      case 'SEND_MONEY':
        if (data.send) {
          dispatch(addHistoryEntry(data.send));
        }
        if (data.balance) {
          dispatch(setMoMoBalance(data.balance));
        }
        break;

      default:
        break;
    }
  };

  // Handle incoming USSD responses
  const handleUSSDResponse = useCallback(
    (event: { message: string }) => {
      const message = event.message;

      const isError =
        message?.includes('invalid MMI code') || message?.includes('error');

      if (message?.includes('running…') || isError) {
        resetEventState(isError);
        return;
      }

      // Save current message before updating
      prevMessageRef.current = currentMessage;
      setCurrentMessage(message);
      setIsLoading(false);
      setFailed(false);
    },
    [currentMessage],
  );

  // Listen for USSD responses from the native module
  useEffect(() => {
    const ussdEventListener = emitter.addListener(
      'onUSSDResponse',
      handleUSSDResponse,
    );

    return () => {
      ussdEventListener.remove(); // Cleanup listener on unmount
    };
  }, [handleUSSDResponse]);

  // When current message changes, extract and persist USSD data
  useEffect(() => {
    if (currentActionName && currentMessage) {
      const extractedData = extractMomoUSSDData(
        currentMessage,
        prevMessageRef.current,
        currentActionName,
      );
      handlePersistEventData(extractedData, currentActionName);
    }
  }, [currentMessage, currentActionName]);

  return {
    currentMessage,
    loading: isLoading,
    failed,
    action: currentActionName,
    setAction: setCurrentActionName,
  };
};
