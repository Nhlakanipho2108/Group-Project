const CHAT_STORAGE_KEY = 'youthconnect_chat_context';
const USER_STORAGE_KEY = 'loggedInUser';

const suggestions = [
  'Suggest skills for me',
  'What opportunities fit my profile?',
  'How does YouthConnect work?',
  'Recommend portfolio ideas'
];

const skillSuggestions = {
  design: ['Graphic Design', 'UI/UX Design', 'Branding'],
  tech: ['Frontend Development', 'Python', 'Data Analysis'],
  writing: ['Content Writing', 'Copywriting', 'SEO Writing'],
  marketing: ['Social Media Management', 'Email Marketing', 'Digital Ads']
};

const portfolioIdeas = {
  design: [
    'Branding mockups for a local business',
    'A mobile app UI case study',
    'A social media content calendar'
  ],
  tech: [
    'A personal website with projects',
    'A dashboard for tracking habits',
    'A small web app using APIs'
  ],
  writing: [
    'A blog portfolio with 5 articles',
    'SEO content samples for different niches',
    'A copywriting sample pack'
  ],
  marketing: [
    'Campaign analysis reports',
    'A sample Instagram growth strategy',
    'Email newsletter examples'
  ]
};

function getUserName() {
  const storedUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null');
  if (storedUser && storedUser.firstName) {
    return storedUser.firstName;
  }

  const storedName = localStorage.getItem('chatbot_name');
  return storedName || 'there';
}

function setUserName(name) {
  localStorage.setItem('chatbot_name', name.trim());
}

function getContext() {
  return JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '{}');
}

function saveContext(context) {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(context));
}

function detectCategory(message) {
  const lower = message.toLowerCase();
  if (/(design|ui|ux|figma|logo|branding|graphic)/.test(lower)) return 'design';
  if (/(code|developer|website|app|program|tech|software|python|javascript|html|css|react)/.test(lower)) return 'tech';
  if (/(write|content|seo|blog|copy|article|marketing text)/.test(lower)) return 'writing';
  if (/(marketing|social media|ads|campaign|brand|email)/.test(lower)) return 'marketing';
  return 'general';
}

function getGreeting(name) {
  if (!name || name === 'there') {
    return `Hi there! I’m YouthConnect AI. What should I call you? I can then suggest skills, portfolio ideas, and answer questions about how the platform works.`;
  }

  return `Hi ${name}! I’m YouthConnect AI. I can help you discover skills, suggest portfolio ideas, and explain how the platform works.`;
}

function getSuggestedSkills(category) {
  const options = skillSuggestions[category] || [
    'Communication',
    'Time Management',
    'Problem Solving'
  ];
  return `A good starting set is: ${options.join(', ')}.`;
}

function getPortfolioSuggestions(category) {
  const ideas = portfolioIdeas[category] || [
    'A project case study',
    'Before-and-after work samples',
    'A short personal brand page'
  ];
  return `You could build: ${ideas.join(' • ')}.`;
}

function answerQuestion(message, name) {
  const lower = message.toLowerCase();
  const category = detectCategory(message);
  const context = getContext();

  if (/(what is|how does|how do|explain|platform|website)/.test(lower)) {
    return `Hi ${name}! YouthConnect helps young people find freelance opportunities, build skills, and connect with clients. You can browse jobs, create a profile, apply for projects, and grow your portfolio here.`;
  }

  if (/(skill|skills|recommend|best skills|what should i learn)/.test(lower)) {
    return `${getSuggestedSkills(category)} If you want, I can also tailor recommendations for your background or goals.`;
  }

  if (/(portfolio|project ideas|work samples|showcase|build|portfolio ideas)/.test(lower)) {
    return `${getPortfolioSuggestions(category)} These are great for showing your experience to clients.`;
  }

  if (/(category|categories|fit|field|career)/.test(lower)) {
    const categories = ['Design', 'Development', 'Writing', 'Marketing'];
    return `Popular categories on YouthConnect include: ${categories.join(', ')}. If you're unsure, I can suggest the best one based on your interests.`;
  }

  if (/(name|my name is|i am|i'm|call me|you can call me|what should i call you)/.test(lower)) {
    const capturedName = message
      .replace(/my name is|i am|i'm|call me|you can call me|what should i call you|name is/i, '')
      .replace(/[^a-zA-Z\s]/g, '')
      .trim();

    if (capturedName) {
      setUserName(capturedName);
      context.name = capturedName;
      saveContext(context);
      return `Nice to meet you, ${capturedName}! I'll remember that and use your name going forward.`;
    }

    return `Absolutely — what would you like me to call you?`;
  }

  if (/(thank you|thanks|bye|goodbye|exit)/.test(lower)) {
    return `You're welcome, ${name}! Feel free to ask me anything else about skills, portfolios, or opportunities.`;
  }

  return `Thanks for asking, ${name}. I can help with skills, portfolio ideas, categories, or explain how YouthConnect works.`;
}

function addMessage(text, sender) {
  const messages = document.getElementById('chatbotMessages');
  const msg = document.createElement('div');
  msg.className = `chatbot-message ${sender}`;
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chatbotInput');
  const text = input.value.trim();
  if (!text) return;

  const name = getUserName();
  addMessage(text, 'user');
  input.value = '';

  const response = answerQuestion(text, name);
  setTimeout(() => addMessage(response, 'bot'), 300);
}

function initChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const panel = document.getElementById('chatbotPanel');
  const close = document.getElementById('chatbotClose');
  const sendBtn = document.getElementById('chatbotSend');
  const input = document.getElementById('chatbotInput');

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      const currentName = getUserName();
      if (!document.getElementById('chatbotMessages').hasChildNodes()) {
        addMessage(getGreeting(currentName), 'bot');
      }
      input.focus();
    }
  });

  close.addEventListener('click', () => panel.classList.remove('open'));
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  document.querySelectorAll('.chatbot-suggestions button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const suggestion = btn.dataset.suggestion;
      input.value = suggestion;
      sendMessage();
    });
  });

  const context = getContext();
  if (context.name) {
    setUserName(context.name);
  }

  const currentName = getUserName();
  addMessage(getGreeting(currentName), 'bot');
}

document.addEventListener('DOMContentLoaded', initChatbot);
