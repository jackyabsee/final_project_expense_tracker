import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFetchExtraData } from "../hooks/useFetchExtraData";
import { useRouter } from "expo-router";
import { Button } from "native-base";

const ExtraData = () => {
  const { data, isLoading, error, refetch } = useFetchExtraData();
  const router = useRouter();
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
        <Button onPress={refetch}>Retry</Button>
        <Button onPress={() => router.back()}>Back to home page</Button>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data available</Text>
        <Button onPress={() => router.back()}>Back to home page</Button>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Button style={styles.backButton} onPress={() => router.back()}>
            Back
          </Button>
          <Text style={styles.headerText}>Extra Information</Text>
        </View>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          {data.map((item: any, index) => (
            <View style={styles.card} key={index}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.pubDate}>Published Date: {item.pubDate}</Text>
              <Text style={styles.source}>Source: {item.source}</Text>
              <Text style={styles.link}>{item.link}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ExtraData;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  backButton: {
    // alignSelf: "flex-end",
  },
  card: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pubDate: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  source: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  link: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});
