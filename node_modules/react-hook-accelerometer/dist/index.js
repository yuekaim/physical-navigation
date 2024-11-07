import { useEffect, useState } from 'react';

const useAccelerometer = ({
  frequency
} = {}, callback) => {
  const [illuminance, setIlluminance] = useState(null);
  useEffect(() => {
    let sensor = new window.Accelerometer({
      frequency
    });

    if (sensor) {
      sensor.start();

      sensor.onreading = () => {
        setIlluminance(sensor.illuminance);

        if (callback instanceof Function) {
          callback(sensor.illuminance);
        }
      };

      sensor.onerror = event => {
        console.log(event.error.name, event.error.message);
        setIlluminance(null);
      };
    }
  }, [frequency, callback]);
  return illuminance;
};

export default useAccelerometer;