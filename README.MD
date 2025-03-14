# Monitoramento do Sistema com Upload para AWS S3  

Este é um exemplo de aplicação em **Node.js** que realiza as seguintes tarefas:  

✅ Coleta dados do sistema operacional, como uso de CPU, memória e uptime.  
✅ Grava essas informações em um arquivo de log local.  
✅ Envia o arquivo de log para um bucket S3 da AWS.  

## 🚀 Pré-requisitos  

Antes de executar o projeto, certifique-se de ter:  

- **Node.js** instalado na máquina ([Download aqui](https://nodejs.org/)).  
- **Conta AWS** com permissões para acessar o **S3**.  
- Criado um **bucket S3** para armazenar os logs.  
- Configurado um usuário IAM com permissões adequadas para upload no S3.  

## 🔧 Configuração do Ambiente  

1. **Clone o repositório:**  
   ```sh
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo

2. **Instale as dependências:**
    ```sh
    npm install

3. **Crie um arquivo .env na raiz do projeto e configure suas credenciais da AWS:**
    ```sh
    touch .env

4. **Adicione o seguinte conteúdo ao arquivo .env:**
    ```end
    AWS_ACCESS_KEY_ID=SEU_ACCESS_KEY
    AWS_SECRET_ACCESS_KEY=SEU_SECRET_KEY
    AWS_REGION=us-east-1
    BUCKET_NAME=seu-bucket-aqui

5. **Executar o script manualmente:**

node index.js
Após a execução, o script irá gerar um arquivo de log local e enviá-lo automaticamente para o bucket S3 configurado.