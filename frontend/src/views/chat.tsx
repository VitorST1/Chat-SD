import { useState, useRef, useEffect } from "react"
import { Message, User } from "../types/types"
import ChatMessageInput from "../components/chatMessageInput"
import ChatMessages from "../components/chatMessages"
import UserModal from "../components/userModal"
import { socket } from "../socket"

export default function Chat() {
	const [user, setUser] = useState<User>({ id: "0", name: "" })
	const [socketId, setSocketId] = useState<string>("")
	const [messages, setMessages] = useState<Message[]>([])
	const dialog = useRef<HTMLDialogElement>(null)

	const handleUserChange = (name: string) => {
		setUser({
			id: socketId,
			name: name,
		})
		dialog.current?.close()
	}

	const handleSendMessage = (message: string) => {
		console.log("message", message)
		socket.emit("message", {
			text: message,
			userId: user.id,
			userName: user.name,
		})
	}

	useEffect(() => {
		console.log("useEffect called")

		socket.on("connect", () => {
			setSocketId(socket.id)
			console.log("Connected", socket)
		})

		socket.on("disconnect", () => {
			console.log("Disconnected")
		})

		socket.on("connect_error", (error) => {
			console.log("Connect_error", error)
		})

		socket.on("new_message", (message: Message) => {
			console.log("new_message", message)
			setMessages((prevMessages) => [...prevMessages, message])
		})

		// Cleanup function to remove the event listeners when the component unmounts
		return () => {
			socket.off("connect")
			socket.off("disconnect")
			socket.off("connect_error")
			socket.off("new_message")
		}
	}, [])

	useEffect(() => {
		if (user.id === "0") {
			if (dialog.current) {
				dialog.current?.showModal()
			}
		}
	})

	return (
		<>
			<UserModal ref={dialog} onUserChange={handleUserChange} />
			<div className="flex flex-col min-h-screen max-h-screen">
				<ChatMessages messages={messages} user={user} />
				<ChatMessageInput onSendMessage={handleSendMessage} />
			</div>
		</>
	)
}
