import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Download,
  Moon,
  Shield,
  Droplet,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

export default function SettingsScreen() {
  const router = useRouter();
  const [glucoseUnit, setGlucoseUnit] = useState("mg/dL"); // or 'mmol/L'
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [dataSharingEnabled, setDataSharingEnabled] = useState(false);

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const toggleGlucoseUnit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setGlucoseUnit(glucoseUnit === "mg/dL" ? "mmol/L" : "mg/dL");
  };

  const toggleSwitch = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    currentValue: boolean,
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(!currentValue);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={handleBackPress} className="p-2">
          <ChevronLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text className="flex-1 text-xl font-semibold text-center">
          Settings
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView className="flex-1">
        <View className="px-4 py-2">
          <Text className="text-sm font-medium text-gray-500 uppercase mb-1 mt-4">
            Measurement
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <TouchableOpacity
              onPress={toggleGlucoseUnit}
              className="flex-row items-center justify-between p-4 border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Droplet size={18} color="#007AFF" />
                </View>
                <Text className="text-base">Glucose Units</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-base text-gray-500 mr-2">
                  {glucoseUnit}
                </Text>
                <ChevronRight size={20} color="#C7C7CC" />
              </View>
            </TouchableOpacity>
          </View>

          <Text className="text-sm font-medium text-gray-500 uppercase mb-1 mt-6">
            Notifications
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mr-3">
                  <Bell size={18} color="#FF3B30" />
                </View>
                <Text className="text-base">Enable Notifications</Text>
              </View>
              <Switch
                trackColor={{ false: "#D1D1D6", true: "#34C759" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D1D1D6"
                onValueChange={() =>
                  toggleSwitch(setNotificationsEnabled, notificationsEnabled)
                }
                value={notificationsEnabled}
              />
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-between p-4 border-b border-gray-100"
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
            >
              <Text className="text-base pl-11">Alert Types</Text>
              <ChevronRight size={20} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-between p-4"
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
            >
              <Text className="text-base pl-11">Alert Schedule</Text>
              <ChevronRight size={20} color="#C7C7CC" />
            </TouchableOpacity>
          </View>

          <Text className="text-sm font-medium text-gray-500 uppercase mb-1 mt-6">
            Data
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <TouchableOpacity
              className="flex-row items-center justify-between p-4 border-b border-gray-100"
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
            >
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                  <Download size={18} color="#34C759" />
                </View>
                <Text className="text-base">Export Data</Text>
              </View>
              <ChevronRight size={20} color="#C7C7CC" />
            </TouchableOpacity>

            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center mr-3">
                  <Shield size={18} color="#AF52DE" />
                </View>
                <Text className="text-base">Data Sharing</Text>
              </View>
              <Switch
                trackColor={{ false: "#D1D1D6", true: "#34C759" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D1D1D6"
                onValueChange={() =>
                  toggleSwitch(setDataSharingEnabled, dataSharingEnabled)
                }
                value={dataSharingEnabled}
              />
            </View>
          </View>

          <Text className="text-sm font-medium text-gray-500 uppercase mb-1 mt-6">
            Appearance
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center mr-3">
                  <Moon size={18} color="#8E8E93" />
                </View>
                <Text className="text-base">Dark Mode</Text>
              </View>
              <Switch
                trackColor={{ false: "#D1D1D6", true: "#34C759" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D1D1D6"
                onValueChange={() =>
                  toggleSwitch(setDarkModeEnabled, darkModeEnabled)
                }
                value={darkModeEnabled}
              />
            </View>
          </View>

          <View className="mt-8 mb-8">
            <TouchableOpacity
              className="bg-white rounded-xl p-4 items-center"
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }
            >
              <Text className="text-base text-red-500">Sign Out</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-xs text-center text-gray-400 mb-8">
            Diabetes Monitor v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
