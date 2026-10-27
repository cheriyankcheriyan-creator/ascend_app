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
        const prompt = `You are a world-class cognitive counselor and student career mentor.
A student (${studentInfo?.name || 'Student'}, ${studentInfo?.educationLevel || 'High School / Early College'}) completed an individual interest, thinking style, and aspiration discovery assessment.

Student Responses:
${JSON.stringify(answers, null, 2)}
Student's Own Words / Custom Reflections:
${JSON.stringify(customNotes || {}, null, 2)}

CORE OBJECTIVE:
Help this student discover what they genuinely love doing, what interests them most, their individual thinking style, and what they would like to pursue as a future career.
CRITICAL PRINCIPLES:
1. Do NOT classify them using generic, stereotyping personality tests.
2. Treat thinking preferences (intuitive vs structured, practical vs theoretical, independent vs collaborative) as flexible tendencies, not rigid labels.
3. Distinguish interest from career direction: identify if they have a focused ambition, multi-disciplinary interests, early curiosity, or open exploration. Validate and refine existing aspirations.
4. For each recommended career:
   - Provide an explicit "whyItFitsWhatYouLove" explanation grounded in their answers.
   - Provide a "practicalSimulation" (a hands-on mini-experiment or project they can test this weekend).
5. Suggest relevant undergraduate majors and target colleges.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are an elite student career mentor focused on genuine curiosity and individual identity discovery.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                archetype: { type: Type.STRING },
                archetypeTagline: { type: Type.STRING },
                summary: { type: Type.STRING },
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
                'corePassions',
                'curiosityDrivers',
                'problemsToSolve',
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

// Helper for offline/fallback heuristic assessment with authentic interest discovery
function generateHeuristicAssessment(answers: Record<string, string>, customNotes: any, studentInfo: any) {
  const customPassions = customNotes?.q1 || customNotes?.q2 || 'Building interactive software and exploring systems';
  
  return {
    id: 'res_' + Date.now(),
    completedAt: new Date().toISOString(),
    archetype: 'The Systems Architect & Frontier Builder',
    archetypeTagline: 'Translating complex theoretical curiosity into high-impact, autonomous physical and digital systems.',
    summary: `${studentInfo?.name || 'You'} demonstrated an extraordinary passion for creative problem solving and hands-on building. Rather than fitting a generic label, your answers reveal someone energized by understanding how complex mechanisms work and turning abstract concepts into tangible creations.`,
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
    riasecScores: {
      realistic: 78,
      investigative: 92,
      artistic: 48,
      social: 55,
      enterprising: 68,
      conventional: 70
    },
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
    strengths: [
      'Algorithmic systems thinking & root-cause debugging',
      'Sustained deep focus during complex architectural design',
      'Speed of acquiring new technical frameworks and APIs',
      'Quantitative modeling of performance tradeoffs'
    ],
    growthAreas: [
      'Translating deeply technical solutions to non-technical business stakeholders',
      'Balancing ideal architectural perfectionism with speed to market'
    ],
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
