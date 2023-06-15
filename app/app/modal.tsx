import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/selectedItemStore";

const modal = () => {
  const selectedData = useSelector((state: RootState) => state.homeData);
  return (
    <>
      <View>
        <Text>
          {selectedData.selectedData?.type}
          {selectedData.selectedData?.price}
        </Text>
      </View>
    </>
  );
};

export default modal;

const styles = StyleSheet.create({});
