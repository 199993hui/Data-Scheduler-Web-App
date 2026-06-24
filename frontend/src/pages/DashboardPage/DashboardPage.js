import React, { useState, useEffect } from "react";
import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import OrderPage from "./OrderPage/OrderPage";
import ProductPage from "./ProductPage/ProductPage";
import SchedulePage from "./SchedulePage/SchedulePage";
function DashboardPage() {
  const [iconsActive, setIconsActive] = useState(
    localStorage.getItem("activeTab") || "pill1"
  );

  const [activeTabColor, setActiveTabColor] = useState("#3e8894");
  const [date, setDate] = useState([])
  
  const getDate = async () => {
    try {
      await fetch("http://127.0.0.1:5000/dashboard_date", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setDate(data);
          localStorage.setItem("date", JSON.stringify(data));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("activeTab", iconsActive);
  }, [iconsActive]);

  useEffect(() => {
    const localDate = localStorage.getItem("date");
    if (!localDate) {
      getDate();
    }
  }, [date]);

  const handleIconsClick = (value) => {
    if (value === iconsActive) {
      return;
    }

    setIconsActive(value);
  };

  return (
    <>
    
      <MDBTabs pills className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleIconsClick("pill1")}
            active={iconsActive === "pill1"}
            style={{
              backgroundColor: iconsActive === "pill1" ? activeTabColor : "",
            }}
          >
            <MDBIcon fas icon="chart-pie" className="me-2" /> Order
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleIconsClick("pill2")}
            active={iconsActive === "pill2"}
            style={{
              backgroundColor: iconsActive === "pill2" ? activeTabColor : "",
            }}
          >
            <MDBIcon fas icon="chart-line" className="me-2" /> Product
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleIconsClick("pill3")}
            active={iconsActive === "pill3"}
            style={{
              backgroundColor: iconsActive === "pill3" ? activeTabColor : "",
            }}
          >
            <MDBIcon fas icon="cogs" className="me-2" /> Plan
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={iconsActive === "pill1"}>
          <OrderPage />
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === "pill2"}>
          <ProductPage />
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === "pill3"}>
          <SchedulePage />{" "}
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

export default DashboardPage;
