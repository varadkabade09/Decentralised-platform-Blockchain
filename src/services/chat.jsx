import { CometChat } from '@cometchat-pro/chat'
import { getGlobalState } from '../store'
import { toast } from 'react-toastify'



const CONSTANTS = {
  APP_ID: "25308180ee503826",
  REGION: "in",
  Auth_Key: "cfe5867c921642ed70a2244d4fb5334989bddf1f",
}

const initCometChat = async () => {
  const [connectedAccount] = getGlobalState('connectedAccount');
  const appID = CONSTANTS.APP_ID
  const region = CONSTANTS.REGION
  console.log(connectedAccount)
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build()

  await CometChat.init(appID, appSetting)
    .then(() => console.log('Initialization completed successfully'))
    .catch((error) => error)
}

const loginWithCometChat = async () => {
  const authKey = CONSTANTS.Auth_Key
  const UID = getGlobalState('connectedAccount')

  return new Promise(async (resolve, reject) => {
    await CometChat.login(UID, authKey)
      .then((user) => resolve(user))
      .catch((error) => console.log(error))
  })
}

const signUpWithCometChat = async () => {
  const authKey = CONSTANTS.Auth_Key
  const UID = getGlobalState('connectedAccount')
  const user = new CometChat.User(UID)

  user.setName(UID)
  return new Promise(async (resolve, reject) => {
    await CometChat.createUser(user, authKey)
      .then((user) => resolve(user))
      .catch((error) => console.log(error))
  })
}

const logOutWithCometChat = async () => {
  return new Promise(async (resolve, reject) => {
    await CometChat.logout()
      .then(() => resolve())
      .catch(() => reject())
  })
}

const isUserLoggedIn = async () => {
  return new Promise(async (resolve, reject) => {
    await CometChat.getLoggedinUser()
      .then((user) => resolve(user))
      .catch((error) => console.log(error))
  })
}

const getUser = async (UID) => {
  return new Promise(async (resolve, reject) => {
    await CometChat.getUser(UID)
      .then((user) => resolve(user))
      .catch((error) => console.log(error))
  })
}

const getMessages = async (UID) => {
  const limit = 30
  const messagesRequest = new CometChat.MessagesRequestBuilder()
    .setUID(UID)
    .setLimit(limit)
    .build()

  return new Promise(async (resolve, reject) => {
    await messagesRequest
      .fetchPrevious()
      .then((messages) => resolve(messages.filter((msg) => msg.type == 'text')))
      .catch((error) => console.log(error))
  })
}

const sendMessage = async (receiverID, messageText) => {
  const receiverType = CometChat.RECEIVER_TYPE.USER
  const textMessage = new CometChat.TextMessage(
    receiverID,
    messageText,
    receiverType
  )

  return new Promise(async (resolve, reject) => {
    await CometChat.sendMessage(textMessage)
      .then((message) => resolve(message))
      .catch((error) => console.log(error))
  })
}

const getConversations = async () => {
  const limit = 30
  const conversationsRequest = new CometChat.ConversationsRequestBuilder()
    .setLimit(limit)
    .build()

  return new Promise(async (resolve, reject) => {
    await conversationsRequest
      .fetchNext()
      .then((conversationList) => resolve(conversationList))
      .catch((error) => console.log(error))
  })
}

const listenForMessage = async (listenerID) => {
  return new Promise(async (resolve, reject) => {
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => resolve(message),
      })
    )
  })
}

export {
  initCometChat,
  loginWithCometChat,
  signUpWithCometChat,
  logOutWithCometChat,
  getMessages,
  sendMessage,
  getConversations,
  isUserLoggedIn,
  getUser,
  listenForMessage,
}
