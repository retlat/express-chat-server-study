function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {
  const socket = io();

  const app = new Vue({
    el: '#app',
    data: {
      messages: [],
      input: ''
    },
    methods: {
      cardClass: function (message) {
        return {
          'text-white': message.mine,
          'bg-info': message.mine,
          'ml-auto': message.mine
        }
      },
      submit: function () {
        socket.emit('message', { content: this.input });
        this.messages.push({
          content: this.input,
          mine: true
        });
        this.input = '';
      }
    }
  });

  socket.on('message', function (msg) {
    app.messages.push({
      content: msg.content,
      mine: false
    });
  });
});
