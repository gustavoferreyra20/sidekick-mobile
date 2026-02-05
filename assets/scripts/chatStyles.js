import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.48)',
    justifyContent: 'flex-end',
  },

  card: {
    height: 520,
    margin: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(18,18,18,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 10,
  },

  header: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34d399',
    shadowColor: '#34d399',
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 0},
  },

  name: {
    color: '#fff',
    fontWeight: '800',
    letterSpacing: 0.2,
  },

  status: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 2,
  },

  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  msg: {
    maxWidth: '84%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
  },

  msgMe: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(52,211,153,0.18)',
    borderColor: 'rgba(52,211,153,0.22)',
    borderTopRightRadius: 6,
  },

  msgOther: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.06)',
    borderTopLeftRadius: 6,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 8,
  },

  metaName: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    flexShrink: 1,
  },

  metaHour: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.40)',
    flexShrink: 0,
  },

  text: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13,
    lineHeight: 18,
  },

  footer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },

  input: {
    flex: 1,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.40)',
    color: '#fff',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  sendBtn: {
    marginLeft: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(52,211,153,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.25)',
    justifyContent: 'center',
  },

  sendText: {
    color: '#eafff6',
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
