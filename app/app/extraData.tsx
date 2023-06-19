import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, usePathname, useRouter } from "expo-router";
import { Button } from "native-base";
import { getExtraData } from "../api/api";
import { ExtraData } from "../api/types";

const RenderExtraData = ({
  data,
}: {
  data: { items: Array<ExtraData> | null } & { error?: string };
}): any => {
  const router = useRouter();
  if (data.error === "loading") {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }
  if (data.error) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Error: {data.error}</Text>
          <Button onPress={() => router.back()}>Back to home page</Button>
        </View>
      </SafeAreaView>
    );
  }
  if (!data.items) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>No data available</Text>
          <Button onPress={() => router.back()}>Back</Button>
        </View>
      </SafeAreaView>
    );
  }
  if (!Array.isArray(data.items)) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>No data available</Text>
          <Button onPress={() => router.back()}>Back</Button>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Button
              onPress={() => router.replace("/home")}
              style={styles.backButton}
            >
              Back
            </Button>
          </View>
          <View style={styles.headerCenter}>
            <Text style={styles.headerText}>Extra Information</Text>
          </View>
          <View style={styles.headerRight} />
        </View>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          {data.items.map((item: any) => (
            <View style={styles.card} key={item.id}>
              <Text style={styles.title}>{item.title}</Text>
              {/* <Text style={styles.pubDate}>Published Date: {item.pubDate}</Text> */}
              {/* <Text style={styles.source}>Source: {item.source}</Text> */}
              <Link href={item.url} style={styles.link}>
                {item.url}
              </Link>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const extraData = () => {
  // const { data, isLoading, error, refetch } = useFetchExtraData();
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<
    { items: Array<ExtraData> | null } & { error?: string }
  >({ items: null, error: "loading" });
  useEffect(() => {
    if (pathname === "/extraData") {
      (async () => {
        const data = await getExtraData();
        setData(data);
      })();
    }
  }, [pathname]);

  return <RenderExtraData data={data} />;
};

export default extraData;

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
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerRight: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  backButton: {
    alignSelf: "flex-start",
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
