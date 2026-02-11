import { jsPDF } from "jspdf";

interface Question {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
}

interface PracticeQuestions {
  numeracy: Question[];
  reading: Question[];
  writing: Question[];
  grammar: Question[];
}

const questions: Record<string, PracticeQuestions> = {
  "Year 3": {
    numeracy: [
      { id: "N1", question: "What is 47 + 23?", answer: "70", explanation: "47 + 23 = 70" },
      { id: "N2", question: "What is 56 - 19?", answer: "37", explanation: "56 - 19 = 37" },
      { id: "N3", question: "What is 8 × 7?", answer: "56", explanation: "8 × 7 = 56" },
      { id: "N4", question: "What is 24 ÷ 4?", answer: "6", explanation: "24 ÷ 4 = 6" },
      { id: "N5", question: "What comes next: 12, 15, 18, ___?", answer: "21", explanation: "Pattern: +3" },
      { id: "N6", question: "Which is bigger: 0.5 or 0.45?", answer: "0.5", explanation: "0.5 is bigger" },
      { id: "N7", question: "What is 100 + 250?", answer: "350", explanation: "100 + 250 = 350" },
      { id: "N8", question: "What is 72 ÷ 8?", answer: "9", explanation: "72 ÷ 8 = 9" },
      { id: "N9", question: "3 quarters + 2 quarters = ?", answer: "5 quarters", explanation: "3 + 2 = 5" },
      { id: "N10", question: "What is 6 × 6?", answer: "36", explanation: "6 × 6 = 36" },
      { id: "N11", question: "What is 45 - 17?", answer: "28", explanation: "45 - 17 = 28" },
      { id: "N12", question: "Pencil costs 20 cents, 3 pencils = ?", answer: "60 cents", explanation: "20 × 3 = 60" },
      { id: "N13", question: "What is 80 + 95?", answer: "175", explanation: "80 + 95 = 175" },
      { id: "N14", question: "What is 50 ÷ 10?", answer: "5", explanation: "50 ÷ 10 = 5" },
      { id: "N15", question: "Which is largest: 234, 243, 324?", answer: "324", explanation: "324 is largest" },
      { id: "N16", question: "What is 9 × 8?", answer: "72", explanation: "9 × 8 = 72" },
      { id: "N17", question: "What is 63 ÷ 7?", answer: "9", explanation: "63 ÷ 7 = 9" },
      { id: "N18", question: "What is 156 + 44?", answer: "200", explanation: "156 + 44 = 200" },
      { id: "N19", question: "What is 100 - 37?", answer: "63", explanation: "100 - 37 = 63" },
      { id: "N20", question: "Share 12 cookies among 3 friends = ?", answer: "4 each", explanation: "12 ÷ 3 = 4" },
      { id: "N21", question: "What is 7 × 9?", answer: "63", explanation: "7 × 9 = 63" },
      { id: "N22", question: "What is 81 ÷ 9?", answer: "9", explanation: "81 ÷ 9 = 9" },
      { id: "N23", question: "What is 200 + 350?", answer: "550", explanation: "200 + 350 = 550" },
      { id: "N24", question: "What is 55 - 28?", answer: "27", explanation: "55 - 28 = 27" },
      { id: "N25", question: "2 apples = 50 cents, 4 apples = ?", answer: "$1.00", explanation: "4 × 25 cents" },
    ],
    reading: [
      { id: "R1", question: "What was the main activity?", answer: "Building sandcastles", explanation: "Children built sandcastles." },
      { id: "R2", question: "Where did the story take place?", answer: "At the beach", explanation: "Ocean and sun setting." },
      { id: "R3", question: "What does 'brave' mean?", answer: "Courageous", explanation: "Facing fear." },
      { id: "R4", question: "Who was the main character?", answer: "Emma", explanation: "Emma found treasure." },
      { id: "R5", question: "What did the cat do?", answer: "Ran up a tree", explanation: "Cat ran away." },
      { id: "R6", question: "What was the weather like?", answer: "Sunny and warm", explanation: "Sunny weather." },
      { id: "R7", question: "Why was the character happy?", answer: "Found her puppy", explanation: "Finding puppy." },
      { id: "R8", question: "What time did it start?", answer: "9 o'clock", explanation: "Mentioned 9 o'clock." },
      { id: "R9", question: "What did the boy find?", answer: "A golden key", explanation: "Key was in garden." },
      { id: "R10", question: "How many friends went?", answer: "Four", explanation: "Four friends." },
      { id: "R11", question: "What did the dragon breathe?", answer: "Smoke and fire", explanation: "Dragon breathed smoke." },
      { id: "R12", question: "Where did the family live?", answer: "In a cottage", explanation: "Lived in cottage." },
      { id: "R13", question: "What was the dog's name?", answer: "Max", explanation: "Dog called Max." },
      { id: "R14", question: "What did the princess lose?", answer: "Her glass slipper", explanation: "Lost slipper." },
      { id: "R15", question: "How did the story end?", answer: "They lived happily", explanation: "Happy ending." },
    ],
    writing: [
      { id: "W1", question: "Write story: magical garden with key, secret door, talking animal.", answer: "Your response", explanation: "Use imagination!" },
      { id: "W2", question: "Write about your favorite day at school.", answer: "Your response", explanation: "Describe what happened." },
      { id: "W3", question: "If you had a superpower, what would it be?", answer: "Your response", explanation: "Choose and explain." },
      { id: "W4", question: "Write instructions for making a sandwich.", answer: "Your response", explanation: "Use First, Next, Then." },
      { id: "W5", question: "What did you do during holidays?", answer: "Your response", explanation: "Write about activities." },
    ],
    grammar: [
      { id: "G1", question: "Correct: 'She go' or 'She goes'?", answer: "She goes", explanation: "Third person uses 'goes'." },
      { id: "G2", question: "Find noun: 'The big dog barked.'", answer: "dog", explanation: "Dog is a noun." },
      { id: "G3", question: "Opposite of 'hot'?", answer: "cold", explanation: "Cold is opposite." },
      { id: "G4", question: "Fill: 'I ___ to school yesterday.' (go)", answer: "went", explanation: "Past tense." },
      { id: "G5", question: "Find adjective: 'The red ball.'", answer: "red", explanation: "Red describes ball." },
      { id: "G6", question: "Correct: 'I am' or 'I are'?", answer: "I am", explanation: "I takes 'am'." },
      { id: "G7", question: "Find verb: 'The bird flies.'", answer: "flies", explanation: "Flies is action." },
      { id: "G8", question: "Rhymes with 'cat'?", answer: "hat", explanation: "Hat rhymes." },
      { id: "G9", question: "Capitalize: 'paris is in france'", answer: "Paris is in France", explanation: "Capitalize countries." },
      { id: "G10", question: "Add 'un' to 'happy':", answer: "unhappy", explanation: "Prefix 'un'." },
    ],
  },
  "Year 5": {
    numeracy: [
      { id: "N1", question: "What is 234 + 567?", answer: "801", explanation: "234 + 567 = 801" },
      { id: "N2", question: "3/4 pizza, eat 1/2. Left?", answer: "1/4", explanation: "3/4 - 1/2 = 1/4" },
      { id: "N3", question: "What is 144 ÷ 12?", answer: "12", explanation: "144 ÷ 12 = 12" },
      { id: "N4", question: "What is 15% of 80?", answer: "12", explanation: "15% of 80 = 12" },
      { id: "N5", question: "Rectangle 8cm × 5cm. Area?", answer: "40 cm²", explanation: "8 × 5 = 40" },
      { id: "N6", question: "What is 7.25 + 3.8?", answer: "11.05", explanation: "7.25 + 3.8 = 11.05" },
      { id: "N7", question: "What is 450 - 187?", answer: "263", explanation: "450 - 187 = 263" },
      { id: "N8", question: "What is 6 × 78?", answer: "468", explanation: "6 × 78 = 468" },
      { id: "N9", question: "What is 1000 ÷ 8?", answer: "125", explanation: "1000 ÷ 8 = 125" },
      { id: "N10", question: "Convert 0.75 to %.", answer: "75%", explanation: "0.75 × 100 = 75%" },
      { id: "N11", question: "3 books cost $24. 5 books = ?", answer: "$40", explanation: "Each $8" },
      { id: "N12", question: "What is 2/5 of 125?", answer: "50", explanation: "2/5 × 125 = 50" },
      { id: "N13", question: "100 more than 4567?", answer: "4667", explanation: "4567 + 100 = 4667" },
      { id: "N14", question: "25% of 200?", answer: "50", explanation: "25% of 200 = 50" },
      { id: "N15", question: "Triangle: 3cm, 4cm, 5cm. Perimeter?", answer: "12cm", explanation: "3+4+5=12cm" },
      { id: "N16", question: "What is 9 × 45?", answer: "405", explanation: "9 × 45 = 405" },
      { id: "N17", question: "500 ÷ 25?", answer: "20", explanation: "500 ÷ 25 = 20" },
      { id: "N18", question: "What is 12.5 + 4.75?", answer: "17.25", explanation: "12.5 + 4.75 = 17.25" },
      { id: "N19", question: "What is 8²?", answer: "64", explanation: "8 × 8 = 64" },
      { id: "N20", question: "3kg = ___ grams?", answer: "3000g", explanation: "3kg = 3000g" },
      { id: "N21", question: "x + 7 = 15, x = ?", answer: "8", explanation: "x = 8" },
      { id: "N22", question: "7 × 6 × 2 = ?", answer: "84", explanation: "42 × 2 = 84" },
      { id: "N23", question: "3/8 + 2/8 = ?", answer: "5/8", explanation: "3/8 + 2/8 = 5/8" },
      { id: "N24", question: "Square side 6cm. Perimeter?", answer: "24cm", explanation: "6 × 4 = 24cm" },
      { id: "N25", question: "100 ÷ 0.5 = ?", answer: "200", explanation: "100 ÷ 0.5 = 200" },
    ],
    reading: [
      { id: "R1", question: "What is the author's main argument?", answer: "Renewable energy is important", explanation: "Evidence supports." },
      { id: "R2", question: "Find three supporting facts.", answer: "Facts from passage", explanation: "Look for evidence." },
      { id: "R3", question: "What does 'significant' mean?", answer: "Important", explanation: "Having importance." },
      { id: "R4", question: "Why include statistics?", answer: "To support argument", explanation: "Statistics provide evidence." },
      { id: "R5", question: "Author's purpose?", answer: "To persuade", explanation: "Text aims to convince." },
      { id: "R6", question: "Which is an opinion?", answer: "\"Renewable energy is best.\"", explanation: "Cannot be proven." },
      { id: "R7", question: "What can you infer?", answer: "She was nervous", explanation: "Clues suggest." },
      { id: "R8", question: "Main theme?", answer: "Beauty of nature", explanation: "Focus on nature." },
      { id: "R9", question: "What caused fear?", answer: "The dark forest", explanation: "Setting caused fear." },
      { id: "R10", question: "How was problem solved?", answer: "By being brave", explanation: "Bravery solved." },
    ],
    writing: [
      { id: "W1", question: "Should schools have more recess? Give 3 reasons.", answer: "Your response", explanation: "Use TEEL structure." },
      { id: "W2", question: "Write narrative about a day when everything went wrong.", answer: "Your response", explanation: "Surprise ending." },
      { id: "W3", question: "Should students have homework? Argue position.", answer: "Your response", explanation: "Present arguments." },
      { id: "W4", question: "Describe your dream vacation.", answer: "Your response", explanation: "Vivid details." },
      { id: "W5", question: "Write a letter to your future self.", answer: "Your response", explanation: "Letter format." },
    ],
    grammar: [
      { id: "G1", question: "Conjunction: 'I wanted to go, but...'", answer: "but", explanation: "Joins clauses." },
      { id: "G2", question: "Past tense of 'begin'?", answer: "began", explanation: "Irregular verb." },
      { id: "G3", question: "Subject: 'The happy children played.'", answer: "The happy children", explanation: "Who/what sentence about." },
      { id: "G4", question: "'Neither Tom nor Jerry ___ coming.'", answer: "is", explanation: "Neither/nor = singular." },
      { id: "G5", question: "Synonym for 'happy'?", answer: "joyful", explanation: "Similar meaning." },
      { id: "G6", question: "Preposition: 'on the mat'", answer: "on", explanation: "Shows location." },
      { id: "G7", question: "Antonym of 'fast'?", answer: "slow", explanation: "Opposite." },
      { id: "G8", question: "Proper noun?", answer: "Australia", explanation: "Names of places." },
      { id: "G9", question: "Fix: 'Their going to park.'", answer: "They're going", explanation: "They're = they are." },
      { id: "G10", question: "'The team ___ winning.' (is/are)", answer: "is", explanation: "Team is singular." },
    ],
  },
  "Year 7": {
    numeracy: [
      { id: "N1", question: "Solve: 3x + 7 = 22. x = ?", answer: "5", explanation: "3x = 15, x = 5" },
      { id: "N2", question: "√144 = ?", answer: "12", explanation: "12 × 12 = 144" },
      { id: "N3", question: "4 shirts = $80. 7 shirts = ?", answer: "$140", explanation: "Each $20" },
      { id: "N4", question: "2/5 of 125 = ?", answer: "50", explanation: "2/5 × 125 = 50" },
      { id: "N5", question: "0.75 to % = ?", answer: "75%", explanation: "0.75 × 100 = 75%" },
      { id: "N6", question: "Triangle: 45° and 90°. Third angle?", answer: "45°", explanation: "180 - 45 - 90 = 45°" },
      { id: "N7", question: "15% of $450 = ?", answer: "$67.50", explanation: "0.15 × 450 = 67.50" },
      { id: "N8", question: "Solve: 2(x-5)+3=15", answer: "x = 11", explanation: "2x = 22, x = 11" },
      { id: "N9", question: "3² + 4² = ?", answer: "25", explanation: "9 + 16 = 25" },
      { id: "N10", question: "6 workers, 30 days. 18 days needs?", answer: "10 workers", explanation: "180 ÷ 18 = 10" },
      { id: "N11", question: "0.8 × 0.5 = ?", answer: "0.4", explanation: "0.8 × 0.5 = 0.4" },
      { id: "N12", question: "7.5 ÷ 0.5 = ?", answer: "15", explanation: "7.5 ÷ 0.5 = 15" },
      { id: "N13", question: "Cube side 4cm. Volume?", answer: "64 cm³", explanation: "4³ = 64" },
      { id: "N14", question: "25% of 360 = ?", answer: "90", explanation: "0.25 × 360 = 90" },
      { id: "N15", question: "y = 3x + 2, x = 4. y = ?", answer: "14", explanation: "y = 14" },
      { id: "N16", question: "5³ = ?", answer: "125", explanation: "5 × 5 × 5 = 125" },
      { id: "N17", question: "√100 + √25 = ?", answer: "15", explanation: "10 + 5 = 15" },
      { id: "N18", question: "3x = 24. x = ?", answer: "8", explanation: "x = 8" },
      { id: "N19", question: "20% of 150 = ?", answer: "30", explanation: "0.20 × 150 = 30" },
      { id: "N20", question: "Rectangle 10cm × 6cm. Area?", answer: "60 cm²", explanation: "10 × 6 = 60" },
      { id: "N21", question: "480 ÷ 16 = ?", answer: "30", explanation: "480 ÷ 16 = 30" },
      { id: "N22", question: "12 × 3.5 = ?", answer: "42", explanation: "12 × 3.5 = 42" },
      { id: "N23", question: "2L = ___ mL?", answer: "2000 mL", explanation: "2L = 2000mL" },
      { id: "N24", question: "7 × 7 × 7 = ?", answer: "343", explanation: "7³ = 343" },
      { id: "N25", question: "y = 4x - 3, x = 5. y = ?", answer: "17", explanation: "y = 17" },
    ],
    reading: [
      { id: "R1", question: "Author's purpose?", answer: "To persuade", explanation: "Text aims to convince." },
      { id: "R2", question: "How language influences?", answer: "Analysis", explanation: "Emotive words." },
      { id: "R3", question: "Compare two characters.", answer: "Comparison", explanation: "Similarities." },
      { id: "R4", question: "Main theme?", answer: "Theme", explanation: "Underlying message." },
      { id: "R5", question: "Evaluate source.", answer: "Evaluation", explanation: "Consider expertise." },
      { id: "R6", question: "Structure supports?", answer: "Analysis", explanation: "Consider structure." },
      { id: "R7", question: "What can be inferred?", answer: "Inference", explanation: "Use clues." },
      { id: "R8", question: "Language devices?", answer: "Devices", explanation: "Simile, metaphor." },
      { id: "R9", question: "What causes conflict?", answer: "Misunderstanding", explanation: "Conflict." },
      { id: "R10", question: "Setting affects plot?", answer: "Creates challenges", explanation: "Setting influences." },
    ],
    writing: [
      { id: "W1", question: "Renewable energy speech with statistics.", answer: "Your response", explanation: "Structure: Hook, Arguments." },
      { id: "W2", question: "Write from different perspective.", answer: "Your response", explanation: "Change POV." },
      { id: "W3", question: "Mobile phones in schools? Argue.", answer: "Your response", explanation: "Present arguments." },
      { id: "W4", question: "Describe storm with vivid imagery.", answer: "Your response", explanation: "Sensory details." },
      { id: "W5", question: "Write about facing a challenge.", answer: "Your response", explanation: "Show growth." },
    ],
    grammar: [
      { id: "G1", question: "Modal verb: 'You should...'", answer: "should", explanation: "Shows obligation." },
      { id: "G2", question: "Past participle of 'eat'?", answer: "eaten", explanation: "Perfect tenses." },
      { id: "G3", question: "Complex sentence?", answer: "Dependent + Independent", explanation: "Both clause types." },
      { id: "G4", question: "'their', 'there', 'theyre'?", answer: "Possessive/place/they are", explanation: "Different meanings." },
      { id: "G5", question: "Passive: 'Dog bit man.'", answer: "Man was bitten", explanation: "Object becomes subject." },
      { id: "G6", question: "Figurative: 'Wind whispered.'", answer: "Personification", explanation: "Human to wind." },
      { id: "G7", question: "Noun phrase?", answer: "Group as noun", explanation: "Noun + modifiers." },
      { id: "G8", question: "Subordinating conjunction?", answer: "Although/because", explanation: "Introduces dependent." },
      { id: "G9", question: "Reported: 'I will help,' she said.", answer: "She said she would help.", explanation: "Reported speech." },
      { id: "G10", question: "Verb phrase?", answer: "Group as verb", explanation: "Verb + helpers." },
    ],
  },
  "Year 9": {
    numeracy: [
      { id: "N1", question: "Solve: 2(x-5)+3=15", answer: "x = 11", explanation: "2x = 22, x = 11" },
      { id: "N2", question: "3² + 4² = ?", answer: "25", explanation: "9 + 16 = 25" },
      { id: "N3", question: "6 workers, 30 days. 18 days needs?", answer: "10 workers", explanation: "180 ÷ 18 = 10" },
      { id: "N4", question: "15% of $450 = ?", answer: "$67.50", explanation: "0.15 × 450 = 67.50" },
      { id: "N5", question: "Cylinder: r=7cm, h=10cm. Volume? (π=3.14)", answer: "1538.6 cm³", explanation: "V = 1538.6" },
      { id: "N6", question: "3x - 7 = 14. x = ?", answer: "7", explanation: "3x = 21, x = 7" },
      { id: "N7", question: "√81 + √16 = ?", answer: "13", explanation: "9 + 4 = 13" },
      { id: "N8", question: "y = 2x + 3, x = 5. y = ?", answer: "13", explanation: "y = 13" },
      { id: "N9", question: "25% of 360 = ?", answer: "90", explanation: "0.25 × 360 = 90" },
      { id: "N10", question: "3/8 as decimal?", answer: "0.375", explanation: "3 ÷ 8 = 0.375" },
      { id: "N11", question: "Rectangle: 48cm², w=6cm. Length?", answer: "8cm", explanation: "L = 48 ÷ 6 = 8" },
      { id: "N12", question: "0.25 × 0.25 = ?", answer: "0.0625", explanation: "0.25² = 0.0625" },
      { id: "N13", question: "Train: 180km in 2h. Speed?", answer: "90 km/h", explanation: "Speed = 90 km/h" },
      { id: "N14", question: "8³ = ?", answer: "512", explanation: "8 × 8 × 8 = 512" },
      { id: "N15", question: "4(x+2)=3(x-1). x = ?", answer: "x = -11", explanation: "x = -11" },
      { id: "N16", question: "What is 6² × 2 = ?", answer: "72", explanation: "36 × 2 = 72" },
      { id: "N17", question: "What is 500 ÷ 0.25 = ?", answer: "2000", explanation: "500 ÷ 0.25 = 2000" },
      { id: "N18", question: "If y = 5x - 4, x = 3. y = ?", answer: "11", explanation: "y = 11" },
      { id: "N19", question: "Circle: r=5cm. Area? (π=3.14)", answer: "78.5 cm²", explanation: "3.14 × 25 = 78.5" },
      { id: "N20", question: "What is 7.5 × 8 = ?", answer: "60", explanation: "7.5 × 8 = 60" },
      { id: "N21", question: "What is 3/4 ÷ 1/2 = ?", answer: "1.5", explanation: "3/4 × 2/1 = 1.5" },
      { id: "N22", question: "Prism: 4cm × 5cm × 10cm. Volume?", answer: "200 cm³", explanation: "4 × 5 × 10 = 200" },
      { id: "N23", question: "What is 25% of 80 = ?", answer: "20", explanation: "0.25 × 80 = 20" },
      { id: "N24", question: "If 8x = 56. x = ?", answer: "7", explanation: "x = 7" },
      { id: "N25", question: "Triangle base 8cm, height 6cm. Area?", answer: "24 cm²", explanation: "0.5 × 8 × 6 = 24" },
    ],
    reading: [
      { id: "R1", question: "Evaluate source credibility.", answer: "Evaluation", explanation: "Consider expertise." },
      { id: "R2", question: "How language persuades?", answer: "Analysis", explanation: "Rhetorical devices." },
      { id: "R3", question: "Argument structure?", answer: "Analysis", explanation: "Logical flow." },
      { id: "R4", question: "Main theme/message?", answer: "Theme", explanation: "Underlying meaning." },
      { id: "R5", question: "Compare perspectives?", answer: "Comparison", explanation: "Different viewpoints." },
      { id: "R6", question: "Context influences meaning?", answer: "Context", explanation: "Historical factors." },
      { id: "R7", question: "Metalanguage used?", answer: "Metalanguage", explanation: "Terms for language." },
      { id: "R8", question: "Cumulative effect?", answer: "Effect analysis", explanation: "Language impact." },
      { id: "R9", question: "Rhetorical devices?", answer: "Devices", explanation: "Persuasion." },
      { id: "R10", question: "Textual evidence?", answer: "Evidence", explanation: "Support from text." },
    ],
    writing: [
      { id: "W1", question: "Formal letter: Improvements to NAPLAN.", answer: "Your response", explanation: "Format: Address, Body." },
      { id: "W2", question: "Balanced argument: AI in education.", answer: "Your response", explanation: "Both sides." },
      { id: "W3", question: "Social issue through narrative.", answer: "Your response", explanation: "Story illuminates." },
      { id: "W4", question: "Speech: formal occasion.", answer: "Your response", explanation: "Structure." },
      { id: "W5", question: "Review: favorite film.", answer: "Your response", explanation: "Opinion." },
    ],
    grammar: [
      { id: "G1", question: "Nominalization: 'The destruction...'", answer: "destruction", explanation: "Verb to noun." },
      { id: "G2", question: "'Affect' vs 'effect'?", answer: "Affect=verb, Effect=noun", explanation: "Different parts." },
      { id: "G3", question: "Hedging language?", answer: "Hedging", explanation: "Uncertainty." },
      { id: "G4", question: "Reported: 'I will help,' she said.", answer: "She said she would help.", explanation: "Reported." },
      { id: "G5", question: "Semi-colon function?", answer: "Link ideas", explanation: "Joins clauses." },
      { id: "G6", question: "Evaluative language?", answer: "Judgment", explanation: "Expresses opinion." },
      { id: "G7", question: "Cohesive devices?", answer: "Linking words", explanation: "Connect ideas." },
      { id: "G8", question: "Register appropriate?", answer: "Register", explanation: "Formal level." },
      { id: "G9", question: "Discourse markers?", answer: "Connectives", explanation: "Guide reader." },
      { id: "G10", question: "Lexical cohesion?", answer: "Word links", explanation: "Vocabulary." },
    ],
  },
};

