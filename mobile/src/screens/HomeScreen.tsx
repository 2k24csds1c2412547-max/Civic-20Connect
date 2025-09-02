import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Card, Button, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors, styles } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  const StatCard = ({ value, label, color }: { value: string; label: string; color: string }) => (
    <Card style={[cardStyles.statCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
      <Card.Content style={cardStyles.statCardContent}>
        <Text style={[cardStyles.statValue, { color }]}>{value}</Text>
        <Text style={cardStyles.statLabel}>{label}</Text>
      </Card.Content>
    </Card>
  );

  const FeatureCard = ({ 
    icon, 
    title, 
    description, 
    color, 
    onPress 
  }: { 
    icon: string; 
    title: string; 
    description: string; 
    color: string; 
    onPress?: () => void 
  }) => (
    <Card style={cardStyles.featureCard}>
      <TouchableOpacity onPress={onPress}>
        <Card.Content style={cardStyles.featureCardContent}>
          <View style={[cardStyles.iconContainer, { backgroundColor: color }]}>
            <Icon name={icon} size={24} color="#fff" />
          </View>
          <Text style={cardStyles.featureTitle}>{title}</Text>
          <Text style={cardStyles.featureDescription}>{description}</Text>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  const HowItWorksStep = ({ 
    number, 
    icon, 
    title, 
    description, 
    color 
  }: { 
    number: string; 
    icon: string; 
    title: string; 
    description: string; 
    color: string 
  }) => (
    <View style={cardStyles.stepContainer}>
      <View style={[cardStyles.stepIconContainer, { backgroundColor: color }]}>
        <Icon name={icon} size={32} color="#fff" />
      </View>
      <Text style={cardStyles.stepTitle}>{number}. {title}</Text>
      <Text style={cardStyles.stepDescription}>{description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={headerStyles.container}>
        <View style={headerStyles.logoContainer}>
          <View style={headerStyles.logoIcon}>
            <Icon name="security" size={24} color="#fff" />
          </View>
          <View style={headerStyles.logoText}>
            <Text style={headerStyles.appName}>CivicConnect</Text>
            <Text style={headerStyles.appSubtitle}>Community Issue Reporting</Text>
          </View>
        </View>
        <TouchableOpacity
          style={headerStyles.adminButton}
          onPress={() => navigation.navigate('AdminDashboard' as never)}
        >
          <Icon name="admin-panel-settings" size={20} color={colors.civicBlue[500]} />
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <LinearGradient
        colors={[colors.civicBlue[50], colors.background, colors.civicGreen[50]]}
        style={heroStyles.container}
      >
        <Badge style={heroStyles.badge}>
          🏛️ Empowering Communities
        </Badge>
        
        <Text style={heroStyles.title}>
          Report. Track.{'\n'}
          <Text style={heroStyles.titleAccent}>Resolve.</Text>
        </Text>
        
        <Text style={heroStyles.description}>
          Connect your community with local government through our comprehensive 
          civic issue reporting platform. Report problems, track progress, and see 
          real change happen in your neighborhood.
        </Text>

        <View style={heroStyles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Report' as never)}
            style={heroStyles.primaryButton}
            contentStyle={heroStyles.buttonContent}
            icon={({ size }) => <Icon name="photo-camera" size={size} color="#fff" />}
          >
            Report an Issue
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('AdminDashboard' as never)}
            style={heroStyles.secondaryButton}
            contentStyle={heroStyles.buttonContent}
            icon={({ size }) => <Icon name="dashboard" size={size} color={colors.civicBlue[500]} />}
          >
            Admin Dashboard
          </Button>
        </View>

        {/* Stats */}
        <View style={heroStyles.statsContainer}>
          <StatCard value="2,847" label="Issues Resolved" color={colors.civicBlue[500]} />
          <StatCard value="15,432" label="Active Citizens" color={colors.civicGreen[500]} />
          <StatCard value="12" label="Partner Cities" color={colors.civicOrange[500]} />
          <StatCard value="94%" label="Satisfaction Rate" color={colors.civicBlue[500]} />
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={sectionStyles.container}>
        <Text style={sectionStyles.title}>Powerful Features for Everyone</Text>
        <Text style={sectionStyles.subtitle}>
          Designed for citizens and municipal staff to work together effectively
        </Text>

        {/* Citizens Features */}
        <View style={sectionStyles.subsection}>
          <View style={sectionStyles.subsectionHeader}>
            <Icon name="smartphone" size={24} color={colors.civicBlue[500]} />
            <Text style={sectionStyles.subsectionTitle}>For Citizens</Text>
          </View>
          
          <View style={sectionStyles.featuresGrid}>
            <FeatureCard
              icon="photo-camera"
              title="Easy Issue Reporting"
              description="Capture photos, add descriptions, and pinpoint exact locations with our intuitive mobile interface."
              color={colors.civicBlue[500]}
              onPress={() => navigation.navigate('Report' as never)}
            />
            
            <FeatureCard
              icon="notifications"
              title="Real-time Notifications"
              description="Get instant updates when your report is received, assigned, and resolved."
              color={colors.civicGreen[500]}
            />
            
            <FeatureCard
              icon="track-changes"
              title="Progress Tracking"
              description="Monitor the status of your reports and see exactly what's being done to address them."
              color={colors.civicOrange[500]}
              onPress={() => navigation.navigate('Track' as never)}
            />
          </View>
        </View>

        {/* Municipal Staff Features */}
        <View style={sectionStyles.subsection}>
          <View style={sectionStyles.subsectionHeader}>
            <Icon name="dashboard" size={24} color={colors.civicGreen[500]} />
            <Text style={[sectionStyles.subsectionTitle, { color: colors.civicGreen[700] }]}>
              For Municipal Staff
            </Text>
          </View>
          
          <View style={sectionStyles.featuresGrid}>
            <FeatureCard
              icon="people"
              title="Smart Assignment"
              description="Automated routing assigns issues to the right departments based on category and location."
              color={colors.civicGreen[500]}
            />
            
            <FeatureCard
              icon="priority-high"
              title="Priority Management"
              description="Filter and prioritize issues by urgency, location, and available resources."
              color={colors.civicBlue[500]}
            />
            
            <FeatureCard
              icon="check-circle"
              title="Status Updates"
              description="Keep citizens informed with real-time status updates and completion photos."
              color={colors.civicOrange[500]}
            />
          </View>
        </View>
      </View>

      {/* How It Works */}
      <LinearGradient
        colors={[colors.background, colors.civicBlue[25], colors.background]}
        style={sectionStyles.container}
      >
        <Text style={sectionStyles.title}>How It Works</Text>
        <Text style={sectionStyles.subtitle}>
          Simple, effective, and transparent civic engagement in three steps
        </Text>

        <View style={sectionStyles.stepsContainer}>
          <HowItWorksStep
            number="1"
            icon="photo-camera"
            title="Report"
            description="Snap a photo of the issue, add a description, and share your location. Our mobile app makes reporting quick and easy."
            color={colors.civicBlue[500]}
          />
          
          <HowItWorksStep
            number="2"
            icon="schedule"
            title="Track"
            description="Watch as your report moves through the system. Get notifications when it's assigned, in progress, and completed."
            color={colors.civicGreen[500]}
          />
          
          <HowItWorksStep
            number="3"
            icon="check-circle"
            title="Resolve"
            description="See the issue resolved and receive before/after photos. Rate your experience and help improve city services."
            color={colors.civicOrange[500]}
          />
        </View>
      </LinearGradient>

      {/* Innovative Features */}
      <LinearGradient
        colors={['#7c3aed', '#2563eb', colors.civicGreen[500]]}
        style={innovativeStyles.container}
      >
        <Badge style={innovativeStyles.badge}>
          🚀 Powered by AI & Innovation
        </Badge>
        
        <Text style={innovativeStyles.title}>Next-Generation Civic Engagement</Text>
        <Text style={innovativeStyles.description}>
          Experience the future of civic reporting with AI-powered insights, 
          gamification, and community collaboration
        </Text>

        <View style={innovativeStyles.featuresContainer}>
          <Card style={innovativeStyles.featureCard}>
            <TouchableOpacity onPress={() => navigation.navigate('Report' as never)}>
              <Card.Content style={innovativeStyles.featureCardContent}>
                <View style={innovativeStyles.featureIcon}>
                  <Icon name="auto-awesome" size={32} color="#fff" />
                </View>
                <Text style={innovativeStyles.featureTitle}>AI-Powered Reporting</Text>
                <Text style={innovativeStyles.featureDesc}>
                  Smart categorization, duplicate detection, and voice-to-text reporting with advanced AI
                </Text>
                <Button
                  mode="outlined"
                  style={innovativeStyles.featureButton}
                  labelStyle={innovativeStyles.featureButtonLabel}
                >
                  Try AI Features
                </Button>
              </Card.Content>
            </TouchableOpacity>
          </Card>

          <Card style={innovativeStyles.featureCard}>
            <TouchableOpacity onPress={() => navigation.navigate('Community' as never)}>
              <Card.Content style={innovativeStyles.featureCardContent}>
                <View style={innovativeStyles.featureIcon}>
                  <Icon name="people" size={32} color="#fff" />
                </View>
                <Text style={innovativeStyles.featureTitle}>Community Collaboration</Text>
                <Text style={innovativeStyles.featureDesc}>
                  Vote on issues, earn rewards, and collaborate with neighbors on solutions
                </Text>
                <Button
                  mode="outlined"
                  style={innovativeStyles.featureButton}
                  labelStyle={innovativeStyles.featureButtonLabel}
                >
                  Join Community
                </Button>
              </Card.Content>
            </TouchableOpacity>
          </Card>

          <Card style={innovativeStyles.featureCard}>
            <TouchableOpacity onPress={() => navigation.navigate('Analytics' as never)}>
              <Card.Content style={innovativeStyles.featureCardContent}>
                <View style={innovativeStyles.featureIcon}>
                  <Icon name="trending-up" size={32} color="#fff" />
                </View>
                <Text style={innovativeStyles.featureTitle}>Predictive Analytics</Text>
                <Text style={innovativeStyles.featureDesc}>
                  Interactive heat maps and AI predictions to prevent issues before they occur
                </Text>
                <Button
                  mode="outlined"
                  style={innovativeStyles.featureButton}
                  labelStyle={innovativeStyles.featureButtonLabel}
                >
                  View Analytics
                </Button>
              </Card.Content>
            </TouchableOpacity>
          </Card>
        </View>
      </LinearGradient>

      {/* CTA Section */}
      <LinearGradient
        colors={[colors.civicBlue[600], colors.civicGreen[600]]}
        style={ctaStyles.container}
      >
        <Text style={ctaStyles.title}>Ready to Make a Difference?</Text>
        <Text style={ctaStyles.description}>
          Join thousands of citizens already making their communities better, one report at a time.
        </Text>
        
        <View style={ctaStyles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Report' as never)}
            style={ctaStyles.primaryButton}
            contentStyle={ctaStyles.buttonContent}
            icon={({ size }) => <Icon name="smartphone" size={size} color={colors.civicBlue[600]} />}
          >
            Get Started Now
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Rewards' as never)}
            style={ctaStyles.secondaryButton}
            contentStyle={ctaStyles.buttonContent}
            labelStyle={ctaStyles.secondaryButtonLabel}
            icon={({ size }) => <Icon name="stars" size={size} color="#fff" />}
          >
            Earn Rewards
          </Button>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

// Styles
const headerStyles = {
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  logoContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.civicBlue[500],
    borderRadius: 8,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 12,
  },
  logoText: {},
  appName: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: colors.civicBlue[900],
  },
  appSubtitle: {
    fontSize: 12,
    color: colors.civicBlue[600],
  },
  adminButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
};

const heroStyles = {
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center' as const,
  },
  badge: {
    marginBottom: 16,
    backgroundColor: colors.civicBlue[100],
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: colors.civicBlue[900],
    textAlign: 'center' as const,
    marginBottom: 16,
    lineHeight: 40,
  },
  titleAccent: {
    color: colors.civicGreen[600],
  },
  description: {
    fontSize: 16,
    color: colors.civicBlue[700],
    textAlign: 'center' as const,
    marginBottom: 24,
    lineHeight: 24,
    maxWidth: width - 64,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: colors.civicBlue[500],
    marginBottom: 12,
  },
  secondaryButton: {
    borderColor: colors.civicBlue[300],
  },
  buttonContent: {
    paddingVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
    width: '100%',
  },
};

const cardStyles = {
  statCard: {
    width: (width - 48) / 2,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  statCardContent: {
    alignItems: 'center' as const,
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center' as const,
  },
  featureCard: {
    marginBottom: 16,
    backgroundColor: colors.background,
    ...styles.shadow,
  },
  featureCardContent: {
    alignItems: 'center' as const,
    paddingVertical: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 20,
  },
  stepContainer: {
    alignItems: 'center' as const,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  stepIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 20,
  },
};

const sectionStyles = {
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: colors.civicBlue[900],
    textAlign: 'center' as const,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.civicBlue[700],
    textAlign: 'center' as const,
    marginBottom: 32,
    lineHeight: 24,
  },
  subsection: {
    marginBottom: 32,
  },
  subsectionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: colors.civicBlue[900],
    marginLeft: 8,
  },
  featuresGrid: {},
  stepsContainer: {
    marginTop: 16,
  },
};

const innovativeStyles = {
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center' as const,
  },
  badge: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#fff',
    textAlign: 'center' as const,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center' as const,
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
  },
  featureCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureCardContent: {
    alignItems: 'center' as const,
    paddingVertical: 20,
  },
  featureIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 32,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  featureDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center' as const,
    lineHeight: 20,
    marginBottom: 16,
  },
  featureButton: {
    borderColor: '#fff',
  },
  featureButtonLabel: {
    color: '#fff',
  },
};

const ctaStyles = {
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center' as const,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#fff',
    textAlign: 'center' as const,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center' as const,
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  secondaryButton: {
    borderColor: '#fff',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  secondaryButtonLabel: {
    color: '#fff',
  },
};
