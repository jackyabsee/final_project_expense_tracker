import React, { useState } from "react";
import { Stack, useRouter, Tabs } from "expo-router";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { StyleSheet, View, Text } from "react-native";
import {
  Box,
  Button,
  Icon,
  Pressable,
  Badge,
  HStack,
  Flex,
  Spacer,
  Select,
  Input,
  ScrollView,
} from "native-base";

import { SafeAreaView } from "react-native-safe-area-context";
import { apiOrigin } from "../env";
import { UseGetId } from "../hooks/useGetId";

const App = () => {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedDateKeys, setSelectedDateKeys] = useState([]);
  const userId = UseGetId();
  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    const updatedSelectedDates = { ...selectedDates };
    if (selectedDates[selectedDate]) {
      delete updatedSelectedDates[selectedDate];
    } else {
      updatedSelectedDates[selectedDate] = {
        selected: true,
        marked: false,
        selectedColor: "lightgreen",
      };
    }
    setSelectedDates(updatedSelectedDates);
    setSelectedDateKeys(Object.keys(updatedSelectedDates));
  };

  const [type, setType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const handleSubmit = async () => {
    const bodyArr = [];
    console.log(selectedDateKeys);
    for (let d of selectedDateKeys) {
      bodyArr.push([type, price, d, remark, userId]);
      console.log(bodyArr);
    }

    try {
      const response = await fetch(`${apiOrigin}/multiRecordPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyArr),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
    setType("");
    setPrice("");
    setRemark("");
    setSelectedDates({});
    setSelectedDateKeys([]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: "gray",
              height: 310,
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9eeee",
            }}
            onDayPress={handleDayPress}
            markedDates={selectedDates}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.data}>
            <Text style={styles.text}>種類</Text>
            <Box maxW="300">
              <Select
                selectedValue={type}
                minWidth="110"
                fontSize={14}
                _selectedItem={{
                  bg: "teal.600",
                }}
                height={50}
                onValueChange={(itemValue) => setType(itemValue)}
              >
                <Select.Item label="交通" value="交通" />
                <Select.Item label="餐飲" value="餐飲" />
                <Select.Item label="衣飾" value="衣飾" />
                <Select.Item label="娛樂" value="娛樂" />
                <Select.Item label="繳費" value="繳費" />
                <Select.Item label="其他" value="其他" />
              </Select>
            </Box>
          </View>

          <View style={styles.data}>
            <Text style={styles.text}>價格</Text>
            <View style={styles.InputView}>
              <Input
                style={styles.Input}
                onChangeText={(itemValue) => setPrice(itemValue)}
                value={price}
              ></Input>
            </View>
          </View>
          <View style={styles.data}>
            <Text style={styles.text}>備註</Text>
            <View style={styles.InputView}>
              <Input
                style={styles.Input}
                onChangeText={(itemValue) => setRemark(itemValue)}
                value={remark}
              ></Input>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            variant="solid"
            colorScheme="green"
            m="2"
            p="2"
            width="95"
            height="45"
            onPress={handleSubmit}
          >
            確認
          </Button>
        </View>
        <Button onPress={() => router.back()}>back</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    marginTop: 1,
    height: 300,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "1.75%",
  },
  InputView: {
    width: 110,
  },
  Input: {
    width: 100,
    marginTop: 10,
    fontSize: 14,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 16,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});

export default App;
