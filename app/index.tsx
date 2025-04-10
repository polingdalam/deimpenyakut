import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Link } from "expo-router";
import { Settings, Bell } from "lucide-react-native";
import GlucoseCard from "../components/GlucoseCard";
import TrendChart from "../components/TrendChart";
import LogEntryForm from "../components/LogEntryForm";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const [showLogForm, setShowLogForm] = useState(false);
  const [logType, setLogType] = useState<"glucose" | "medication" | "meal">(
    "glucose",
  );

  const handleLogEntry = (type: "glucose" | "medication" | "meal") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLogType(type);
    setShowLogForm(true);
  };

  const handleCloseForm = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowLogForm(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="px-4 pt-2 pb-2 flex-row justify-between items-center">
          <Text className="text-2xl font-semibold text-gray-800">
            Diabetes Monitor
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="mr-4 p-2 rounded-full bg-gray-100"
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
            >
              <Bell size={22} color="#404040" />
            </TouchableOpacity>
            <Link href="/settings" asChild>
              <TouchableOpacity
                className="p-2 rounded-full bg-gray-100"
                onPress={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }
              >
                <Settings size={22} color="#404040" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* Glucose Card */}
          <GlucoseCard onLogPress={() => handleLogEntry("glucose")} />

          {/* Trend Chart */}
          <TrendChart />

          {/* Quick Action Cards */}
          <View className="mt-4 flex-row justify-between">
            <TouchableOpacity
              className="bg-white rounded-2xl p-4 shadow-sm w-[48%] items-center"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 2,
              }}
              onPress={() => handleLogEntry("medication")}
            >
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                <Text className="text-blue-500 text-xl">💊</Text>
              </View>
              <Text className="text-gray-800 font-medium">Log Medication</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-2xl p-4 shadow-sm w-[48%] items-center"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 2,
              }}
              onPress={() => handleLogEntry("meal")}
            >
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                <Text className="text-green-500 text-xl">🍽️</Text>
              </View>
              <Text className="text-gray-800 font-medium">Log Meal</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Activity */}
          <View className="mt-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Recent Activity
            </Text>
            <View
              className="bg-white rounded-2xl p-4 shadow-sm"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 2,
              }}
            >
              <View className="border-b border-gray-100 pb-3 mb-3">
                <Text className="text-gray-500 text-xs">Today, 10:30 AM</Text>
                <Text className="text-gray-800 font-medium">
                  Glucose Reading: 120 mg/dL
                </Text>
              </View>
              <View className="border-b border-gray-100 pb-3 mb-3">
                <Text className="text-gray-500 text-xs">Today, 8:15 AM</Text>
                <Text className="text-gray-800 font-medium">
                  Medication: Metformin 500mg
                </Text>
              </View>
              <View>
                <Text className="text-gray-500 text-xs">Today, 7:45 AM</Text>
                <Text className="text-gray-800 font-medium">
                  Meal: Breakfast (45g carbs)
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Log Entry Form Modal */}
        {showLogForm && (
          <View className="absolute inset-0 bg-black bg-opacity-30 justify-end">
            <BlurView intensity={10} className="absolute inset-0" />
            <View className="bg-white rounded-t-3xl">
              <View className="w-12 h-1 bg-gray-300 rounded-full self-center my-3" />
              <LogEntryForm type={logType} onClose={handleCloseForm} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
