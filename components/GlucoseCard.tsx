import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  PlusCircle,
  BarChart3,
} from "lucide-react-native";
import { BlurView } from "expo-blur";

interface GlucoseCardProps {
  currentReading?: number;
  unit?: string;
  timestamp?: string;
  trend?: "up" | "down" | "stable";
  onLogReading?: () => void;
  onViewHistory?: () => void;
}

const GlucoseCard = ({
  currentReading = 120,
  unit = "mg/dL",
  timestamp = "Today, 10:30 AM",
  trend = "stable",
  onLogReading = () => {},
  onViewHistory = () => {},
}: GlucoseCardProps) => {
  // Determine if glucose is in normal range (70-180 mg/dL is common target range)
  const isNormal = currentReading >= 70 && currentReading <= 180;
  const isHigh = currentReading > 180;
  const isLow = currentReading < 70;

  // Determine color based on reading
  const getReadingColor = () => {
    if (isHigh) return "text-red-500";
    if (isLow) return "text-amber-500";
    return "text-green-500";
  };

  // Render trend icon
  const renderTrendIcon = () => {
    if (trend === "up") {
      return <ArrowUpRight size={24} color="#ef4444" />;
    } else if (trend === "down") {
      return <ArrowDownRight size={24} color="#f59e0b" />;
    }
    return null;
  };

  return (
    <View className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
      <BlurView intensity={10} className="overflow-hidden rounded-xl">
        <View className="p-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold text-gray-800">
              Blood Glucose
            </Text>
            <View className="flex-row items-center">
              <Clock size={16} color="#6b7280" />
              <Text className="text-sm text-gray-500 ml-1">{timestamp}</Text>
            </View>
          </View>

          {/* Main reading */}
          <View className="flex-row items-center justify-center py-3">
            <View className="flex-row items-center">
              <Text className={`text-4xl font-bold ${getReadingColor()}`}>
                {currentReading}
              </Text>
              <View className="ml-2">{renderTrendIcon()}</View>
            </View>
            <Text className="text-lg text-gray-500 ml-1">{unit}</Text>
          </View>

          {/* Status text */}
          <Text className="text-center text-gray-600 mb-3">
            {isHigh
              ? "Above target range"
              : isLow
                ? "Below target range"
                : "Within target range"}
          </Text>

          {/* Action buttons */}
          <View className="flex-row justify-between mt-2">
            <TouchableOpacity
              onPress={onLogReading}
              className="flex-1 flex-row items-center justify-center bg-blue-50 rounded-full py-2 mr-2"
            >
              <PlusCircle size={18} color="#3b82f6" />
              <Text className="text-blue-500 font-medium ml-1">
                Log Reading
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onViewHistory}
              className="flex-1 flex-row items-center justify-center bg-gray-50 rounded-full py-2 ml-2"
            >
              <BarChart3 size={18} color="#6b7280" />
              <Text className="text-gray-600 font-medium ml-1">History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default GlucoseCard;
