import React, { useMemo } from "react";
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import {
  useGetOxygenSaturationsQuery,
  useGetBodyTemperaturesQuery,
  useGetHeartRatesQuery
} from "@/states/api";
import { useTheme, Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";
import { GetBodyTemperaturesResponse, GetHeartRatesResponse } from "@/types";

/*********************************************************************
 * A small helper to flatten all monthlyData readings, sort by date,
 * and pick the MOST RECENT reading.
 *********************************************************************/
function getLatestReading({
  monthlyData,
  dateKey = "date",
  valueKey = "value",
  isDateString = false,
}) {
  if (!monthlyData) return null;

  // Flatten
  const allReadings = monthlyData.flatMap(({ readings }) => readings);

  // If Oxygen uses `date: Date`, while Body Temp uses `date: string`, handle carefully:
  // We'll parse Date objects if needed.
  allReadings.sort((a, b) => {
    const da = isDateString ? new Date(a[dateKey]) : new Date(a[dateKey]);
    const db = isDateString ? new Date(b[dateKey]) : new Date(b[dateKey]);
    return da.getTime() - db.getTime();
  });

  // The *last* reading is the most recent
  return allReadings.length ? allReadings[allReadings.length - 1] : null;
}

const Row1 = () => {
  const { palette } = useTheme();

  // 1) Query all three metrics
  const { data: oxyData } = useGetOxygenSaturationsQuery();
  const { data: tempData } = useGetBodyTemperaturesQuery();
  const { data: hrData } = useGetHeartRatesQuery();

  /*********************************************************
   * ============= FIRST CHART: OXYGEN AVERAGES ============
   *********************************************************/
  const oxygenSaturation = useMemo(() => {
    if (!oxyData || oxyData.length === 0) return [];
    // Expect oxyData[0] to be the single Oxygen doc
    return oxyData[0].monthlyData.map(({ month, average }) => ({
      name: month.substring(0, 3), // e.g. "Jan"
      average,
    }));
  }, [oxyData]);

  /*********************************************************
   * ========== SECOND CHART: OXYGEN MIN / MAX =============
   *********************************************************/
  const oxygenMinMax = useMemo(() => {
    if (!oxyData || oxyData.length === 0) return [];
    return oxyData[0].monthlyData.map(({ month, min, max }) => ({
      name: month.substring(0, 3),
      min,
      max,
    }));
  }, [oxyData]);

  /*********************************************************
   * ======== THIRD BOX: REAL-TIME READINGS (3 METRICS) =====
   * We'll just show textual values akin to the OLED:
   *   "Temp: 36.7 C"
   *   "Heart Rate: 78 bpm"
   *   "SpO2: 98%"
   *
   * We gather the *latest reading* from each doc.
   *********************************************************/
  const latestOxygenReading = useMemo(() => {
    if (!oxyData || oxyData.length === 0) return null;
    // Oxygen uses: "date: Date"
    // So isDateString = false is okay
    const doc = oxyData[0];
    return getLatestReading({
      monthlyData: doc.monthlyData,
      dateKey: "date",
      valueKey: "value",
      isDateString: false, // because the Oxygen schema has date: Date
    });
  }, [oxyData]);

  const latestTempReading = useMemo(() => {
    if (!tempData || tempData.length === 0) return null;
    // BodyTemperature uses "date: string" in the schema
    // isDateString = true to parse
    const doc = tempData[0];
    return getLatestReading({
      monthlyData: doc.monthlyData,
      dateKey: "date",
      valueKey: "value",
      isDateString: true,
    });
  }, [tempData]);

  const latestHeartRateReading = useMemo(() => {
    if (!hrData || hrData.length === 0) return null;
    // Heart Rate also uses "date: string"
    const doc = hrData[0];
    return getLatestReading({
      monthlyData: doc.monthlyData,
      dateKey: "date",
      valueKey: "value",
      isDateString: true,
    });
  }, [hrData]);

  return (
    <>
      {/***********************************************************************
       * 1) Average Oxygen Saturation
       ***********************************************************************/}
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Average Oxygen Saturation"
          subtitle="Displays the average oxygen saturation per month"
          sideText="Data Overview"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={oxygenSaturation}
            margin={{ top: 15, right: 25, left: -10, bottom: 60 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[95, 100]}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="average"
              stroke={palette.primary.main}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/***********************************************************************
       * 2) Oxygen Saturation Min/Max
       ***********************************************************************/}
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Oxygen Saturation Min/Max"
          subtitle="Shows minimum and maximum oxygen saturation for each month"
          sideText="Data Range"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={oxygenMinMax}
            margin={{ top: 15, right: 25, left: -10, bottom: 60 }}
          >
            <defs>
              <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="0">
                <stop
                  offset="5%"
                  stopColor={palette.secondary.main}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.secondary.main}
                  stopOpacity={0.8}
                />
              </linearGradient>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="0">
                <stop
                  offset="5%"
                  stopColor={palette.tertiary.main}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.tertiary.main}
                  stopOpacity={0.8}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[95, 100]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="min"
              stroke={palette.secondary.main}
              fill="url(#colorMin)"
            />
            <Area
              type="monotone"
              dataKey="max"
              stroke={palette.tertiary.main}
              fill="url(#colorMax)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/***********************************************************************
       * 3) Real-Time Live Readings for SpO2, Temp, Heart Rate
       ***********************************************************************/}
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Real-Time Sensor Readings"
          subtitle="Similar to the ESP8266 OLED display"
          sideText="Latest"
        />

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          height="100%"
          p="1rem"
          gap="0.75rem"
        >
          {/* Oxygen Saturation */}
          <Typography variant="h5" color={palette.grey[100]}>
            {latestOxygenReading
              ? `SpO2: ${latestOxygenReading.value.toFixed(
                1
              )}% (Date: ${new Date(latestOxygenReading.date).toLocaleString()})`
              : "SpO2: Loading..."}
          </Typography>

          {/* Body Temperature */}
          <Typography variant="h5" color={palette.grey[100]}>
            {latestTempReading
              ? `Temperature: ${latestTempReading.value.toFixed(
                1
              )} °C (Date: ${latestTempReading.date})`
              : "Temperature: Loading..."}
          </Typography>

          {/* Heart Rate */}
          <Typography variant="h5" color={palette.grey[100]}>
            {latestHeartRateReading
              ? `Heart Rate: ${latestHeartRateReading.value} BPM (Date: ${latestHeartRateReading.date})`
              : "Heart Rate: Loading..."}
          </Typography>
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row1;
