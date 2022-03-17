import { createClient } from 'redis';
import { redisHost, redisPort } from './keys.js';

const client = createClient({
  Socket: {
    host: redisHost,
    port: redisPort,
    reconnectStrategy:() => 1000
  },
});

const sub = client.duplicate()

const fib = (index) => {
    if (index < 2) return 1
    return fib(index - 1) + fib(index - 2)
}

sub.on('message', (channel, message) => {
    client.hSet('values', message, fib(parseInt(message)))
})

sub.subscribe('insert')