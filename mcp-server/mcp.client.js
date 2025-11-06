import { config } from 'dotenv';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { GoogleGenAI, Type } from "@google/genai";

config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const tools = []

const transport = new StdioClientTransport({
    command: 'node',
    args: ['mcp.server.js']
});

const client = new Client({
    name: 'example-client',
    version: '1.0.0'
});

await client.connect(transport);

//listTools method se mcp server jitne bhi tools client ko provide kar raha hai uska pata laga skte hai.

client.listTools().then(async response => {
    response.tools.forEach(tool => {
        tools.push({
            name: tool.name,
            description: tool.description,
            parameters: {
                type: "OBJECT",
                properties: tool.inputSchema.properties,
                required: tool.inputSchema.required || []
            }
        })
    })

    const aiResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "add 267 and 303",
        config: {
            tools: [{
                functionDeclarations: tools
            }],
        }
    });

    console.log(aiResponse.functionCalls);

    aiResponse.functionCalls.forEach(async call => {
        const toolResponse = await client.callTool({
            name: call.name,
            arguments: call.args
        })

        console.log(toolResponse);

    })

})
