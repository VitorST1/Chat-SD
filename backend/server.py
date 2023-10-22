from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

HOST = 'localhost'
PORT = '22000'

messageCount = 0


@socketio.on('connect')
def test_connect():
    print('connection received')


@socketio.on('message')
def handle_message(data):
    print(f'received message: {data}')
    global messageCount

    # setting the message id
    messageCount += 1
    data['id'] = messageCount

    # by including include_self, the message wont be sent to the client that sent the message
    socketio.emit('new_message', data)


if __name__ == '__main__':
    socketio.run(app, host=HOST, port=PORT)
