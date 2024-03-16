import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function LandingPage() {
  return (
    <div>
      <div className="dashChart">
        <div className="flexBox">
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={12}>
                <div className="chartBox">
                  <div className="chartTitle">
                    <h2>Historic Data</h2>
                  </div>
                  <iframe
                    src="http://192.168.30.65:3000/d-solo/eeb85d37-1b25-4db6-8e7e-072810ea0196/sunrise?orgId=1&from=1672509600000&to=1706637599000&panelId=2"
                    width="100%"
                    height="500"
                    frameborder="0"
                  ></iframe>
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <div className="chartBox">
                  <div className="chartTitle">
                    <h2>Water Data</h2>
                  </div>
                  <iframe
                    src="http://192.168.30.65:3000/d-solo/eeb85d37-1b25-4db6-8e7e-072810ea0196/sunrise?orgId=1&from=1672509600000&to=1706637599000&panelId=1"
                    width="100%"
                    height="500"
                    frameborder="0"
                  ></iframe>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
