import { StyleSheet } from "react-native";
import colors from "../constants/colors";
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  outfitBox: {
    backgroundColor: colors.offWhiteBackground,
    borderRadius: 16,
    padding: 16,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  outfitGrid: {
    width: '100%',
  },
  fallbackContainer: {
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  fallbackText: {
    fontSize: 13,
    color: '#E65100',
    textAlign: 'center',
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  clothingItemContainer: {
    alignItems: 'center',
    width: '45%',
  },
  clothingImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#EAEAEA',
    marginBottom: 8,
  },
  iconPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emojiIcon: {
    fontSize: 40,
  },
  clothingName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  clothingLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  errorText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8AB4F8',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
export default styles;