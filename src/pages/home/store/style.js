import { StyleSheet} from "react-native";

export default StyleSheet.create({
    arrangeProductsBar: {
      flexDirection: 'row',
      paddingVertical: 14,
      backgroundColor: '#fafafa',
      borderBottomColor: '#dfe4ea',
      borderBottomWidth: 1,
    },
    arrangeProductsBarItemOpacity: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrangeProductsBarItemLabel: {
      marginHorizontal: 10,
      fontSize: 20,
    },
    iconCountView: {
      position: 'absolute',
      zIndex: 2,
      right: -4,
      top: -4,
      paddingHorizontal: 4,
      borderRadius: 10,
      backgroundColor: 'red',
    },
    iconCountText: { color: '#fff', fontWeight: 'bold' },
  });