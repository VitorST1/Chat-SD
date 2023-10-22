import { useState } from "react"
import Icon from "@mui/material/Icon"

export default function ChatMessageInput() {
	const [message, setMessage] = useState("")

	const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (message && message.trim().length > 0) {
			console.log(message)
		}
	}

	return (
		<>
			<form className="flex items-center gap-3 p-3 bg-slate-300" onSubmit={sendMessage}>
				<input
					className="w-full px-5 py-3 rounded-full shadow-sm"
					type="text"
					placeholder="Digite sua mensagem"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					className="flex p-3 rounded-full shadow-sm bg-green-400 hover:bg-green-600 disabled:bg-green-300 text-gray-50 focus-within:outline focus-within:outline-green-700"
					type="submit"
					disabled={!message}
				>
					<Icon>send</Icon>
				</button>
			</form>
		</>
	)
}
