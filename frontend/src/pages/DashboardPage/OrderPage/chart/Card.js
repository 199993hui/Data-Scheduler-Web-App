import { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function CardData({ cardData }) {
  const maxTotalOrderQty = Math.max(
    ...cardData.map((item) => item["Total Order Quantity"])
  );

  const max_quantity = cardData.find(
    (item) => item["Total Order Quantity"] === maxTotalOrderQty
  );

  const max_TotalOrder = Math.max(
    ...cardData.map((item) => item["No. of Order"])
  );

  const max_order = cardData.find(
    (item) => item["No. of Order"] === max_TotalOrder
  );

  const QuantityArray = cardData.map((item) => item["No. of Order"]);
  const QuantitySum = QuantityArray.reduce((acc, val) => {acc += val; return acc;},0);
  const QuantityMean = (QuantitySum / QuantityArray.length);
  const QuantityMax = Math.max(...QuantityArray);
  const QuantityMin = Math.min(...QuantityArray);

  const orderQuantityArray = cardData.map((item) => item["Total Order Quantity"]);
  const orderQuantitySum = orderQuantityArray.reduce((acc, val) => {acc += val; return acc;},0);
  const orderQuantityMean = (orderQuantitySum / orderQuantityArray.length);
  const orderQuantityMax = Math.max(...orderQuantityArray);
  const orderQuantityMin = Math.min(...orderQuantityArray);

  return (
    <>
      <div
        style={{
          display: "flex",
          "justify-content": "space-around",
          marginTop: "12px",
        }}
      >
        <Card sx={{ minWidth: 250 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#287b88" gutterBottom>
              Highest Total Order Quantity
            </Typography>
            <Typography variant="h3" color="#5395a0">
              {max_quantity?.["Total Order Quantity"]}
            </Typography>
            <Typography variant="caption" sx={{ mb: 1.5 }} color="#94bdc4">
              {max_quantity?.name}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 250 }}>
          <CardContent>
            <Typography
              align="left"
              sx={{ fontSize: 14 }}
              variant="h3"
              color="#287b88"
              gutterBottom
            >
              Total Order Quantity
            </Typography>
            <Typography
              align="left"
              variant="h5"
              marginTop="15px"
              sx={{ fontSize: 16 }}
              color="#7ab2ab"
            >
              Min : {orderQuantityMin}
            </Typography>
            <Typography
              align="left"
              variant="h5"
              sx={{ fontSize: 16 }}
              color="#7ab2ab"
            >
              Mean : {orderQuantityMean.toFixed(3)}
            </Typography>
            <Typography
              align="left"
              variant="h5"
              sx={{ fontSize: 16 }}
              color="#7ab2ab"
            >
              Max : {orderQuantityMax}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 250 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#287b88" gutterBottom>
              Highest No. of Order
            </Typography>
            <Typography variant="h3" color="#5395a0">
              {max_order?.["No. of Order"]}
            </Typography>
            <Typography variant="caption" sx={{ mb: 1.5 }} color="#94bdc4">
              {max_order?.name}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 250 }}>
          <CardContent>
            <Typography
              align="left"
              sx={{ fontSize: 14 }}
              variant="h3"
              color="#287b88"
              gutterBottom
            >
              No. of Order
            </Typography>
            <Typography
              align="left"
              variant="h5"
              marginTop="15px"
              sx={{ fontSize: 16 }}
              color="#7ab2ab"
            >
              Min : {QuantityMin}
            </Typography>
            <Typography
              align="left"
              variant="h5"
              sx={{ fontSize: 16 }}
              color="#7ab2ab"
            >
              Mean : {QuantityMean.toFixed(3)}
            </Typography>
            <Typography
              align="left"
              variant="h5"
              sx={{ fontSize: 16 }}
              color="#7ab2ab"
            >
              Max : {QuantityMax}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CardData;
