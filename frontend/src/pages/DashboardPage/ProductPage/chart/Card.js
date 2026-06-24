import { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CardData({ cardData }) {
  const processData = (data) => {

    let uph = data.map((item) => item.UPH);
    const highest = Math.max(...uph);
    const lowest = Math.min(...uph);

    const sum = uph.reduce((acc, value) => acc + value, 0);
    const mean = sum / uph.length;

    return {
      highest,
      lowest,
      mean,
    };
  };

  const result = processData(cardData);

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
              Highest UPH
            </Typography>
            <Typography variant="h3" color="#5395a0">
              {result.highest}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 250 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#287b88" gutterBottom>
              Mean of UPH
            </Typography>
            <Typography variant="h3" color="#5395a0">
              {result.mean.toFixed(3)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 250 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#287b88" gutterBottom>
              Lowest UPH
            </Typography>
            <Typography variant="h3" color="#5395a0">
              {result.lowest}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CardData;
