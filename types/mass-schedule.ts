export interface MassTimeSlot {
    days: string;
    times: string[];
    note?: string;
  }
  
  export interface MassSchedule {
    id: string;
    churchName: string;
    slots: MassTimeSlot[];
  }