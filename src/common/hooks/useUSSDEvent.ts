import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import {
  extractMomoUSSDData,
  MOMO_USSD_CODES,
} from '../helpers/ussd.momo.helper';
import { useDispatch } from 'react-redux';
import { setMoMoBalance } from '../../store/features/momo/momo.slice';
import { addHistoryEntry } from '../../store/features/history/history.slice';

const { UssdModule } = NativeModules;
const emitter = new NativeEventEmitter(UssdModule);

export const useUSSDEvent = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [currentActionName, setCurrentActionName] = useState<
    keyof typeof MOMO_USSD_CODES | null
  >(null);

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
        console.log(data.send);
        if (data.send) {
          dispatch(addHistoryEntry(data.send));
        }
      default:
        break;
    }
  };

  const handleUSSDResponse = (event: { message: string }) => {
    if (event?.message?.includes('running…')) {
      setIsLoading(true);
      setMessage(undefined);
    } else if (event?.message?.includes('invalid MMI code')) {
      setIsLoading(false);
      setFailed(true);
    } else if (event?.message) {
      setIsLoading(false);
      setMessage(event.message);
      setFailed(false);
      const extractedData = extractMomoUSSDData(
        event.message,
        currentActionName,
      );
      if (currentActionName) {
        handlePersistEventData(extractedData, currentActionName);
      }
    }
  };

  useEffect(() => {
    const ussdEventListener = emitter.addListener(
      'onUSSDResponse',
      handleUSSDResponse,
    );

    return () => {
      ussdEventListener.remove();
    };
  }, [currentActionName]);

  return {
    message,
    loading: isLoading,
    failed,
    action: currentActionName,
    setAction: setCurrentActionName,
  };
};
