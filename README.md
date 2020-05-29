# Owlet Client

Unofficial package for interacting with owlet's smart sock api. Note that this
only works in the US. If you want to use this and are in a different country,
create an issue and I will implement support for other regions.

## Installation

`yarn add owlet-api`

## Example Usage

In order for the authentication to work, the package expects two environment
variables to be present: `OWLET_EMAIL` and `OWLET_PASSWORD`. The token returned
from the authentication calls is valid for 24 hours.

```
  const token = await login();
  const devices = await getDevices(token);
  const sock = await getDeviceAsSmartSock(devices[0].device.dsn, token);
  console.log(sock);
  /* Prints:
    {
      baseStationOn: 0,
      batteryLevel: 94,
      chargeStatus: 0, // Is 1 if fully charged, 2 if charging
      heartRate: 124,
      movement: 0,
      oxygenLevel: 98
    }
  */
  await setBaseStationOn(true, sock, token);
```
