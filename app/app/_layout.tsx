import { Stack, Tabs } from  'expo-router';
import { NativeBaseProvider, Box } from "native-base";
const Layout = () => {
    
    return (
        <NativeBaseProvider>
    <Tabs>
    <Tabs.Screen name="table" options={{title: "table"}}/>
    <Tabs.Screen name="index" options={{title: "on98"}}/>
        <Tabs.Screen name="on9" options={{title: "on99"}}/>
    <Stack />
    </Tabs>
    </NativeBaseProvider>
    )
}

export default Layout