export interface Home {
  id: number;
  name: string;
  userId: number; // Add this if it's missing
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
    isEditingName?: boolean; 
    roomId: number | null;// Optional property
  }