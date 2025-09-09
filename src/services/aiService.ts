import axios from 'axios';
import 'dotenv/config';

const AI_API_URL = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.AI_API_KEY;

interface UserData {
    [key: string]: any;
}

interface AIInsightsResponse {
    choices: { message: { content: string } }[];
}

export const getPersonalizedInsights = async (
    userData: UserData
): Promise<string> => {
    try {
        const response = await axios.post<AIInsightsResponse>(
            AI_API_URL,
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a health assistant. Give personalized health insights based on the user\'s daily metrics.'
                    },
                    {
                        role: 'user',
                        content: `Here is my health data for today: ${JSON.stringify(userData)}. Please provide insights.`
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error: any) {
        if (error.response) {
            console.error('OpenAI API error:', error.response.status, error.response.data);
        } else {
            console.error('Error fetching insights from AI API:', error.message);
        }
        throw new Error('Failed to fetch insights');
    }
};

export async function getAIInsights(userId: string, userData: any): Promise<any> {
    // Example: call the above function and return its result
    return await getPersonalizedInsights(userData);
}