import React, {Component} from 'react';
import {FlatList, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Ably from 'ably';
import {decode as atob} from 'base-64';
import ChatService from '../../services/ChatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/scripts/chatStyles';

export default class SidekickChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      status: '—',
      postId: null,
      myName: 'User',
      input: '',
      messages: [],
    };

    this.ably = null;
    this.channel = null;
    this._mounted = false;
    this.myUserId = null;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
    this.disconnectAbly();
  }

  decodeJwt(token) {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(
        payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
      );
      return JSON.parse(payloadJson);
    } catch {
      return null;
    }
  }

  async ensureMyIdentity() {
    try {
      const raw = await AsyncStorage.getItem('my-key');
      if (!raw) return;

      const session = JSON.parse(raw);
      this.myUserId = Number(session?.id ?? null);

      if (session?.token) {
        const payload = this.decodeJwt(session.token);
        const myName = String(payload?.name ?? 'User').trim();
        if (this._mounted) this.setState({myName});
      }
    } catch {
    }
  }

  setStatus(text) {
    if (this._mounted) this.setState({status: text || ''});
  }

  disconnectAbly() {
    try {
      this.channel?.unsubscribe();
    } catch {
    }
    try {
      this.channel?.detach();
    } catch {
    }
    try {
      this.ably?.close();
    } catch {
    }
    this.channel = null;
    this.ably = null;
  }

  connectAbly(postId) {
    this.disconnectAbly();
    this.setStatus('Conectando...');

    this.ably = new Ably.Realtime({
      authCallback: async (_, callback) => {
        try {
          const tokenReq = await ChatService.getAblyToken(postId);

          if (!tokenReq) {
            this.setStatus('Error conexión');
            return callback(new Error('No token'), null);
          }

          return callback(null, tokenReq);
        } catch (e) {
          this.setStatus('Error conexión');
          return callback(e, null);
        }
      },
    });

    this.ably.connection.on((stateChange) => {
      const st = stateChange.current;
      if (st === 'connected') this.setStatus('Conectado');
      if (st === 'connecting') this.setStatus('Conectando...');
      if (st === 'disconnected') this.setStatus('Desconectado');
      if (st === 'failed') this.setStatus('Error conexión');
    });

    this.channel = this.ably.channels.get(`post:${postId}`);

    this.channel.subscribe('message', (msg) => {
      if (!msg?.data || !this._mounted) return;
      this.setState((prev) => ({
        messages: [...prev.messages, msg.data],
      }));
    });
  }

  async open(postId) {
    const id = Number(postId);
    if (!id) return;

    await this.ensureMyIdentity();

    if (this._mounted) {
      this.setState({
        visible: true,
        postId: id,
        messages: [],
        input: '',
        status: '—',
      });
    }

    this.connectAbly(id);

    const history = await ChatService.getHistory(id);
    if (this._mounted) {
      this.setState({messages: Array.isArray(history) ? history : []});
    }
  }

  close() {
    if (!this._mounted) return;

    this.disconnectAbly();

    this.setState({
      visible: false,
      status: '—',
      input: '',
      postId: null,
      messages: [],
    });

    this.props?.onClose?.();
  }

  async send() {
    const {input, postId} = this.state;
    const msg = String(input ?? '').trim();
    if (!msg || !postId) return;

    if (!this.ably || !this.channel) {
      this.setStatus('Conectando...');
      this.connectAbly(postId);
    }

    const resp = await ChatService.sendMessage(postId, msg);
    if (resp?.ok === false) {
      this.setStatus(
        resp?.error === 'forbidden' ? 'Sin permisos' : 'Error envío'
      );
      return;
    }

    if (this._mounted) this.setState({input: ''});
  }

  formatHour(dateString) {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  renderItem = ({item}) => {
    const name = String(item?.user_name ?? 'User');
    const text = String(item?.message ?? '');
    const hour = this.formatHour(item?.created_at);

    const isMe =
      this.myUserId != null &&
      Number(item?.id_user) === Number(this.myUserId);

    return (
      <View style={[styles.msg, isMe ? styles.msgMe : styles.msgOther]}>
        <View style={styles.metaRow}>
          <Text style={styles.metaName}>{name}</Text>
          <Text style={styles.metaHour}>{hour}</Text>
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };


  render() {
    const {visible, status, messages, input} = this.state;

    return (
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1, justifyContent: 'flex-end'}}
          >
            <View style={styles.card}>
              <View style={styles.header}>
                <View style={styles.title}>
                  <View style={styles.dot}/>
                  <View>
                    <Text style={styles.name}>Chat</Text>
                    <Text style={styles.status}>{status}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => this.close()}
                >
                  <Ionicons name="close" size={18} color="#fff"/>
                </TouchableOpacity>
              </View>

              <FlatList
                style={{flex: 1}}
                data={[...messages].reverse()}
                inverted
                keyExtractor={(item, i) =>
                  String(item?.id_message ?? i)
                }
                renderItem={this.renderItem}
                contentContainerStyle={{padding: 12}}
              />

              <View style={styles.footer}>
                <TextInput
                  style={styles.input}
                  value={input}
                  onChangeText={(t) => this.setState({input: t})}
                  placeholder="Escribí..."
                  placeholderTextColor="rgba(255,255,255,0.45)"
                  onSubmitEditing={() => this.send()}
                  returnKeyType="send"
                />
                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={() => this.send()}
                >
                  <Text style={styles.sendText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}
