import { Stack, Tabs } from  'expo-router';
import { NativeBaseProvider, Box } from "native-base";
const Layout = () => {
    
    return (
        <NativeBaseProvider>
    <Tabs>
    <Tabs.Screen name="table" options={{title: "table"}}/>
    <Tabs.Screen name="index" options={{title: "主頁"}}/>
    <Tabs.Screen name="Single" options={{title: "Single", href:null}}/>
    <Tabs.Screen name="Multi" options={{title: "Multi", href:null}}/>
    <Tabs.Screen name="table2" options={{title: "Asset"}}/>
        <Tabs.Screen name="on9" options={{title: "on99",  href:null}}/>
    <Stack />
    </Tabs>
    </NativeBaseProvider>
    )
}

export default Layout