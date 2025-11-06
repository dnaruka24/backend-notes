/* 
    MCP server ka use LLMs ko kuch resources, tools, prompts provide karne ke liye kiya jata hai.
    Tools ka use LLMs ko specific tasks perform karne ke liye kiya jata hai, jaise ki calculations karna, data fetch karna, etc.
    Prompts ka use LLMs ko specific instructions dene ke liye kiya jata hai.
*/

/*
    TRANSPORTS:
    Transport ka kaam hota hai MCP server aur clients ke beech communication establish karna.
    MCP server alag-alag transports ke through communicate kar sakta hai, jaise ki stdio, websockets, HTTP, etc.
    Is example mein hum stdio transport ka use kar rahe hain.
    
    stdio:
    locally run hone wale LLMs ke saath communicate karne ke liye use hota hai. ex: localhost par run hone wale LLMs

*/

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Create an MCP server
const server = new McpServer({
    name: 'demo-server',
    version: '1.0.0'
});

// Add an addition tool
server.registerTool('addTwoNumbers', {
        title: 'Addition Tool',
        description: 'Add two numbers',
        inputSchema: z.object({
            a: z.number().describe('The first number'),
            b: z.number().describe('The second number')
        })
    },
    async ({ a, b }) => {
        return {
            content: [{ type: 'text', text: String(a + b) }]
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);