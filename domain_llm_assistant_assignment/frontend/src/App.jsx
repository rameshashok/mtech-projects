import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { ScrollArea } from './components/ui/scroll-area'
import { Send } from 'lucide-react'

const BACKEND_URL = 'https://domain-llm-assistant-assignment-backend.onrender.com'

function App() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  // Keep backend alive by pinging every 14 minutes
  useEffect(() => {
    const pingBackend = async () => {
      try {
        await fetch(BACKEND_URL, { method: 'GET' })
      } catch (error) {
        console.log('Ping failed:', error)
      }
    }

    // Initial ping
    pingBackend()

    // Ping every 14 minutes (Render spins down after 15 min of inactivity)
    const interval = setInterval(pingBackend, 14 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    const userMessage = { role: 'user', content: question }
    setMessages(prev => [...prev, userMessage])
    setQuestion('')
    setLoading(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000)
      
      const response = await fetch(`${BACKEND_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }
      
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      if (error.name === 'AbortError') {
        setMessages(prev => [...prev, { role: 'error', content: 'Request timed out after 2 minutes. The server may be overloaded. Please try again.' }])
      } else {
        setMessages(prev => [...prev, { role: 'error', content: `Error: ${error.message || 'Failed to get response'}` }])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Card className="h-[85vh] flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">Personal Finance Education Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-4 break-words ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : msg.role === 'error'
                        ? 'bg-red-100 text-red-900'
                        : 'bg-muted'
                    }`}>
                      <p className="whitespace-pre-wrap text-sm break-words">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Thinking... (First request may take up to 2 minutes if server is inactive)</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex gap-2 shrink-0">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about budgeting, saving, debt management..."
                disabled={loading}
              />
              <Button type="submit" disabled={loading} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
