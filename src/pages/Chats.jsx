import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setGlobalState, useGlobalState, truncate } from '../store'
import Identicon from 'react-identicons'
import { getMessages, sendMessage, listenForMessage } from '../services/chat'
import Header from '../components/Fheader.jsx'

const Chats = () => {
  
  const { id } = useParams()
  const [messages, setMessages] = useGlobalState('messages')
  const [currentUser] = useGlobalState('currentUser')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const msgs = await getMessages(id)
        setMessages(msgs)
        handleListener()
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [id, currentUser, setMessages])

  const onSendMessage = async (e) => {
    e.preventDefault()
    if (!message) return

    try {
      const msg = await sendMessage(id, message)
      setMessages(prevMessages => [...prevMessages, msg])
      setMessage('')
      scrollToEnd()
    } catch (error) {
      setError(error)
    }
  }

  const handleListener = async () => {
    try {
      const msg = await listenForMessage(id)
      setMessages(prevMessages => [...prevMessages, msg])
      scrollToEnd()
    } catch (error) {
      setError(error)
    }
  }

  const scrollToEnd = () => {
    const elmnt = document.getElementById('messages-container')
    elmnt.scrollTop = elmnt.scrollHeight
  }

  return (
    <>
      <Header />
      <div
        className="bg-gray-100 rounded-2xl h-[calc(100vh_-_13rem)]
    w-4/5 flex flex-col justify-between relative mx-auto mt-8 border-t border-t-gray-100 font-[Signika]"
      >
        <h1
          className="text-2xl font-bold text-center absolute top-0
      bg-white w-full shadow-sm py-2"
        >
          Chats
        </h1>
        <div
          id="messages-container"
          className="h-[calc(100vh_-_20rem)] overflow-y-scroll w-full p-4 pt-16"
        >
          {error ? (
            <div>Error: {error.message}</div>
          ) : (
            messages.length > 0 ? (
              messages.map((msg, index) => (
                <Message message={msg.text} uid={msg.sender.uid} key={index} />
              ))
            ) : (
              'No message yet'
            )
          )}
        </div>
        <form onSubmit={onSendMessage} className="w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-full w-full py-5 focus:outline-none focus:ring-0 rounded-md
          border-none bg-[rgba(0,0,0,0.7)] text-white placeholder-white"
            placeholder="Leave a message..."
          />
        </form>
      </div>
    </>
  )
}

const Message = ({ message, uid }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return uid === connectedAccount ? (
    <div className="flex justify-end items-center space-x-4 mb-3 font-[Signika]">
      <div
        className="flex flex-col bg-white py-2 px-4 space-y-2
      rounded-full rounded-br-none shadow-sm"
      >
        <div className="flex items-center space-x-2">
          <Identicon
            string={uid}
            size={20}
            className="rounded-full bg-white shadow-sm"
          />
          <p className="font-bold text-sm">{truncate(uid, 4, 4, 11)}</p>
        </div>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  ) : (
    <div className="flex justify-start items-center space-x-4 mb-3 font-[Signika]">
      <div
        className="flex flex-col bg-white py-2 px-4 space-y-2
      rounded-full rounded-bl-none shadow-sm"
      >
        <div className="flex items-center space-x-2">
          <Identicon
            string={uid}
            size={20}
            className="rounded-full bg-white shadow-sm"
          />
          <p className="font-bold text-sm">{truncate(uid, 4, 4, 11)}</p>
        </div>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}

export default Chats
