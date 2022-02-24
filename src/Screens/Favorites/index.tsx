import React, { FC, useEffect, useState } from "react";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CommonTable from "../../Components/CommonTable";

const Favorites: FC = () => {
  const favoriteList = useSelector((state: any) => state.favorite.favoriteList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  console.log("favoriteList", favoriteList);

  return (
    <>
      <Card title="Favorites" bordered={false} style={{ width: "100%" }}>
        <CommonTable isLoading={isLoading} data={favoriteList} />
      </Card>
    </>
  );
};

export default Favorites;
