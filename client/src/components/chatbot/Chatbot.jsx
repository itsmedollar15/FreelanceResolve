import React, { useState } from "react";
import "./Chatbot.css"; // For styling

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Predefined bot responses related to freelance services
  const botResponses = [
    {
      pattern: /hello|hi|hey/i,
      responses: ["Hello! How can I assist you today?", "Hi! How can I help?"],
    },
    {
      pattern: /how are you/i,
      responses: ["I'm good, how about you?", "Doing well! How are you?"],
    },
    {
      pattern: /goodbye|bye/i,
      responses: ["Goodbye! Have a great day!", "Bye! Take care."],
    },
    {
      pattern: /what can you do/i,
      responses: [
        "I can assist you with your queries about our services.",
        "I can help you find the right gig for you.",
      ],
    },
    {
      pattern: /help/i,
      responses: [
        "Sure! How can I help you?",
        "What do you need assistance with?",
      ],
    },
    {
      pattern: /what is freelance/i,
      responses: [
        "Freelance is a way of working independently, offering services to multiple clients.",
      ],
    },
    {
      pattern: /how to hire a freelancer/i,
      responses: [
        "You can hire freelancers through platforms like Upwork, Fiverr, and Freelancer.",
      ],
    },
    {
      pattern: /what services can freelancers offer/i,
      responses: [
        "Freelancers can offer services in writing, design, programming, marketing, and more.",
      ],
    },
    {
      pattern: /how to become a freelancer/i,
      responses: [
        "Start by identifying your skills, building a portfolio, and signing up on freelance platforms.",
      ],
    },
    {
      pattern: /what is a portfolio/i,
      responses: [
        "A portfolio showcases your work and skills to potential clients.",
      ],
    },
    {
      pattern: /how much do freelancers charge/i,
      responses: [
        "Freelancer rates vary widely based on experience, skill level, and project complexity.",
      ],
    },
    {
      pattern: /is freelancing a good career/i,
      responses: [
        "Freelancing can be rewarding, offering flexibility and independence, but it also comes with challenges.",
      ],
    },
    {
      pattern: /how to find freelance jobs/i,
      responses: [
        "You can find freelance jobs on platforms like Upwork, Fiverr, and LinkedIn.",
      ],
    },
    {
      pattern: /what are the benefits of freelancing/i,
      responses: [
        "Benefits include flexible work hours, diverse projects, and the ability to work from anywhere.",
      ],
    },
    {
      pattern: /what is a freelance contract/i,
      responses: [
        "A freelance contract outlines the terms of the project, including payment, deadlines, and deliverables.",
      ],
    },
    {
      pattern: /how to write a freelance proposal/i,
      responses: [
        "A proposal should include your skills, experience, project understanding, and pricing.",
      ],
    },
    {
      pattern: /what is the best freelance platform/i,
      responses: [
        "Popular platforms include Upwork, Fiverr, Freelancer, and Toptal.",
      ],
    },
    {
      pattern: /how to manage freelance clients/i,
      responses: [
        "Communicate clearly, set expectations, and deliver on time to maintain good client relationships.",
      ],
    },
    {
      pattern: /what is a gig economy/i,
      responses: [
        "The gig economy refers to a labor market characterized by short-term contracts or freelance work.",
      ],
    },
    {
      pattern: /how to price freelance work/i,
      responses: [
        "Consider your experience, project complexity, and market rates when setting your prices.",
      ],
    },
    {
      pattern: /how to handle difficult clients/i,
      responses: [
        "Stay calm, communicate professionally, and set clear boundaries to manage difficult clients.",
      ],
    },
    {
      pattern: /what skills do I need to be a freelancer/i,
      responses: [
        "Skills vary by industry but commonly include communication, time management, and expertise in your field.",
      ],
    },
    {
      pattern: /how to invoice clients/i,
      responses: [
        "Use invoicing software to create professional invoices, detailing your services and payment terms.",
      ],
    },
    {
      pattern: /what is a freelancer's tax obligation/i,
      responses: [
        "Freelancers need to report their income and may need to pay estimated taxes throughout the year.",
      ],
    },
    {
      pattern: /how to build a freelance brand/i,
      responses: [
        "Develop a unique selling proposition, maintain a professional online presence, and network within your industry.",
      ],
    },
    {
      pattern: /what are common freelance mistakes/i,
      responses: [
        "Common mistakes include underpricing services, neglecting contracts, and poor time management.",
      ],
    },
    {
      pattern: /how to network as a freelancer/i,
      responses: [
        "Attend industry events, join online communities, and connect with others on LinkedIn.",
      ],
    },
    {
      pattern: /how to showcase freelance work/i,
      responses: [
        "Use a personal website, social media, or platforms like Behance to showcase your work.",
      ],
    },
    {
      pattern: /what is client onboarding/i,
      responses: [
        "Client onboarding is the process of getting a new client set up and ready for the project.",
      ],
    },
    {
      pattern: /how to ask for referrals/i,
      responses: [
        "Politely ask satisfied clients for referrals after successfully completing a project.",
      ],
    },
    {
      pattern: /what is scope creep/i,
      responses: [
        "Scope creep refers to the gradual expansion of project scope beyond the original agreement.",
      ],
    },
    {
      pattern: /how to prevent scope creep/i,
      responses: [
        "Define clear project scopes, set milestones, and maintain open communication with clients.",
      ],
    },
    {
      pattern: /what are the best tools for freelancers/i,
      responses: [
        "Tools like Trello, Slack, and Google Workspace help with project management and communication.",
      ],
    },
    {
      pattern: /how to maintain work-life balance as a freelancer/i,
      responses: [
        "Set boundaries for work hours, take breaks, and prioritize personal time.",
      ],
    },
    {
      pattern: /what is a freelancer community/i,
      responses: [
        "A freelancer community is a network of freelancers who support and share resources with each other.",
      ],
    },
    {
      pattern: /how to write a freelance resume/i,
      responses: [
        "Highlight your skills, experience, and notable projects in a concise format.",
      ],
    },
    {
      pattern: /how to handle payments/i,
      responses: [
        "Use secure payment methods and consider platforms like PayPal, Stripe, or direct bank transfers.",
      ],
    },
    {
      pattern: /what to do if a client doesn’t pay/i,
      responses: [
        "Follow up professionally, send a reminder invoice, and consider legal action if necessary.",
      ],
    },
    {
      pattern: /what is a freelance niche/i,
      responses: [
        "A freelance niche is a specific area of expertise you focus on to attract clients.",
      ],
    },
    {
      pattern: /how to find my freelance niche/i,
      responses: [
        "Identify your skills, interests, and market demand to find a suitable niche.",
      ],
    },
    {
      pattern: /how to stay motivated as a freelancer/i,
      responses: [
        "Set clear goals, celebrate small wins, and keep your workspace organized to stay motivated.",
      ],
    },
    {
      pattern: /how to improve freelance skills/i,
      responses: [
        "Take online courses, attend workshops, and practice your craft regularly to improve your skills.",
      ],
    },
    {
      pattern: /how to build long-term client relationships/i,
      responses: [
        "Deliver quality work, communicate regularly, and show appreciation to build long-term relationships.",
      ],
    },
    {
      pattern: /what is a freelance agreement/i,
      responses: [
        "A freelance agreement is a contract that outlines the terms of service between you and your client.",
      ],
    },
    {
      pattern: /how to set freelance boundaries/i,
      responses: [
        "Clearly define your availability, work hours, and project scope to set boundaries.",
      ],
    },
    {
      pattern: /how to choose the right freelance platform/i,
      responses: [
        "Consider your skills, the platform’s user base, and fee structure when choosing a platform.",
      ],
    },
    {
      pattern: /what is a freelance network/i,
      responses: [
        "A freelance network is a group of freelancers who connect and collaborate on projects.",
      ],
    },
    {
      pattern: /how to market myself as a freelancer/i,
      responses: [
        "Use social media, create a website, and attend networking events to market yourself.",
      ],
    },
    {
      pattern: /how to get freelance testimonials/i,
      responses: [
        "Request feedback from clients after project completion and display testimonials on your profile.",
      ],
    },
    {
      pattern: /what are the risks of freelancing/i,
      responses: [
        "Risks include income instability, lack of benefits, and difficulty finding clients.",
      ],
    },
    {
      pattern: /how to prepare for a freelance interview/i,
      responses: [
        "Research the client, prepare your portfolio, and practice common interview questions.",
      ],
    },
    {
      pattern: /how to negotiate freelance rates/i,
      responses: [
        "Be clear about your value, provide evidence of your skills, and remain open to compromise.",
      ],
    },
  ];

  const getPredefinedResponse = (userMessage) => {
    for (const { pattern, responses } of botResponses) {
      if (pattern.test(userMessage)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    return null;
  };

  const getChatbotResponse = async (userMessage) => {
    try {
      const response = await fetch("http://localhost:5000/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: userMessage }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "Sorry, something went wrong!";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = input;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userMessage },
      ]);
      setInput("");

      setIsTyping(true);

      const predefinedResponse = getPredefinedResponse(userMessage);
      let botResponse;

      if (predefinedResponse) {
        botResponse = predefinedResponse;
      } else {
        botResponse = await getChatbotResponse(userMessage);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-heading">FreelanceResolve Chatbot</h2>{" "}
      {/* Added heading */}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="chat-message bot">Typing...</div>}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;
