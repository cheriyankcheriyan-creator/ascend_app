import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { COLLEGES_DATA, COURSES_DATA, INTERNSHIPS_DATA, ASSESSMENT_QUESTIONS } from './src/data/mockData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK with required headers
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// 1. Data endpoints
app.get('/api/colleges', (_req, res) => {
  res.json({ success: true, colleges: COLLEGES_DATA });
});

app.get('/api/courses', (_req, res) => {
  res.json({ success: true, courses: COURSES_DATA });
});

app.get('/api/internships', (_req, res) => {
  res.json({ success: true, internships: INTERNSHIPS_DATA });
});

app.get('/api/questions', (_req, res) => {
  res.json({ success: true, questions: ASSESSMENT_QUESTIONS });
});

// Dynamic Adaptive Question Generator
app.post('/api/ai/adaptive-question', async (req, res) => {
  try {
    const { previousAnswers, customNotes, studentInfo } = req.body;

    if (ai) {
      try {
        const prompt = `You are an adaptive student curiosity counselor.
The student has shared these initial interests and answers:
${JSON.stringify(previousAnswers, null, 2)}
Custom notes in their own words: "${customNotes || 'None'}"

Generate 1 insightful, conversational follow-up question to probe deeper into what excites their curiosity, what problems they want to solve, or what kind of work they can imagine doing long-term.
Do NOT ask generic personality test questions. Focus on their genuine activities, motivations, or aspirations.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                suggestedOptions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      description: { type: Type.STRING },
                      value: { type: Type.STRING }
                    },
                    required: ['label', 'description', 'value']
                  }
                }
              },
              required: ['question', 'subtitle', 'suggestedOptions']
            }
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ success: true, adaptiveQuestion: parsed });
        }
      } catch (e) {
        console.warn('Adaptive question generation fallback:', e);
      }
    }

    res.json({
      success: true,
      adaptiveQuestion: {
        question: "When you imagine a regular workday 5 years from now, what would bring you the greatest sense of purpose?",
        subtitle: "Reflecting on what kind of impact and daily environment feels most genuine to you.",
        suggestedOptions: [
          { label: "Building and testing working technological prototypes", description: "Hands-on engineering and creative technical leverage", value: "tech_leverage" },
          { label: "Leading a mission-driven team to solve real human problems", description: "Strategy, organizational momentum, and inspiring others", value: "leadership" },
          { label: "Conducting deep analytical or scientific research in a lab", description: "Expanding understanding and publishing breakthrough findings", value: "deep_research" },
          { label: "Designing beautiful, human-centered experiences and narratives", description: "Creative synthesis, visual design, and user empathy", value: "creative_design" }
        ]
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate adaptive question' });
  }
});

// 2. Refined AI Assessment Synthesis (Genuine Identity & Aspirations)
app.post('/api/ai/assess', async (req, res) => {
  try {
    const { answers, customNotes, studentInfo } = req.body;

    if (!answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ error: 'No answers provided' });
    }

    if (ai) {
      try {
        const prompt = `You are an elite, domain-neutral student career counselor and cognitive mentor.
A student (${studentInfo?.name || 'Student'}, ${studentInfo?.educationLevel || 'High School / Early College'}) completed a comprehensive 25-question assessment evaluating their genuine interests, academic preferences, creative expression, thinking style, core values, and future aspirations.

Student Responses:
${JSON.stringify(answers, null, 2)}
Student's Own Words / Custom Reflections:
${JSON.stringify(customNotes || {}, null, 2)}

CORE PRINCIPLES (CRITICAL):
1. EMBRACE ALL DOMAINS EQUALLY: Do NOT assume the student wants software, coding, or technology. Actively evaluate careers across Arts & Humanities, Medicine & Healthcare, Law & Public Policy, Education & Psychology, Biological & Environmental Sciences, Architecture & Design, Commerce & Entrepreneurship, and Skilled Practical Crafts.
2. RECOMMEND STRICTLY ACCORDING TO THEIR GENUINE PASSIONS: If they love human behavior and healing, suggest Clinical Psychology, Pediatric Medicine, or Public Health. If they love writing, storytelling, or culture, suggest Investigative Journalism, Literary Publishing, or Creative Direction. If they love physical spaces and aesthetics, suggest Architecture or Industrial Design.
3. DISTINGUISH INTEREST FROM CAREER AMBITION: Validate their stated ambition if they have one; help them explore multi-disciplinary intersections if they have varied passions.
4. FOR EACH RECOMMENDED CAREER:
   - Provide an explicit "whyItFitsWhatYouLove" explanation grounded in their specific answers.
   - Provide a "practicalSimulation" (a hands-on mini-project or experiment they can try this weekend to test their interest before committing).
5. PROVIDE ALTERNATIVE PATHS: If the student has competing interests or expresses uncertainty, propose 2 distinct alternative paths acknowledging uncertainty.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are an elite student career mentor focused on genuine curiosity and individual identity discovery across all academic, creative, professional, and vocational domains.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                archetype: { type: Type.STRING },
                archetypeTagline: { type: Type.STRING },
                summary: { type: Type.STRING },
                strongestInterestAreas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                secondaryInterestAreas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                corePassions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                curiosityDrivers: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                problemsToSolve: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                coreValues: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                skillsToDevelop: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                thinkingStyle: {
                  type: Type.OBJECT,
                  properties: {
                    approach: { type: Type.STRING },
                    flexiblePreferences: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    collaborationVibe: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ['approach', 'flexiblePreferences', 'collaborationVibe', 'description']
                },
                careerClarity: {
                  type: Type.OBJECT,
                  properties: {
                    status: { type: Type.STRING },
                    existingAmbitions: { type: Type.STRING },
                    counselorValidation: { type: Type.STRING }
                  },
                  required: ['status', 'existingAmbitions', 'counselorValidation']
                },
                alternativePaths: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      reason: { type: Type.STRING }
                    },
                    required: ['title', 'description', 'reason']
                  }
                },
                riasecScores: {
                  type: Type.OBJECT,
                  properties: {
                    realistic: { type: Type.NUMBER },
                    investigative: { type: Type.NUMBER },
                    artistic: { type: Type.NUMBER },
                    social: { type: Type.NUMBER },
                    enterprising: { type: Type.NUMBER },
                    conventional: { type: Type.NUMBER }
                  },
                  required: ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional']
                },
                workStyle: {
                  type: Type.OBJECT,
                  properties: {
                    introversionExtroversionLabel: { type: Type.STRING },
                    introversionExtroversionScore: { type: Type.NUMBER },
                    collaborationPreference: { type: Type.STRING },
                    environmentType: { type: Type.STRING },
                    problemSolvingApproach: { type: Type.STRING }
                  },
                  required: ['introversionExtroversionLabel', 'introversionExtroversionScore', 'collaborationPreference', 'environmentType', 'problemSolvingApproach']
                },
                learningStyle: {
                  type: Type.OBJECT,
                  properties: {
                    primaryStyle: { type: Type.STRING },
                    description: { type: Type.STRING },
                    recommendedFormat: { type: Type.STRING }
                  },
                  required: ['primaryStyle', 'description', 'recommendedFormat']
                },
                strengths: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                growthAreas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                recommendedCareers: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      title: { type: Type.STRING },
                      matchScore: { type: Type.NUMBER },
                      industry: { type: Type.STRING },
                      salaryRange: { type: Type.STRING },
                      growthOutlook: { type: Type.STRING },
                      automationResilience: { type: Type.STRING },
                      description: { type: Type.STRING },
                      keySkills: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                      },
                      dayInTheLife: { type: Type.STRING },
                      whyItFitsWhatYouLove: { type: Type.STRING },
                      practicalSimulation: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          description: { type: Type.STRING },
                          tryItThisWeekend: { type: Type.STRING }
                        },
                        required: ['title', 'description', 'tryItThisWeekend']
                      }
                    },
                    required: ['id', 'title', 'matchScore', 'industry', 'salaryRange', 'growthOutlook', 'automationResilience', 'description', 'keySkills', 'dayInTheLife', 'whyItFitsWhatYouLove', 'practicalSimulation']
                  }
                },
                recommendedMajors: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      name: { type: Type.STRING },
                      degreeType: { type: Type.STRING },
                      matchReason: { type: Type.STRING },
                      targetColleges: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                      },
                      careerAlignment: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                      }
                    },
                    required: ['id', 'name', 'degreeType', 'matchReason', 'targetColleges', 'careerAlignment']
                  }
                }
              },
              required: [
                'archetype',
                'archetypeTagline',
                'summary',
                'strongestInterestAreas',
                'secondaryInterestAreas',
                'corePassions',
                'curiosityDrivers',
                'problemsToSolve',
                'coreValues',
                'skillsToDevelop',
                'thinkingStyle',
                'careerClarity',
                'riasecScores',
                'workStyle',
                'learningStyle',
                'strengths',
                'growthAreas',
                'recommendedCareers',
                'recommendedMajors'
              ]
            }
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({
            success: true,
            result: {
              ...parsed,
              id: 'res_' + Date.now(),
              completedAt: new Date().toISOString()
            }
          });
        }
      } catch (geminiError) {
        console.warn('Gemini assessment call failed, using heuristic model:', geminiError);
      }
    }

    // Heuristic synthesis fallback with full fields
    const heuristicResult = generateHeuristicAssessment(answers, customNotes, studentInfo);
    return res.json({ success: true, result: heuristicResult });
  } catch (error) {
    console.error('Assessment generation error:', error);
    res.status(500).json({ error: 'Failed to process assessment' });
  }
});

