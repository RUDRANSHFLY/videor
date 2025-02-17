import { fal } from "@fal-ai/client";



export const fetchBackground = async () => {
  try {
    fal.config({
      credentials: process.env.FAL_KEY || 
      
      "f7776511-0cdf-4f1d-a1e5-0529f9e46635:7b82a9c6426891c4a96f10d7840be82b",
    });

    const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
      input: {
        prompt: "Astronaut exploring galaxies or Astronaut traveling the universe.",
        aspect_ratio : "9:16",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    console.log(result.data);
    console.log(result.requestId);

    if (result.data && result.data.images && result.data.images.length > 0) {
      const imageUrl = result.data.images[0].url;
      console.log('Image URL:', imageUrl);
      return imageUrl;
    } else {
      console.log('No images found in result data.');
      return null;
    }
  } catch (error) {
    console.log(`Error creating Background Image : ${error}`);
    return null;
  }
}


fetchBackground();