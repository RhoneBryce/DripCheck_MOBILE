import colors from "../constants/colors";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
  },
  cardContent: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 4,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  itemColor: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 4,
  },
  favoriteIcon: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  favoriteActive: {
    color: '#FFD700',
  },
  deleteIcon: {
    fontSize: 14,
    color: colors.error || '#FF3B30',
  },
});
export default styles