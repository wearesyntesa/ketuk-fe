export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import amqp from 'amqplib';

// Gunakan format full: amqp://user:pass@host:port
const USER = process.env.QUEUE_USER || 'user';
const PASS = process.env.QUEUE_PASSWORD || 'password';
const HOST = process.env.RABBITMQ_HOST || "192.168.10.184";
const PORT = process.env.QUEUE_PORT || 5672;

const RABBITMQ_URL = `amqp://${USER}:${PASS}@${HOST}:${PORT}`;
const EXCHANGE_NAME = 'schedule';
const ROUTING_KEY = 'tickets.created';

export async function POST(request: NextRequest) {
    console.log("Received request to create ticket");
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // --- DI SINI ANDA HARUS VERIFIKASI TOKEN ---
    // Contoh: const decoded = verifyJwt(token); 
    // Jika tidak diverifikasi, siapapun yang punya token palsu bisa nge-spam RabbitMQ.

    try {
        const { payload } = await request.json();

        // 1. Koneksi
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        // 2. Pastikan Exchange (Gunakan Durable agar tidak hilang saat RabbitMQ restart)
        // await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });
        await channel.assertQueue(EXCHANGE_NAME, { durable: false });
        
        // 3. Tambahkan Metadata (Opsional tapi sangat berguna)
        const messagePayload = {
            ...payload,
            _metadata: {
                createdAt: new Date().toISOString(),
                source: 'nextjs-frontend'
            }
        };

        // Gunakan callback atau pastikan pesan terkirim
        const isSent = channel.sendToQueue(
            EXCHANGE_NAME,  
            Buffer.from(JSON.stringify(messagePayload))
        );

        // Berikan sedikit delay atau pastikan drain event jika isSent false
        if (!isSent) {
            console.error("Pesan gagal masuk buffer");
        } else {
            console.log("Pesan berhasil dikirim ke antrean");
        }

        await channel.close();
        await connection.close();

        return NextResponse.json({ success: true, message: 'Ticket queued!' });

    } catch (error: any) {
        console.error('RabbitMQ Error:', error.message);
        return NextResponse.json({ 
            success: false, 
            message: 'Gagal terhubung ke antrean' 
        }, { status: 500 });
    }
}