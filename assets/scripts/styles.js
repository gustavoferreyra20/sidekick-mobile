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
    paddingTop: 20,
    width: '80%',
    height: '80%',
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
    marginVertical: 4,
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
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  pickerInput: {
    flex: 1,
    minWidth: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 8,
    alignItems: 'stretch',
    marginVertical: 8,
  },
  button: {
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
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  gameContainer: {
    alignItems: "center",
    margin: 10,
  },
  gameImage: {
    width: 144,
    height: 192,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
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
  headerColumns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEdit: {
    marginHorizontal: 5,
  },
  buttonContainerColumns: {
    flex: 1,
    margin: 5,
  },
  titleContainer: {
    flex: 8,
    paddingRight: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    marginTop: 4,
  },
  usersContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  usersText: {
    fontSize: 16,
    color: 'white',
  },
  cancelButton: {
    marginTop: 10,
    textAlign: 'center',
  },
  sendedAppContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#3e3c3d',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applicationsContainer: {
    width: '100%'
  },
  rewardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    color: 'white',
    padding: 10
  },
  rewardImage: {
    height: 65,
    width: 65,
    resizeMode: 'cover',
    aspectRatio: 1,
    alignSelf: 'center'
  },
  rewardItem: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 10
  },
  rewardPrice: {
    fontSize: 16,
    color: 'white',
  },
  rewardDescription: {
    fontSize: 16,
    color: 'white',
  },
  rewardItemContainer: {
    width: '50%',
    paddingHorizontal: 5,
  },
  hr_main: {
    borderBottomWidth: 1,
    width: '90%',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1ded8c',
  },
  dot: {
    color: '#0eaa61',
  },
  postContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#3e3c3d',
    borderRadius: 5,
  },
  postsContainer: {
    width: "100%",
    marginTop: 8,
  },
  userInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  postRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  postTitleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  postContent: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
  },
  description: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    flexWrap: 'wrap',
    color: 'white',
  },
  noItems: {
    color: 'white',
    textAlign: 'center',
  },
});