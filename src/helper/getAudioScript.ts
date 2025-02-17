"use server"

import { ElevenLabsClient } from 'elevenlabs';
import { createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || "sk_fb44db183b7bf462f242634011c93a2f808bee7f90593b1f";

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

export const createAudioFileFromText = async (text: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const audio = await client.generate({
        voice: 'Rachel',
        model_id: 'eleven_turbo_v2_5',
        text,
      });
      
      // Generate unique filename
      const fileName = `${uuid()}.mp3`;
      // Save to Next.js public folder
      const publicPath = path.join(process.cwd(), 'public', fileName);
      const fileStream = createWriteStream(publicPath);

      audio.pipe(fileStream);
      fileStream.on('finish', () => resolve(fileName)); // Resolve with the fileName
      fileStream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
};
