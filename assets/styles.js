import { StyleSheet } from 'react-native';

/* PALETA DE COLORES

GRIS OSCURO		::	#3e3c3d
GRIS			::	#494649
GRIS CLARO		::	#535053
VERDE OSCURO	::	#0eaa61
VERDE SELLECCIONADO :: 047734
VERDE			::	#11d077
VERDE CLARO		::	#1ded8c
*/

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#535053',
    alignItems: 'center',
  },
  reviewContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  descriptionContainer: {
    padding: 10,
    marginLeft: 75
  },
  formContainer: {
    paddingVertical: 30,
    width: '80%'
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  boldText: {
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    minWidth: '100%'
  },
  buttonContainer: {
    marginVertical: 8,
  },
  h1: {
    marginVertical: 12,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  header: {
    backgroundColor: '#1ded8c',
    height: 60,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    color: '#fff',
    fontSize: 16,
  },
  gamesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
  },
  gameContainer: {
    alignItems: "center",
    margin: 10,
    width: "45%",
  },
  gameImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    maxWidth: "100%",
  },
  gameName: {
    color: "#fff",
  },
  contactContainer: {
    marginBottom: 8
  },
  popupContainer: {
    backgroundColor: "#000000aa",
    justifyContent: "center",
    flex: 1
  },
  popupContent: {
    backgroundColor: "#535051",
    margin: 50,
    padding: 15,
    borderRadius: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  required: {
    marginLeft: 5,
    color: 'red',
    fontWeight: 'bold',
    flex: 1,
  },
  post: {
    backgroundColor: "#3e3c3d",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
    marginBottom: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#1ded8c",
    width: "100%",
    marginVertical: 15,
  },
  userImage: {
    borderRadius: 50,
    height: 65,
    width: 65,
    resizeMode: 'cover',
    aspectRatio: 1,
    marginRight: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: "#3e3c3d"
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
  },
  uppercaseText: {
    textTransform: 'uppercase',
  },
  line: {
    height: 1,
    backgroundColor: '#1ded8c',
    width: '100%',
  },
  profileHeaderData: {
    flex: 1,
  },
  dot: {
    height: 7,
    width: 7,
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: '#1ded8c',
    borderRadius: 3.5,
    marginBottom: 10,
  },
  FlatList: {
    width: '100%'
  },
  headerApplications: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEdit: {
    marginHorizontal: 5,
  },
  buttonContainerAAplications: {
    flex: 1,
    margin: 5,
  },

});