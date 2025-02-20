import { FullConfig } from '@playwright/test';
import { spawn } from 'child_process';

async function globalSetup(config: FullConfig) {
    console.log('Starting local server...');
    const server = spawn('npm', ['start']);

    await new Promise(resolve => setTimeout(resolve, 3000)); // Чекаємо, поки сервер запуститься
}

export default globalSetup;
