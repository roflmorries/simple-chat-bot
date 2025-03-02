export class User {
  constructor(name) {
    this.name = name ?? 'Гость';
    this.messages = this.loadMessages() || [];
  }

  sendMessage(bot, message) {
    this.messages.push(message);
    const reply = bot.processMessage(message);
    this.saveMessages();
    return reply;
  }

  saveMessages() {
    localStorage.setItem('userMessages', JSON.stringify(this.messages));
  }

  loadMessages() {
    const messages = localStorage.getItem('userMessages');
    return messages ? JSON.parse(messages) : [];
  }

  loadMessages() {
    const messages = localStorage.getItem('userMessages');
    return messages ? JSON.parse(messages) : [];
  }
}
