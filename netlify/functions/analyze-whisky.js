exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get the whisky name from the request
  const { whiskyName } = JSON.parse(event.body);

  if (!whiskyName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Whisky name is required' })
    };
  }

  const prompt = `Analyze the flavor profile of ${whiskyName} bourbon/whiskey based on professional reviews. 

You need to provide TWO scores from 0-10:
1. OAKINESS (0-10): How much oak influence - vanilla, wood tannins, char, leather, tobacco
2. FRUIT INTENSITY (0-10): How much fruit character - cherry, apple, citrus, berry, stone fruit

Consider:
- Wheated whiskeys tend to be high fruit (6-9), low oak (0.5-3)
- Four Roses tends to be high fruit (8-9), moderate oak (4-5.5)
- Aged whiskeys (12+ years) tend to be higher oak (6-9)
- High-proof whiskeys often emphasize spice and oak
- Rye-heavy mashbills emphasize spice over fruit

Respond with ONLY valid JSON in this exact format:
{
  "oakiness": 5.5,
  "fruitIntensity": 6.5,
  "confidence": "high",
  "keyNotes": "brief description of main flavors"
}

DO NOT include any other text. Only output the JSON object.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    let responseText = data.content[0].text;
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const analysis = JSON.parse(responseText);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(analysis)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to analyze whisky',
        message: error.message 
      })
    };
  }
};