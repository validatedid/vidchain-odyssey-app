import React from 'react';
import {StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';
import * as siopDidAuth from '@validatedid/did-auth';
import {
  View,
  Text,
  ListItem,
  List,
  Separator,
  Body,
  CardItem,
  Right,
  Left,
  Button,
} from 'native-base';
import colors from '../config/colors';
import {CredentialId, verifiableKYC} from '../dtos/Credential';
import {Entity} from '../dtos/Entity';
import getEntityByDID from './Entities';
import {SignPayload} from '../dtos/Eidas';
import * as eidasBridge from '../apis/eidasBridge';

type Props = {
  navigation: any;
  route: any;
};
type State = {
  entity: Entity;
  credentialId: CredentialId | null;
  credentialKyc: verifiableKYC | null;
  verifiableCredential: siopDidAuth.OidcSsi.VerifiableCredential;
  issuerDid: string;
};

const imageDefault = require('../../assets/images/validated_white.png');
const iconDefault = require('../../assets/images/icon_notification.png');

class Credential extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      entity: {
        name: 'Validated ID',
        image: Image.resolveAssetSource(imageDefault).uri,
        icon: Image.resolveAssetSource(iconDefault).uri,
      },
      credentialId: {} as CredentialId,
      credentialKyc: {} as verifiableKYC,
      verifiableCredential: {} as siopDidAuth.OidcSsi.VerifiableCredential,
      issuerDid: '',
    };
  }

  async componentDidMount() {
    const {route} = this.props;
    const {credential, issuerDid, verifiableCredential} = route.params;

    const entity = await getEntityByDID(issuerDid);

    this.setState({
      credentialId: credential.issuingAuthority
        ? null
        : (credential as CredentialId),
      credentialKyc: credential.issuingAuthority
        ? (credential as verifiableKYC)
        : null,
      entity: entity,
      verifiableCredential: verifiableCredential,
      issuerDid: issuerDid,
    });
  }

  goBack() {
    const {navigation} = this.props;
    navigation.navigate('Home');
  }

  async sign() {
    const {verifiableCredential, issuerDid} = this.state;

    const signPayload: SignPayload = {
      issuer: issuerDid,
      type: 'EidasSeal2019',
      payload: verifiableCredential,
    };
    const response = await eidasBridge.signature(signPayload);
    if (response.success) {
      //console.log(JSON.stringify(response.data));
      Toast.showWithGravity(`Signature successfully`, Toast.LONG, Toast.CENTER);
      this.setState({
        verifiableCredential: response.data.vc,
      });
    }
  }
  showProof() {
    const {navigation} = this.props;
    const {verifiableCredential} = this.state;
    navigation.navigate('DisplayJSON', {
      verifiableCredential: verifiableCredential.proof,
    });
  }

  render() {
    const {entity, credentialId, credentialKyc} = this.state;
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
            Issued by: {entity.name}
          </Text>
        </View>
        <ScrollView>
          {credentialId && (
            <List>
              <Separator bordered>
                <Text style={styles.text}>Decentralized Identifier</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.id}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Name</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.firstName}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Last name</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.lastName}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Date of Birth</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.dateOfBirth}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Place of Birth</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.placeOfBirth}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Current Address</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.currentAddress}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>City</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.city}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>State</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.state}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Zip</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.zip}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Gender</Text>
              </Separator>
              <ListItem>
                <Text>{credentialId.gender}</Text>
              </ListItem>
            </List>
          )}
          {credentialKyc && (
            <List>
              <Separator bordered>
                <Text style={styles.text}>Decentralized Identifier</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.id}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Name</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.name || credentialKyc.firstName}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Last name</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.surname || credentialKyc.lastName}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Full name</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.fullName}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Date of Birth</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.dateOfBirth}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Place of Birth</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.placeOfBirth}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Nationality</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.nationality}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>State Issuer</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.stateIssuer}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Issuing Authority</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.issuingAuthority}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Date of Expiry</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.dateOfExpiry}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Gender</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.sex || credentialKyc.gender}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Document Number</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.documentNumber}</Text>
              </ListItem>
              <Separator bordered>
                <Text style={styles.text}>Document Type</Text>
              </Separator>
              <ListItem>
                <Text>{credentialKyc.documentType}</Text>
              </ListItem>
            </List>
          )}
        </ScrollView>
        <CardItem>
          <Left>
            <Button style={styles.button} onPress={() => this.showProof()}>
              {/* <FontAwesome5 style={styles.icon} name="chevron-left" /> */}
              <Text style={styles.textButton}>Show Proof</Text>
            </Button>
          </Left>
          <Right>
            <Button style={styles.button} onPress={() => this.sign()}>
              {/* <FontAwesome5 style={styles.icon} name="check" /> */}
              <Text style={styles.textButton}>eidas Signature</Text>
            </Button>
          </Right>
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
    fontSize: 16,
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

export default Credential;
