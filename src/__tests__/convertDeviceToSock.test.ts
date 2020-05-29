import convertDeviceToSock from '../convertDeviceToSock';
import data from './deviceProperties.json';
import { ConvertSockResult } from '../types';

test('converts device properties into a smart sock object', () => {
  const result: ConvertSockResult = convertDeviceToSock(data as any[]);
  expect(result).toEqual({
    baseStationOn: 1,
    batteryLevel: 87,
    chargeStatus: 0,
    heartRate: 113,
    movement: 0,
    oxygenLevel: 97,
    propertyKeyMap: {
      baseStationOn: 148544404,
      batteryLevel: 148544373,
      chargeStatus: 148544376,
      heartRate: 148544381,
      movement: 148544371,
      oxygenLevel: 148544393,
    },
  });
});
