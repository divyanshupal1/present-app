import { Slot } from 'expo-router';
import {MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

export default function HomeLayout() {
  return (
    <PaperProvider theme={DefaultTheme}>
        <Slot />
    </PaperProvider>
  );
}