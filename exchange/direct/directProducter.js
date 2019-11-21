const amqp =require('amqplib');

async function  product(params) {
    // 1. 创建链接对象
    const connection = await amqp.connect('amqp://localhost:5672');

     // 2. 获取通道
     const channel = await connection.createChannel();
 
     // 3. 声明参数
     const routingKey = 'helloKoalaQueue';
     const msg = 'hello koala';
     const exchangeName = 'direct_kaola_exchange'
    
     // 4. 声明交换机
     await channel.assertExchange(exchangeName, 'direct', {
        durable: true,
     });

     // 5. 发送消息
     await channel.publish(exchangeName, routingKey, Buffer.from(msg));
 
     // 6. 关闭通道
     await channel.close();
     // 7. 关闭连接
     await connect.close()
}
product();