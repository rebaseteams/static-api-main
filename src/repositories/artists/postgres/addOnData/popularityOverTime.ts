import _ from 'lodash';
import { LineChartModel } from '../../../../models/types/charts';

const popularityData: Array<{xAxis: string; yAxis: number }> = [];
const xAxisData: Array<string> = [];

_.times(20, (index: number) => {
  popularityData.push({
    xAxis: String(100 + index),
    yAxis: Math.floor(Math.random() * index * 100),
  });
});

_.times(20, (index: number) => {
  xAxisData.push(String(100 + index));
});

const popularityOverTime: LineChartModel = {
  xAxisData,
  yAxisData: [
    {
      name: 'populatity-over-time',
      data: popularityData,
    },
  ],
};

export default popularityOverTime;
