import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text, ssml } = await req.json();

    if (!text && !ssml) {
      return NextResponse.json({ error: 'Either text or SSML is required' }, { status: 400 });
    }

    // Ensure SSML is wrapped properly
    const input = ssml 
      ? { ssml: `<speak>${ssml}</speak>` } 
      : { text };

    // API Key from environment variables
    const apiKey = process.env.GOOGLE_API_KEY;
    const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    // const requestBody = {
    //   input,
    //   voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    //   audioConfig: { audioEncoding: 'MP3' },
    // };

    const requestBody = {
      input,
      voice: { 
        languageCode: "en-US", 
        name: "en-US-Wavenet-F",
        ssmlGender: "FEMALE" 
      },
      audioConfig: { 
        audioEncoding: "MP3",
        speakingRate: 0.95,
        pitch: 2.0, 
        volumeGainDb: 1.0,
      }
    };

    console.log(requestBody)

    // Send request to Google Text-to-Speech API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return NextResponse.json({ error: 'Error generating speech' }, { status: response.status });
    }

    const { audioContent } = await response.json();

    return new NextResponse(Buffer.from(audioContent, 'base64'), {
      headers: { 'Content-Type': 'audio/mpeg' },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error generating speech' }, { status: 500 });
  }
}
