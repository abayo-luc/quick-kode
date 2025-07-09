import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import {
  extractMomoUSSDData,
  MOMO_USSD_CODES,
} from '../helpers/ussd.momo.helper';

const { UssdModule } = NativeModules;
const emitter = new NativeEventEmitter(UssdModule);

export const useUSSDEvent = () => {
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [currentActionName, setCurrentActionName] = useState<
    keyof typeof MOMO_USSD_CODES | null
  >(null);
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
  }, []);

  return {
    message,
    loading: isLoading,
    failed,
    action: currentActionName,
    setAction: setCurrentActionName,
  };
};

export const useExtractUSSDData = () => {
  const [data, setData] = useState<IMomoExtractedData>({
    balance: null,
    send: null,
    fees: null,
  });
  const { message, action, ...restOfUSSDEvent } = useUSSDEvent();

  useEffect(() => {
    if (message) {
      const extractedData = extractMomoUSSDData(message, action);
      setData(state => ({ ...state, ...extractedData }));
    }
  }, [message]);

  return {
    ...restOfUSSDEvent,
    action,
    data,
  };
};
