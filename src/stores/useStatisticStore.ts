import { create } from "zustand";

interface HospitalData {
  countDoctors: number;
  countPatients: number;
  countRooms: number;
  summa: number;
  patients: any[];
  doctors: any[];
  setStatis: (state: HospitalData) => void;
}

interface ISatisStateStore {
  statisState: HospitalData | null;
}

export const useStatisticState = create<ISatisStateStore>((set) => ({
  statisState: null,
  setStatis: (state: HospitalData) => set({ statisState: state }),
}));
