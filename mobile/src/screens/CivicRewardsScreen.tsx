import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Card, ProgressBar, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, styles } from '../theme/theme';

export default function CivicRewardsScreen() {
  const userStats = {
    points: 1250,
    level: 3,
    nextLevelPoints: 1500,
    reportsSubmitted: 8,
    issuesResolved: 5,
  };

  const achievements = [
    {
      id: '1',
      title: 'First Reporter',
      description: 'Submit your first civic issue report',
      icon: 'flag',
      earned: true,
      points: 50,
    },
    {
      id: '2',
      title: 'Community Helper',
      description: 'Submit 5 valid issue reports',
      icon: 'people',
      earned: true,
      points: 100,
    },
    {
      id: '3',
      title: 'Civic Champion',
      description: 'Submit 10 valid issue reports',
      icon: 'star',
      earned: false,
      points: 200,
    },
  ];

  const rewards = [
    {
      id: '1',
      title: 'Coffee Shop Discount',
      description: '10% off at participating local cafes',
      points: 500,
      available: true,
    },
    {
      id: '2',
      title: 'City Event VIP Pass',
      description: 'Priority access to city events',
      points: 1000,
      available: true,
    },
    {
      id: '3',
      title: 'Mayor Meet & Greet',
      description: 'Exclusive meeting with city officials',
      points: 2000,
      available: false,
    },
  ];

  const levelProgress = (userStats.points - (userStats.level - 1) * 500) / 500;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={headerStyles.container}>
        <Text style={headerStyles.title}>Civic Rewards</Text>
      </View>

      <ScrollView style={contentStyles.container} showsVerticalScrollIndicator={false}>
        {/* User Stats */}
        <Card style={statsStyles.card}>
          <Card.Content style={statsStyles.content}>
            <View style={statsStyles.header}>
              <View style={statsStyles.levelBadge}>
                <Text style={statsStyles.levelText}>Level {userStats.level}</Text>
              </View>
              <Text style={statsStyles.points}>{userStats.points} Points</Text>
            </View>
            
            <View style={statsStyles.progressContainer}>
              <Text style={statsStyles.progressLabel}>
                Progress to Level {userStats.level + 1}
              </Text>
              <ProgressBar 
                progress={levelProgress} 
                color={colors.civicBlue[500]}
                style={statsStyles.progressBar}
              />
              <Text style={statsStyles.progressText}>
                {userStats.nextLevelPoints - userStats.points} points to go
              </Text>
            </View>

            <View style={statsStyles.statsRow}>
              <View style={statsStyles.statItem}>
                <Text style={statsStyles.statNumber}>{userStats.reportsSubmitted}</Text>
                <Text style={statsStyles.statLabel}>Reports</Text>
              </View>
              <View style={statsStyles.statItem}>
                <Text style={statsStyles.statNumber}>{userStats.issuesResolved}</Text>
                <Text style={statsStyles.statLabel}>Resolved</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Achievements */}
        <View style={sectionStyles.container}>
          <Text style={sectionStyles.title}>Achievements</Text>
          {achievements.map((achievement) => (
            <Card key={achievement.id} style={achievementStyles.card}>
              <Card.Content style={achievementStyles.content}>
                <View style={[
                  achievementStyles.iconContainer,
                  { backgroundColor: achievement.earned ? colors.civicGreen[500] : colors.text.secondary }
                ]}>
                  <Icon 
                    name={achievement.icon} 
                    size={24} 
                    color="#fff" 
                  />
                </View>
                <View style={achievementStyles.textContainer}>
                  <Text style={achievementStyles.title}>{achievement.title}</Text>
                  <Text style={achievementStyles.description}>{achievement.description}</Text>
                  <Text style={achievementStyles.points}>+{achievement.points} points</Text>
                </View>
                {achievement.earned && (
                  <Icon name="check-circle" size={24} color={colors.civicGreen[500]} />
                )}
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Rewards */}
        <View style={sectionStyles.container}>
          <Text style={sectionStyles.title}>Available Rewards</Text>
          {rewards.map((reward) => (
            <Card key={reward.id} style={rewardStyles.card}>
              <Card.Content style={rewardStyles.content}>
                <View style={rewardStyles.textContainer}>
                  <Text style={rewardStyles.title}>{reward.title}</Text>
                  <Text style={rewardStyles.description}>{reward.description}</Text>
                  <View style={rewardStyles.pointsContainer}>
                    <Icon name="stars" size={16} color={colors.civicOrange[500]} />
                    <Text style={rewardStyles.points}>{reward.points} points</Text>
                  </View>
                </View>
                <Badge 
                  style={[
                    rewardStyles.badge,
                    { 
                      backgroundColor: reward.available ? colors.civicGreen[500] : colors.text.secondary 
                    }
                  ]}
                >
                  {reward.available ? 'Available' : 'Locked'}
                </Badge>
              </Card.Content>
            </Card>
          ))}
        </View>
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

const statsStyles = {
  card: {
    margin: 16,
    backgroundColor: colors.background,
    ...styles.shadow,
  },
  content: {
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 20,
  },
  levelBadge: {
    backgroundColor: colors.civicBlue[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelText: {
    color: '#fff',
    fontWeight: 'bold' as const,
    fontSize: 14,
  },
  points: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.civicOrange[500],
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center' as const,
  },
  statsRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
  },
  statItem: {
    alignItems: 'center' as const,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: colors.civicBlue[500],
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
};

const sectionStyles = {
  container: {
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 12,
  },
};

const achievementStyles = {
  card: {
    marginBottom: 12,
    backgroundColor: colors.background,
    ...styles.shadow,
  },
  content: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  points: {
    fontSize: 12,
    color: colors.civicOrange[500],
    fontWeight: '600' as const,
  },
};

const rewardStyles = {
  card: {
    marginBottom: 12,
    backgroundColor: colors.background,
    ...styles.shadow,
  },
  content: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  pointsContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  points: {
    fontSize: 14,
    color: colors.civicOrange[500],
    fontWeight: '600' as const,
    marginLeft: 4,
  },
  badge: {
    fontSize: 12,
  },
};
