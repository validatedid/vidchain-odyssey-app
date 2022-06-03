import React, {Component} from 'react';
import {View, Text, Button} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import * as siopDidAuth from '@validatedid/did-auth';
import colors from '../config/colors';
import {validateAuthResponse} from '../core/Validator';

const imageLogo = require('../../assets/images/logo.jpg');

interface Props {
  navigation: any;
  route: any;
}
interface State {
  did: string;
  issuerDid: string;
  credential: any;
  verifiableCredential: siopDidAuth.OidcSsi.VerifiableCredential;
}

class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      did: '',
      issuerDid: '',
      credential: {},
      verifiableCredential: {} as siopDidAuth.OidcSsi.VerifiableCredential,
    };
  }

  async componentDidMount() {
    const {route} = this.props;
    const {response} = route.params;
    //Validate the id token
    const validationResponse: siopDidAuth.DidAuthTypes.DidAuthValidationResponse =
      await validateAuthResponse(response);

    //If true the flow is done! you have the credential
    if (validationResponse.signatureValidation) {
      const payload: siopDidAuth.DidAuthTypes.DidAuthResponsePayload =
        validationResponse.payload as siopDidAuth.DidAuthTypes.DidAuthResponsePayload;

      if (!payload.vp) {
        throw new Error('No payload in VP found');
      }

      //It tooks the elemnent 0 of the credential becasue in this flow we just ask for one credential, it could be multiple credentials here.
      const verifiableCredential: siopDidAuth.OidcSsi.VerifiableCredential =
        payload.vp
          .verifiableCredential[0] as siopDidAuth.OidcSsi.VerifiableCredential;

      //Parsing the id token to get my did, the issuer DID and the credential Info
      const issuer: string = verifiableCredential.issuer;
      const credential: siopDidAuth.OidcSsi.CredentialSubject =
        verifiableCredential.credentialSubject;
      const did = payload.did;

      this.setState({
        did: did,
        verifiableCredential: verifiableCredential,
        credential: credential,
        issuerDid: issuer,
      });
    }
  }

  seeCredential() {
    const {navigation} = this.props;
    const {credential, issuerDid, verifiableCredential} = this.state;
    navigation.navigate('Credential', {
      credential: credential,
      issuerDid: issuerDid,
      verifiableCredential: verifiableCredential,
    });
  }

  render() {
    const {credential} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Odyssey Profile</Text>
        <Text style={styles.text}>Hi {credential.firstName}</Text>
        <Image source={imageLogo} style={styles.logo} />
        <Text style={styles.text}>You have just received a credential.</Text>
        <Button style={styles.button} onPress={() => this.seeCredential()}>
          <Text style={styles.textButton}>See the credential</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  title: {
    color: colors.white,
    fontSize: 25,
  },
  text: {
    color: colors.white,
    fontSize: 15,
  },
  button: {
    backgroundColor: colors.secondary,
    color: colors.white,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
  },
  textButton: {
    color: colors.white,
    alignSelf: 'center',
  },
});

export default Profile;
