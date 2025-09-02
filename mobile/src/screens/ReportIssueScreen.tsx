import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
import {
  Card,
  Button,
  Badge,
  ProgressBar,
  Portal,
  Modal,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import { colors, styles } from '../theme/theme';

interface FormData {
  category: string;
  title: string;
  description: string;
  location: string;
  urgency: string;
  photos: string[];
}

export default function ReportIssueScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showUrgencyModal, setShowUrgencyModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    category: '',
    title: '',
    description: '',
    location: '',
    urgency: '',
    photos: [],
  });

  const categories = [
    { value: 'roads', label: 'Roads & Transportation', icon: '🚗' },
    { value: 'lighting', label: 'Street Lighting', icon: '💡' },
    { value: 'water', label: 'Water & Sewage', icon: '💧' },
    { value: 'parks', label: 'Parks & Recreation', icon: '🌳' },
    { value: 'waste', label: 'Waste Management', icon: '🗑️' },
    { value: 'safety', label: 'Public Safety', icon: '🚨' },
    { value: 'other', label: 'Other Issues', icon: '📝' },
  ];

  const urgencyLevels = [
    {
      value: 'low',
      label: 'Low Priority',
      color: colors.civicGreen[500],
      description: 'Can wait a few weeks',
    },
    {
      value: 'medium',
      label: 'Medium Priority',
      color: colors.civicOrange[500],
      description: 'Should be addressed soon',
    },
    {
      value: 'high',
      label: 'High Priority',
      color: colors.civicOrange[600],
      description: 'Needs immediate attention',
    },
    {
      value: 'urgent',
      label: 'Urgent',
      color: '#ef4444',
      description: 'Emergency situation',
    },
  ];

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location to report issues.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        }));
        Alert.alert('Success', 'Location captured successfully!');
      },
      (error) => {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Unable to get your location. Please enter it manually.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Access Required',
          message: 'This app needs to access your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
      },
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets[0]) {
          const photoUri = response.assets[0].uri!;
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, photoUri],
          }));
        }
      }
    );
    setShowPhotoModal(false);
  };

  const selectFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 5,
      },
      (response: ImagePickerResponse) => {
        if (response.assets) {
          const photoUris = response.assets.map(asset => asset.uri!);
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, ...photoUris],
          }));
        }
      }
    );
    setShowPhotoModal(false);
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Show success screen
    }, 2000);
  };

  const canProceedToNextStep = () => {
    switch (step) {
      case 1:
        return formData.category && formData.title && formData.description;
      case 2:
        return formData.location;
      case 3:
        return formData.urgency;
      default:
        return false;
    }
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.value === formData.category);
  };

  const getSelectedUrgency = () => {
    return urgencyLevels.find(level => level.value === formData.urgency);
  };

  const renderProgressBar = () => (
    <View style={progressStyles.container}>
      <ProgressBar progress={step / 3} color={colors.civicBlue[500]} />
      <Text style={progressStyles.text}>Step {step} of 3</Text>
    </View>
  );

  // Success Screen
  if (step === 4) {
    return (
      <View style={successStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <Card style={successStyles.card}>
          <Card.Content style={successStyles.cardContent}>
            <View style={successStyles.iconContainer}>
              <Icon name="check-circle" size={64} color={colors.civicGreen[500]} />
            </View>
            
            <Text style={successStyles.title}>Report Submitted!</Text>
            <Text style={successStyles.subtitle}>
              Your report has been received and assigned ID #CR-2024-0156
            </Text>
            
            <View style={successStyles.infoBox}>
              <Text style={successStyles.infoText}>
                You'll receive notifications about the progress of your report.
                Estimated response time: 2-3 business days.
              </Text>
            </View>
            
            <View style={successStyles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Track' as never)}
                style={successStyles.primaryButton}
                contentStyle={successStyles.buttonContent}
              >
                Track My Reports
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('Home' as never)}
                style={successStyles.secondaryButton}
                contentStyle={successStyles.buttonContent}
              >
                Back Home
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={headerStyles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={headerStyles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.civicBlue[600]} />
        </TouchableOpacity>
        <Text style={headerStyles.title}>Report Issue</Text>
        <View style={headerStyles.placeholder} />
      </View>

      {renderProgressBar()}

      <ScrollView style={contentStyles.container} showsVerticalScrollIndicator={false}>
        {/* Step 1: Issue Details */}
        {step === 1 && (
          <View style={stepStyles.container}>
            <Text style={stepStyles.title}>Tell us about the issue</Text>
            <Text style={stepStyles.subtitle}>
              Provide details to help us understand and address the problem
            </Text>

            {/* Category Selection */}
            <View style={fieldStyles.container}>
              <Text style={fieldStyles.label}>Category *</Text>
              <TouchableOpacity
                style={fieldStyles.selector}
                onPress={() => setShowCategoryModal(true)}
              >
                <Text style={[
                  fieldStyles.selectorText,
                  !formData.category && fieldStyles.placeholder
                ]}>
                  {getSelectedCategory() 
                    ? `${getSelectedCategory()?.icon} ${getSelectedCategory()?.label}`
                    : 'Select category'
                  }
                </Text>
                <Icon name="expand-more" size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>

            {/* Title */}
            <View style={fieldStyles.container}>
              <Text style={fieldStyles.label}>Title *</Text>
              <TextInput
                style={fieldStyles.input}
                placeholder="Brief description of the issue"
                value={formData.title}
                onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
                maxLength={100}
              />
              <Text style={fieldStyles.counter}>{formData.title.length}/100</Text>
            </View>

            {/* Description */}
            <View style={fieldStyles.container}>
              <Text style={fieldStyles.label}>Description *</Text>
              <TextInput
                style={[fieldStyles.input, fieldStyles.textArea]}
                placeholder="Provide detailed information about the issue..."
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={4}
                maxLength={500}
              />
              <Text style={fieldStyles.counter}>{formData.description.length}/500</Text>
            </View>

            {/* Photos */}
            <View style={fieldStyles.container}>
              <Text style={fieldStyles.label}>Photos (Optional)</Text>
              <TouchableOpacity
                style={fieldStyles.photoButton}
                onPress={() => setShowPhotoModal(true)}
              >
                <Icon name="photo-camera" size={24} color={colors.civicBlue[500]} />
                <Text style={fieldStyles.photoButtonText}>Add Photos</Text>
              </TouchableOpacity>
              
              {formData.photos.length > 0 && (
                <ScrollView horizontal style={fieldStyles.photoContainer}>
                  {formData.photos.map((photo, index) => (
                    <View key={index} style={fieldStyles.photoWrapper}>
                      <Image source={{ uri: photo }} style={fieldStyles.photo} />
                      <TouchableOpacity
                        style={fieldStyles.removePhoto}
                        onPress={() => removePhoto(index)}
                      >
                        <Icon name="close" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <View style={stepStyles.container}>
            <Text style={stepStyles.title}>Where is the issue?</Text>
            <Text style={stepStyles.subtitle}>
              Help us locate the problem accurately
            </Text>

            <View style={fieldStyles.container}>
              <Text style={fieldStyles.label}>Location *</Text>
              
              <TouchableOpacity
                style={fieldStyles.locationButton}
                onPress={getCurrentLocation}
              >
                <Icon name="my-location" size={24} color={colors.civicBlue[500]} />
                <Text style={fieldStyles.locationButtonText}>Use Current Location</Text>
              </TouchableOpacity>

              <Text style={fieldStyles.orText}>OR</Text>

              <TextInput
                style={fieldStyles.input}
                placeholder="Enter address or describe location"
                value={formData.location}
                onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
                multiline
              />
            </View>
          </View>
        )}

        {/* Step 3: Urgency */}
        {step === 3 && (
          <View style={stepStyles.container}>
            <Text style={stepStyles.title}>How urgent is this issue?</Text>
            <Text style={stepStyles.subtitle}>
              Help us prioritize your report appropriately
            </Text>

            <View style={fieldStyles.container}>
              <Text style={fieldStyles.label}>Priority Level *</Text>
              <TouchableOpacity
                style={fieldStyles.selector}
                onPress={() => setShowUrgencyModal(true)}
              >
                <Text style={[
                  fieldStyles.selectorText,
                  !formData.urgency && fieldStyles.placeholder
                ]}>
                  {getSelectedUrgency()?.label || 'Select priority level'}
                </Text>
                <Icon name="expand-more" size={24} color={colors.text.secondary} />
              </TouchableOpacity>

              {getSelectedUrgency() && (
                <View style={[fieldStyles.urgencyPreview, { backgroundColor: getSelectedUrgency()?.color + '20' }]}>
                  <View style={[fieldStyles.urgencyDot, { backgroundColor: getSelectedUrgency()?.color }]} />
                  <Text style={fieldStyles.urgencyDescription}>
                    {getSelectedUrgency()?.description}
                  </Text>
                </View>
              )}
            </View>

            {/* Summary */}
            <Card style={fieldStyles.summaryCard}>
              <Card.Content>
                <Text style={fieldStyles.summaryTitle}>Report Summary</Text>
                <View style={fieldStyles.summaryItem}>
                  <Text style={fieldStyles.summaryLabel}>Category:</Text>
                  <Text style={fieldStyles.summaryValue}>
                    {getSelectedCategory()?.icon} {getSelectedCategory()?.label}
                  </Text>
                </View>
                <View style={fieldStyles.summaryItem}>
                  <Text style={fieldStyles.summaryLabel}>Title:</Text>
                  <Text style={fieldStyles.summaryValue}>{formData.title}</Text>
                </View>
                <View style={fieldStyles.summaryItem}>
                  <Text style={fieldStyles.summaryLabel}>Photos:</Text>
                  <Text style={fieldStyles.summaryValue}>{formData.photos.length} attached</Text>
                </View>
              </Card.Content>
            </Card>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={navigationStyles.container}>
          {step > 1 && (
            <Button
              mode="outlined"
              onPress={() => setStep(step - 1)}
              style={navigationStyles.backButton}
              contentStyle={navigationStyles.buttonContent}
            >
              Back
            </Button>
          )}
          
          <Button
            mode="contained"
            onPress={() => {
              if (step < 3) {
                setStep(step + 1);
              } else {
                handleSubmit();
              }
            }}
            disabled={!canProceedToNextStep() || isSubmitting}
            style={navigationStyles.nextButton}
            contentStyle={navigationStyles.buttonContent}
            loading={isSubmitting}
          >
            {step < 3 ? 'Next' : 'Submit Report'}
          </Button>
        </View>
      </ScrollView>

      {/* Category Modal */}
      <Portal>
        <Modal
          visible={showCategoryModal}
          onDismiss={() => setShowCategoryModal(false)}
          contentContainerStyle={modalStyles.container}
        >
          <Text style={modalStyles.title}>Select Category</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={modalStyles.option}
              onPress={() => {
                setFormData(prev => ({ ...prev, category: category.value }));
                setShowCategoryModal(false);
              }}
            >
              <Text style={modalStyles.optionIcon}>{category.icon}</Text>
              <Text style={modalStyles.optionText}>{category.label}</Text>
              {formData.category === category.value && (
                <Icon name="check" size={24} color={colors.civicBlue[500]} />
              )}
            </TouchableOpacity>
          ))}
        </Modal>
      </Portal>

      {/* Urgency Modal */}
      <Portal>
        <Modal
          visible={showUrgencyModal}
          onDismiss={() => setShowUrgencyModal(false)}
          contentContainerStyle={modalStyles.container}
        >
          <Text style={modalStyles.title}>Select Priority Level</Text>
          {urgencyLevels.map((level) => (
            <TouchableOpacity
              key={level.value}
              style={modalStyles.option}
              onPress={() => {
                setFormData(prev => ({ ...prev, urgency: level.value }));
                setShowUrgencyModal(false);
              }}
            >
              <View style={[modalStyles.priorityDot, { backgroundColor: level.color }]} />
              <View style={modalStyles.priorityText}>
                <Text style={modalStyles.optionText}>{level.label}</Text>
                <Text style={modalStyles.priorityDescription}>{level.description}</Text>
              </View>
              {formData.urgency === level.value && (
                <Icon name="check" size={24} color={colors.civicBlue[500]} />
              )}
            </TouchableOpacity>
          ))}
        </Modal>
      </Portal>

      {/* Photo Modal */}
      <Portal>
        <Modal
          visible={showPhotoModal}
          onDismiss={() => setShowPhotoModal(false)}
          contentContainerStyle={modalStyles.container}
        >
          <Text style={modalStyles.title}>Add Photo</Text>
          <TouchableOpacity style={modalStyles.photoOption} onPress={takePhoto}>
            <Icon name="photo-camera" size={24} color={colors.civicBlue[500]} />
            <Text style={modalStyles.optionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={modalStyles.photoOption} onPress={selectFromGallery}>
            <Icon name="photo-library" size={24} color={colors.civicBlue[500]} />
            <Text style={modalStyles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
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
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
};

const progressStyles = {
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
  },
  text: {
    textAlign: 'center' as const,
    marginTop: 8,
    fontSize: 14,
    color: colors.text.secondary,
  },
};

const contentStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
};

const stepStyles = {
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
  },
};

const fieldStyles = {
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.background,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top' as const,
  },
  counter: {
    textAlign: 'right' as const,
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  selector: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.background,
  },
  selectorText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  placeholder: {
    color: colors.text.secondary,
  },
  photoButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 2,
    borderColor: colors.civicBlue[300],
    borderStyle: 'dashed' as const,
    borderRadius: 8,
    padding: 20,
    backgroundColor: colors.civicBlue[25],
  },
  photoButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.civicBlue[500],
  },
  photoContainer: {
    marginTop: 12,
  },
  photoWrapper: {
    position: 'relative' as const,
    marginRight: 8,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removePhoto: {
    position: 'absolute' as const,
    top: -8,
    right: -8,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  locationButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: colors.civicBlue[500],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  locationButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600' as const,
  },
  orText: {
    textAlign: 'center' as const,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  urgencyPreview: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
  },
  urgencyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  urgencyDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  summaryCard: {
    marginTop: 20,
    backgroundColor: colors.background,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row' as const,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    width: 80,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
};

const navigationStyles = {
  container: {
    flexDirection: 'row' as const,
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
    backgroundColor: colors.civicBlue[500],
  },
  buttonContent: {
    paddingVertical: 8,
  },
};

const modalStyles = {
  container: {
    backgroundColor: colors.background,
    margin: 20,
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
  priorityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  priorityText: {
    flex: 1,
  },
  priorityDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  photoOption: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
};

const successStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.background,
  },
  cardContent: {
    alignItems: 'center' as const,
    paddingVertical: 32,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.civicGreen[700],
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center' as const,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: colors.civicGreen[50],
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
  },
  infoText: {
    fontSize: 14,
    color: colors.civicGreen[700],
    textAlign: 'center' as const,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.civicBlue[500],
  },
  secondaryButton: {
    borderColor: colors.border.medium,
  },
  buttonContent: {
    paddingVertical: 8,
  },
};
