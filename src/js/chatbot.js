export class Chatbot {
  constructor(name = 'Chat-bot') {
    this.name = name;
    this.history = [];
    this.commands = new Map([
      [/Привет/i, () => 'Привет! Как тебя зовут?'],
      [/Как дела\?/i, () => 'Отлично! У тебя как?'],
      [/Сколько времени\?/i, () => `Сейчас ${new Date().toLocaleTimeString()}`],
      [/Какой сегодня день\?/i, () => `Сегодня ${new Date().toLocaleDateString()}`],
      [/Мне скучно/i, () => "Может, расскажу шутку? Напиши 'Расскажи шутку'"],
      [/Расскажи шутку/i, () => 'Почему программисты не любят природу? Потому что в ней слишком много багов!'],
      [/Пока/i, () => 'Хорошего дня!'],
    ]);

    this[Symbol.iterator] = function* () {
      for (const message of this.history) {
        yield message;
      }
    };
  }

  processMessage(input) {
    this.history.push(input);
    this.saveHistory();

    for (const [pattern, response] of this.commands) {
      if (input.match(pattern)) {
        const reply = response();
        this.history.push(reply);
        this.saveHistory();
        return reply;
      }
    }
    return 'Такой команды не существует!';
  }

  getLastMessage() {
    return this.history.at(-1) ?? 'История сообщений пуста!';
  }

  saveHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(this.history));
  }

  loadHistory() {
    const history = localStorage.getItem('chatHistory');
    return history ? JSON.parse(history) : [];
  }
}
