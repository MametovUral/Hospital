import api from "./api";

// interface HospitalData {
//   countDoctors: number;
//   countPatients: number;
//   countRooms: number;
//   summa: number;
//   patients: any[];
//   doctors: any[];
// }

interface StatisticService {
  allStatistics(): Promise<any>;
  TreatmentStatistics(): Promise<any>;
}

const StatisService: StatisticService = {
  async allStatistics() {
    const data = await api.get("/statistic/");
    console.log(data);

    return data;
  },

  async TreatmentStatistics() {
    const data = await api.get("/statistic/treatment");
    return data;
  },
};

export default StatisService;
