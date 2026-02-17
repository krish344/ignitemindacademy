export type GradeKey = "year3" | "year5" | "year7" | "year9";
export type TopicKey = "number" | "algebra" | "measurement" | "geometry" | "statistics" | "grammar" | "reading" | "writing" | "all";

export type Mcq = {
  id: string;
  grade: Exclude<GradeKey, never>;
  topic: Exclude<TopicKey, "all">;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

// Import curated question bank
import { curatedMcqs, mcqsByGrade, numeracyMcqs, grammarAllMcqs, coverageReport } from '@/content/question-bank/curated-bank';

// Re-export for external use
export { curatedMcqs, mcqsByGrade, numeracyMcqs, grammarAllMcqs, coverageReport };

// Function to get curated questions by grade
export function getCuratedMcqs(grade: GradeKey) {
  return mcqsByGrade[grade] || [];
}

// Function to get curated questions by grade and topic
export function getCuratedMcqsByTopic(grade: GradeKey, topic: TopicKey) {
  const gradeMcqs = mcqsByGrade[grade] || [];
  if (topic === 'all') return gradeMcqs;
  return gradeMcqs.filter(q => q.topic === topic);
}

export const gradeLabels: Record<GradeKey, string> = {
  year3: "Year 3",
  year5: "Year 5",
  year7: "Year 7",
  year9: "Year 9",
};

export const topicLabels: Record<TopicKey, string> = {
  all: "All topics",
  number: "Number",
  algebra: "Algebra",
  measurement: "Measurement",
  geometry: "Geometry",
  statistics: "Statistics & Probability",
  grammar: "English Grammar",
  reading: "Reading",
  writing: "Writing",
};

export const topics: TopicKey[] = [
  "all",
  "number",
  "algebra",
  "measurement",
  "geometry",
  "statistics",
];

export const testTypes = [
  { id: "numeracy", name: "Numeracy", description: "Maths - Number, Algebra, Measurement, Geometry, Statistics" },
  { id: "reading", name: "Reading", description: "Comprehension, inference, vocabulary" },
  { id: "writing", name: "Writing", description: "Creative and persuasive writing" },
  { id: "language", name: "Language Conventions", description: "Spelling, punctuation, grammar" },
];

// ==================== YEAR 3 ENGLISH GRAMMAR ====================
export const grammarMcqsYear3: Mcq[] = [
  // Nouns
  {
    id: "y3-gram-noun-01",
    grade: "year3",
    topic: "grammar",
    prompt: "Which word is a noun?",
    choices: ["run", "happy", "house", "quickly"],
    answerIndex: 2,
    explanation: "A noun is a naming word. 'House' names a place.",
  },
  {
    id: "y3-gram-noun-02",
    grade: "year3",
    topic: "grammar",
    prompt: "Which is a proper noun?",
    choices: ["city", "Sydney", "river", "school"],
    answerIndex: 1,
    explanation: "Proper nouns are names of specific places. Sydney is a city name.",
  },
  {
    id: "y3-gram-noun-03",
    grade: "year3",
    topic: "grammar",
    prompt: "Which word is a collective noun?",
    choices: ["apple", "flock", "jump", "blue"],
    answerIndex: 1,
    explanation: "Collective nouns name a group. 'Flock' is a group of birds.",
  },
  {
    id: "y3-gram-noun-04",
    grade: "year3",
    topic: "grammar",
    prompt: "Which is a singular noun?",
    choices: ["dogs", "children", "cat", "apples"],
    answerIndex: 2,
    explanation: "Singular means one. 'Cat' is one, others are plural.",
  },
  // Verbs
  {
    id: "y3-gram-verb-01",
    grade: "year3",
    topic: "grammar",
    prompt: "Which word is a verb?",
    choices: ["table", "jumped", "blue", "chair"],
    answerIndex: 1,
    explanation: "Verbs are action words. 'Jumped' shows action.",
  },
  {
    id: "y3-gram-verb-02",
    grade: "year3",
    topic: "grammar",
    prompt: "Which is a helping verb?",
    choices: ["run", "eat", "is", "happy"],
    answerIndex: 2,
    explanation: "Helping verbs help main verbs. 'Is' helps 'running'.",
  },
  // Adjectives
  {
    id: "y3-gram-adj-01",
    grade: "year3",
    topic: "grammar",
    prompt: "Which word is an adjective?",
    choices: ["quickly", "run", "happy", "and"],
    answerIndex: 2,
    explanation: "Adjectives describe nouns. 'Happy' describes how someone feels.",
  },
  {
    id: "y3-gram-adj-02",
    grade: "year3",
    topic: "grammar",
    prompt: "Which adjective describes size?",
    choices: ["blue", "big", "soft", "loud"],
    answerIndex: 1,
    explanation: "Size adjectives tell how big or small. 'Big' tells size.",
  },
  // Punctuation
  {
    id: "y3-gram-punc-01",
    grade: "year3",
    topic: "grammar",
    prompt: "Which sentence has correct punctuation?",
    choices: ["i went to the park", "I went to the park.", "i went to the park!", "I went to the park"],
    answerIndex: 1,
    explanation: "Sentences start with capital letter and end with punctuation.",
  },
  {
    id: "y3-gram-punc-02",
    grade: "year3",
    topic: "grammar",
    prompt: "What goes at the end of a question?",
    choices: [".", "!", "?", ","],
    answerIndex: 2,
    explanation: "Questions end with a question mark (? ).",
  },
];

// ==================== YEAR 5 ENGLISH GRAMMAR ====================
export const grammarMcqsYear5: Mcq[] = [
  {
    id: "y5-gram-noun-01",
    grade: "year5",
    topic: "grammar",
    prompt: "Which is a collective noun?",
    choices: ["team", "apple", "run", "happy"],
    answerIndex: 0,
    explanation: "A collective noun names a group. 'Team' refers to a group of people.",
  },
  {
    id: "y5-gram-noun-02",
    grade: "year5",
    topic: "grammar",
    prompt: "Which word is a concrete noun?",
    choices: ["happiness", "idea", "table", "freedom"],
    answerIndex: 2,
    explanation: "Concrete nouns can be touched. 'Table' is something you can touch.",
  },
  {
    id: "y5-gram-verb-01",
    grade: "year5",
    topic: "grammar",
    prompt: "Which is a modal verb?",
    choices: ["run", "jump", "can", "happy"],
    answerIndex: 2,
    explanation: "Modal verbs express ability or possibility. 'Can' shows ability.",
  },
  {
    id: "y5-gram-verb-02",
    grade: "year5",
    topic: "grammar",
    prompt: "Which sentence uses the past perfect tense?",
    choices: ["She ate lunch", "She had eaten lunch", "She is eating lunch", "She will eat lunch"],
    answerIndex: 1,
    explanation: "Past perfect uses 'had' + past participle. 'Had eaten' is past perfect.",
  },
  {
    id: "y5-gram-adj-01",
    grade: "year5",
    topic: "grammar",
    prompt: "Which is a comparative adjective?",
    choices: ["biggest", "big", "running", "quickly"],
    answerIndex: 0,
    explanation: "Comparative adjectives compare two things. Use -est for superlative.",
  },
  {
    id: "y5-gram-adj-02",
    grade: "year5",
    topic: "grammar",
    prompt: "Which is the comparative form of 'beautiful'?",
    choices: ["more beautiful", "beautifuller", "most beautiful", "beautifuler"],
    answerIndex: 0,
    explanation: "Long adjectives use 'more' for comparative. 'More beautiful' is correct.",
  },
  {
    id: "y5-gram-adv-01",
    grade: "year5",
    topic: "grammar",
    prompt: "Which word is an adverb of manner?",
    choices: ["quickly", "table", "happy", "cat"],
    answerIndex: 0,
    explanation: "Adverbs of manner tell how something is done. 'Quickly' tells how.",
  },
  {
    id: "y5-gram-adv-02",
    grade: "year5",
    topic: "grammar",
    prompt: "Which is an adverb of time?",
    choices: ["slowly", "yesterday", "here", "loudly"],
    answerIndex: 1,
    explanation: "Adverbs of time tell when something happens. 'Yesterday' tells time.",
  },
  {
    id: "y5-gram-prep-01",
    grade: "year5",
    topic: "grammar",
    prompt: "Which word is a preposition?",
    choices: ["run", "the", "under", "happy"],
    answerIndex: 2,
    explanation: "Prepositions show relationship. 'Under' shows position.",
  },
  {
    id: "y5-gram-conj-01",
    grade: "year5",
    topic: "grammar",
    prompt: "Which word is a conjunction?",
    choices: ["table", "and", "red", "jump"],
    answerIndex: 1,
    explanation: "Conjunctions join words or sentences. 'And' is a coordinating conjunction.",
  },
];

// ==================== YEAR 7 ENGLISH GRAMMAR ====================
export const grammarMcqsYear7: Mcq[] = [
  {
    id: "y7-gram-noun-01",
    grade: "year7",
    topic: "grammar",
    prompt: "Which is a compound-complex sentence?",
    choices: [
      "I went to the store.",
      "I went to the store and bought milk.",
      "I went to the store because I was hungry, and I bought milk.",
      "Going to the store."
    ],
    answerIndex: 2,
    explanation: "Compound-complex has multiple independent and dependent clauses.",
  },
  {
    id: "y7-gram-noun-02",
    grade: "year7",
    topic: "grammar",
    prompt: "Which sentence uses a noun clause as the subject?",
    choices: [
      "The cat slept.",
      "That she came late surprised everyone.",
      "I ate an apple.",
      "Beautiful flowers grew."
    ],
    answerIndex: 1,
    explanation: "'That she came late' is a noun clause acting as the subject.",
  },
  {
    id: "y7-gram-verb-01",
    grade: "year7",
    topic: "grammar",
    prompt: "Which uses the future perfect tense?",
    choices: [
      "I will finish my homework.",
      "I will have finished my homework by dinner.",
      "I finished my homework.",
      "I am finishing my homework."
    ],
    answerIndex: 1,
    explanation: "Future perfect uses 'will have' + past participle.",
  },
  {
    id: "y7-gram-verb-02",
    grade: "year7",
    topic: "grammar",
    prompt: "Which is a transitive verb?",
    choices: [
      "The ball bounced.",
      "She quickly ate.",
      "He kicked the ball.",
      "The sun sets."
    ],
    answerIndex: 2,
    explanation: "Transitive verbs need an object. 'Kicked' needs 'the ball' as object.",
  },
  {
    id: "y7-gram-pron-01",
    grade: "year7",
    topic: "grammar",
    prompt: "Which is a relative pronoun?",
    choices: ["quickly", "the", "who", "run"],
    answerIndex: 2,
    explanation: "Relative pronouns introduce clauses. 'Who' introduces 'who came here'.",
  },
  {
    id: "y7-gram-pron-02",
    grade: "year7",
    topic: "grammar",
    prompt: "Which is a reflexive pronoun?",
    choices: ["me", "myself", "I", "you"],
    answerIndex: 1,
    explanation: "Reflexive pronouns refer back to the subject. 'Myself' reflects 'I'.",
  },
  {
    id: "y7-gram-voice-01",
    grade: "year7",
    topic: "grammar",
    prompt: "Which is in the passive voice?",
    choices: [
      "The cat chased the mouse.",
      "The mouse was chased by the cat.",
      "The cat is chasing the mouse.",
      "The cat will chase the mouse."
    ],
    answerIndex: 1,
    explanation: "Passive voice: subject receives the action. 'Was chased' is passive.",
  },
  {
    id: "y7-gram-condition-01",
    grade: "year7",
    topic: "grammar",
    prompt: "Which is a third conditional sentence?",
    choices: [
      "If it rains, I stay home.",
      "If it rains, I will stay home.",
      "If it had rained, I would have stayed home.",
      "If it rains, I stayed home."
    ],
    answerIndex: 2,
    explanation: "Third conditional: 'If + past perfect, would have + past participle'.",
  },
  {
    id: "y7-grammar-01",
    grade: "year7",
    topic: "grammar",
    prompt: "Which is a complex sentence?",
    choices: [
      "She ran and jumped.",
      "She ran because she was late.",
      "The dog barked.",
      "B southirds fly."
    ],
    answerIndex: 1,
    explanation: "Complex sentence has one independent and one dependent clause.",
  },
  {
    id: "y7-grammar-02",
    grade: "year7",
    topic: "grammar",
    prompt: "Which uses a semicolon correctly?",
    choices: [
      "I went to the store; and bought milk.",
      "I went to the store; I bought milk.",
      "I went to the store; bought milk",
      "I went to the store, and bought milk;"
    ],
    answerIndex: 1,
    explanation: "Semicolon joins two independent clauses without a conjunction.",
  },
];

// ==================== YEAR 9 ENGLISH GRAMMAR ====================
export const grammarMcqsYear9: Mcq[] = [
  {
    id: "y9-gram-voice-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which sentence is in the active voice?",
    choices: [
      "The ball was thrown by John.",
      "John threw the ball.",
      "The ball is being thrown.",
      "The ball has been thrown."
    ],
    answerIndex: 1,
    explanation: "Active voice: subject does the action. 'John threw' is active.",
  },
  {
    id: "y9-gram-condition-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which is a mixed conditional?",
    choices: [
      "If I studied, I would pass.",
      "If I had studied, I would pass now.",
      "If I study, I will pass.",
      "If I studied, I passed."
    ],
    answerIndex: 1,
    explanation: "Mixed conditional combines past perfect with present result.",
  },
  {
    id: "y9-gram-subjunctive-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which uses the subjunctive mood correctly?",
    choices: [
      "I suggest that he is careful.",
      "I suggest that he be careful.",
      "I suggest that he was careful.",
      "I suggest that he should be careful."
    ],
    answerIndex: 1,
    explanation: "Subjunctive uses 'be' base form after 'suggest that'.",
  },
  {
    id: "y9-gram-participle-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which is a past participle phrase?",
    choices: [
      "Walking down the street, I saw a dog.",
      "Walking is fun.",
      "I was walking.",
      "Walk quickly!"
    ],
    answerIndex: 0,
    explanation: "'Walking down the street' is a present participle phrase modifying 'I'.",
  },
  {
    id: "y9-gram-ellipsis-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which correctly uses ellipsis?",
    choices: [
      "I went to the store... I bought milk.",
      "I went to the store...bought milk.",
      "I went to the store, ... I bought milk.",
      "I went to the store, bought milk..."
    ],
    answerIndex: 0,
    explanation: "Ellipsis (...) indicates omitted text or pause. Space before and after.",
  },
  {
    id: "y9-grammar-modifiers-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which has a misplaced modifier?",
    choices: [
      "I almost ate all the food.",
      "Walking home, the dog greeted me.",
      "She quickly finished her work.",
      "He quietly entered the room."
    ],
    answerIndex: 1,
    explanation: "'Walking home' should modify a person, not 'the dog'. Misplaced modifier.",
  },
  {
    id: "y9-grammar-parallel-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which maintains parallel structure?",
    choices: [
      "She likes reading, swimming, and to run.",
      "She likes reading, swimming, and running.",
      "She likes to read, swimming, and running.",
      "She likes reading, swim, and running."
    ],
    answerIndex: 1,
    explanation: "Parallel structure: all gerunds or all infinitives. 'Reading, swimming, running' is parallel.",
  },
  {
    id: "y9-grammar-dangling-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which has a dangling modifier?",
    choices: [
      "Looking out the window, the mountains were visible.",
      "Looking out the window, I saw the mountains.",
      "The mountains were visible from the window.",
      "I looked out the window and saw mountains."
    ],
    answerIndex: 0,
    explanation: "Dangling: modifier has nothing to modify. 'Looking' needs a subject.",
  },
  {
    id: "y9-grammar-reporting-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which is reported speech correctly?",
    choices: [
      "She said that she was tired.",
      "She said that she is tired.",
      "She said: 'I am tired.'",
      "She told she was tired."
    ],
    answerIndex: 0,
    explanation: "Reported speech backshifts tenses. 'I am tired' becomes 'she was tired'.",
  },
  {
    id: "y9-grammar-inversion-01",
    grade: "year9",
    topic: "grammar",
    prompt: "Which uses grammatical inversion?",
    choices: [
      "I have never seen this.",
      "Never have I seen this.",
      "Never I have seen this.",
      "I never have seen this."
    ],
    answerIndex: 1,
    explanation: "Inversion: auxiliary verb before subject. 'Never have I seen' is inverted.",
  },
];

// ==================== YEAR 3 NUMERACY ====================
export const numeracyMcqsYear3: Mcq[] = [
  {
    id: "y3-num-01",
    grade: "year3",
    topic: "number",
    prompt: "What is 47 + 18?",
    choices: ["55", "65", "75", "85"],
    answerIndex: 1,
    explanation: "47 + 18 = 65.",
  },
  {
    id: "y3-num-02",
    grade: "year3",
    topic: "number",
    prompt: "What is 90 − 36?",
    choices: ["44", "54", "64", "74"],
    answerIndex: 1,
    explanation: "90 − 36 = 54.",
  },
  {
    id: "y3-num-03",
    grade: "year3",
    topic: "number",
    prompt: "Which number is the greatest?",
    choices: ["208", "280", "820", "802"],
    answerIndex: 2,
    explanation: "820 is the largest (8 hundreds).",
  },
  {
    id: "y3-num-04",
    grade: "year3",
    topic: "number",
    prompt: "What is 6 × 4?",
    choices: ["10", "20", "24", "28"],
    answerIndex: 2,
    explanation: "6 × 4 = 24.",
  },
  {
    id: "y3-num-05",
    grade: "year3",
    topic: "number",
    prompt: "Which is an even number?",
    choices: ["35", "41", "58", "73"],
    answerIndex: 2,
    explanation: "Even numbers end in 0, 2, 4, 6, 8. 58 ends in 8.",
  },
  {
    id: "y3-num-06",
    grade: "year3",
    topic: "number",
    prompt: "A box has 5 rows of 3 apples. How many apples?",
    choices: ["8", "12", "15", "18"],
    answerIndex: 2,
    explanation: "5 × 3 = 15.",
  },
  {
    id: "y3-num-07",
    grade: "year3",
    topic: "number",
    prompt: "What comes next: 120, 130, 140, ____?",
    choices: ["141", "150", "160", "240"],
    answerIndex: 1,
    explanation: "Pattern increases by 10. 140 + 10 = 150.",
  },
  {
    id: "y3-num-08",
    grade: "year3",
    topic: "number",
    prompt: "How many tens are in 73?",
    choices: ["7", "3", "73", "10"],
    answerIndex: 0,
    explanation: "73 has 7 tens and 3 ones.",
  },
];

// ==================== YEAR 5 NUMERACY ====================
export const numeracyMcqsYear5: Mcq[] = [
  {
    id: "y5-num-01",
    grade: "year5",
    topic: "number",
    prompt: "What is 456 + 287?",
    choices: ["643", "733", "743", "753"],
    answerIndex: 2,
    explanation: "456 + 287 = 743.",
  },
  {
    id: "y5-num-02",
    grade: "year5",
    topic: "number",
    prompt: "What is 7.5 × 4?",
    choices: ["28", "30", "32", "35"],
    answerIndex: 1,
    explanation: "7.5 × 4 = 30.",
  },
  {
    id: "y5-num-03",
    grade: "year5",
    topic: "number",
    prompt: "What is 144 ÷ 12?",
    choices: ["10", "12", "14", "16"],
    answerIndex: 1,
    explanation: "144 ÷ 12 = 12.",
  },
  {
    id: "y5-num-04",
    grade: "year5",
    topic: "number",
    prompt: "Which is a prime number?",
    choices: ["15", "21", "23", "27"],
    answerIndex: 2,
    explanation: "Prime numbers have exactly 2 factors. 23 is prime.",
  },
  {
    id: "y5-num-05",
    grade: "year5",
    topic: "number",
    prompt: "What is 1/4 of 100?",
    choices: ["20", "25", "40", "50"],
    answerIndex: 1,
    explanation: "100 ÷ 4 = 25.",
  },
  {
    id: "y5-num-06",
    grade: "year5",
    topic: "number",
    prompt: "What is 2.5 + 3.7?",
    choices: ["5.2", "6.0", "6.2", "7.2"],
    answerIndex: 2,
    explanation: "2.5 + 3.7 = 6.2.",
  },
  {
    id: "y5-num-07",
    grade: "year5",
    topic: "algebra",
    prompt: "Solve: x + 7 = 15",
    choices: ["5", "7", "8", "9"],
    answerIndex: 2,
    explanation: "x = 15 − 7 = 8.",
  },
  {
    id: "y5-num-08",
    grade: "year5",
    topic: "measurement",
    prompt: "How many metres in 3.5 kilometres?",
    choices: ["350", "3500", "35000", "35"],
    answerIndex: 1,
    explanation: "1 km = 1000 m. 3.5 × 1000 = 3500 m.",
  },
  {
    id: "y5-num-09",
    grade: "year5",
    topic: "geometry",
    prompt: "What is the perimeter of a square with side 6cm?",
    choices: ["12cm", "18cm", "24cm", "36cm"],
    answerIndex: 2,
    explanation: "Perimeter = 4 × side = 4 × 6 = 24 cm.",
  },
  {
    id: "y5-num-10",
    grade: "year5",
    topic: "statistics",
    prompt: "What is the mode of: 2, 5, 3, 2, 7, 2?",
    choices: ["2", "3", "5", "7"],
    answerIndex: 0,
    explanation: "Mode is most frequent. 2 appears 3 times.",
  },
];

// ==================== YEAR 7 NUMERACY ====================
export const numeracyMcqsYear7: Mcq[] = [
  {
    id: "y7-num-01",
    grade: "year7",
    topic: "number",
    prompt: "What is −8 + 3?",
    choices: ["−11", "−5", "5", "11"],
    answerIndex: 1,
    explanation: "−8 + 3 = −5.",
  },
  {
    id: "y7-num-02",
    grade: "year7",
    topic: "number",
    prompt: "What is (−4) × (−6)?",
    choices: ["−24", "−10", "10", "24"],
    answerIndex: 3,
    explanation: "Negative × negative = positive. (−4) × (−6) = 24.",
  },
  {
    id: "y7-num-03",
    grade: "year7",
    topic: "number",
    prompt: "What is 3/8 as a decimal?",
    choices: ["0.25", "0.375", "0.625", "0.75"],
    answerIndex: 1,
    explanation: "3 ÷ 8 = 0.375.",
  },
  {
    id: "y7-num-04",
    grade: "year7",
    topic: "algebra",
    prompt: "Simplify: 3x + 2x − x",
    choices: ["3x", "4x", "5x", "6x"],
    answerIndex: 1,
    explanation: "3x + 2x − x = 4x.",
  },
  {
    id: "y7-num-05",
    grade: "year7",
    topic: "algebra",
    prompt: "Solve: 2y − 4 = 10",
    choices: ["3", "5", "7", "9"],
    answerIndex: 2,
    explanation: "2y = 14, so y = 7.",
  },
  {
    id: "y7-num-06",
    grade: "year7",
    topic: "geometry",
    prompt: "What is the area of a triangle with base 8cm and height 5cm?",
    choices: ["20cm²", "30cm²", "40cm²", "13cm²"],
    answerIndex: 0,
    explanation: "Area = (base × height) ÷ 2 = (8 × 5) ÷ 2 = 20 cm².",
  },
  {
    id: "y7-num-07",
    grade: "year7",
    topic: "measurement",
    prompt: "How many millilitres in 2.3 litres?",
    choices: ["230", "2300", "23000", "23"],
    answerIndex: 1,
    explanation: "1 litre = 1000 ml. 2.3 × 1000 = 2300 ml.",
  },
  {
    id: "y7-num-08",
    grade: "year7",
    topic: "statistics",
    prompt: "Find the median: 4, 8, 3, 9, 5",
    choices: ["3", "4", "5", "8"],
    answerIndex: 2,
    explanation: "Ordered: 3, 4, 5, 8, 9. Median is 5 (middle value).",
  },
  {
    id: "y7-num-09",
    grade: "year7",
    topic: "number",
    prompt: "What is 20% of 80?",
    choices: ["8", "16", "20", "40"],
    answerIndex: 1,
    explanation: "10% of 80 = 8, so 20% = 16.",
  },
  {
    id: "y7-num-10",
    grade: "year7",
    topic: "geometry",
    prompt: "What is the value of x if angles are supplementary?",
    choices: ["45°", "60°", "90°", "180°"],
    answerIndex: 2,
    explanation: "Supplementary angles add to 180°. If one is 90°, x = 90°.",
  },
];

// ==================== YEAR 9 NUMERACY ====================
export const numeracyMcqsYear9: Mcq[] = [
  {
    id: "y9-num-01",
    grade: "year9",
    topic: "number",
    prompt: "What is √144 + √25?",
    choices: ["7", "12", "17", "169"],
    answerIndex: 2,
    explanation: "√144 = 12, √25 = 5. 12 + 5 = 17.",
  },
  {
    id: "y9-num-02",
    grade: "year9",
    topic: "number",
    prompt: "What is 0.2³ (0.2 cubed)?",
    choices: ["0.006", "0.008", "0.06", "0.8"],
    answerIndex: 1,
    explanation: "0.2³ = 0.2 × 0.2 × 0.2 = 0.008.",
  },
  {
    id: "y9-num-03",
    grade: "year9",
    topic: "algebra",
    prompt: "Simplify: (x²)³",
    choices: ["x⁵", "x⁶", "x⁸", "x⁹"],
    answerIndex: 1,
    explanation: "(x²)³ = x^(2×3) = x⁶.",
  },
  {
    id: "y9-num-04",
    grade: "year9",
    topic: "algebra",
    prompt: "Factor: x² − 9",
    choices: ["(x−3)²", "(x+3)(x+3)", "(x−3)(x+3)", "(x−9)(x+1)"],
    answerIndex: 2,
    explanation: "Difference of squares: a² − b² = (a−b)(a+b).",
  },
  {
    id: "y9-num-05",
    grade: "year9",
    topic: "algebra",
    prompt: "Solve: 3x + 5 = 2x − 7",
    choices: ["−12", "−2", "2", "12"],
    answerIndex: 0,
    explanation: "3x − 2x = −7 − 5, so x = −12.",
  },
  {
    id: "y9-num-06",
    grade: "year9",
    topic: "geometry",
    prompt: "What is the area of a circle with radius 7cm? (π ≈ 3.14)",
    choices: ["43.96cm²", "153.86cm²", "196cm²", "307.72cm²"],
    answerIndex: 1,
    explanation: "Area = πr² = 3.14 × 49 = 153.86 cm².",
  },
  {
    id: "y9-num-07",
    grade: "year9",
    topic: "statistics",
    prompt: "What is the probability of rolling a 5 on a fair die?",
    choices: ["1/6", "1/5", "1/4", "5/6"],
    answerIndex: 0,
    explanation: "1 outcome out of 6 possibilities = 1/6.",
  },
  {
    id: "y9-num-08",
    grade: "year9",
    topic: "number",
    prompt: "What is 15% of 240?",
    choices: ["24", "30", "36", "48"],
    answerIndex: 2,
    explanation: "10% = 24, 5% = 12, so 15% = 36.",
  },
  {
    id: "y9-num-09",
    grade: "year9",
    topic: "measurement",
    prompt: "How many cm³ in 2 litres?",
    choices: ["200", "2000", "20000", "20"],
    answerIndex: 1,
    explanation: "1 litre = 1000 cm³. 2 litres = 2000 cm³.",
  },
  {
    id: "y9-num-10",
    grade: "year9",
    topic: "geometry",
    prompt: "What is the sum of interior angles of a hexagon?",
    choices: ["540°", "720°", "900°", "1080°"],
    answerIndex: 1,
    explanation: "(n−2) × 180° = 4 × 180° = 720°.",
  },
];

// ==================== READING QUESTIONS ====================
export const readingMcqs: Mcq[] = [
  // Year 3 Reading
  {
    id: "y3-read-01",
    grade: "year3",
    topic: "reading",
    prompt: "Read the passage carefully. What is the main idea of the story?",
    choices: ["The cat went to sleep", "A brave dog saved the day", "The sun came out", "Birds fly south"],
    answerIndex: 1,
    explanation: "The main idea is about a brave dog saving the day.",
  },
  {
    id: "y3-read-02",
    grade: "year3",
    topic: "reading",
    prompt: "What do you think will happen next in the story?",
    choices: ["They went home", "They went to school", "They played in the park", "They went to bed"],
    answerIndex: 2,
    explanation: "Based on the story context, they played in the park.",
  },
  {
    id: "y3-read-03",
    grade: "year3",
    topic: "reading",
    prompt: "Which word in the passage means 'very happy'?",
    choices: ["sad", "excited", "tired", "angry"],
    answerIndex: 1,
    explanation: "The word 'excited' means very happy.",
  },
  // Year 5 Reading
  {
    id: "y5-read-01",
    grade: "year5",
    topic: "reading",
    prompt: "Based on the text, what can you infer about the character's feelings?",
    choices: ["Happy and excited", "Sad and worried", "Angry and frustrated", "Tired and sleepy"],
    answerIndex: 1,
    explanation: "The text shows the character was worried about the test.",
  },
  {
    id: "y5-read-02",
    grade: "year5",
    topic: "reading",
    prompt: "Find the synonym for 'quickly' in the passage.",
    choices: ["slowly", "hurriedly", "carefully", "lazily"],
    answerIndex: 1,
    explanation: "Hurriedly is a synonym for quickly.",
  },
  {
    id: "y5-read-03",
    grade: "year5",
    topic: "reading",
    prompt: "What is the author's purpose in writing this text?",
    choices: ["To entertain", "To persuade", "To inform", "To criticize"],
    answerIndex: 0,
    explanation: "The author's main purpose is to entertain readers.",
  },
  // Year 7 Reading
  {
    id: "y7-read-01",
    grade: "year7",
    topic: "reading",
    prompt: "What does the author mean by 'a bolt from the blue'?",
    choices: ["A sudden thunderstorm", "An unexpected event", "A blue bird", "Lightning strike"],
    answerIndex: 1,
    explanation: "It means something unexpected happened suddenly.",
  },
  {
    id: "y7-read-02",
    grade: "year7",
    topic: "reading",
    prompt: "Which technique does the author use to create tension?",
    choices: ["Humour", "Suspense", "Rhyme", "Repetition"],
    answerIndex: 1,
    explanation: "The author uses suspense to create tension.",
  },
  {
    id: "y7-read-03",
    grade: "year7",
    topic: "reading",
    prompt: "What is the theme of the passage?",
    choices: ["Friendship", "Courage", "Honesty", "All of the above"],
    answerIndex: 3,
    explanation: "The passage explores multiple themes including friendship, courage and honesty.",
  },
  // Year 9 Reading
  {
    id: "y9-read-01",
    grade: "year9",
    topic: "reading",
    prompt: "Which evidence from the text best supports the main argument?",
    choices: ["Statistics shown", "Expert quotes", "Personal anecdote", "Historical example"],
    answerIndex: 1,
    explanation: "Expert quotes provide the strongest evidence for the argument.",
  },
  {
    id: "y9-read-02",
    grade: "year9",
    topic: "reading",
    prompt: "How does the author's language influence the reader?",
    choices: ["Creates confusion", "Evokes emotions", "Slows down pacing", "Reduces interest"],
    answerIndex: 1,
    explanation: "The author's purposeful language evokes emotions in readers.",
  },
  {
    id: "y9-read-03",
    grade: "year9",
    topic: "reading",
    prompt: "What is the tone of the passage?",
    choices: ["Humorous", "Formal", "Academic", "Informative"],
    answerIndex: 1,
    explanation: "The passage has a formal tone throughout.",
  },
];

// ==================== WRITING PROMPTS ====================
export const writingMcqs: Mcq[] = [
  // Year 3 Writing
  {
    id: "y3-write-01",
    grade: "year3",
    topic: "writing",
    prompt: "Write about your favourite animal. Describe what it looks like and explain why you like it. (5-7 sentences)",
    choices: [],
    answerIndex: 0,
    explanation: "Include details about appearance and personal feelings.",
  },
  {
    id: "y3-write-02",
    grade: "year3",
    topic: "writing",
    prompt: "Write about what you did on the weekend. Use sequencing words like first, then, finally.",
    choices: [],
    answerIndex: 0,
    explanation: "Organise your writing with time order words.",
  },
  // Year 5 Writing
  {
    id: "y5-write-01",
    grade: "year5",
    topic: "writing",
    prompt: "Write a persuasive paragraph convincing your friend to try a new food. Include at least 3 reasons.",
    choices: [],
    answerIndex: 0,
    explanation: "Use persuasive language, reasons, examples, and a call to action.",
  },
  {
    id: "y5-write-02",
    grade: "year5",
    topic: "writing",
    prompt: "Write a creative story about a magical land. Include a beginning, middle and end.",
    choices: [],
    answerIndex: 0,
    explanation: "Structure your narrative with clear beginning, problem and resolution.",
  },
  // Year 7 Writing
  {
    id: "y7-write-01",
    grade: "year7",
    topic: "writing",
    prompt: "Write a narrative about a time you learned something important. Describe the setting, characters, problem and resolution.",
    choices: [],
    answerIndex: 0,
    explanation: "Include setting, characters, problem, and resolution.",
  },
  {
    id: "y7-write-02",
    grade: "year7",
    topic: "writing",
    prompt: "Write a persuasive article for your school newspaper about why students should have longer breaks.",
    choices: [],
    answerIndex: 0,
    explanation: "Present clear arguments with evidence and address counterarguments.",
  },
  // Year 9 Writing
  {
    id: "y9-write-01",
    grade: "year9",
    topic: "writing",
    prompt: "Write a persuasive speech on whether technology helps or harms education. Include introduction, arguments, evidence and conclusion.",
    choices: [],
    answerIndex: 0,
    explanation: "Present clear arguments, evidence, counterarguments, and a strong conclusion.",
  },
  {
    id: "y9-write-02",
    grade: "year9",
    topic: "writing",
    prompt: "Write a formal email to your principal requesting a change to school uniform policy. Use appropriate formal language.",
    choices: [],
    answerIndex: 0,
    explanation: "Use formal salutations, clear purpose, respectful tone and formal closing.",
  },
];

// ==================== COMBINED ARRAYS ====================
export const grammarMcqs = [
  ...grammarMcqsYear3,
  ...grammarMcqsYear5,
  ...grammarMcqsYear7,
  ...grammarMcqsYear9,
];

export const mcqs = [
  ...numeracyMcqsYear3,
  ...numeracyMcqsYear5,
  ...numeracyMcqsYear7,
  ...numeracyMcqsYear9,
];

export function mcqsForGrade(grade: GradeKey, topic: TopicKey) {
  // Use curated question bank
  const curated = getCuratedMcqs(grade);
  if (topic === "all") return curated;
  return curated.filter((q) => q.topic === topic);
}

export function mcqsForGradeAndTopic(grade: GradeKey, topic: TopicKey, testType: string) {
  // Filter by test type (subject)
  switch (testType) {
    case "numeracy":
      return numeracyMcqs.filter((q) => q.grade === grade);
    case "reading":
      // Return reading questions (placeholder - add reading question bank)
      return readingMcqs.filter((q) => q.grade === grade);
    case "writing":
      // Return writing questions (placeholder - add writing question bank)
      return writingMcqs.filter((q) => q.grade === grade);
    case "language":
      return grammarMcqs.filter((q) => q.grade === grade);
    default:
      return numeracyMcqs.filter((q) => q.grade === grade);
  }
}
