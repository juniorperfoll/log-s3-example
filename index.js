require('dotenv').config();

const fs = require('fs-extra');
const os = require('os');
const AWS = require('aws-sdk');
const path = require('path');

// Configuração do AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.BUCKET_NAME;
const LOG_FILE = path.join(__dirname, 'log_sistema.txt');

// Função para coletar dados do sistema
function getSystemStats() {
  return {
    timestamp: new Date().toISOString(),
    platform: os.platform(),
    uptime: os.uptime(),
    freeMemory: os.freemem(),
    totalMemory: os.totalmem(),
    cpuUsage: os.cpus().map(cpu => cpu.model).join(', '),
  };
}

// Função para gravar os dados no arquivo
async function logSystemStats() {
  const stats = getSystemStats();
  const logEntry = `[${stats.timestamp}] Platform: ${stats.platform}, Uptime: ${stats.uptime}s, Free Memory: ${stats.freeMemory}, Total Memory: ${stats.totalMemory}, CPU: ${stats.cpuUsage}\n`;

  await fs.appendFile(LOG_FILE, logEntry);
  console.log('Log atualizado.');
}

// Função para fazer o upload do arquivo para o S3
async function uploadToS3() {
  try {
    const fileContent = await fs.readFile(LOG_FILE);
    const params = {
      Bucket: BUCKET_NAME,
      Key: `logs/log_sistema_${Date.now()}.txt`,
      Body: fileContent,
      ContentType: 'text/plain',
    };

    await s3.upload(params).promise();
    console.log('Arquivo enviado para o S3 com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar para o S3:', error);
  }
}

// Executando as funções
(async () => {
  await logSystemStats();
  await uploadToS3();
})();
