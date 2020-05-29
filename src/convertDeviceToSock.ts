import {
  DeviceProperty,
  OwletSmartSockDevice,
  ConvertSockResult,
} from './types';

const attributeMap: { [key in keyof OwletSmartSockDevice]: string } = {
  baseStationOn: 'BASE_STATION_ON',
  batteryLevel: 'BATT_LEVEL',
  chargeStatus: 'CHARGE_STATUS',
  heartRate: 'HEART_RATE',
  movement: 'MOVEMENT',
  oxygenLevel: 'OXYGEN_LEVEL',
};

const getPropertyKeyAndValue = (
  name: string,
  properties: DeviceProperty[]
): { value: unknown; key: number } => {
  const { property } = properties.find(({ property: p }) => p.name === name);
  if (!property) {
    return { value: '', key: -1 };
  } else {
    return { value: property.value, key: property.key };
  }
};

const convertDeviceToSock = (
  properties: DeviceProperty[]
): ConvertSockResult => {
  const sock = Object.keys(attributeMap).reduce(
    (acc, key: keyof typeof attributeMap) => {
      const { key: propertyKey, value } = getPropertyKeyAndValue(
        attributeMap[key],
        properties
      );
      return {
        ...acc,
        [key]: value,
        propertyKeyMap: { ...acc.propertyKeyMap, [key]: propertyKey },
      };
    },
    { propertyKeyMap: {} }
  ) as ConvertSockResult;
  return sock;
};
export default convertDeviceToSock;
