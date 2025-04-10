import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { ChevronDown, Check, X } from "lucide-react-native";
import * as Haptics from "expo-haptics";

type EntryType = "glucose" | "medication" | "meal";
type MealType = "breakfast" | "lunch" | "dinner" | "snack";

interface LogEntryFormProps {
  type?: EntryType;
  onSave?: (data: any) => void;
  onCancel?: () => void;
  isVisible?: boolean;
}

export default function LogEntryForm({
  type = "glucose",
  onSave = () => {},
  onCancel = () => {},
  isVisible = true,
}: LogEntryFormProps) {
  const [entryType, setEntryType] = useState<EntryType>(type);
  const [glucoseValue, setGlucoseValue] = useState<number>(120);
  const [medicationName, setMedicationName] = useState<string>("Insulin");
  const [medicationDosage, setMedicationDosage] = useState<string>("10");
  const [mealType, setMealType] = useState<MealType>("breakfast");
  const [carbCount, setCarbCount] = useState<string>("45");
  const [foodItems, setFoodItems] = useState<string[]>(["Oatmeal", "Banana"]);
  const [newFoodItem, setNewFoodItem] = useState<string>("");

  const handleSegmentChange = (newType: EntryType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEntryType(newType);
  };

  const handleSliderChange = (value: number) => {
    setGlucoseValue(Math.round(value));
  };

  const handleSliderComplete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleAddFoodItem = () => {
    if (newFoodItem.trim()) {
      setFoodItems([...foodItems, newFoodItem.trim()]);
      setNewFoodItem("");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleRemoveFoodItem = (index: number) => {
    const newItems = [...foodItems];
    newItems.splice(index, 1);
    setFoodItems(newItems);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleSave = () => {
    let data;

    switch (entryType) {
      case "glucose":
        data = { type: "glucose", value: glucoseValue, timestamp: new Date() };
        break;
      case "medication":
        data = {
          type: "medication",
          name: medicationName,
          dosage: medicationDosage,
          timestamp: new Date(),
        };
        break;
      case "meal":
        data = {
          type: "meal",
          mealType,
          carbCount,
          foodItems,
          timestamp: new Date(),
        };
        break;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSave(data);
  };

  if (!isVisible) return null;

  return (
    <View className="bg-white rounded-xl shadow-md p-4 w-full">
      {/* Form Header */}
      <View className="mb-6">
        <Text className="text-2xl font-semibold text-center text-gray-800">
          {entryType === "glucose"
            ? "Log Glucose Reading"
            : entryType === "medication"
              ? "Log Medication"
              : "Log Meal"}
        </Text>
      </View>

      {/* Segmented Control */}
      <View className="flex-row bg-gray-100 rounded-lg p-1 mb-6">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-md ${entryType === "glucose" ? "bg-white shadow-sm" : ""}`}
          onPress={() => handleSegmentChange("glucose")}
        >
          <Text
            className={`text-center ${entryType === "glucose" ? "text-blue-500 font-medium" : "text-gray-500"}`}
          >
            Glucose
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 rounded-md ${entryType === "medication" ? "bg-white shadow-sm" : ""}`}
          onPress={() => handleSegmentChange("medication")}
        >
          <Text
            className={`text-center ${entryType === "medication" ? "text-blue-500 font-medium" : "text-gray-500"}`}
          >
            Medication
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 rounded-md ${entryType === "meal" ? "bg-white shadow-sm" : ""}`}
          onPress={() => handleSegmentChange("meal")}
        >
          <Text
            className={`text-center ${entryType === "meal" ? "text-blue-500 font-medium" : "text-gray-500"}`}
          >
            Meal
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="max-h-[300px]">
        {/* Glucose Form */}
        {entryType === "glucose" && (
          <View>
            <Text className="text-4xl font-bold text-center text-blue-500 mb-2">
              {glucoseValue}{" "}
              <Text className="text-lg font-normal text-gray-500">mg/dL</Text>
            </Text>

            <Slider
              value={glucoseValue}
              minimumValue={40}
              maximumValue={400}
              step={1}
              onValueChange={handleSliderChange}
              onSlidingComplete={handleSliderComplete}
              minimumTrackTintColor="#3b82f6"
              maximumTrackTintColor="#e5e7eb"
              thumbTintColor="#3b82f6"
              className="my-4"
            />

            <View className="flex-row justify-between mb-4">
              <Text className="text-gray-500">40</Text>
              <Text className="text-gray-500">400</Text>
            </View>

            <View className="bg-gray-50 p-3 rounded-lg mb-4">
              <Text className="text-gray-500 text-center">
                Tap and drag the slider to adjust your glucose reading, or enter
                a value manually below
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-600 mb-1">Manual Entry</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg text-gray-800"
                keyboardType="numeric"
                value={glucoseValue.toString()}
                onChangeText={(text) => setGlucoseValue(parseInt(text) || 0)}
                placeholder="Enter glucose value"
              />
            </View>
          </View>
        )}

        {/* Medication Form */}
        {entryType === "medication" && (
          <View>
            <View className="mb-4">
              <Text className="text-gray-600 mb-1">Medication Name</Text>
              <View className="flex-row items-center bg-gray-100 rounded-lg">
                <TextInput
                  className="flex-1 p-3 text-gray-800"
                  value={medicationName}
                  onChangeText={setMedicationName}
                  placeholder="Enter medication name"
                />
                <ChevronDown size={20} color="#6b7280" className="mr-3" />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-600 mb-1">Dosage</Text>
              <View className="flex-row">
                <TextInput
                  className="flex-1 bg-gray-100 p-3 rounded-lg text-gray-800"
                  keyboardType="numeric"
                  value={medicationDosage}
                  onChangeText={setMedicationDosage}
                  placeholder="Enter dosage"
                />
                <View className="bg-gray-200 rounded-lg ml-2 px-4 justify-center">
                  <Text className="text-gray-600">units</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Meal Form */}
        {entryType === "meal" && (
          <View>
            <View className="mb-4">
              <Text className="text-gray-600 mb-1">Meal Type</Text>
              <View className="flex-row bg-gray-100 rounded-lg p-1">
                {(["breakfast", "lunch", "dinner", "snack"] as MealType[]).map(
                  (type) => (
                    <TouchableOpacity
                      key={type}
                      className={`flex-1 py-2 rounded-md ${mealType === type ? "bg-white shadow-sm" : ""}`}
                      onPress={() => {
                        setMealType(type);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }}
                    >
                      <Text
                        className={`text-center capitalize ${mealType === type ? "text-blue-500 font-medium" : "text-gray-500"}`}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-600 mb-1">Carbohydrates</Text>
              <View className="flex-row">
                <TextInput
                  className="flex-1 bg-gray-100 p-3 rounded-lg text-gray-800"
                  keyboardType="numeric"
                  value={carbCount}
                  onChangeText={setCarbCount}
                  placeholder="Enter carb count"
                />
                <View className="bg-gray-200 rounded-lg ml-2 px-4 justify-center">
                  <Text className="text-gray-600">grams</Text>
                </View>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-600 mb-1">Food Items</Text>
              <View className="flex-row mb-2">
                <TextInput
                  className="flex-1 bg-gray-100 p-3 rounded-lg text-gray-800"
                  value={newFoodItem}
                  onChangeText={setNewFoodItem}
                  placeholder="Add food item"
                />
                <TouchableOpacity
                  className="bg-blue-500 rounded-lg ml-2 px-4 justify-center"
                  onPress={handleAddFoodItem}
                >
                  <Text className="text-white font-medium">Add</Text>
                </TouchableOpacity>
              </View>

              <View className="bg-gray-50 rounded-lg p-2">
                {foodItems.length > 0 ? (
                  foodItems.map((item, index) => (
                    <View
                      key={index}
                      className="flex-row justify-between items-center py-2 border-b border-gray-100"
                    >
                      <Text className="text-gray-800">{item}</Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveFoodItem(index)}
                      >
                        <X size={18} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text className="text-gray-400 text-center py-2">
                    No food items added
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View className="flex-row mt-6">
        <TouchableOpacity
          className="flex-1 bg-gray-100 py-3 rounded-lg mr-2"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onCancel();
          }}
        >
          <Text className="text-gray-600 font-medium text-center">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-blue-500 py-3 rounded-lg ml-2 flex-row justify-center items-center"
          onPress={handleSave}
        >
          <Check size={18} color="#ffffff" />
          <Text className="text-white font-medium text-center ml-1">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
