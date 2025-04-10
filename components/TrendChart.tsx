import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ChevronLeft, ChevronRight, Info } from "lucide-react-native";
import * as Haptics from "expo-haptics";

type TimeRange = "day" | "week" | "month";

interface DataPoint {
  time: string;
  value: number;
}

interface TrendChartProps {
  data?: DataPoint[];
  highThreshold?: number;
  lowThreshold?: number;
  unit?: string;
  onTimeRangeChange?: (range: TimeRange) => void;
  onPointPress?: (point: DataPoint) => void;
}

const TrendChart = ({
  data = [
    { time: "6:00", value: 110 },
    { time: "9:00", value: 145 },
    { time: "12:00", value: 125 },
    { time: "15:00", value: 118 },
    { time: "18:00", value: 132 },
    { time: "21:00", value: 120 },
  ],
  highThreshold = 180,
  lowThreshold = 70,
  unit = "mg/dL",
  onTimeRangeChange = () => {},
  onPointPress = () => {},
}: TrendChartProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("day");
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);

  const handleTimeRangeChange = (range: TimeRange) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeRange(range);
    onTimeRangeChange(range);
  };

  const handlePointPress = (point: DataPoint) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPoint(point);
    onPointPress(point);
  };

  // Format data for the chart
  const chartData = {
    labels: data.map((point) => point.time),
    datasets: [
      {
        data: data.map((point) => point.value),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // iOS blue
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-gray-800">
          Glucose Trends
        </Text>
        <View className="flex-row bg-gray-100 rounded-lg overflow-hidden">
          <TouchableOpacity
            className={`px-3 py-1.5 ${timeRange === "day" ? "bg-white shadow-sm" : ""}`}
            onPress={() => handleTimeRangeChange("day")}
          >
            <Text
              className={`${timeRange === "day" ? "text-blue-500" : "text-gray-500"}`}
            >
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-3 py-1.5 ${timeRange === "week" ? "bg-white shadow-sm" : ""}`}
            onPress={() => handleTimeRangeChange("week")}
          >
            <Text
              className={`${timeRange === "week" ? "text-blue-500" : "text-gray-500"}`}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-3 py-1.5 ${timeRange === "month" ? "bg-white shadow-sm" : ""}`}
            onPress={() => handleTimeRangeChange("month")}
          >
            <Text
              className={`${timeRange === "month" ? "text-blue-500" : "text-gray-500"}`}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-40 mb-2">
        <LineChart
          data={chartData}
          width={310}
          height={160}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: 5,
              strokeWidth: 2,
              stroke: "#fafafa",
            },
            propsForBackgroundLines: {
              strokeDasharray: "",
              stroke: "#e0e0e0",
              strokeWidth: 1,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          onDataPointClick={({ index }) => {
            handlePointPress(data[index]);
          }}
        />
      </View>

      {/* Threshold indicators */}
      <View className="flex-row justify-between mb-2">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-red-400 mr-1" />
          <Text className="text-xs text-gray-500">
            High: {highThreshold} {unit}
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-orange-400 mr-1" />
          <Text className="text-xs text-gray-500">
            Low: {lowThreshold} {unit}
          </Text>
        </View>
      </View>

      {/* Navigation controls */}
      <View className="flex-row justify-between items-center mt-2">
        <TouchableOpacity
          className="p-2 rounded-full bg-gray-100"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <ChevronLeft size={18} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <Info size={16} color="#007AFF" />
          <Text className="text-blue-500 text-sm ml-1">Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-2 rounded-full bg-gray-100"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <ChevronRight size={18} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Selected point info */}
      {selectedPoint && (
        <View className="mt-3 p-3 bg-gray-50 rounded-lg">
          <Text className="text-center text-gray-700">
            {selectedPoint.time}:{" "}
            <Text className="font-semibold">
              {selectedPoint.value} {unit}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default TrendChart;
