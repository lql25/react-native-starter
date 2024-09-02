/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component, createRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Button,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

let data = Array(1001);
for (var i = 0; i < data.length; i++) {
  let color =
    'rgb(' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ')';
  data[i] = {
    key: String(i),
    color: color,
  };
}

let currentOffset = 0;
let intervalTime = 300;
const flatListRef = createRef();

export default class HomeView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[{marginTop: 25}]} />
        <Button
          style={[{position: 'absolute', top: 50, left: 0}]}
          onPress={this._startAutoPlay}
          title="Start scrool"
          color="grey"
        />
        <FlatList
          ref={flatListRef}
          testID={'long_list'}
          accessibilityLabel={'long_list'}
          data={data}
          ItemSeparatorComponent={FlatListItemSeparator}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            let label = item.key;
            let spinValue = new Animated.Value(0);
            let spin = spinValue.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
            });
            return (
              <CustomRow
                index={item.key}
                color={item.color}
                label={label}
                spin={spin}
                spinValue={spinValue}>
                {' '}
              </CustomRow>
            );
          }}
        />
      </View>
    );
  }

  _scroolOffset = () => {
    if (currentOffset >= data.length * (styles.item.height + 16)) {
      this._stopAutoPlay();
    }
    flatListRef.current.scrollToOffset({
      offset: currentOffset,
      animated: true,
    });
    currentOffset = currentOffset + 410;
  };

  _startAutoPlay = () => {
    this._timerId = setInterval(this._scroolOffset, intervalTime);
  };

  _stopAutoPlay = () => {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  };

  componentDidMount() {
    this._stopAutoPlay();
  }

  componentWillUnmount() {
    this._stopAutoPlay();
  }
}

const FlatListItemSeparator = () => {
  return <View style={{height: 16, width: '100%', backgroundColor: '#FFF'}} />;
};

const IMAGES = {
  image0: require('./images/0.png'),
  image1: require('./images/1.png'),
  image2: require('./images/2.png'),
  image3: require('./images/3.png'),
  image4: require('./images/4.png'),
  image5: require('./images/5.png'),
  image6: require('./images/6.png'),
  image7: require('./images/7.png'),
  image8: require('./images/8.png'),
  image9: require('./images/9.png'),
  image10: require('./images/10.png'),
  image11: require('./images/11.png'),
  image12: require('./images/12.png'),
  image13: require('./images/13.png'),
  image14: require('./images/14.png'),
  image15: require('./images/15.png'),
  image16: require('./images/16.png'),
  image17: require('./images/17.png'),
  image18: require('./images/18.png'),
  image19: require('./images/19.png'),
};

function getImage(num) {
  return IMAGES['image' + (num % 20)];
}

class CustomRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      index: props.index,
      label: props.label,
      spin: props.spin,
      spinValue: props.spinValue,
    };
  }

  render() {
    return (
      <View
        style={[styles.item_container, {backgroundColor: this.state.color}]}>
        <FastImage
          style={styles.image}
          source={getImage(this.state.index)}
          resizeMode={'stretch'}
        />
        <AnimatedFastImage
          style={{
            transform: [{rotate: this.state.spin}],
            height: 100,
            width: 100,
          }}
          source={getImage(this.state.index)}
          resizeMode={'stretch'}
          fadeDuration={0}
        />
        <Text accessibilityLabel={this.state.label} style={styles.item}>
          {this.state.index}
        </Text>
      </View>
    );
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.spinValue, {
        toValue: 360,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }

  componentWillUnmount() {
    this.state.spinValue.stopAnimation();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_container: {
    height: 100,
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
  },
  item: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontSize: 18,
    height: 100,
  },
});

//export default App;
