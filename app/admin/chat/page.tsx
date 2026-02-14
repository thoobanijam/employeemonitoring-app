"use client"

import { useEffect, useState } from "react"

type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
}

export default function AdminChatPage() {
  const adminId = "ADMIN-UUID-HERE"
  const employeeId = "EMPLOYEE-UUID-HERE" // could be selected from employee list
  const [messages, setMessages] = useState<Message[]>([])
  const [newMsg, setNewMsg] = useState("")

  async function fetchMessages() {
    const res = await fetch(`/api/chat?senderId=${adminId}&receiverId=${employeeId}`)
    const data = await res.json()
    setMessages(data)
  }

  async function sendMessage() {
    if (!newMsg) return
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId: adminId, receiverId: employeeId, content: newMsg })
    })
    setNewMsg("")
    fetchMessages()
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat with Employee</h1>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 400, overflowY: "scroll" }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ textAlign: msg.senderId === adminId ? "right" : "left", margin: "5px 0" }}>
            <span style={{ background: msg.senderId === adminId ? "#aee" : "#eee", padding: 5, borderRadius: 5 }}>
              {msg.content}
            </span>
            <br />
            <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <input
        style={{ width: "80%", padding: 5 }}
        value={newMsg}
        onChange={e => setNewMsg(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
