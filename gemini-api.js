/**
 * Gemini API Integration
 * Provides utilities to interact with Google's Gemini API
 * Reads the API key from a browser global so this file works without a bundler.
 * 
 * Setup:
 *   1. Copy config.example.js to config.js and add your key.
 *   2. Import and use: callGemini('your prompt')
 */

/**
 * Call Gemini API with a prompt
 * @param {string} prompt - The prompt to send to Gemini
 * @returns {Promise<string>} - The response from Gemini
 */
export async function callGemini(prompt) {
  const apiKey = window.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('window.GEMINI_API_KEY is not set');
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
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

/**
 * Generate a job description based on position and role
 * @param {string} position - Job position (e.g., "Frontend Developer")
 * @param {string} company - Company name
 * @returns {Promise<string>} - Generated job description
 */
export async function generateJobDescription(position, company = '') {
  const prompt = `Generate a professional job description for a ${position}${
    company ? ` at ${company}` : ''
  }. Include responsibilities, qualifications, and nice-to-have skills. Keep it concise and to the point.`;
  return callGemini(prompt);
}

/**
 * Get interview questions for a job position
 * @param {string} position - Job position
 * @param {number} count - Number of questions (default 5)
 * @returns {Promise<string>} - Interview questions
 */
export async function getInterviewQuestions(position, count = 5) {
  const prompt = `Generate ${count} technical interview questions for a ${position} role. Format as a numbered list.`;
  return callGemini(prompt);
}

/**
 * Get salary insights for a position
 * @param {string} position - Job position
 * @param {string} location - Location (optional)
 * @returns {Promise<string>} - Salary information
 */
export async function getSalaryInsights(position, location = '') {
  const prompt = `Provide salary insights for a ${position} role${
    location ? ` in ${location}` : ''
  }. Include salary ranges, factors affecting compensation, and career growth potential.`;
  return callGemini(prompt);
}

/**
 * Get career advice for a specific role
 * @param {string} role - Job role/title
 * @returns {Promise<string>} - Career advice
 */
export async function getCareerAdvice(role) {
  const prompt = `Provide career advice for someone pursuing a ${role} career path. Include skills to develop, certifications to consider, and growth opportunities.`;
  return callGemini(prompt);
}

/**
 * Analyze job requirements and suggest matching skills
 * @param {string} jobDescription - Job description text
 * @returns {Promise<string>} - Analysis and skill recommendations
 */
export async function analyzeJobRequirements(jobDescription) {
  const prompt = `Analyze this job description and identify key requirements, skills needed, and provide recommendations for candidates: ${jobDescription}`;
  return callGemini(prompt);
}
