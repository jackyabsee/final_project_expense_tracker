import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, ScrollView } from "native-base";
import { usePathname, useRouter } from "expo-router";
import { get } from "../api/api";
import {
  object,
  optional,
  string,
  array,
  id,
  number,
  ParseResult,
} from "cast.ts";
import { useAuth } from "../context/authContext";
import { Table } from "../components/Table";
function getAssets(token: string) {
  return get("/assets", { token, parser: dataParser });
}

let dataParser = object({
  error: optional(string()),
  assets: optional(
    array(
      object({
        id: id(),
        institution: string(),
        type: string(),
        value: number(),
        interest_rate: number(),
        remark: string(),
      })
    )
  ),
});
const assetCalculator = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [presentAsset, setPresentAsset] = useState<
    ParseResult<typeof dataParser>
  >({
    error: undefined,
    assets: [],
  });
  const {
    authState: { token },
  } = useAuth();
  const [totalAsset, setTotalAsset] = useState(0);
  const [assetAfterYear, setAssetAYearLater] = useState<
    | { id: number; institution: string; type: string; value: number }[]
    | undefined
  >();
  async function fetchData(token: string) {
    console.log("get assets");
    let json = await getAssets(token);
    if (json.error) {
      let tableDataExample = {
        error: undefined,
        assets: [
          {
            id: 99,
            institution: "example bank",
            type: "stock",
            value: 100000,
            interest_rate: 1.03,
            remark: "This is an example",
          },
        ],
      };
      setPresentAsset(tableDataExample);
      setTotalAsset(tableDataExample.assets[0].value);
      setAssetAYearLater([
        {
          id: tableDataExample.assets[0].id,
          institution: tableDataExample.assets[0].institution,
          type: tableDataExample.assets[0].type,
          value:
            tableDataExample.assets[0].value *
            tableDataExample.assets[0].interest_rate,
        },
      ]);
    } else {
      setPresentAsset(json);
      calculator(json.assets);
    }
  }
  function calculator(
    data:
      | {
          id: number;
          institution: string;
          type: string;
          value: number;
          interest_rate: number;
          remark: string;
        }[]
      | undefined
  ) {
    let totalAsset = 0;
    let assetAYearLater: any[] = [];
    if (!data) {
      setTotalAsset(0);
      setAssetAYearLater([]);
      return;
    }
    data.forEach((asset, i) => {
      totalAsset += asset.value;
      assetAYearLater[i] = {
        id: asset.id,
        institution: asset.institution,
        type: asset.type,
        value: asset.value * asset.interest_rate,
      };
    });
    setTotalAsset(totalAsset);
    setAssetAYearLater(assetAYearLater);
  }

  useEffect(() => {
    if (!token) return;
    if (pathname === "/assetCalculator" && token) {
      (async () => {
        await fetchData(token);
      })();
    }
  }, [pathname]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Button onPress={() => router.back()}>Back</Button>
        {presentAsset.error ? <Text>{presentAsset.error}</Text> : null}
        {assetAfterYear ? (
          <View>
            <Table
              rows={assetAfterYear}
              fields={[
                {
                  label: "所屬機構",
                  width: 90,
                  render: (row) => row.institution,
                },
                { label: "資產種類", width: 100, render: (row) => row.type },
                {
                  label: "1年後資產",
                  width: 100,
                  render: (row) => row.value,
                },
              ]}
            ></Table>
          </View>
        ) : (
          <Text>Loading data...</Text>
        )}
        <View>
          <Text> Total Asset: ${totalAsset}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default assetCalculator;

const styles = StyleSheet.create({});
