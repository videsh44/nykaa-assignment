import React, { useState, useEffect } from "react";
import { BackTop, Card, Divider, Empty, Input, Spin } from "antd";
import { productData } from "./products";
import { ArrowUpOutlined, SearchOutlined } from "@ant-design/icons";
import "./home.css";

//const { Search } = Input;
const { Meta } = Card;

const Home = () => {
  //console.log(productData);

  const [data, setData] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchfilterString, setSearchfilterString] = useState("");

  useEffect(() => {
    setLoading(true);
    setData(productData);
    setGlobalData(productData);
    setLoading(false);
    return () => {};
  }, []);

  const SearchValFromTable = (filterString) => {
    setSearchfilterString(filterString);
    if (filterString) {
      const list = globalData.filter((item) =>
        item.title.toLowerCase().includes(filterString.toLowerCase())
      );
      setData(list);
    } else {
      setData(globalData);
    }
  };

  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <Spin spinning={loading} size="large">
          <div style={{ textAlign: "center" }}>
            <Input
              placeholder="Input Search Text"
              prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              value={searchfilterString}
              allowClear
              onChange={(e) =>
                SearchValFromTable(e.target.value ? e.target.value : null)
              }
              style={{ width: "70%" }}
            />
          </div>
          <div className="products__container" style={{ marginTop: "50px" }}>
            {data.length > 0 ? (
              data.map((item, i) => (
                <div key={i} className="card__box">
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={item.imageUrl} />}
                  >
                    <Meta
                      title={item.title}
                      description={
                        <div>
                          <div>{item.subTitle}</div>
                          <div>
                            {item.sizeVariation.length > 0
                              ? item.sizeVariation.map((size) => (
                                  <span key={size.id}>
                                    <span>
                                      {size.title} <Divider type="vertical" />
                                    </span>
                                  </span>
                                ))
                              : null}
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </div>
              ))
            ) : (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={<span>No Products</span>}
              ></Empty>
            )}
          </div>
          <BackTop>
            <div
              style={{
                height: 40,
                width: 40,
                lineHeight: "40px",
                borderRadius: 4,
                backgroundColor: "#1088e9",
                color: "#fff",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <ArrowUpOutlined style={{ fontSize: "30px" }} />
            </div>
          </BackTop>
        </Spin>
      </div>
    </>
  );
};

export default Home;
