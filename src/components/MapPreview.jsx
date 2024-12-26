import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../theme/colors'


const MapPreview = ({location}) => {
  return (
    <View style={styles.mapContainer}>
        {
            location
            ?
            <Image style={styles.map} source={{uri:`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=250x250&maptype=roadmap&markers=color:blue%7C${location.latitude},${location.longitude}&key=AIzaSyBNCpWKDW-1K5CdMmLZSB47e9VOlMXbl5c`}} />
            :
            <Text><Icon name="map" size={128} color={colors.grisMedio} /></Text>
        }
      
    </View>
  )
}

export default MapPreview

const styles = StyleSheet.create({
    map:{
        width: 250,
        height:250,
        borderRadius: 250,
        backgroundColor: colors.grisClaro
    }
})