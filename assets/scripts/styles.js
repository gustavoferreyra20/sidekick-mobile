import { StyleSheet } from 'react-native';

/* PALETA DE COLORES

GRIS OSCURO		::	#3e3c3d
GRIS			::	#494649
GRIS CLARO		::	#535053
VERDE OSCURO	::	#28a745
VERDE SELLECCIONADO :: 047734
VERDE			::	#11d077
VERDE CLARO		::	#28a745
*/

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020202',
    alignItems: 'center',
    width: "100%"
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#020202',
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center'
  },
  boldText: {
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 20,
  },
  text: {
    color: '#E7E9EA',
    fontSize: 14,
    marginVertical: 4,
  },
  textInput: {
    backgroundColor: '#020202',
    color: '#E7E9EA',
    height: 40,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: '#020202',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    color: '#E7E9EA',
    backgroundColor: '#020202',
  },
  pickerItem: {
    color: "#E7E9EA",
    backgroundColor: "#020202"
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
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    marginVertical: 12,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E7E9EA',
  },
  header: {
    backgroundColor: '#28a745',
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
    color: '#E7E9EA',
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
    color: "#E7E9EA",
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
    backgroundColor: "#020202",
    color: '#E7E9EA',
    margin: 50,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1ded8c",
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
    backgroundColor: '#28a745',
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
    backgroundColor: '#28a745',
    borderRadius: 3.5,
    marginBottom: 10,
  },
  FlatList: {
    width: '100%'
  },
  headerRows: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  configColumns: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
    width: "10px"
  },
  profileEdit: {
    marginHorizontal: 5,
  },
  buttonContainerColumns: {
    flex: 1,
    margin: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#E7E9EA',
  },
  titleContainer: {
    flex: 8,
    paddingRight: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E7E9EA',
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E7E9EA',
    marginBottom: 4,
    marginTop: 4,
  },
  usersContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  usersText: {
    fontSize: 16,
    color: '#E7E9EA',
  },
  cancelButton: {
    marginTop: 10,
    textAlign: 'center',
  },
  sendedAppContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  notificationContainer: {
    margin: 10,
    padding: 10,
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
    color: '#E7E9EA',
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
    gap: 10,
    flexDirection: "row"
  },
  rewardPrice: {
    fontSize: 16,
    color: '#E7E9EA',
  },
  rewardDescription: {
    fontSize: 16,
    color: '#E7E9EA',
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
    borderBottomColor: '#28a745',
  },
  dot: {
    color: '#28a745',
  },
  postBody: {
    margin: 10,
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
    color: '#E7E9EA',
  },
  noItems: {
    color: '#E7E9EA',
    textAlign: 'center',
  },
  rewardImageProfile: {
    height: 20,
    width: 20,
  },
  rewardContainer: {
    display: "flex",
    flexDirection: "row"
  },
  rewardAmount: {
    fontSize: 16,
    color: '#E7E9EA',
  },
  contactInfImg: {
    borderRadius: 50,
    width: 45,
    height: 45,
    resizeMode: 'cover',
    aspectRatio: 1,
    marginRight: 10,
  },
  contactNickname: {
    fontSize: 12,
    color: '#E7E9EA',
  },
  contactItem:{
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactContainer: {
    gap: 10
  }
});