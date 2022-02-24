import React, { FC, useEffect, useState } from "react";
import { Card } from "antd";
import CommonTable from "../../Components/CommonTable";
import { getReq } from "../../util/API";

const Overview: FC = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        let response = await getReq("/");
        if (response.status === 200) {
          const responseData = response.data.roads;
          const roads = [];

          for (let index = 0; index < responseData.length; index++) {
            roads.push({
              name: responseData[index],
            });
          }

          setData(roads);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Card title="Overview" bordered={false} style={{ width: "100%" }}>
        <CommonTable isLoading={isLoading} data={data} />
      </Card>
    </>
  );
};

export default Overview;
