import { Chatbot } from './chatbot.js';
import { User } from './user.js';
import '../style.css';

const bot = new Chatbot();
const user = new User(localStorage.getItem('username') ?? 'Guest');

document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat__window');
  const input = document.getElementById('chat__input');
  const sendButton = document.getElementById('send-btn');
  const saveNameButton = document.getElementById('save-name-btn');
  const nameInput = document.getElementById('name-input');
  const chatContainer = document.querySelector('.chat__container');

  function updateChat(...messages) {
    messages.forEach(({ message, sender = 'user' }) => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', sender);
      messageElement.textContent = message;
      chat.appendChild(messageElement);
      chat.scrollTop = chat.scrollHeight;
    });
  }

  function handleMessage() {
    const message = input.value.trim();
    const name = localStorage.getItem('username') || 'Гость';

    if (!message) return;

    updateChat({ message: `${name}: ${message}` });
    const reply = user.sendMessage(bot, message);
    updateChat({ message: `bot: ${reply}`, sender: 'bot' });

    const lastMessage = bot.getLastMessage();
    if (lastMessage.includes('багов!')) {
      setTimeout(() => updateChat({ message: 'bot: Мог бы и посмеяться ради приличия...', sender: 'bot' }), 2500);
    }

    input.value = '';
  }

  function saveUserName() {
    const name = nameInput.value.trim();
    if (name) {
      localStorage.setItem('username', name);
      user.name = name;
      updateChat({ message: `bot: Привет, ${name}! Твое имя сохранено!`, sender: 'bot' });
    }
  }

  sendButton.addEventListener('click', () => {
    handleMessage();
    chat.classList.remove('hidden');
  });

  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleMessage();
      chat.classList.remove('hidden');
    }
  });

  document.querySelector('.close__button').addEventListener('click', () => {
    chatContainer.classList.add('hidden');
  });
  document.querySelector('.play').addEventListener('click', () => {
    chatContainer.classList.remove('hidden');
  });

  saveNameButton.addEventListener('click', saveUserName);

  bot.history.forEach((message) => updateChat({ message, sender: 'bot' }));
  user.messages.forEach((message) => updateChat({ message: `${user.name}: ${message}` }));
});
