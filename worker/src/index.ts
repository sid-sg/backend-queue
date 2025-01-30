import { createClient } from 'redis';

const client = createClient();

async function workSubmission(givenWork: string) {
    const { userId, prompt } = JSON.parse(givenWork);

    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log(`User ${userId} finished work: ${prompt}`);
}

(async () => {
    try {
        await client.connect();
        console.log("Worker connected to Redis.");

        while (true) {
            try {
                const submission = await client.brPop("userRequests", 0);
                if (submission) {
                    await workSubmission(submission.element);
                }
            } catch (error) {
                console.error("Error processing submission:", error);
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
})();


