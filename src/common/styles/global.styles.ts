import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  removePadding: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
