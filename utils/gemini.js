/**
 * Gemini API utility for React/JavaScript projects
 * Secure environment variable based API integration
 */

export async function callGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY environment variable is not set. Check your .env file.');
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

/**
 * Generate a job description
 */
export async function generateJobDescription(position, company = '') {
  const prompt = `Generate a professional job description for a ${position}${
    company ? ` at ${company}` : ''
  }. Include responsibilities, qualifications, and nice-to-have skills. Keep it concise and to the point.`;
  return callGemini(prompt);
}

/**
 * Get interview questions for a position
 */
export async function getInterviewQuestions(position, count = 5) {
  const prompt = `Generate ${count} technical interview questions for a ${position} role. Format as a numbered list.`;
  return callGemini(prompt);
}

/**
 * Get salary insights
 */
export async function getSalaryInsights(position, location = '') {
  const prompt = `Provide salary insights for a ${position} role${
    location ? ` in ${location}` : ''
  }. Include salary ranges, factors affecting compensation, and career growth potential.`;
  return callGemini(prompt);
}

/**
 * Get career advice
 */
export async function getCareerAdvice(role) {
  const prompt = `Provide career advice for someone pursuing a ${role} career path. Include skills to develop, certifications to consider, and growth opportunities.`;
  return callGemini(prompt);
}

/**
 * Analyze job requirements
 */
export async function analyzeJobRequirements(jobDescription) {
  const prompt = `Analyze this job description and identify key requirements, skills needed, and provide recommendations for candidates:\n\n${jobDescription}`;
  return callGemini(prompt);
}
