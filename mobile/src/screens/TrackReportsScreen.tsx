import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { Card, Badge, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, styles } from '../theme/theme';

interface Report {
  id: string;
  title: string;
  category: string;
  status: 'submitted' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  date: string;
  location: string;
  description: string;
}

export default function TrackReportsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const mockReports: Report[] = [
    {
      id: 'CR-2024-0156',
      title: 'Broken streetlight on Main Street',
      category: 'lighting',
      status: 'in-progress',
      priority: 'medium',
      date: '2024-01-15',
      location: 'Main Street & 2nd Ave',
      description: 'Street light has been flickering for several days and is now completely out.',
    },
    {
      id: 'CR-2024-0142',
      title: 'Pothole near school entrance',
      category: 'roads',
      status: 'resolved',
      priority: 'high',
      date: '2024-01-10',
      location: 'Oak Avenue, Elementary School',
      description: 'Large pothole creating safety hazard for children and vehicles.',
    },
    {
      id: 'CR-2024-0138',
      title: 'Overflowing trash bins in Central Park',
      category: 'waste',
      status: 'submitted',
      priority: 'low',
      date: '2024-01-08',
      location: 'Central Park, Section A',
      description: 'Multiple trash bins are overflowing, attracting animals and creating mess.',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return colors.civicBlue[500];
      case 'in-progress':
        return colors.civicOrange[500];
      case 'resolved':
        return colors.civicGreen[500];
      case 'closed':
        return colors.text.secondary;
      default:
        return colors.text.secondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return colors.civicGreen[500];
      case 'medium':
        return colors.civicOrange[500];
      case 'high':
        return colors.civicOrange[600];
      case 'urgent':
        return '#ef4444';
      default:
        return colors.text.secondary;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'roads':
        return 'directions-car';
      case 'lighting':
        return 'lightbulb';
      case 'water':
        return 'water-drop';
      case 'parks':
        return 'park';
      case 'waste':
        return 'delete';
      case 'safety':
        return 'security';
      default:
        return 'description';
    }
  };

  const filteredReports = mockReports.filter(report => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['submitted', 'in-progress'].includes(report.status);
    if (filter === 'resolved') return ['resolved', 'closed'].includes(report.status);
    return true;
  });

  const ReportCard = ({ report }: { report: Report }) => (
    <Card style={reportStyles.card}>
      <Card.Content style={reportStyles.cardContent}>
        {/* Header */}
        <View style={reportStyles.header}>
          <View style={reportStyles.headerLeft}>
            <Icon 
              name={getCategoryIcon(report.category)} 
              size={20} 
              color={colors.civicBlue[500]} 
            />
            <Text style={reportStyles.reportId}>#{report.id}</Text>
          </View>
          <Badge 
            style={[reportStyles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}
          >
            {getStatusLabel(report.status)}
          </Badge>
        </View>

        {/* Title */}
        <Text style={reportStyles.title}>{report.title}</Text>

        {/* Location */}
        <View style={reportStyles.locationContainer}>
          <Icon name="location-on" size={16} color={colors.text.secondary} />
          <Text style={reportStyles.location}>{report.location}</Text>
        </View>

        {/* Meta information */}
        <View style={reportStyles.metaContainer}>
          <View style={reportStyles.metaItem}>
            <Text style={reportStyles.metaLabel}>Priority:</Text>
            <View style={[reportStyles.priorityDot, { backgroundColor: getPriorityColor(report.priority) }]} />
            <Text style={[reportStyles.metaValue, { color: getPriorityColor(report.priority) }]}>
              {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}
            </Text>
          </View>
          <View style={reportStyles.metaItem}>
            <Text style={reportStyles.metaLabel}>Date:</Text>
            <Text style={reportStyles.metaValue}>{report.date}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={reportStyles.description} numberOfLines={2}>
          {report.description}
        </Text>

        {/* Actions */}
        <View style={reportStyles.actions}>
          <Button 
            mode="outlined" 
            compact
            style={reportStyles.actionButton}
          >
            View Details
          </Button>
          {report.status === 'resolved' && (
            <Button 
              mode="text" 
              compact
              style={reportStyles.actionButton}
            >
              Rate Service
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={headerStyles.container}>
        <Text style={headerStyles.title}>My Reports</Text>
        <TouchableOpacity style={headerStyles.refreshButton} onPress={onRefresh}>
          <Icon name="refresh" size={24} color={colors.civicBlue[500]} />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <View style={filterStyles.container}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={filterStyles.scrollContainer}
        >
          <Chip
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
            style={filterStyles.chip}
            textStyle={filterStyles.chipText}
          >
            All Reports
          </Chip>
          <Chip
            selected={filter === 'active'}
            onPress={() => setFilter('active')}
            style={filterStyles.chip}
            textStyle={filterStyles.chipText}
          >
            Active
          </Chip>
          <Chip
            selected={filter === 'resolved'}
            onPress={() => setFilter('resolved')}
            style={filterStyles.chip}
            textStyle={filterStyles.chipText}
          >
            Resolved
          </Chip>
        </ScrollView>
      </View>

      {/* Reports List */}
      <ScrollView
        style={contentStyles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.civicBlue[500]]}
          />
        }
      >
        {filteredReports.length === 0 ? (
          <View style={emptyStyles.container}>
            <Icon name="description" size={64} color={colors.text.secondary} />
            <Text style={emptyStyles.title}>No reports found</Text>
            <Text style={emptyStyles.subtitle}>
              {filter === 'all' 
                ? "You haven't submitted any reports yet." 
                : `No ${filter} reports found.`}
            </Text>
          </View>
        ) : (
          filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Styles
const headerStyles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
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
  refreshButton: {
    padding: 8,
  },
};

const filterStyles = {
  container: {
    backgroundColor: colors.background,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: colors.surface,
  },
  chipText: {
    fontSize: 14,
  },
};

const contentStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
};

const reportStyles = {
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.background,
    ...styles.shadow,
  },
  cardContent: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  reportId: {
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 8,
    fontWeight: '600' as const,
  },
  statusBadge: {
    fontSize: 12,
    color: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  metaContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  metaLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginRight: 4,
  },
  metaValue: {
    fontSize: 12,
    color: colors.text.primary,
    fontWeight: '600' as const,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row' as const,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
};

const emptyStyles = {
  container: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 20,
  },
};
