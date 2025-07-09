import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { UssdModule } = NativeModules;
const emitter = new NativeEventEmitter(UssdModule);

export const useUSSDEvent = () => {
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
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

  return { message, loading: isLoading, failed };
};
