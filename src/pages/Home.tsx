
import { Card } from "@/components/ui/card";

import StatisService from "@/service/statistic";
import { useEffect } from "react";

import { useStatisticState } from "@/stores/useStatisticStore";

function Home() {


  useEffect(() => {
    const getStatistic = async () => {
      try {
        const res = await StatisService.allStatistics();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    getStatistic();
  }, []);

  return (
    <section className="container max-w-6xl h-screen mx-auto mt-40 mb-10">
      <div>
        <h2 className="text-4xl font-semibold"> All statistics</h2>
        <div className="grid grid-cols-2 gap-4 my-8  max-w-5xl">
          <Card className="p-8 relative">
            <h3 className="font-bold">Doctors</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {/* {statistics.countDoctors} */}
              20
            </p>
          </Card>
          <Card className="p-8 relative">
            <h3 className="font-bold">Patients</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {/* {statistics.countPatients} */}
              10
            </p>
          </Card>
          <Card className="p-8 relative">
            <h3 className="font-bold">Rooms</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {/* {statistics.countRooms} */}
              40
            </p>
          </Card>
          <Card className="p-8 relative">
            <h3 className="font-bold">Total Sum</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {/* {statistics.summa} */}
              50
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4 my-8  max-w-5xl">
          
        </div>
      </div>
    </section>
  );
}

export default Home;
