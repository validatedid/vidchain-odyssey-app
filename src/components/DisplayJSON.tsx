import React from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import JSONTree from 'react-native-json-tree';
import {View, Text, Body, CardItem, Left, Button} from 'native-base';
import colors from '../config/colors';
import {Entity} from '../dtos/Entity';

type Props = {
  navigation: any;
  route: any;
};
type State = {
  entity: Entity;
  verifiableCredential: any;
};

const imageDefault = require('../../assets/images/validated_white.png');
const iconDefault = require('../../assets/images/icon_notification.png');

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

class DispalyJSON extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      entity: {
        name: 'Validated ID',
        image: Image.resolveAssetSource(imageDefault).uri,
        icon: Image.resolveAssetSource(iconDefault).uri,
      },
      verifiableCredential: {},
    };
  }

  async componentDidMount() {
    const {route} = this.props;
    const {verifiableCredential} = route.params;

    this.setState({
      verifiableCredential: verifiableCredential,
    });
  }

  back() {
    const {navigation} = this.props;
    navigation.goBack();
  }

  render() {
    const {entity, verifiableCredential} = this.state;
    return (
      <View style={styles.container}>
        <CardItem style={styles.headerNotification}>
          <Body>
            <Image
              resizeMode="contain"
              source={{uri: entity.image}}
              style={styles.imageHeader}
            />
          </Body>
        </CardItem>
        <View>
          <Text style={styles.titleBehindHeader} note>
            Eidas Signature
          </Text>
        </View>
        <ScrollView>
          <JSONTree
            data={verifiableCredential}
            theme={theme}
            invertTheme={false}
          />
        </ScrollView>
        <CardItem>
          <Left>
            <Button style={styles.button} onPress={() => this.back()}>
              {/* <FontAwesome5 style={styles.icon} name="chevron-left" /> */}
              <Text style={styles.textButton}>Back</Text>
            </Button>
          </Left>
        </CardItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerNotification: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.black,
    fontSize: 14,
  },
  imageHeader: {
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
  titleBehindHeader: {
    color: colors.primary,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    margin: 20,
  },
  icon: {
    color: colors.white,
    fontSize: 25,
    marginRight: '2%',
  },
  button: {
    backgroundColor: colors.secondary,
    color: colors.white,
    paddingLeft: '5%',
    borderRadius: 10,
  },
  textButton: {
    color: colors.white,
  },
});

export default DispalyJSON;
