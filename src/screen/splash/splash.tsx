import React from 'react';
import {View, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import setRoot from '@utils/route/setRoot';

const Image = Animated.createAnimatedComponent(FastImage);

const Splash = () => {
  const logo = React.useRef<Animated.Value>(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(logo, {
        useNativeDriver: true,
        duration: 5000,
        toValue: 1,
      }),
    ).start();
  }, [logo]);

  const onComponent = React.useCallback(() => {
    const timeout = setTimeout(() => {
      setRoot();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(onComponent, []);

  const rotate = logo.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../../../assets/icon.png')}
          style={[
            styles.image,
            {
              transform: [
                {
                  rotate,
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default Splash;
