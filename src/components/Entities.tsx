import {Image} from 'react-native';
import {Entity} from '../dtos/Entity';
import * as vidchain from '../apis/vidchain';

const imageDefault = require('../../assets/images/validated_white.png');
const iconDefault = require('../../assets/images/icon_notification.png');
/**
 * Auxiliar function to return the image and the name of a particular DID
 */
async function getEntityByDID(did: string): Promise<Entity> {
  const response = await vidchain.entityName(did);

  if (response.success) {
    return {
      name: response.data.uid,
      image:
        response.data.data.image === undefined
          ? Image.resolveAssetSource(imageDefault).uri
          : response.data.data.image,
      icon:
        response.data.data.icon === undefined
          ? Image.resolveAssetSource(iconDefault).uri
          : response.data.data.icon,
    };
  }

  return {
    name: did,
    image: Image.resolveAssetSource(imageDefault).uri,
    icon: Image.resolveAssetSource(iconDefault).uri,
  };
}

export default getEntityByDID;
