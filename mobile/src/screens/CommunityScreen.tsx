import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, styles } from '../theme/theme';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'trending' | 'nearby' | 'following'>('trending');

  const communityPosts = [
    {
      id: '1',
      user: { name: 'Sarah Johnson', avatar: 'SJ' },
      title: 'New bike lane proposal for Downtown',
      content: 'The city is considering adding bike lanes to Main Street. What does everyone think?',
      votes: 24,
      comments: 8,
      category: 'Transportation',
      time: '2h ago',
    },
    {
      id: '2',
      user: { name: 'Mike Chen', avatar: 'MC' },
      title: 'Park cleanup event this weekend',
      content: 'Join us for a community cleanup at Central Park this Saturday at 9 AM. Bring gloves!',
      votes: 15,
      comments: 12,
      category: 'Parks',
      time: '4h ago',
    },
  ];

  const CommunityPost = ({ post }: { post: any }) => (
    <Card style={postStyles.card}>
      <Card.Content style={postStyles.content}>
        {/* User Header */}
        <View style={postStyles.header}>
          <Avatar.Text 
            size={40} 
            label={post.user.avatar} 
            style={postStyles.avatar}
          />
          <View style={postStyles.userInfo}>
            <Text style={postStyles.userName}>{post.user.name}</Text>
            <Text style={postStyles.time}>{post.time}</Text>
          </View>
          <Text style={postStyles.category}>{post.category}</Text>
        </View>

        {/* Content */}
        <Text style={postStyles.title}>{post.title}</Text>
        <Text style={postStyles.postContent}>{post.content}</Text>

        {/* Actions */}
        <View style={postStyles.actions}>
          <TouchableOpacity style={postStyles.actionButton}>
            <Icon name="thumb-up" size={20} color={colors.civicBlue[500]} />
            <Text style={postStyles.actionText}>{post.votes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={postStyles.actionButton}>
            <Icon name="comment" size={20} color={colors.text.secondary} />
            <Text style={postStyles.actionText}>{post.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={postStyles.actionButton}>
            <Icon name="share" size={20} color={colors.text.secondary} />
            <Text style={postStyles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={headerStyles.container}>
        <Text style={headerStyles.title}>Community</Text>
        <TouchableOpacity style={headerStyles.addButton}>
          <Icon name="add" size={24} color={colors.civicBlue[500]} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={tabStyles.container}>
        {(['trending', 'nearby', 'following'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              tabStyles.tab,
              activeTab === tab && tabStyles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              tabStyles.tabText,
              activeTab === tab && tabStyles.activeTabText,
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={contentStyles.container} showsVerticalScrollIndicator={false}>
        {communityPosts.map((post) => (
          <CommunityPost key={post.id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
}

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
  addButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.civicBlue[50],
  },
};

const tabStyles = {
  container: {
    flexDirection: 'row' as const,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center' as const,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.civicBlue[500],
  },
  tabText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '600' as const,
  },
  activeTabText: {
    color: colors.civicBlue[500],
  },
};

const contentStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
};

const postStyles = {
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.background,
    ...styles.shadow,
  },
  content: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: colors.civicBlue[500],
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  time: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  category: {
    fontSize: 12,
    color: colors.civicBlue[500],
    backgroundColor: colors.civicBlue[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  actionText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 4,
  },
};
