import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ReportIssueScreen from './src/screens/ReportIssueScreen';
import TrackReportsScreen from './src/screens/TrackReportsScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import CivicRewardsScreen from './src/screens/CivicRewardsScreen';

// Import theme
import { theme } from './src/theme/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Report':
              iconName = 'add-circle';
              break;
            case 'Track':
              iconName = 'track-changes';
              break;
            case 'Community':
              iconName = 'people';
              break;
            case 'Rewards':
              iconName = 'stars';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Report" component={ReportIssueScreen} />
      <Tab.Screen name="Track" component={TrackReportsScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Rewards" component={CivicRewardsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
