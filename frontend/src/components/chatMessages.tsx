import ChatMessage from "./chatMessage"
import { Message, User } from "../types/types"

export default function ChatMessages(props: { messages: Message[]; user: User }) {
	return (
		<>
			<div id="messagesDiv" className="flex flex-col flex-grow bg-slate-200 p-3 overflow-y-auto overflow-x-hidden break-all">
				{props.messages?.map((message) => (
					<ChatMessage key={message.id} message={message} user={props.user} />
				))}
			</div>
		</>
	)
}
