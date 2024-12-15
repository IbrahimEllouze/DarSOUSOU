export interface Home {
    id: number;
    name: string;
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
    id: number;
    name: string;
    energyRate: number;
    turnedOnAt: string;
    active: boolean;
    connected: boolean;
  }
  