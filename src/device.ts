import axios from 'axios';
import { Device, DeviceProperty } from './types';

const baseUrl = 'https://ads-field-1a2039d9.aylanetworks.com/apiv1';
const deviceUrl = `${baseUrl}/devices`;

const getPropertiesUrl = (propertyKey: number) =>
  `${baseUrl}/properties/${propertyKey}/datapoints.json`;

const getHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
});

export const getDevices = async (token: string): Promise<Device[]> => {
  const result = await axios.get<Device[]>(deviceUrl, getHeaders(token));
  return result.data;
};

export const getDeviceProperties = async (
  dsn: string,
  token: string
): Promise<DeviceProperty[]> => {
  const result = await axios.get<DeviceProperty[]>(
    `${baseUrl}/dsns/${dsn}/properties.json`,
    getHeaders(token)
  );

  return result.data;
};

export const updateDeviceProperty = async (
  key: number,
  value: any,
  token: string
) => {
  await axios.post(
    getPropertiesUrl(key),
    { datapoint: { value } },
    getHeaders(token)
  );
};
