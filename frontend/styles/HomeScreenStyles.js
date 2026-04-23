import colors from "../constants/colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: {
    paddingBottom: 20, // Space at the bottom so content isn't cut off
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  logoWrapper: { flex: 1, alignItems: 'center' },
  logo: { width: 240, height: 120 },
  logoutButton: { position: 'absolute', right: 20, top: 20 },
  logoutText: { color: colors.primaryBlue, fontSize: 16, fontWeight: '600' },

  weatherCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 140,
    justifyContent: 'center',
  },
  weatherRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  weatherIcon: { fontSize: 32, marginRight: 12 },
  weatherTemp: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary },
  weatherCondition: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  weatherMessage: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },

  retryBtn: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primaryBlue,
  },
  retryText: { color: colors.primaryBlue, fontWeight: '600' },

  /* --- MODAL STYLES --- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  shopLinksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    flex: 1,
  },
  closeModalText: {
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  shopButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  shopBtn: {
    width: '48%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  premiumModal: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    width: '85%',
    // Professional Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconCircle: {
    width: 70,
    height: 70,
    backgroundColor: colors.offWhiteBackground,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -10, // Slight lift
  },
  notifTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  notifSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    width: '100%',
    marginVertical: 15,
  },
  primaryBtn: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 18,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    marginTop: 15,
    paddingVertical: 10,
  },
  secondaryBtnText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  pickerWrapper: {
    width: '100%',
    height: 200, // Required for the spinner to show up on iOS
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    overflow: 'hidden', // Keeps the spinner contained
  },
  iosPicker: {
    width: '100%',
    height: '100%',
  },
  // Ensure your premiumModal doesn't have "alignItems: center" 
  // blocking the picker's width
  premiumModal: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 25,
    width: '90%',
    alignSelf: 'center', // Centers the modal itself
    alignItems: 'center', // Centers the text/icons inside
  }
});

export default styles;