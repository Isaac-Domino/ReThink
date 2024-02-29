const steps = [
    {
      id: 1,
      desc: "1. Sign Up and Unlock Features:",
      sub: "Visit [LINK] and create a free account. This opens up the door to features like creating your own chat AI assistants."
    },
    {
      id: 2,
      desc: "2. Craft Your First AI Chat:",
      sub: "Click ` Create New` and give your chatbot a fitting title.",
      sub2: `Under "Documents," click "Insert New Document" and choose the file you want the AI to analyze. Upload and wait for it to process.`
    },
    {
      id: 3,
      desc:"Engage in Conversation",
      sub: `Now, the magic happens! Type your questions directly into the chat window. The AI will scan your document and provide relevant answers and information.`,
      sub2: `Don't hesitate to ask follow-up questions or delve deeper into specific topics. The AI is here to guide you through your document's content.`,
    }, 
    {
      id: 4,
      desc: "4: Explore Existing Chats:",
      sub: `Before building a new chat, check out "Archive" to access all your previous conversations with different AI assistants. This can be a great way to revisit past learning sessions or reuse helpful chatbots.`
    },
    {
      id: 5,
      desc: "Pro Tip:",
      sub: "Think of your AI chat like a personal research assistant. The more specific your questions are, the better it can understand your needs and provide tailored"
    }
  ]


export default function HowToUse() {
    return (
      <>
        <p className="font-medium text-[16px]">
          ReThink: A Simplified Guide ReThink lets you build your own AI
          chatbots and engage in insightful conversations about uploaded
          documents. Heres a breakdown to get you started:{" "}
        </p>
        <br />

        {steps.map((item) => (
          <div key={item.id}>
            <strong>{item.desc}</strong>
            <p>-{item.sub}</p>
            <p>-{item.sub2}</p>
          </div>
        ))}
      </>
    );
}