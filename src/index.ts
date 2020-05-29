import * as client from './device';
import { ConvertSockResult } from './types';
import convertDeviceToSock from './convertDeviceToSock';
export { default as login } from './auth';

export const getDevices = client.getDevices;

export const getDeviceAsSmartSock = async (
  dsn: string,
  token: string
): Promise<ConvertSockResult> => {
  const properties = await client.getDeviceProperties(dsn, token);
  return convertDeviceToSock(properties);
};

export const setBaseStationOn = async (
  on: boolean,
  smartSock: ConvertSockResult,
  token: string
) => {
  await client.updateDeviceProperty(
    smartSock.propertyKeyMap.baseStationOn,
    on ? 1 : 0,
    token
  );
};
