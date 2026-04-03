import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhiteBackground, 
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 20, 
    paddingTop: 20,
    paddingBottom: 15,    
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 20, 
    marginBottom: 18,
    overflow: 'hidden',
    // Soft DripCheck Shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#F0F0F0',
  },
  cardContent: {
    padding: 12,
    alignItems: 'center', 
  },
  sourceText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primaryBlue,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 18,
  },
  categoryContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 12,  
  },
  categoryScroll: {
    paddingHorizontal: 20,  // MUST MATCH header paddingHorizontal
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,       // High border radius for that modern pill look
    backgroundColor: '#F2F2F2',
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: colors.primaryBlue, // Your brand color
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary || '#666',
  },
  categoryTextActive: {
    color: colors.white, // White text when selected
  },
});

export default styles;