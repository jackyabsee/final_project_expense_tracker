import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, ScrollView, Slider } from "native-base";
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
  const [originalTotalAsset, setOriginalTotalAsset] = useState(0);
  const [totalInterestRate, setTotalInterestRate] = useState(0);
  const [assetAfterXYear, setAssetAfterXYear] = useState<
    | { id: number; institution: string; type: string; value: number }[]
    | undefined
  >();
  const [sliderValue, setSliderValue] = useState(1);
  const [sliderEndValue, setSliderEndValue] = useState(1);
  async function fetchData(token: string, year: number) {
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
      setTotalInterestRate(tableDataExample.assets[0].interest_rate);
      setAssetAfterXYear([
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
      calculator(json.assets, year);
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
      | undefined,
    year: number
  ) {
    let originalTotalAsset = 0;
    let totalAsset = 0;
    let totalInterestRate = 0;
    let assetAfterOneYear: any[] = [];
    let assetAfterXYear: any[] = [];
    if (!data) {
      setTotalInterestRate(0);
      setTotalAsset(0);
      setAssetAfterXYear([]);
      return;
    }
    data.forEach((asset, i) => {
      originalTotalAsset += asset.value;
      totalAsset += asset.value * Math.pow(asset.interest_rate, year);
      assetAfterOneYear[i] = {
        id: asset.id,
        institution: asset.institution,
        type: asset.type,
        value: asset.value * asset.interest_rate,
      };
      assetAfterXYear[i] = {
        id: asset.id,
        institution: asset.institution,
        type: asset.type,
        value: asset.value * Math.pow(asset.interest_rate, year),
      };
    });
    totalInterestRate = (totalAsset - originalTotalAsset) / originalTotalAsset;
    setOriginalTotalAsset(originalTotalAsset);
    setTotalInterestRate(+totalInterestRate.toFixed(3));
    setTotalAsset(Math.floor(totalAsset));
    setAssetAfterXYear(assetAfterXYear);
  }

  useEffect(() => {
    if (!token) return;
    if (pathname === "/assetCalculator" && token) {
      (async () => {
        await fetchData(token, sliderEndValue);
      })();
    }
  }, [pathname, sliderEndValue]);

  return (
    <SafeAreaView>
      <Button onPress={() => router.back()}>Back</Button>
      <ScrollView>
        {presentAsset.error ? <Text>{presentAsset.error}</Text> : null}
        {assetAfterXYear ? (
          <View>
            <Table
              rows={assetAfterXYear}
              fields={[
                {
                  label: "所屬機構",
                  width: 100,
                  render: (row) => row.institution,
                },
                { label: "資產種類", width: 100, render: (row) => row.type },
                {
                  label: `${sliderEndValue}年後資產`,
                  width: 130,
                  render: (row) => Math.floor(row.value),
                },
              ]}
            ></Table>
          </View>
        ) : (
          <Text>Loading data...</Text>
        )}
      </ScrollView>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text> 新總資產: ${totalAsset}</Text>
        <Text> 厡來總資產: ${originalTotalAsset}</Text>
        <Text> 總利率: {totalInterestRate}</Text>
        <Box
          mx="5"
          width="200"
          height="200"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text>{sliderValue}</Text>
          <Text>確認年份: {sliderEndValue}</Text>
          <Slider
            defaultValue={sliderValue}
            minValue={1}
            maxValue={10}
            accessibilityLabel="hello world"
            step={1}
            onChange={(v) => setSliderValue(Math.floor(v))}
            onChangeEnd={(v) => {
              v && setSliderEndValue(Math.floor(v));
            }}
          >
            <Slider.Track shadow={2}>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb shadow={3} />
          </Slider>
        </Box>
      </View>
    </SafeAreaView>
  );
};

export default assetCalculator;

const styles = StyleSheet.create({});
