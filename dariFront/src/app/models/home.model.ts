export interface Home {
  id: number;
  name: string;
  userId: number;
  rooms: Room[];
}

export interface Room {
  id: number;
  name: string;
  devices: Device[];
  isEditingName?: boolean;   
  newRoomName?: string;  
}

export interface Device {
room: any;
  id: number;
  name: string;
  energyRate: number;
  turnedOnAt: string;
  active: boolean;
  connected: boolean;
  isEditingName?: boolean;
  newDeviceName?: string; 
  roomId: number | null;
  roomName?: string;
  randomConsumption?: number;
}
