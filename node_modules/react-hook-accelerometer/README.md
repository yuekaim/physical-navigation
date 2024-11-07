## Installation

Using `npm`:

```sh
npm install --save react-hook-accelerometer
```

Using `yarn`:

```sh
yarn add react-hook-accelerometer
```

## Usage

```jsx
import React from "react";
import useAccelerometer from "react-hook-accelerometer";

const ComponentWithAccelerometer = () => {
  const sensor = useAccelerometer();

  return !sensor.error ? (
    <ul>
      <li>X: {sensor.x}</li>
      <li>Y: {sensor.y}</li>
      <li>Z: {sensor.z}</li>
    </ul>
  ) : (
    <p>No Accelerometer, sorry.</p>
  );
};
```

### Using `SensorOptions`

If you want to use this feature, simply provide `useAccelerometer` with a `SensorOptions` object:

```jsx
const sensor = useAccelerometer({
  frequency: 60, // cycles per second
});
```

## Notes

Access to data from the Accelerometer API needs user permission.

## Caveats

Accelerometer API is available only in secure contexts (only using HTTPS).

## Credits

Credit to [Bence A. Tóth](https://github.com/bence-toth) for his original hook code for [Geolocation](https://www.npmjs.com/package/react-hook-geolocation).

## License

LGPL-3.0
