export type LineData = {
    name: string;
    data: Array<{ xAxis: string, yAxis: number }>;
  }

export type LineChartModel = {
    xAxisData: Array<string>;
    yAxisData: Array<LineData>;
  }
