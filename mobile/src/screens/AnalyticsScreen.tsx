import React from 'react';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, styles } from '../theme/theme';

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <View style={headerStyles.container}>
        <Text style={headerStyles.title}>City Analytics</Text>
      </View>

      <ScrollView style={contentStyles.container}>
        <Card style={cardStyles.card}>
          <Card.Content style={cardStyles.content}>
            <Icon name="analytics" size={64} color={colors.civicBlue[500]} />
            <Text style={cardStyles.title}>Analytics Dashboard</Text>
            <Text style={cardStyles.description}>
              View city-wide issue trends, heat maps, and predictive insights
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const headerStyles = {
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
};

const contentStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
};

const cardStyles = {
  card: {
    margin: 16,
    backgroundColor: colors.background,
    ...styles.shadow,
  },
  content: {
    alignItems: 'center' as const,
    paddingVertical: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center' as const,
  },
};
