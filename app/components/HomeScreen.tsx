import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useCount } from '../context/CountContext';

interface Bike {
  id: number;
  name: string;
  description: string;
  status: 'available' | 'rented' | 'charging';
  type: string;
  batteryLevel: number;
  pricePerHour: number;
}

const BIKE_IMAGES = {
  'City Bike': 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80',
  'Electric Bike': 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80',
  'Mountain Bike': 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80',
  'Cargo Bike': 'https://images.unsplash.com/photo-1599408981219-d5a4e4031684?w=400&q=80'
};

const HomeScreen: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState<string>('');
  const { count, incrementCount } = useCount();

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUsername(parsedData.username || 'Rider');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUsername('Rider');
    }
  };

  const fetchBikes = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
      
      const bikeTypes = ['City Bike', 'Electric Bike', 'Mountain Bike', 'Cargo Bike'];
      const statuses = ['available', 'rented', 'charging'];
      
      const transformedData: Bike[] = response.data.map((item: any) => ({
        id: item.id,
        name: `Eco Rider ${item.id}`,
        description: `Perfect for ${Math.random() > 0.5 ? 'urban commuting' : 'weekend adventures'}. Located at Station ${Math.floor(Math.random() * 10) + 1}`,
        status: statuses[Math.floor(Math.random() * statuses.length)] as Bike['status'],
        type: bikeTypes[Math.floor(Math.random() * bikeTypes.length)],
        batteryLevel: Math.floor(Math.random() * 100),
        pricePerHour: Math.floor(Math.random() * 10) + 5,
      }));

      setBikes(transformedData);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getUserData();
    fetchBikes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBikes();
  };

  const getStatusColor = (status: Bike['status']) => {
    switch (status) {
      case 'available':
        return { bg: '#1e3a8a', text: '#93c5fd' };
      case 'rented':
        return { bg: '#1e293b', text: '#94a3b8' };
      case 'charging':
        return { bg: '#172554', text: '#60a5fa' };
    }
  };

  const getBatteryColor = (level: number) => {
    if (level >= 70) return '#3b82f6';
    if (level >= 30) return '#60a5fa';
    return '#93c5fd';
  };

  const renderBikeCard = ({ item }: { item: Bike }) => {
    const statusStyle = getStatusColor(item.status);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => incrementCount()}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.price}>${item.pricePerHour}/hr</Text>
          <View style={[styles.statusTag, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: BIKE_IMAGES[item.type as keyof typeof BIKE_IMAGES] }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.cardContent}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
          
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.batteryContainer}>
            <View style={styles.batteryBar}>
              <View 
                style={[
                  styles.batteryLevel, 
                  { 
                    width: `${item.batteryLevel}%`,
                    backgroundColor: getBatteryColor(item.batteryLevel)
                  }
                ]} 
              />
            </View>
            <Text style={styles.batteryText}>{item.batteryLevel}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Finding available bikes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
       <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.usernameText}>{username}</Text>
        </View>
        <View style={styles.availableContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{bikes.filter(b => b.status === 'available').length}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
          {/* <View style={styles.statBox}>
            <Text style={styles.statNumber}>{count}</Text>
            <Text style={styles.statLabel}>Rides</Text>
          </View> */}
        </View>
      </View>

      <FlatList
        data={bikes}
        renderItem={renderBikeCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#3b82f6"
          />
        }
      />

<View style={styles.ridesCounter}>
        <View style={[styles.statBox, styles.ridesBox]}>
          <Text style={styles.statNumber}>{count}</Text>
          <Text style={styles.statLabel}>Rides</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    backgroundColor: '#1e3a8a',
    height: Platform.OS === 'ios' ? 110 : 80,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#93c5fd',
    opacity: 0.9,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  availableContainer: {
    marginLeft: 16,
  },
  ridesCounter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  statBox: {
    backgroundColor: 'rgba(147, 197, 253, 0.1)',
    borderRadius: 12,
    padding: 12,
    minWidth: 90,
    alignItems: 'center',
    
  },
  ridesBox: {
    backgroundColor: '#0f172a', // Dark blue/black shade
    borderWidth: 1,
    borderColor: '#1e3a8a',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#93c5fd',
    fontSize: 12,
    opacity: 0.9,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#93c5fd',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#1e293b',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: 16,
  },
  typeContainer: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#93c5fd',
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
    marginBottom: 12,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  batteryLevel: {
    height: '100%',
    borderRadius: 4,
  },
  batteryText: {
    fontSize: 12,
    color: '#93c5fd',
    fontWeight: '500',
  },
});

export default HomeScreen;