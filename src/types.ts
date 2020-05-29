export interface Device {
  device: {
    product_name: string;
    model: string;
    dsn: string;
    oem_model: string;
    sw_version: string;
    template_id: string;
    mac: string;
    hwsig: string;
    lan_ip: string;
    connected_at: string;
    key: number;
    lan_enabled: boolean;
    has_properties: boolean;
    connection_status: string;
    lat: string;
    lng: string;
    locality: string;
    device_type: string;
  };
}

export interface DeviceProperty {
  property: {
    name: string;
    base_type: 'integer' | 'boolean' | 'string';
    read_only: boolean;
    direction: 'input' | 'output';
    data_updated_at: 'null' | string;
    key: number;
    device_key: number;
    product_name: string;
    track_only_changes: boolean;
    display_name: string;
    host_sw_version: boolean;
    time_series: boolean;
    derived: boolean;
    value: unknown;
    retention_days: number;
  };
}

export interface OwletSmartSockDevice {
  baseStationOn: boolean;
  batteryLevel: number;
  chargeStatus: 0 | 1 | 2;
  heartRate: number;
  movement: boolean;
  oxygenLevel: number;
}
export type OwletSmartSockDeviceKeyMap = {
  [key in keyof OwletSmartSockDevice]: number;
};

export interface ConvertSockResult extends OwletSmartSockDevice {
  propertyKeyMap: OwletSmartSockDeviceKeyMap;
}
