import React, { FC, useState, useEffect } from "react";
import { Card, Spin, Button, Input, Row, Col, Table, message } from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReq } from "../../util/API";

const Detail: FC = () => {
  const dispatch = useDispatch();
  const favoriteList = useSelector((state: any) => state.favorite.favoriteList);
  const { id } = useParams();
  const [roadWorks, setRoadWorks] = useState<any>([]);
  const [isFavorite, setIsFavorite] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
      key: "subtitle",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  useEffect(() => {
    (async () => {
      if (favoriteList.length > 0) {
        for (let index = 0; index < favoriteList.length; index++) {
          if (favoriteList[index].name === id) {
            setIsFavorite(true);
            setComment(favoriteList[index].comment);
            setColor(favoriteList[index].color);
          }
        }
      }

      try {
        let response = await getReq(`/${id}/services/roadworks`);
        if (response.status === 200) {
          setRoadWorks(response.data.roadworks);
        }
        setIsLoading(false);
        console.log("response", response);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    })();
  }, []);

  const toggleFavorite = () => {
    const compiled = favoriteList;
    if (isFavorite) {
      for (let index = 0; index < favoriteList.length; index++) {
        if (favoriteList[index].name === id) {
          compiled.splice(index, 1);
          break;
        }
      }
    } else {
      compiled.push({
        name: id,
      });
    }

    dispatch({
      type: "FAVORITE_LIST",
      payload: compiled,
    });
    setIsFavorite(!isFavorite);
  };

  const addComment = () => {
    if (!comment) {
      message.error("Comment field is required.");
      return false;
    }
    if (isFavorite) {
      let compiled = favoriteList;
      for (let index = 0; index < favoriteList.length; index++) {
        if (favoriteList[index].name === id) {
          compiled[index].comment = comment;
        }
      }

      dispatch({
        type: "FAVORITE_LIST",
        payload: compiled,
      });
      message.success("Comment successfully saved.");
    } else {
      message.error("Please mark it as favorite.");
    }
  };

  const addColor = () => {
    if (!color) {
      message.error("Color field is required.");
      return false;
    }
    if (isFavorite) {
      let compiled = favoriteList;
      for (let index = 0; index < favoriteList.length; index++) {
        if (favoriteList[index].name === id) {
          compiled[index].color = color;
        }
      }

      dispatch({
        type: "FAVORITE_LIST",
        payload: compiled,
      });
      message.success("Color successfully saved.");
    } else {
      message.error("Please mark it as favorite.");
    }
  };

  return (
    <>
      <Card
        title="Detail"
        bordered={false}
        style={{ width: "100%" }}
        extra={
          <>
            {isFavorite ? (
              <Button type="primary" danger onClick={toggleFavorite}>
                Remove Favorite
              </Button>
            ) : (
              <Button type="primary" onClick={toggleFavorite}>
                Add to Favorite
              </Button>
            )}
          </>
        }
      >
        {isLoading ? (
          <div className="spinner-center">
            <Spin />
          </div>
        ) : (
          <>
            <Row gutter={8} style={{ marginBottom: 10 }}>
              <Col xs={6}>
                <strong>Highway Name: </strong>
              </Col>
              <Col>{id}</Col>
            </Row>
            <Row gutter={8} style={{ marginBottom: 10 }}>
              <Col xs={6}>
                <strong>Comment: </strong>
              </Col>
              <Col xs={6}>
                <Input
                  defaultValue={comment}
                  placeholder="Comment"
                  width={200}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Col>
              <Col xs={6}>
                <Button onClick={addComment} type="primary">
                  Add
                </Button>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col xs={6}>
                <strong>Color: </strong>
              </Col>
              <Col xs={6}>
                <Input
                  defaultValue={color}
                  placeholder="Color"
                  width={200}
                  onChange={(e) => setColor(e.target.value)}
                />
              </Col>
              <Col xs={6}>
                <Button type="primary" onClick={addColor}>
                  Add
                </Button>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col xs={24}>
                {roadWorks.length > 0 ? (
                  <>
                    <Table
                      columns={columns}
                      dataSource={roadWorks}
                      loading={isLoading}
                    />
                  </>
                ) : (
                  <h4>No Road work data found.</h4>
                )}
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
};

export default Detail;