function addPageBreak(doc: jsPDF) {
  doc.addPage();
  return 20;
}

function addSection(doc: jsPDF, title: string, items: Question[], y: number, pageHeight: number, margin: number): number {
  if (y > pageHeight - 40) {
    y = addPageBreak(doc);
  }
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(249, 115, 22);
  doc.text(title, margin, y);
  y += 10;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 51, 51);
  
  for (const item of items) {
    if (y > pageHeight - 20) {
      y = addPageBreak(doc);
    }
    
    doc.setFont("helvetica", "bold");
    const qLines = doc.splitTextToSize(`${item.id}: ${item.question}`, 170);
    doc.text(qLines, margin, y);
    y += qLines.length * 5;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 128, 0);
    doc.text(`Answer: ${item.answer}`, margin + 5, y);
    y += 5;
    
    if (item.explanation) {
      doc.setFont("helvetica", "italic");
      doc.setTextColor(128, 128, 128);
      const eLines = doc.splitTextToSize(`Explanation: ${item.explanation}`, 165);
      doc.text(eLines, margin + 5, y);
      y += eLines.length * 5;
    }
    
    y += 3;
    doc.setTextColor(51, 51, 51);
  }
  
  return y + 5;
}

export function generatePDFBuffer(yearLevel: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF();
      const q = questions[yearLevel] || questions["Year 5"];
      const totalQuestions = q.numeracy.length + q.reading.length + q.writing.length + q.grammar.length;
      
      let y = 20;
      const pageHeight = 270;
      const margin = 20;
      
      // Title
      doc.setFontSize(24);
      doc.setTextColor(249, 115, 22);
      doc.text("IgniteMind Academy", 105, y, { align: "center" });
      y += 12;
      
      doc.setFontSize(18);
      doc.setTextColor(51, 51, 51);
      doc.text("NAPLAN Practice Kit", 105, y, { align: "center" });
      y += 10;
      
      doc.setFontSize(14);
      doc.setTextColor(102, 102, 102);
      doc.text(`For ${yearLevel} Students - ${totalQuestions}+ Questions`, 105, y, { align: "center" });
      y += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(153, 153, 153);
      doc.text("50+ Practice Questions with Detailed Answers", 105, y, { align: "center" });
      y += 15;
      
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`© ${new Date().getFullYear()} IgniteMind Academy`, 105, y, { align: "center" });
      y += 20;
      
      // Add sections
      y = addSection(doc, "NUMERACY", q.numeracy, y, pageHeight, margin);
      y = addSection(doc, "READING COMPREHENSION", q.reading, y, pageHeight, margin);
      y = addSection(doc, "WRITING", q.writing, y, pageHeight, margin);
      y = addSection(doc, "GRAMMAR & LANGUAGE", q.grammar, y, pageHeight, margin);
      
      // Footer on last page
      const pageCount = doc.getNumberOfPages();
      doc.setPage(pageCount);
      doc.setFontSize(8);
      doc.setTextColor(153, 153, 153);
      doc.text("Generated by IgniteMind Academy NAPLAN Practice Kit", 105, 290, { align: "center" });
      
      const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
      resolve(pdfBuffer);
    } catch (error) {
      reject(error);
    }
  });
}