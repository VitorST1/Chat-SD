import { useState, useRef, useEffect } from "react"
import { Message, User } from "../types/types"
import ChatMessageInput from "../components/chatMessageInput"
import ChatMessages from "../components/chatMessages"
import UserModal from "../components/userModal"
import { socket } from "../socket"

export default function Chat() {
	const [user, setUser] = useState<User>({ id: "0", name: "" })
	// const [socketId, setSocketId] = useState<string>("")
	const [messages, setMessages] = useState<Message[]>([])
	const dialog = useRef<HTMLDialogElement>(null)

	const handleUserChange = () => {
		// setUser({
		// 	id: socketId,
		// 	name: name,
		// })
		setUser({
			id: "1",
			name: "Vitor",
		})
		dialog.current?.close()
	}

	const socketEvents = () => {
		socket.on("connect", () => {
			// setSocketId(socket.id)
			console.log("Connected")
		})

		socket.on("disconnect", () => {
			console.log("Disconnected")
		})

		socket.on("connect_error", (error) => {
			console.log("Connect_error", error)
		})

		socket.on("message", (message: Message) => {
			setMessages([...messages, message])
		})
	}

	useEffect(() => {
		if (user.id === "0") {
			// socket.connect()
			// console.log(socket)
			if (dialog.current) {
				dialog.current?.showModal()
			}
		}

		socketEvents()

		if (messages.length === 0) {
			setMessages([
				{
					id: 1,
					text: "Olá, tudo bem?",
					userId: "1",
					userName: "Vitor",
				},
				{
					id: 2,
					text: "Olá",
					userId: "2",
					userName: "Teste",
				},
			])
		}
	})

	return (
		<>
			<UserModal ref={dialog} onUserChange={handleUserChange} />
			<div className="flex flex-col min-h-screen max-h-screen">
				<ChatMessages messages={messages} user={user} />
				<ChatMessageInput />
			</div>
		</>
	)
}
