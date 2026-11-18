import { StyleSheet } from 'react-native';
export const COLORS = {
  darkBlue: '#2C1810',
  mediumBlue: '#8B4513',
  lightBlue: '#D2691E',
  white: '#FFFFFF',
  background: '#FFF8F0',
  text: '#2C1810',
  primary: '#D2691E',
  secondary: '#8B4513',
  border: '#E0C9B3',
};
export const appTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  text: {
    color: '#2C1810',
    fontSize: 16,
    fontFamily: 'System',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0C9B3',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#2C1810',
    marginTop: 6,
    marginBottom: 4,
  },
  btn: {
    backgroundColor: '#D2691E',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#D2691E',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
