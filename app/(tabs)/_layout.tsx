import { Tabs } from 'expo-router'
import { Plus, MapPin, DollarSign, Zap } from 'lucide-react-native'
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarStyle: { backgroundColor: '#000', borderTopColor: '#111' }, tabBarActiveTintColor: '#fff', headerShown: false }}>
      <Tabs.Screen name="create" options={{ title: 'CREATE', tabBarIcon: ({ color }) => <Plus color={color} /> }} />
      <Tabs.Screen name="drop" options={{ title: 'DROP', tabBarIcon: ({ color }) => <MapPin color={color} /> }} />
      <Tabs.Screen name="sales" options={{ title: 'SALES', tabBarIcon: ({ color }) => <DollarSign color={color} /> }} />
      <Tabs.Screen name="auto" options={{ title: 'AUTO', tabBarIcon: ({ color }) => <Zap color={color} /> }} />
    </Tabs>
  )
}