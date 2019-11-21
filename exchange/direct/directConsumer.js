// 构建消费者
const amqp = require('amqplib');

async function consumer() {
    // 1. 创建链接对象
    const connection = await amqp.connect('amqp://localhost:5672');

    // 2. 获取通道
    const channel = await connection.createChannel();

    // 3. 声明参数
    const queueName = 'direct_kaola_queue';
    const routingKey = 'direct_routingKey';
    const exchangeName = 'direct_kaola_exchange'

    // 声明一个交换机
    await channel.assertExchange(exchangeName, 'direct', { durable: true });

    // 声明一个队列
    await channel.assertQueue(queueName);

    // 绑定关系（队列、交换机、路由键）
    await channel.bindQueue(queueName, exchangeName, routingKey);

    // 消费
    await channel.consume(queueName, msg => {
        console.log('Consumer：', msg.content.toString());
        channel.ack(msg);
    });
}

consumer();