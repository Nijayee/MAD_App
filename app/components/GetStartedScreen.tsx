import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type GetStartedScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GetStarted'>;
};

const GetStartedScreen: React.FC<GetStartedScreenProps> = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../assets/GecStarted_pic.webp')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Eco-Friendly{'\n'}Urban Mobility</Text>
          <Text style={styles.subtitle}>
            Discover a sustainable way to explore the city with our premium bike rental service.
          </Text>
        </Animated.View>
      </View>

      <View style={styles.featuresContainer}>
        <FeatureItem
          icon="🚲"
          title="Multiple Bike Types"
          description="Choose from city, electric, mountain, and cargo bikes"
        />
        <FeatureItem
          icon="⚡"
          title="Smart Charging"
          description="Real-time battery monitoring and charging stations"
        />
        <FeatureItem
          icon="📍"
          title="Easy Location"
          description="Find available bikes at stations near you"
        />
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type FeatureItemProps = {
  icon: string;
  title: string;
  description: string;
};

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Changed to black
  },
  topSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // Changed to white
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#93c5fd', // Changed to light blue
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  featuresContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#0f172a', // Changed to dark blue
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e3a8a', // Added border color
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // Changed to white
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#94a3b8', // Changed to gray
    lineHeight: 20,
  },
  bottomSection: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  button: {
    backgroundColor: '#1e3a8a', // Changed to medium blue
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;