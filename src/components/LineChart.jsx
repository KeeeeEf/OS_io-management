import React from 'react';
import Chart from 'react-google-charts';

export const LineChart = ({ data }) => {
  const chartData = [['Seek Time', 'Track Number']];
  data.forEach((number, index) => {
    chartData.push([index + 1, number]);
  });

  return (
    <Chart
      width={'100%'}
      height={'380px'}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        hAxis: {
          title: 'Seek Time',
          format: '0',
          gridlines: {
            count: data.length + 1,
          },
        },
        vAxis: {
          title: 'Track Number',
        },
        chartArea: { width: '80%', height: '80%' },
        series: {
          0: {
            pointShape: 'circle',
            pointSize: 5, // Set the size of the dots
          },
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};
