import { knowledgeBase } from "./knowledge";

export type MessageRole = "user" | "ai";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  isTyping?: boolean;
  action?: { label: string; url: string };
}

export const generateAIResponse = async (text: string, history: Message[]): Promise<Message> => {
  const lowerText = text.toLowerCase();
  
  // 1. Check for Contact intent first - Proactive guidance
  const contactKeywords = ["call", "contact", "email", "meet", "talk", "speak", "reach out", "message", "help", "support"];
  const isContactIntent = contactKeywords.some(word => lowerText.includes(word));
  
  // 2. Multi-turn Context Checking:
  // If the last AI message had an action, and the user says "yes/sure/okay", we can assume they agree.
  const lastAiMsg = [...history].reverse().find(m => m.role === "ai" && !m.isTyping);
  const isAgreement = ["yes", "sure", "okay", "ok", "yeah", "yep", "do it"].some(w => lowerText === w || lowerText.includes(` ${w} `));
  
  if (isAgreement && lastAiMsg && lastAiMsg.action) {
    return {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: `Great! Here is the link you requested. Let me know if you need anything else!`,
      action: lastAiMsg.action
    };
  }

  if (isContactIntent && !lowerText.includes("how to contact") && !lowerText.includes("where to contact")) {
      return {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "It sounds like you want to get in touch. We value your feedback and would love to hear from you directly! Please use the 'Contact Me' section to send us a secure message, and the LADEF team will respond promptly.",
          action: { label: "Go to Contact Me", url: "#contact" }
      };
  }

  // 3. Find Best Semantic Match
  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;
    // Boost score for exact keyword matches
    for (const keyword of item.keywords) {
      if (lowerText.includes(keyword)) {
        score += keyword.length; // longer keywords (more specific) give higher score
      }
    }
    
    // Simple fuzziness for multiple keywords
    const inputWords = lowerText.split(/\s+/);
    for (const word of inputWords) {
        if (word.length > 3 && item.content.toLowerCase().includes(word)) {
            score += 0.5;
        }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // 4. Formulate Response
  let responseContent = "";
  let actionItem = undefined;

  // Threshold for matching
  if (bestMatch && highestScore > 3) {
    responseContent = bestMatch.content;
    actionItem = bestMatch.actionLink;
  } else {
    // Fallback response with Proactive Contact Routing
    const contextPrompts = [
        "That's an interesting point. While my primary focus is on Hon. Lukmon Atobatele's 2026 manifesto, achievements, and LADEF initiatives, I can definitely connect you with our team for a more detailed answer.",
        "I’m still learning more about that specific detail, but I'm fully trained on LADEF's vision, healthcare outreaches, and publications. Would you like to speak directly with our campaign team?",
        "I might not have the exact answer to that just yet. However, the LADEF team is always eager to engage. Please reach out to them directly!"
    ];
    responseContent = contextPrompts[Math.floor(Math.random() * contextPrompts.length)];
    actionItem = { label: "Contact Us Now", url: "#contact" };
  }

  return {
    id: (Date.now() + 1).toString(),
    role: "ai",
    content: responseContent,
    action: actionItem
  };
};