// 3. AI Skill Gap Analysis
app.post('/api/ai/skill-gap', async (req, res) => {
  try {
    const { targetCareerTitle, currentSkills } = req.body;

    if (!targetCareerTitle) {
      return res.status(400).json({ error: 'targetCareerTitle is required' });
    }

    if (ai) {
      try {
        const prompt = `Analyze the student's skill readiness for the career "${targetCareerTitle}".
Current Student Skills: ${(currentSkills || []).join(', ') || 'Beginner STEM fundamentals'}

Evaluate:
1. Overall match percentage (0-100%).
2. Skills they already possess that are valuable.
3. Priority missing/growth skills required by modern industry standards in 2026.
4. A concrete, phased 6-week learning roadmap with practical project deliverables to close this gap.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                matchPercentage: { type: Type.NUMBER },
                readinessLevel: { type: Type.STRING },
                possessedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                strategicAdvice: { type: Type.STRING },
                phasedRoadmap: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      phase: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      title: { type: Type.STRING },
                      focusSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                      recommendedCourseIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                      milestoneProject: { type: Type.STRING }
                    },
                    required: ['phase', 'duration', 'title', 'focusSkills', 'milestoneProject']
                  }
                }
              },
              required: ['matchPercentage', 'readinessLevel', 'possessedSkills', 'missingSkills', 'strategicAdvice', 'phasedRoadmap']
            }
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ success: true, analysis: parsed });
        }
      } catch (aiErr) {
        console.warn('AI Skill Gap error, falling back:', aiErr);
      }
    }

    const fallbackAnalysis = {
      matchPercentage: 68,
      readinessLevel: 'Intermediate Competency (High Velocity)',
      possessedSkills: currentSkills || ['Python', 'Data Structures & Algorithms', 'Git'],
      missingSkills: ['Transformer Architectures', 'Vector Databases & RAG', 'Distributed Systems Profiling', 'Docker & CI/CD'],
      strategicAdvice: 'You possess solid programming foundations. Your fastest path to entry-level competitiveness is building 2 portfolio-grade projects deploying real models behind production APIs.',
      phasedRoadmap: [
        {
          phase: 'Phase 1',
          duration: 'Weeks 1-2',
          title: 'Foundational Systems & Modern Tooling',
          focusSkills: ['TypeScript / PyTorch', 'API Integration', 'Docker Containers'],
          recommendedCourseIds: ['course-dl-ai', 'course-fullstack-cloud'],
          milestoneProject: 'Containerized inference microservice deployed to Cloud Run'
        },
        {
          phase: 'Phase 2',
          duration: 'Weeks 3-4',
          title: 'Advanced Domain Architecture & RAG Pipelines',
          focusSkills: ['Vector Embeddings', 'Model Fine-tuning (QLoRA)', 'Telemetry & Latency Tuning'],
          recommendedCourseIds: ['course-dl-ai'],
          milestoneProject: 'Domain-specific Retrieval-Augmented Generation agent with live evaluation benchmarks'
        },
        {
          phase: 'Phase 3',
          duration: 'Weeks 5-6',
          title: 'Internship Portfolio & Mock Technical Screens',
          focusSkills: ['System Design Whiteboarding', 'Live Technical Interviewing', 'Open Source PRs'],
          recommendedCourseIds: ['course-aws-cloud'],
          milestoneProject: 'Production-ready GitHub portfolio with comprehensive documentation and live demo'
        }
      ]
    };

    return res.json({ success: true, analysis: fallbackAnalysis });
  } catch (err) {
    console.error('Skill gap error:', err);
    res.status(500).json({ error: 'Skill gap analysis failed' });
  }
});

// 4. AI Career Counselor Chat
app.post('/api/ai/career-chat', async (req, res) => {
  try {
    const { message, history, studentContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (ai) {
      try {
        const systemPrompt = `You are "Ascend Mentor", an elite AI Student Guidance Counselor and Career Strategist.
Your goal is to give honest, deeply informed, encouraging, and actionable guidance for students navigating:
1. Genuine interest exploration and individual identity.
2. College comparisons (acceptance rates, tuition, financial aid, ROI, placement records).
3. Bridging skill gaps with industry-relevant micro-courses and hands-on projects.
4. Landing top student internships and crafting standout portfolios.

Student Profile:
Name: ${studentContext?.name || 'Student'}
Education: ${studentContext?.educationLevel || 'High School / College'}
Target Career Interests: ${(studentContext?.interests || []).join(', ') || 'Technology & Innovation'}
Current Validated Skills: ${(studentContext?.skills || []).join(', ') || 'Foundational'}

Tone: Warm, highly articulate, pragmatic, encouraging without empty hype. Use bullet points or short paragraphs where appropriate.`;

        const contents: any[] = [];
        if (history && Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const chatResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          }
        });

        return res.json({
          success: true,
          reply: chatResponse.text || "I'm here to help you navigate your college and career roadmap. What specific goals are on your mind?"
        });
      } catch (err) {
        console.warn('AI Chat error, using fallback:', err);
      }
    }

    let fallbackReply = `Great question! When planning your trajectory from college to high-impact career, consider three pillars:
1. **Explore What You Genuinely Love**: Focus on projects where you voluntarily lose track of time.
2. **Practical Proof-of-Work**: Employers look for tangible GitHub projects, published research, or design case studies over GPA alone.
3. **Strategic Networking**: Leverage alumni directories and student clubs early in your college experience.

What specific college or career area would you like to drill down into next?`;

    const lower = message.toLowerCase();
    if (lower.includes('compare') || lower.includes('vs') || lower.includes('college')) {
      fallbackReply = `When comparing top universities like Stanford, CMU, MIT, or UC Berkeley:
- **Curriculum Rigor**: CMU and MIT have the most intensive foundational computing and mathematics curricula, ensuring you are day-one production ready.
- **Venture & Startup Culture**: Stanford has unmatched access to Silicon Valley venture funds (StartX, Sand Hill Road networks).
- **Public ROI**: UC Berkeley, Georgia Tech, and Purdue offer exceptional value—especially for in-state students or through co-op programs where paid work offsets tuition.
- **Recommendation**: Check out our 'College Comparison' tab to compare acceptance rates, average starting salaries, and verified student reviews side-by-side!`;
    } else if (lower.includes('internship') || lower.includes('interview') || lower.includes('resume')) {
      fallbackReply = `To land top student internships (like Google STEP, Tesla Autopilot, or Stripe):
1. **Apply Early**: Most high-demand tech and finance summer programs open applications between August and October of the prior year.
2. **Project Depth over Breadth**: One fully deployed, full-stack app with unit tests and clear documentation is worth 10 half-finished tutorial clones.
3. **Master Core Fundamentals**: Practice Data Structures (Trees, Graphs, Hash Maps) and behavioral STAR-method storytelling.
4. Check out our **Career Launchpad** tab to browse student openings and run a skill-gap analysis!`;
    }

    return res.json({ success: true, reply: fallbackReply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Chat service error' });
  }
});

// Helper for offline/fallback heuristic assessment with authentic multi-domain interest discovery
function generateHeuristicAssessment(answers: Record<string, any>, customNotes: any, studentInfo: any) {
  const answerVals = Object.values(answers).flatMap(val => Array.isArray(val) ? val : [val]);
  const textBlob = answerVals.join(' ') + ' ' + JSON.stringify(customNotes || {});

  // Domain score counters
  let scores = {
    health: 0,
    arts: 0,
    law: 0,
    business: 0,
    ecology: 0,
    architecture: 0,
    engineering: 0,
  };

  // Keyword / tag matching
  if (/medicine|health|physiolog|biomed|clinic|patient|counselor|healing/.test(textBlob)) scores.health += 3;
  if (/creative|writing|visual|art|humanit|story|literary|journalism|media|music/.test(textBlob)) scores.arts += 3;
  if (/law|justice|policy|advocacy|civil|rights|ethic|civic/.test(textBlob)) scores.law += 3;
  if (/business|finance|market|entrepreneur|commerce|venture|invest/.test(textBlob)) scores.business += 3;
  if (/nature|wildlife|ecolog|conservation|climate|earth|garden|environment/.test(textBlob)) scores.ecology += 3;
  if (/architecture|spatial|interior|styling|furniture|urban/.test(textBlob)) scores.architecture += 3;
  if (/computing|software|robotics|code|electronics|systems|mechanics|tinker/.test(textBlob)) scores.engineering += 3;

  // Find top domain
  const topDomain = (Object.keys(scores) as (keyof typeof scores)[]).reduce((a, b) => scores[a] >= scores[b] ? a : b);

  const customPassions = customNotes?.q1 || customNotes?.q2 || 'Exploring diverse passions and meaningful contributions';

  if (topDomain === 'health') {
    return {
      id: 'res_' + Date.now(),
      completedAt: new Date().toISOString(),
      archetype: 'The Compassionate Healer & Clinical Investigator',
      archetypeTagline: 'Dedicated to understanding human wellness, easing suffering, and advancing healthcare.',
      summary: `${studentInfo?.name || 'You'} demonstrated a profound empathic drive and scientific curiosity toward human health and emotional well-being. Rather than fitting a rigid box, your profile reflects a dedicated caregiver and analytical thinker who wants their daily work to tangibly save and improve lives.`,
      strongestInterestAreas: ['Biomedical & Clinical Healthcare', 'Psychology & Mental Wellness', 'Human Physiology'],
      secondaryInterestAreas: ['Public Health Advocacy', 'Community Outreach & Education'],
      corePassions: [
        customPassions,
        'Understanding how human anatomy, illness, and recovery work',
        'Directly supporting patients and uplifting community well-being'
      ],
      curiosityDrivers: [
        'How early diagnosis and compassionate intervention transform long-term recovery',
        'The intricate relationship between mental health, neurology, and physical physiology'
      ],
      problemsToSolve: [
        'Expanding affordable, human-centered healthcare and mental health access',
        'Improving clinical outcomes and compassionate patient support'
      ],
      coreValues: ['Human Compassion & Healing', 'Integrity & Service', 'Intellectual Rigor'],
      skillsToDevelop: ['Clinical Observation & Empathy', 'Biochemical Fundamentals', 'Patient Consultation Ethics'],
      thinkingStyle: {
        approach: 'Empathetic Observation with Scientific Rigor',
        flexiblePreferences: [
          'Anchors decisions in patient impact and compassionate care',
          'Balances clinical evidence with deep emotional listening',
          'Thrives in active, patient-facing settings'
        ],
        collaborationVibe: 'Multidisciplinary Clinical Care Team',
        description: 'You evaluate situations through the lens of human compassion, pairing scientific diagnosis with emotional safety.'
      },
      careerClarity: {
        status: 'Refining Specific Ambition',
        existingAmbitions: 'Healthcare, Clinical Psychology & Medical Practice',
        counselorValidation: 'Your strong empathy and curiosity for living systems strongly point toward healthcare. Your next focus should be securing clinical volunteer shadowing and exploring premed/pre-health requirements.'
      },
      alternativePaths: [
        {
          title: 'Public Health Policy & Global Epidemiology',
          description: 'Focusing on community-wide health equity, disease prevention, and healthcare accessibility reform.',
          reason: 'Combines your passion for healthcare with systemic social impact.'
        },
        {
          title: 'Neuropsychology & Clinical Counseling',
          description: 'Diagnosing cognitive conditions and providing individual therapeutic healing.',
          reason: 'Channels your listening presence into profound mental wellness recovery.'
        }
      ],
      riasecScores: { realistic: 55, investigative: 88, artistic: 45, social: 92, enterprising: 60, conventional: 65 },
      workStyle: {
        introversionExtroversionLabel: 'Empathetic Ambivert (Patient-Centered)',
        introversionExtroversionScore: 58,
        collaborationPreference: 'Active collaborative rounds with dedicated patient focus blocks',
        environmentType: 'Hospitals, wellness clinics, and community health centers',
        problemSolvingApproach: 'Human-centered diagnosis grounded in clinical protocol'
      },
      learningStyle: {
        primaryStyle: 'Contextual Clinical Learner',
        description: 'You understand best when concepts are illustrated through real patient case studies and hands-on clinical lab simulations.',
        recommendedFormat: 'Case study rounds, anatomy labs, and volunteer clinical shadowing'
      },
      strengths: ['Deep empathetic listening', 'Calm under emotional stress', 'Holistic human observation', 'Diagnostic diligence'],
      growthAreas: ['Setting emotional boundaries to prevent burnout', 'Navigating complex administrative protocols'],
      recommendedCareers: [
        {
          id: 'c-clinical-psych',
          title: 'Clinical Child & Adolescent Psychologist',
          matchScore: 95,
          industry: 'Mental Health & Behavioral Care',
          salaryRange: '$92,000 – $145,000',
          growthOutlook: '+22% growth over next 5 years (High)',
          automationResilience: 'Very High',
          description: 'Diagnose and treat psychological difficulties in young people, fostering emotional resilience and family wellness.',
          keySkills: ['Cognitive Behavioral Therapy', 'Empathetic Counseling', 'Diagnostic Assessment', 'Crisis De-escalation'],
          dayInTheLife: 'Conducts therapeutic sessions with youth, meets with parents to discuss behavioral strategies, and collaborates with pediatricians.',
          whyItFitsWhatYouLove: 'Directly channels your deep empathy and interest in why people think, feel, and heal.',
          practicalSimulation: {
            title: 'Shadow a Youth Helpline or Active Listening Workshop',
            description: 'Complete a weekend active-listening certification (e.g. 7 Cups or Crisis Text Line training).',
            tryItThisWeekend: 'Take an online active-listening course module and practice reflective summarizing in conversations.'
          }
        },
        {
          id: 'c-physician',
          title: 'Pediatric Physician / General Practitioner',
          matchScore: 92,
          industry: 'Medicine & Primary Care',
          salaryRange: '$180,000 – $260,000',
          growthOutlook: '+18% growth over next 5 years (Steady High)',
          automationResilience: 'Very High',
          description: 'Deliver preventative care, diagnose illnesses, and manage treatment plans for growing children and families.',
          keySkills: ['Clinical Diagnosis', 'Patient Communication', 'Pharmacology', 'Preventative Medicine'],
          dayInTheLife: 'Performs physical exams, evaluates developmental milestones, and advises families on healthy nutrition and preventive habits.',
          whyItFitsWhatYouLove: 'Fulfills your drive for tangible, human-saving impact paired with lifelong biological curiosity.',
          practicalSimulation: {
            title: 'Clinical Case Teardown',
            description: 'Read 2 real-world clinical case studies from the New England Journal of Medicine and trace the diagnostic puzzle.',
            tryItThisWeekend: 'Review a pediatric case presentation online and map out symptoms to possible differential diagnoses.'
          }
        },
        {
          id: 'c-biomed-scientist',
          title: 'Biomedical & Pharmaceutical Research Scientist',
          matchScore: 89,
          industry: 'Biotechnology & Medical Research',
          salaryRange: '$105,000 – $170,000',
          growthOutlook: '+20% growth over next 5 years (High)',
          automationResilience: 'High',
          description: 'Investigate molecular disease pathways and test innovative therapies to eradicate chronic and infectious illnesses.',
          keySkills: ['Molecular Biology', 'Cell Culture', 'Data Interpretation', 'Experimental Design'],
          dayInTheLife: 'Analyzes assay results from cell culture trials, prepares findings for peer review, and presents data to clinical trial directors.',
          whyItFitsWhatYouLove: 'Connects your curiosity about medicine with the rigor of laboratory discovery.',
          practicalSimulation: {
            title: 'Explore Protein Folding in the Browser',
            description: 'Use the free AlphaFold Protein Database to visualize 3D molecular structures and disease binding sites.',
            tryItThisWeekend: 'Search AlphaFold for a human hemoglobin or insulin model and explore how mutations alter binding shape.'
          }
        }
      ],
      recommendedMajors: [
        {
          id: 'm-premed-bio',
          name: 'Biomedical Sciences / Human Biology',
          degreeType: 'B.S. in Biomedical Sciences',
          matchReason: 'Direct pathway for clinical medicine, pre-health tracks, and pharmaceutical discovery.',
          targetColleges: ['Stanford University', 'Johns Hopkins', 'UCLA', 'University of Michigan'],
          careerAlignment: ['Physician', 'Clinical Researcher', 'Biomedical Scientist']
        },
        {
          id: 'm-psych',
          name: 'Psychology & Cognitive Science',
          degreeType: 'B.A. / B.S. in Psychology',
          matchReason: 'Foundations of behavioral neuroscience, developmental psychology, and counseling therapies.',
          targetColleges: ['UC Berkeley', 'University of Michigan', 'NYU', 'University of Texas at Austin'],
          careerAlignment: ['Clinical Psychologist', 'Counselor', 'Behavioral Analyst']
        }
      ]
    };
  }

  if (topDomain === 'arts') {
    return {
      id: 'res_' + Date.now(),
      completedAt: new Date().toISOString(),
      archetype: 'The Narrative Visionary & Cultural Storyteller',
      archetypeTagline: 'Translating human experiences into poignant literature, compelling visual arts, and timeless media.',
      summary: `${studentInfo?.name || 'You'} demonstrated a rich creative imagination, narrative sensitivity, and deep appreciation for aesthetic expression. Rather than fitting a rigid mold, your profile reflects an articulate creator who thinks laterally, values authenticity, and wants to move human hearts through words, design, and ideas.`,
      strongestInterestAreas: ['Creative Writing & Literature', 'Visual Arts & Creative Direction', 'Media & Storytelling'],
      secondaryInterestAreas: ['Humanities & Philosophy', 'Cultural Journalism & Public Exhibitions'],
      corePassions: [
        customPassions,
        'Sculpting language, stories, and evocative artistic narratives',
        'Exploring cultural heritage, philosophy, and aesthetic balance'
      ],
      curiosityDrivers: [
        'How storytelling reframes human perspective and fosters cross-cultural empathy',
        'The interplay of visual composition, typography, color, and emotional resonance'
      ],
      problemsToSolve: [
        'Creating authentic cultural narratives in an era of superficial noise',
        'Illuminating untold human stories and preserving cultural nuance'
      ],
      coreValues: ['Creative Autonomy', 'Originality & Craft', 'Authentic Expression'],
      skillsToDevelop: ['Long-form Narrative Structure', 'Visual Portfolio Curation', 'Editorial Critique'],
      thinkingStyle: {
        approach: 'Intuitive & Lateral with Aesthetic Discipline',
        flexiblePreferences: [
          'Connects non-obvious ideas across history, literature, and art',
          'Values dedicated flow state for writing and artistic drafting',
          'Thrives on constructive peer critique and creative freedom'
        ],
        collaborationVibe: 'Creative Studio with Mutual Autonomy',
        description: 'You naturally think in metaphors and evocative images, seeing the human soul behind abstract ideas.'
      },
      careerClarity: {
        status: 'Exploring Multi-Disciplinary Passions',
        existingAmbitions: 'Writing, Creative Direction, Media & Arts',
        counselorValidation: 'Your strong literary and aesthetic voice provides a versatile foundation. Focus on building a cohesive portfolio of 3-5 published pieces, creative exhibitions, or multimedia productions.'
      },
      alternativePaths: [
        {
          title: 'Investigative Cultural Journalism & Podcasting',
          description: 'Documenting human struggles, civic rights, and cultural phenomena through investigative reporting.',
          reason: 'Channels your narrative gift toward truth, civic transparency, and public impact.'
        },
        {
          title: 'Brand Creative Director & Narrative Strategist',
          description: 'Guiding the visual identity, storytelling campaigns, and emotional resonance for mission-driven brands.',
          reason: 'Combines your creative eye with high-leverage commercial and cultural influence.'
        }
      ],
      riasecScores: { realistic: 45, investigative: 75, artistic: 96, social: 70, enterprising: 62, conventional: 48 },
      workStyle: {
        introversionExtroversionLabel: 'Reflective Independent Creator',
        introversionExtroversionScore: 42,
        collaborationPreference: 'Deep solo creation sprints punctuated by creative critique reviews',
        environmentType: 'Creative studios, publishing houses, cultural institutions, or quiet writing sanctuaries',
        problemSolvingApproach: 'Imaginative synthesis and narrative reframing'
      },
      learningStyle: {
        primaryStyle: 'Narrative & Aesthetic Synthesizer',
        description: 'You assimilate ideas fastest through rich storytelling, primary literary texts, and visual portfolio critique.',
        recommendedFormat: 'Creative writing workshops, visual critique studios, and literary seminars'
      },
      strengths: ['Exceptional written communication', 'Aesthetic and spatial sensitivity', 'Empathic character insight', 'Original conceptualization'],
      growthAreas: ['Balancing perfectionism with publishing deadlines', 'Commercial pitching and contract negotiation'],
      recommendedCareers: [
        {
          id: 'c-author-editor',
          title: 'Literary Author & Senior Editor',
          matchScore: 96,
          industry: 'Publishing & Literary Arts',
          salaryRange: '$75,000 – $135,000',
          growthOutlook: '+12% steady growth (High Prestige)',
          automationResilience: 'Very High',
          description: 'Write original literature, curate manuscript acquisitions, and polish literary prose that shapes cultural dialogue.',
          keySkills: ['Long-form Fiction & Nonfiction', 'Developmental Editing', 'Literary Analysis', 'Publishing Industry Strategy'],
          dayInTheLife: 'Spends mornings drafting original chapters, meets with authors to restructure manuscript pacing, and reviews galley proofs.',
          whyItFitsWhatYouLove: 'Feeds your love of sculpting language, deep reading, and illuminating the human condition.',
          practicalSimulation: {
            title: 'Draft a 1,500-Word Literary Essay',
            description: 'Write a personal essay exploring a moment that changed your perspective on empathy, and submit it to a student journal.',
            tryItThisWeekend: 'Outline your essay using a 3-act narrative arc, draft it in a quiet cafe, and self-edit for rhythmic cadence.'
          }
        },
        {
          id: 'c-creative-dir',
          title: 'Creative Director & Visual Storyteller',
          matchScore: 92,
          industry: 'Media Production & Visual Arts',
          salaryRange: '$110,000 – $185,000',
          growthOutlook: '+16% growth over next 5 years (High)',
          automationResilience: 'High',
          description: 'Direct the overarching artistic vision for films, exhibitions, publications, or multimedia design campaigns.',
          keySkills: ['Visual Storyboarding', 'Art Direction', 'Typography & Color Theory', 'Cross-Media Production'],
          dayInTheLife: 'Reviews mood boards with cinematographers, pitches a brand narrative concept to stakeholders, and oversees post-production color grading.',
          whyItFitsWhatYouLove: 'Harmonizes visual styling, storytelling, and conceptual innovation into a singular vision.',
          practicalSimulation: {
            title: 'Curate a Multimedia Concept Bible',
            description: 'Create a 6-slide visual pitch for a fictional documentary film or visual exhibition in Figma or Canva.',
            tryItThisWeekend: 'Curate photography, color palettes, typography, and a 200-word synopsis of your creative concept.'
          }
        },
        {
          id: 'c-investigative-journ',
          title: 'Investigative Journalist & Feature Writer',
          matchScore: 89,
          industry: 'News Media & Documentary',
          salaryRange: '$68,000 – $120,000',
          growthOutlook: '+10% steady demand for high-integrity reporting',
          automationResilience: 'Very High',
          description: 'Investigate societal issues, interview key witnesses, and write compelling long-form pieces that hold institutions accountable.',
          keySkills: ['Investigative Interviewing', 'Fact-checking', 'Narrative Nonfiction', 'Ethical Reporting'],
          dayInTheLife: 'Conducts an investigative interview, reviews public records and FOIA requests, and crafts a gripping narrative feature.',
          whyItFitsWhatYouLove: 'Bridges deep intellectual curiosity with courageous storytelling and civic purpose.',
          practicalSimulation: {
            title: 'Conduct an In-Depth Local Profile',
            description: 'Interview a local community leader or artisan and write an 800-word human interest profile.',
            tryItThisWeekend: 'Prepare 5 open-ended questions, conduct a 25-minute interview, and write up their story with vivid sensory details.'
          }
        }
      ],
      recommendedMajors: [
        {
          id: 'm-english-writing',
          name: 'English Literature & Creative Writing',
          degreeType: 'B.A. in English',
          matchReason: 'Mastery of rhetorical craft, literary criticism, and narrative world-building.',
          targetColleges: ['Columbia University', 'NYU', 'University of Michigan', 'Northwestern'],
          careerAlignment: ['Author', 'Senior Editor', 'Narrative Strategist']
        },
        {
          id: 'm-film-media',
          name: 'Cinema Studies & Media Arts',
          degreeType: 'B.A. in Film & Media Arts',
          matchReason: 'Visual composition, directing, and narrative production across modern media.',
          targetColleges: ['USC', 'NYU Tisch', 'UCLA', 'Wesleyan'],
          careerAlignment: ['Creative Director', 'Documentary Filmmaker', 'Art Director']
        }
      ]
    };
  }

  if (topDomain === 'law' || topDomain === 'ecology' || topDomain === 'business' || topDomain === 'architecture') {
    // Balanced multi-domain representation
    return {
      id: 'res_' + Date.now(),
      completedAt: new Date().toISOString(),
      archetype: topDomain === 'law' ? 'The Civic Advocate & Policy Strategist' : topDomain === 'ecology' ? 'The Ecological Guardian & Earth Scientist' : topDomain === 'business' ? 'The Strategic Entrepreneur & Market Builder' : 'The Spatial Innovator & Sustainable Architect',
      archetypeTagline: topDomain === 'law' ? 'Championing ethical justice, human rights, and systemic policy reform.' : topDomain === 'ecology' ? 'Protecting biodiversity, natural ecosystems, and sustainable planetary stewardship.' : topDomain === 'business' ? 'Building resilient enterprises, allocating capital, and driving economic innovation.' : 'Designing human spaces, sustainable environments, and timeless structural harmony.',
      summary: `${studentInfo?.name || 'You'} demonstrated balanced critical reasoning, ethical clarity, and a strong sense of purpose. Rather than fitting a narrow technical box, your assessment highlights a versatile thinker who wants their career to build sustainable value, defend fairness, and shape lasting institutions.`,
      strongestInterestAreas: topDomain === 'law' ? ['Constitutional Law & Civil Rights', 'Public Policy', 'Investigative Analysis'] : topDomain === 'ecology' ? ['Conservation Biology', 'Environmental Policy', 'Earth Systems'] : topDomain === 'business' ? ['Entrepreneurship & Strategy', 'Financial Economics', 'Brand Strategy'] : ['Sustainable Architecture', 'Urban Planning', 'Spatial Aesthetics'],
      secondaryInterestAreas: ['Ethics & Philosophy', 'Organizational Leadership', 'Sociological Research'],
      corePassions: [
        customPassions,
        'Advancing human progress through thoughtful systems, ethical frameworks, and disciplined effort',
        'Solving real-world community challenges with lasting integrity'
      ],
      curiosityDrivers: [
        'How policy, economics, and environmental stewardship intersect to shape human civilizations',
        'Finding practical solutions that balance individual rights with community wellness'
      ],
      problemsToSolve: [
        'Creating fair, transparent, and resilient institutions that protect future generations',
        'Designing sustainable models for community prosperity'
      ],
      coreValues: ['Integrity & Justice', 'Autonomy & Purpose', 'Lasting Impact'],
      skillsToDevelop: ['Strategic Negotiation', 'Policy & Economic Analysis', 'Oral & Written Advocacy'],
      thinkingStyle: {
        approach: 'Structured Reasoning with Moral Conviction',
        flexiblePreferences: [
          'Scrutinizes evidence carefully before drawing conclusions',
          'Weighs long-term societal tradeoffs over immediate shortcuts',
          'Enjoys diplomatic debate and building consensus'
        ],
        collaborationVibe: 'Purpose-Driven Strategic Alliance',
        description: 'You naturally look at the big picture, evaluating how decisions affect real people and institutions over decades.'
      },
      careerClarity: {
        status: 'Refining Specific Ambition',
        existingAmbitions: topDomain === 'law' ? 'Law, Policy & Civic Advocacy' : topDomain === 'ecology' ? 'Environmental Science & Conservation' : topDomain === 'business' ? 'Sustainable Enterprise & Finance' : 'Architecture & Sustainable Design',
        counselorValidation: 'Your strong analytical discipline and societal awareness make you a natural candidate for impactful leadership. Focus on practical internships, published policy/case memos, and collegiate debate or design studios.'
      },
      alternativePaths: [
        {
          title: 'Human Rights & Constitutional Law',
          description: 'Defending civil liberties and advocating in judicial courts and legislative forums.',
          reason: 'Channels your principled conviction and analytical writing into systemic legal justice.'
        },
        {
          title: 'Environmental Policy & Sustainable Resource Management',
          description: 'Protecting natural water tables, public lands, and sustainable agricultural ecosystems.',
          reason: 'Bridges science and public policy to ensure ecological stability.'
        }
      ],
      riasecScores: { realistic: 62, investigative: 85, artistic: 68, social: 75, enterprising: 80, conventional: 72 },
      workStyle: {
        introversionExtroversionLabel: 'Strategic Ambivert (Consensus Builder)',
        introversionExtroversionScore: 52,
        collaborationPreference: 'Focused independent policy research with structured stakeholder consultations',
        environmentType: 'Civic chambers, public agencies, academic institutes, and consulting studios',
        problemSolvingApproach: 'Systematic deduction paired with ethical stakeholder impact'
      },
      learningStyle: {
        primaryStyle: 'Analytical Case-Study Learner',
        description: 'You learn fastest when analyzing historical precedents, constitutional cases, and empirical economic models.',
        recommendedFormat: 'Case briefs, model delegations, policy debates, and symposiums'
      },
      strengths: ['Rigorous analytical reasoning', 'Principled moral judgment', 'Clear persuasive speech', 'Strategic foresight'],
      growthAreas: ['Patience with slow institutional bureaucracies', 'Managing emotional fatigue in contested disputes'],
      recommendedCareers: [
        {
          id: 'c-policy-analyst',
          title: 'Public Policy Director & Legal Strategist',
          matchScore: 94,
          industry: 'Civic Governance & Law',
          salaryRange: '$95,000 – $165,000',
          growthOutlook: '+14% growth over next 5 years (Steady)',
          automationResilience: 'Very High',
          description: 'Draft policy briefs, analyze statutory legislation, and advise civic leaders on systemic reforms.',
          keySkills: ['Statutory Interpretation', 'Economic Modeling', 'Stakeholder Negotiation', 'Policy Writing'],
          dayInTheLife: 'Analyzes a draft public bill, conducts briefing sessions with civil society leaders, and delivers testimony at a legislative hearing.',
          whyItFitsWhatYouLove: 'Directly harnesses your passion for truth, societal justice, and systemic human uplift.',
          practicalSimulation: {
            title: 'Draft a 2-Page Civic Policy Memo',
            description: 'Identify a problem in your school or city (e.g. transit, mental health, park access) and write a 2-page policy solution memo.',
            tryItThisWeekend: 'Structure the memo: Problem Statement, Stakeholder Impact, 3 Proposed Solutions, and Recommended Action Plan.'
          }
        },
        {
          id: 'c-conservation-lead',
          title: 'Environmental Scientist & Conservation Director',
          matchScore: 91,
          industry: 'Environmental Science & Sustainability',
          salaryRange: '$82,000 – $138,000',
          growthOutlook: '+19% growth over next 5 years (High)',
          automationResilience: 'Very High',
          description: 'Conduct field ecology research, monitor water/soil biodiversity, and establish sustainable conservation reserves.',
          keySkills: ['Ecological Sampling', 'GIS Spatial Mapping', 'Environmental Law', 'Conservation Biology'],
          dayInTheLife: 'Collects water samples in a wetland preserve, maps habitat fragmentation using GIS satellite layers, and coordinates with landowners.',
          whyItFitsWhatYouLove: 'Connects your love of the natural world with tangible scientific preservation.',
          practicalSimulation: {
            title: 'Audit Local Biodiversity in iNaturalist',
            description: 'Document 10 native plant and wildlife species in a nearby park or wetland using the free iNaturalist community science app.',
            tryItThisWeekend: 'Photograph and identify species, noting ecological indicators of soil and water health.'
          }
        },
        {
          id: 'c-venture-founder',
          title: 'Sustainable Enterprise Founder & Operator',
          matchScore: 88,
          industry: 'Ethical Commerce & Social Innovation',
          salaryRange: '$85,000 – $180,000',
          growthOutlook: '+24% growth over next 5 years (Exceptional)',
          automationResilience: 'High',
          description: 'Launch and scale an enterprise that addresses real community needs while maintaining fiscal sustainability.',
          keySkills: ['Business Model Design', 'Unit Economics', 'Team Leadership', 'Brand Positioning'],
          dayInTheLife: 'Reviews weekly unit economics and revenue reports, leads a product design sprint, and interviews candidate team leads.',
          whyItFitsWhatYouLove: 'Offers complete entrepreneurial autonomy and the freedom to build an organization aligned with your values.',
          practicalSimulation: {
            title: 'Build a Lean Business Canvas',
            description: 'Draft a 1-page business model canvas for an ethical small enterprise or campus venture idea.',
            tryItThisWeekend: 'Define Value Proposition, Customer Segments, Revenue Streams, and Cost Structure in 1 page.'
          }
        }
      ],
      recommendedMajors: [
        {
          id: 'm-policy-law',
          name: 'Public Policy, Law & Society',
          degreeType: 'B.A. in Public Policy',
          matchReason: 'Direct pathway to civil leadership, law school, policy think tanks, and civic advocacy.',
          targetColleges: ['Georgetown', 'UC Berkeley', 'University of Michigan', 'Harvard'],
          careerAlignment: ['Policy Analyst', 'Attorney', 'Civic Leader']
        },
        {
          id: 'm-env-studies',
          name: 'Environmental Science & Sustainable Systems',
          degreeType: 'B.S. in Environmental Science',
          matchReason: 'Integrates ecological fieldwork, resource economics, and environmental policy.',
          targetColleges: ['UC Davis', 'Cornell', 'UW Madison', 'University of Washington'],
          careerAlignment: ['Environmental Scientist', 'Conservation Director', 'Sustainability Consultant']
        }
      ]
    };
  }

  // Default to Systems & Hands-On Engineering if engineering keywords dominate
  return {
    id: 'res_' + Date.now(),
    completedAt: new Date().toISOString(),
    archetype: 'The Systems Architect & Frontier Builder',
    archetypeTagline: 'Translating complex theoretical curiosity into high-impact, autonomous physical and digital systems.',
    summary: `${studentInfo?.name || 'You'} demonstrated an extraordinary passion for creative problem solving and hands-on building. Rather than fitting a generic label, your answers reveal someone energized by understanding how complex mechanisms work and turning abstract concepts into tangible creations.`,
    strongestInterestAreas: ['Physical & Computing Systems', 'Autonomous Robotics', 'Mathematical Modeling'],
    secondaryInterestAreas: ['Spatial & Industrial Design', 'Science & Experimental Discovery'],
    coreValues: ['Technical Craft & Mastery', 'Autonomy & Creative Freedom', 'Solving High-Leverage Problems'],
    skillsToDevelop: ['Distributed Systems Profiling', 'Neural Network Latency Optimization', 'Translating Complex Tech to Non-Engineers'],
    alternativePaths: [
      {
        title: 'Biomedical Robotics & Neural Prosthetics',
        description: 'Applying your passion for mechanical interfaces and sensor fusion to medical assistive devices and neural prosthetics.',
        reason: 'Combines your curiosity for biological systems with tactile robotics and real human clinical impact.'
      },
      {
        title: 'Sustainable Infrastructure & Clean Grid Modeling',
        description: 'Designing fault-tolerant physical grid sensors and renewable energy distribution networks.',
        reason: 'Channels your interest in large-scale modular architecture toward ecological sustainability.'
      }
    ],
    corePassions: [
      customPassions,
      'Deconstructing how autonomous algorithms and machines work under the hood',
      'Hands-on creation of software tools and physical prototypes'
    ],
    curiosityDrivers: [
      'The intellectual thrill of understanding intricate logic systems',
      'The joy of taking an original concept from imagination into working reality'
    ],
    problemsToSolve: [
      'Engineering intelligent software infrastructure that empowers millions of builders',
      'Designing autonomous perception systems for vehicles and robotics'
    ],
    thinkingStyle: {
      approach: 'Structured Logic with Rapid Prototyping',
      flexiblePreferences: [
        'Prefers concrete proof-of-concept demos over purely theoretical debate',
        'Thrives during deep solo building sessions interspersed with focused peer reviews',
        'Driven by technical craftsmanship, first-principles logic, and demonstrable leverage'
      ],
      collaborationVibe: 'Autonomous Deep Focus with High-Signal Peer Reviews',
      description: 'You naturally think in modular architectures. You prefer understanding the root mechanics before designing, then building tactile prototypes to validate assumptions.'
    },
    careerClarity: {
      status: 'Refining Specific Ambition',
      existingAmbitions: 'AI / Machine Learning Systems & Autonomous Robotics',
      counselorValidation: 'Your passion for building systems and computational thinking directly validates your target career in AI and robotics software engineering. Rather than generic career pivots, your focus should be on building 2 portfolio-grade neural network deployments and preparing for undergraduate research.'
    },
    riasecScores: { realistic: 78, investigative: 92, artistic: 48, social: 55, enterprising: 68, conventional: 70 },
    workStyle: {
      introversionExtroversionLabel: 'Focused Ambivert (Deep Builder)',
      introversionExtroversionScore: 38,
      collaborationPreference: 'Autonomous deep sprints followed by structured peer review syncs',
      environmentType: 'Frontier AI & Robotics labs with high technical autonomy',
      problemSolvingApproach: 'First-principles logic combined with empirical prototyping'
    },
    learningStyle: {
      primaryStyle: 'Kinesthetic Systems Builder',
      description: 'You assimilate concepts fastest when writing live code, running benchmarks, and dissecting working reference architectures.',
      recommendedFormat: 'Hands-on project repos, interactive sandboxes, and competitive hackathons'
    },
    strengths: ['Algorithmic systems thinking & root-cause debugging', 'Sustained deep focus during complex architectural design', 'Speed of acquiring new technical frameworks and APIs', 'Quantitative modeling of performance tradeoffs'],
    growthAreas: ['Translating deeply technical solutions to non-technical business stakeholders', 'Balancing ideal architectural perfectionism with speed to market'],
    recommendedCareers: [
      {
        id: 'c-ai-eng',
        title: 'AI / Machine Learning Systems Engineer',
        matchScore: 96,
        industry: 'Artificial Intelligence & Robotics',
        salaryRange: '$140,000 – $225,000',
        growthOutlook: '+38% growth over next 5 years (Exceptional)',
        automationResilience: 'Very High',
        description: 'Architect, optimize, and deploy neural network pipelines, foundational model inference engines, and autonomous decision systems.',
        keySkills: ['PyTorch', 'Transformer Architectures', 'CUDA / GPU Optimization', 'Distributed Systems', 'Python'],
        dayInTheLife: 'Profiles latency bottlenecks in a transformer inference engine, runs distributed training checkpoints on 64 GPUs, and collaborates with product leads to test agentic reasoning.',
        whyItFitsWhatYouLove: 'Directly channels your voluntary passion for understanding how intelligence works under the hood, allowing you to build autonomous models that operate at planetary scale.',
        practicalSimulation: {
          title: 'Build a Micro-Transformer from Scratch',
          description: 'Implement a minimal attention mechanism in Python and train it to generate Shakespearean text or solve arithmetic.',
          tryItThisWeekend: 'Follow Andrej Karpathy’s "nanoGPT" repo: build, train on a free Google Colab GPU, and observe token probabilities in 3 hours.'
        }
      },
      {
        id: 'c-soft-eng',
        title: 'Systems & Infrastructure Software Engineer',
        matchScore: 92,
        industry: 'Cloud Infrastructure & High-Performance Computing',
        salaryRange: '$130,000 – $210,000',
        growthOutlook: '+25% growth over next 5 years (High)',
        automationResilience: 'High',
        description: 'Design fault-tolerant distributed databases, low-latency microservices, and large-scale cloud networking backbones.',
        keySkills: ['Go / Rust / C++', 'Distributed Consensus (Raft/Paxos)', 'Kubernetes', 'Linux Kernels', 'Networking'],
        dayInTheLife: 'Simulates network partition recovery in a distributed cache cluster, drafts an architectural RFC, and benchmarks query latency.',
        whyItFitsWhatYouLove: 'Feeds your love of modular deconstruction, high performance, and crafting rock-solid tools that millions of other developers rely on.',
        practicalSimulation: {
          title: 'Design an In-Memory Key-Value Store',
          description: 'Write a concurrent key-value store in Go or Rust with TTL eviction and benchmark its read/write latency under heavy load.',
          tryItThisWeekend: 'Build a mini-Redis clone with basic GET/SET/DEL commands and test concurrent thread-safety using Go channels.'
        }
      },
      {
        id: 'c-robotics',
        title: 'Autonomous Robotics Software Engineer',
        matchScore: 88,
        industry: 'Autonomous Vehicles & Industrial Automation',
        salaryRange: '$135,000 – $215,000',
        growthOutlook: '+30% growth over next 5 years (Very High)',
        automationResilience: 'Very High',
        description: 'Develop computer vision perception, sensor fusion (LiDAR/Radar), and trajectory planning algorithms for mobile robots.',
        keySkills: ['C++', 'ROS2', 'SLAM & Kalman Filtering', 'Point Cloud Processing', 'Control Systems'],
        dayInTheLife: 'Tests obstacle avoidance on physical robot testbeds in the warehouse, tunes occupancy grid maps, and runs hardware-in-the-loop tests.',
        whyItFitsWhatYouLove: 'Connects software logic directly to the physical world, fulfilling your drive to create machines that perceive, reason, and navigate real space.',
        practicalSimulation: {
          title: 'Simulate Robot Navigation in WebGL/ROS',
          description: 'Set up an autonomous turtlebot in a simulated 2D maze using A* pathfinding to reach targets while evading dynamic obstacles.',
          tryItThisWeekend: 'Open the browser-based Webots robot simulator or Python Pygame to code a basic obstacle-avoiding LiDAR agent.'
        }
      }
    ],
    recommendedMajors: [
      {
        id: 'm-cs-ai',
        name: 'Computer Science with AI / Systems Concentration',
        degreeType: 'B.S. in Computer Science',
        matchReason: 'Direct alignment with your highest Investigative and Realistic cognitive scores and software aptitude.',
        targetColleges: ['Stanford University', 'Carnegie Mellon University', 'MIT', 'UC Berkeley'],
        careerAlignment: ['AI/ML Engineer', 'Systems Architect', 'Software Engineer']
      },
      {
        id: 'm-eecs',
        name: 'Electrical Engineering & Computer Sciences (EECS)',
        degreeType: 'B.S. in EECS',
        matchReason: 'Bridges hardware, robotics sensors, and high-performance low-level systems software.',
        targetColleges: ['UC Berkeley', 'MIT', 'Georgia Tech', 'Purdue'],
        careerAlignment: ['Robotics Engineer', 'Autonomous Systems Lead', 'Embedded Hardware Architect']
      }
    ]
  };
}

// Setup Vite middleware for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Ascend Platform server running on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
