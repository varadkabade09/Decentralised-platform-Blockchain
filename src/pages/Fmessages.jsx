import { useEffect } from 'react'
import { getConversations } from '../services/chat'
import { Link } from 'react-router-dom'
import { setGlobalState, useGlobalState, truncate } from '../store'
import Identicon from 'react-identicons'
import Fheader  from '../components/Fheader'

const RecentConversations = () => {
  const [recentConversations] = useGlobalState('recentConversations')
  const [currentUser] = useGlobalState('currentUser')

  useEffect(() => {
    getConversations().then((users) =>
      setGlobalState('recentConversations', users)
    )
  }, [currentUser])

  return (
    <>
      <Fheader />

      <div className="w-full sm:w-3/5 mx-auto mt-8 px-3 font-[Signika]">
        <h1 className="text-2xl font-bold text-center">Your Recent chats</h1>
        {recentConversations?.map((conversation, index) => (
          <Link
            className="flex items-center space-x-3 w-full my-3
              border-b border-b-gray-100 p-3 bg-gray-100"
            to={`/chats/${conversation.conversationWith.uid}`}
            key={index}
          >
            <Identicon
              className="rounded-full shadow-gray-500 shadow-sm bg-white"
              string={conversation.conversationWith.uid}
              size={20}
            />
            <p>{truncate(conversation.conversationWith.name, 4, 4, 11)}</p>
          </Link>
        ))}
        {recentConversations.length < 1 && (
          <p className="text-center">you don't have any recent chats</p>
        )}
      </div>
    </>
  )
}

export default RecentConversations
