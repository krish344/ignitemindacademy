/**
 * Curated NAPLAN Question Bank
 * Organized by Grade, Subject, and Topic
 * 
 * Integration: Import from @/content/question-bank/curated-bank
 */

import { Mcq } from '@/lib/quiz';

// Helper function to create MCQ
function createMcq(
  id: string,
  grade: 'year3' | 'year5' | 'year7' | 'year9',
  topic: 'number' | 'algebra' | 'measurement' | 'geometry' | 'statistics' | 'grammar',
  prompt: string,
  choices: string[],
  answerIndex: number,
  explanation: string
): Mcq {
  return { id, grade, topic, prompt, choices, answerIndex, explanation };
}

// ==================== YEAR 3 NUMERACY ====================
export const year3NumeracyMcqs: Mcq[] = [
  // Number & Place Value
  createMcq('y3-num-001', 'year3', 'number', 'What is the value of the 7 in 472?', ['7', '70', '700', '472'], 1, 'The 7 is in the tens place, so its value is 70.'),
  createMcq('y3-num-002', 'year3', 'number', 'Which number is the smallest?', ['345', '453', '534', '243'], 3, '243 is the smallest because 2 < 3.'),
  createMcq('y3-num-003', 'year3', 'number', 'What comes next? 234, 235, 236, ___', ['237', '238', '240', '239'], 0, 'The pattern increases by 1 each time.'),
  createMcq('y3-num-004', 'year3', 'number', 'What is 56 + 37?', ['83', '93', '91', '89'], 1, '56 + 37 = 93'),
  createMcq('y3-num-005', 'year3', 'number', 'What is 85 - 38?', ['47', '57', '43', '53'], 0, '85 - 38 = 47'),
  createMcq('y3-num-006', 'year3', 'number', 'What is 7 × 6?', ['42', '36', '48', '40'], 0, '7 × 6 = 42 (7+7+7+7+7+7 = 42)'),
  createMcq('y3-num-007', 'year3', 'number', 'What is half of 24?', ['10', '11', '12', '14'], 2, 'Half of 24 is 12.'),
  createMcq('y3-num-008', 'year3', 'number', 'Which is an odd number?', ['22', '34', '45', '68'], 2, '45 is odd because it ends in 5.'),
  createMcq('y3-num-009', 'year3', 'number', 'What is 100 + 250?', ['350', '300', '450', '250'], 0, '100 + 250 = 350'),
  createMcq('y3-num-010', 'year3', 'number', 'What is 48 ÷ 6?', ['6', '7', '8', '9'], 2, '48 ÷ 6 = 8'),

  // Measurement
  createMcq('y3-meas-001', 'year3', 'measurement', 'Which unit is best for measuring a pencil?', ['metres', 'centimetres', 'kilometres', 'litres'], 1, 'Centimetres are best for small objects.'),
  createMcq('y3-meas-002', 'year3', 'measurement', 'How many minutes in 2 hours?', ['60', '100', '120', '90'], 2, '2 hours = 120 minutes (60 + 60)'),
  createMcq('y3-meas-003', 'year3', 'measurement', 'Which day comes before Friday?', ['Thursday', 'Saturday', 'Wednesday', 'Monday'], 0, 'Thursday comes before Friday.'),
  createMcq('y3-meas-004', 'year3', 'measurement', 'How many days in a week?', ['5', '6', '7', '8'], 2, 'There are 7 days in a week.'),
  createMcq('y3-meas-005', 'year3', 'measurement', 'Which holds more water?', ['cup', 'bucket', 'spoon', 'teaspoon'], 1, 'A bucket holds the most.'),

  // Geometry
  createMcq('y3-geom-001', 'year3', 'geometry', 'How many sides does a triangle have?', ['2', '3', '4', '5'], 1, 'A triangle has 3 sides.'),
  createMcq('y3-geom-002', 'year3', 'geometry', 'Which shape is a square?', ['3 sides', '4 equal sides', '5 sides', 'no sides'], 1, 'A square has 4 equal sides.'),
  createMcq('y3-geom-003', 'year3', 'geometry', 'How many corners does a rectangle have?', ['3', '4', '5', '6'], 1, 'A rectangle has 4 corners.'),
  createMcq('y3-geom-004', 'year3', 'geometry', 'Which shape is a circle?', ['has corners', 'round', 'has sides', 'is square'], 1, 'A circle is round with no corners.'),
  createMcq('y3-geom-005', 'year3', 'geometry', 'What 3D shape is a ball?', ['cube', 'sphere', 'cone', 'cylinder'], 1, 'A ball is a sphere.'),

  // Statistics
  createMcq('y3-stat-001', 'year3', 'statistics', 'Which colour got 5 votes: Red(3), Blue(5), Green(2)?', ['Red', 'Blue', 'Green', 'None'], 1, 'Blue got 5 votes.'),
  createMcq('y3-stat-002', 'year3', 'statistics', 'In a tally, |||| means?', ['4', '5', '6', '3'], 0, 'Each | = 1, so |||| = 4.'),
  createMcq('y3-stat-003', 'year3', 'statistics', 'What is the most common letter in APPLE?', ['A', 'P', 'L', 'E'], 1, 'P appears twice in APPLE.'),
];

// ==================== YEAR 5 NUMERACY ====================
export const year5NumeracyMcqs: Mcq[] = [
  // Number & Place Value
  createMcq('y5-num-001', 'year5', 'number', 'What is the value of the 6 in 46,789?', ['6', '600', '6000', '60000'], 2, 'The 6 is in the thousands place.'),
  createMcq('y5-num-002', 'year5', 'number', 'Round 347 to the nearest ten.', ['340', '350', '300', '400'], 1, '347 rounds to 350 (7 > 5)'),
  createMcq('y5-num-003', 'year5', 'number', 'What is 456 + 278?', ['624', '734', '714', '734'], 1, '456 + 278 = 734'),
  createMcq('y5-num-004', 'year5', 'number', 'What is 800 - 347?', ['453', '543', '447', '553'], 0, '800 - 347 = 453'),
  createMcq('y5-num-005', 'year5', 'number', 'What is 23 × 4?', ['82', '92', '87', '72'], 1, '23 × 4 = 92'),
  createMcq('y5-num-006', 'year5', 'number', 'What is 156 ÷ 12?', ['11', '13', '12', '14'], 1, '156 ÷ 12 = 13'),
  createMcq('y5-num-007', 'year5', 'number', 'What is ½ of 3/4?', ['1/8', '1/4', '3/8', '1/2'], 0, 'Half of 3/4 is 3/8.'),
  createMcq('y5-num-008', 'year5', 'number', 'Which decimal is biggest: 0.3, 0.03, 0.33, 0.13?', ['0.3', '0.03', '0.33', '0.13'], 2, '0.33 is the largest.'),
  createMcq('y5-num-009', 'year5', 'number', 'What is 10% of 80?', ['8', '10', '70', '0.1'], 0, '10% of 80 = 8'),
  createMcq('y5-num-010', 'year5', 'number', 'What is the next prime after 7?', ['8', '9', '10', '11'], 3, '11 is the next prime number.'),

  // Fractions & Decimals
  createMcq('y5-frac-001', 'year5', 'number', 'What is 0.5 as a fraction?', ['1/5', '1/2', '5/10', '1/4'], 1, '0.5 = 1/2'),
  createMcq('y5-frac-002', 'year5', 'number', 'Which is bigger: 3/4 or 2/3?', ['3/4', '2/3', 'they are equal', 'cannot tell'], 0, '3/4 = 0.75, 2/3 = 0.67'),
  createMcq('y5-frac-003', 'year5', 'number', 'What is 2/5 + 1/5?', ['3/10', '3/5', '1/5', '2/5'], 1, '2/5 + 1/5 = 3/5'),

  // Measurement
  createMcq('y5-meas-001', 'year5', 'measurement', 'How many metres in 3.5 km?', ['350', '3500', '35', '35000'], 1, '3.5 km = 3500 metres'),
  createMcq('y5-meas-002', 'year5', 'measurement', 'What is the perimeter of a 5cm × 4cm rectangle?', ['9cm', '20cm', '18cm', '22cm'], 2, 'Perimeter = 2(5+4) = 18cm'),
  createMcq('y5-meas-003', 'year5', 'measurement', 'What is the area of a 6cm × 4cm rectangle?', ['24cm²', '20cm²', '10cm²', '24cm'], 0, 'Area = 6 × 4 = 24cm²'),
  createMcq('y5-meas-004', 'year5', 'measurement', 'How many seconds in 5 minutes?', ['300', '500', '50', '250'], 0, '5 minutes = 300 seconds'),

  // Geometry
  createMcq('y5-geom-001', 'year5', 'geometry', 'What type of angle is 45°?', ['right', 'acute', 'obtuse', 'straight'], 1, '45° is acute (less than 90°).'),
  createMcq('y5-geom-002', 'year5', 'geometry', 'How many lines of symmetry does a square have?', ['2', '3', '4', '6'], 2, 'A square has 4 lines of symmetry.'),
  createMcq('y5-geom-003', 'year5', 'geometry', 'What is the name of a 6-sided polygon?', ['pentagon', 'hexagon', 'heptagon', 'octagon'], 1, 'A 6-sided polygon is a hexagon.'),
  createMcq('y5-geom-004', 'year5', 'geometry', 'Which angle is greater than 90°?', ['30°', '45°', '120°', '60°'], 2, '120° is obtuse (>90°).'),

  // Statistics & Probability
  createMcq('y5-stat-001', 'year5', 'statistics', 'What is the mode of: 2, 3, 2, 5, 2, 7?', ['2', '3', '5', '7'], 0, '2 appears most frequently.'),
  createMcq('y5-stat-002', 'year5', 'statistics', 'What is the median of: 3, 5, 7, 9, 11?', ['5', '7', '6', '9'], 1, '7 is the middle number.'),
  createMcq('y5-stat-003', 'year5', 'statistics', 'What is the range of: 4, 8, 2, 9, 1?', ['7', '8', '9', '4'], 0, 'Range = 9 - 2 = 7'),
  createMcq('y5-stat-004', 'year5', 'statistics', 'A coin flip has how many outcomes?', ['1', '2', '3', '4'], 1, 'Heads or tails = 2 outcomes.'),
];

// ==================== YEAR 7 NUMERACY ====================
export const year7NumeracyMcqs: Mcq[] = [
  // Number
  createMcq('y7-num-001', 'year7', 'number', 'What is -5 + 3?', ['-2', '2', '-8', '8'], 0, '-5 + 3 = -2'),
  createMcq('y7-num-002', 'year7', 'number', 'What is (-4) × (-3)?', ['-12', '12', '-7', '7'], 1, 'Negative × negative = positive'),
  createMcq('y7-num-007', 'year7', 'number', 'What is 25% of 80?', ['20', '25', '30', '15'], 0, '25% = 1/4, so 80 ÷ 4 = 20'),
  createMcq('y7-num-008', 'year7', 'number', 'What is 3/4 as a decimal?', ['0.34', '0.75', '0.5', '0.25'], 1, '3/4 = 75/100 = 0.75'),
  createMcq('y7-num-009', 'year7', 'number', 'What is -7 - 4?', ['-3', '-11', '3', '11'], 1, '-7 - 4 = -11'),
  createMcq('y7-num-010', 'year7', 'number', 'What is 144 ÷ 12?', ['10', '12', '14', '11'], 1, '144 ÷ 12 = 12'),

  // Year 7 Algebra
  createMcq('y7-alg-001', 'year7', 'algebra', 'Simplify: 3x + 2x', ['5x', '5x²', '6x', 'x'], 0, '3x + 2x = 5x'),
  createMcq('y7-alg-002', 'year7', 'algebra', 'If x = 2, what is 4x + 3?', ['8', '11', '9', '14'], 1, '4(2) + 3 = 8 + 3 = 11'),
  createMcq('y7-alg-003', 'year7', 'algebra', 'Solve: x + 5 = 12', ['x = 7', 'x = 17', 'x = 6', 'x = 7'], 0, 'x = 12 - 5 = 7'),
  createMcq('y7-alg-004', 'year7', 'algebra', 'What is 2⁴?', ['8', '16', '6', '24'], 1, '2⁴ = 2 × 2 × 2 × 2 = 16'),
  createMcq('y7-alg-005', 'year7', 'algebra', 'Simplify: 5a - 2a', ['3a', '7a', '3a²', '10a'], 0, '5a - 2a = 3a'),
  createMcq('y7-alg-006', 'year7', 'algebra', 'If y = 3, what is 2y²?', ['6', '18', '36', '12'], 1, '2 × 3² = 2 × 9 = 18'),
  createMcq('y7-alg-007', 'year7', 'algebra', 'Solve: x - 4 = 9', ['x = 5', 'x = 13', 'x = 36', 'x = -5'], 1, 'x = 9 + 4 = 13'),
  createMcq('y7-alg-008', 'year7', 'algebra', 'Expand: 4(x + 2)', ['4x + 2', '4x + 8', '4x + 6', 'x + 8'], 1, '4x + 8'),
  createMcq('y7-alg-009', 'year7', 'algebra', 'Simplify: 3m + 4 + m - 2', ['4m + 2', '4m + 6', '3m + 2', '2m + 4'], 0, '3m + m = 4m, 4 - 2 = 2'),
  createMcq('y7-alg-010', 'year7', 'algebra', 'What is the next number: 2, 4, 8, 16, ?', ['24', '32', '20', '28'], 1, 'Pattern: ×2 each time'),
  createMcq('y7-alg-011', 'year7', 'algebra', 'Solve: 3x = 21', ['x = 7', 'x = 18', 'x = 24', 'x = 3'], 0, 'x = 21 ÷ 3 = 7'),
  createMcq('y7-alg-012', 'year7', 'algebra', 'Simplify: x + x + x', ['3x', 'x³', 'x + 3', 'x'], 0, 'x + x + x = 3x'),
  createMcq('y7-alg-013', 'year7', 'algebra', 'If a = 5, what is a + 8?', ['13', '58', '40', '15'], 0, '5 + 8 = 13'),
  createMcq('y7-alg-014', 'year7', 'algebra', 'What is 5²?', ['10', '25', '50', '15'], 1, '5² = 5 × 5 = 25'),
  createMcq('y7-alg-015', 'year7', 'algebra', 'Solve: x/4 = 5', ['x = 20', 'x = 1.25', 'x = 9', 'x = 9'], 0, 'x = 5 × 4 = 20'),

  // Measurement & Geometry
  createMcq('y7-meas-001', 'year7', 'measurement', 'What is the area of a triangle with base 6cm and height 4cm?', ['12cm²', '24cm²', '10cm²', '48cm²'], 0, 'Area = ½ × 6 × 4 = 12cm²'),
  createMcq('y7-meas-002', 'year7', 'geometry', 'What is the sum of angles in a triangle?', ['90°', '180°', '360°', '270°'], 1, 'Angles in a triangle sum to 180°.'),
  createMcq('y7-meas-003', 'year7', 'geometry', 'What is the circumference of a circle with radius 7? (use π=22/7)', ['22', '44', '154', '77'], 1, 'C = 2πr = 2 × 22/7 × 7 = 44'),
  createMcq('y7-meas-004', 'year7', 'measurement', 'Convert 0.125 to a fraction.', ['1/4', '1/8', '1/2', '125/1000'], 1, '0.125 = 125/1000 = 1/8'),
];

// ==================== YEAR 9 NUMERACY ====================
export const year9NumeracyMcqs: Mcq[] = [
  // Year 9 Algebra
  createMcq('y9-alg-001', 'year9', 'algebra', 'Expand: 3(x + 4)', ['3x + 4', '3x + 12', '3x + 7', 'x + 12'], 1, '3 × x + 3 × 4 = 3x + 12'),
  createMcq('y9-alg-002', 'year9', 'algebra', 'Simplify: 2(a + 3) - a', ['a + 6', '3a + 3', 'a + 3', '2a + 6'], 0, '2a + 6 - a = a + 6'),
  createMcq('y9-alg-003', 'year9', 'algebra', 'Solve: 2x - 5 = 9', ['x = 7', 'x = 2', 'x = 14', 'x = -7'], 0, '2x = 14, x = 7'),
  createMcq('y9-alg-004', 'year9', 'algebra', 'What is the gradient of y = 3x + 2?', ['2', '3', '5', '1'], 1, 'The gradient is 3.'),
  createMcq('y9-alg-005', 'year9', 'algebra', 'Factorise: x² - 9', ['(x-3)(x+3)', '(x-9)(x+1)', '(x-3)²', '(x+3)²'], 0, 'x² - 9 = (x-3)(x+3)'),
  createMcq('y9-alg-006', 'year9', 'algebra', 'Expand: 5(2x - 3)', ['10x - 15', '10x - 3', '7x - 8', '10x + 15'], 0, '10x - 15'),
  createMcq('y9-alg-007', 'year9', 'algebra', 'Solve: 3x + 7 = 22', ['x = 5', 'x = 15', 'x = 3', 'x = 29'], 0, '3x = 15, x = 5'),
  createMcq('y9-alg-008', 'year9', 'algebra', 'Factorise: x² - 4', ['(x-2)(x+2)', '(x-2)²', '(x-4)(x+1)', '(x+2)²'], 0, 'x² - 4 = (x-2)(x+2)'),
  createMcq('y9-alg-009', 'year9', 'algebra', 'What is the y-intercept of y = 3x + 5?', ['3', '5', '8', '0'], 1, 'The y-intercept is 5.'),
  createMcq('y9-alg-010', 'year9', 'algebra', 'Simplify: 4x - 2x + x', ['3x', '7x', '2x', '5x'], 0, '4x - 2x + x = 3x'),
  createMcq('y9-alg-011', 'year9', 'algebra', 'Solve: x/3 + 2 = 5', ['x = 3', 'x = 9', 'x = 21', 'x = 15'], 1, 'x/3 = 3, x = 9'),
  createMcq('y9-alg-012', 'year9', 'algebra', 'Expand: (x + 2)(x + 3)', ['x² + 5x + 6', 'x² + x + 6', '2x + 5', 'x² + 2x + 3'], 0, 'x² + 3x + 2x + 6 = x² + 5x + 6'),
  createMcq('y9-alg-013', 'year9', 'algebra', 'Factorise: 2x² + 6x', ['2x(x + 3)', '(2x + 6)x', '2(x² + 3x)', 'x(2x + 6)'], 0, '2x(x + 3)'),
  createMcq('y9-alg-014', 'year9', 'algebra', 'If y = 2x - 1 and x = 4, find y', ['7', '8', '6', '9'], 0, 'y = 2(4) - 1 = 8 - 1 = 7'),
  createMcq('y9-alg-015', 'year9', 'algebra', 'What is the gradient of y = -2x + 4?', ['-2', '4', '2', '0'], 0, 'The gradient is -2.'),
  createMcq('y9-alg-016', 'year9', 'algebra', 'Solve: 4(x - 2) = 16', ['x = 6', 'x = 4', 'x = 8', 'x = 2'], 0, '4x - 8 = 16, 4x = 24, x = 6'),
  createMcq('y9-alg-017', 'year9', 'algebra', 'Factorise: x² - 16', ['(x-4)(x+4)', '(x-4)²', '(x-8)(x+2)', '(x+4)²'], 0, 'x² - 16 = (x-4)(x+4)'),
  createMcq('y9-alg-018', 'year9', 'algebra', 'What is the equation of a line with gradient 2 passing through (0, 3)?', ['y = 2x + 3', 'y = 3x + 2', 'y = 2x - 3', 'y = x + 3'], 0, 'y = mx + c, so y = 2x + 3'),
  createMcq('y9-alg-019', 'year9', 'algebra', 'Simplify: (x³)²', ['x⁵', 'x⁶', '2x³', 'x'], 1, '(x³)² = x³×² = x⁶'),
  createMcq('y9-alg-020', 'year9', 'algebra', 'Solve: 5x - 3 = 2x + 9', ['x = 4', 'x = 3', 'x = 6', 'x = 12'], 0, '3x = 12, x = 4'),

  // Statistics & Probability
  createMcq('y9-stat-001', 'year9', 'statistics', 'What is the probability of rolling a 6 on a fair die?', ['1/6', '1/2', '1/3', '6/1'], 0, 'One outcome out of 6.'),
  createMcq('y9-stat-002', 'year9', 'statistics', 'If P(A) = 0.3, what is P(not A)?', ['0.7', '0.3', '1.3', '0'], 0, 'P(not A) = 1 - P(A) = 0.7'),
  createMcq('y9-stat-003', 'year9', 'statistics', 'A tree diagram shows 2 stages with 3 branches each. How many outcomes?', ['5', '6', '9', '2'], 2, '3 × 3 = 9 outcomes'),

  // Geometry
  createMcq('y9-geom-001', 'year9', 'geometry', 'What is the volume of a cube with side 4cm?', ['16cm³', '64cm³', '48cm³', '12cm³'], 1, 'V = 4³ = 64cm³'),
  createMcq('y9-geom-002', 'year9', 'geometry', 'In a right triangle, if a=3 and b=4, what is c?', ['5', '7', '25', '12'], 0, '3² + 4² = 5² (Pythagoras)'),
];

// ==================== GRAMMAR (All Grades) ====================
export const grammarMcqs: Mcq[] = [
  // Year 3 Grammar
  createMcq('y3-gram-001', 'year3', 'grammar', 'Which word is a noun?', ['run', 'happy', 'house', 'quickly'], 2, 'House is a noun (naming word).'),
  createMcq('y3-gram-002', 'year3', 'grammar', 'Which is a proper noun?', ['dog', 'Max', 'city', 'river'], 1, 'Max is a name (proper noun).'),
  createMcq('y3-gram-003', 'year3', 'grammar', 'What is the plural of "child"?', ['childs', 'childrens', 'children', 'childes'], 2, 'Children is the plural of child.'),
  createMcq('y3-gram-004', 'year3', 'grammar', 'Which sentence is correct?', ['The cat is hungry', 'the cat is hungry', 'Cat is hungry', 'the cat is hungry'], 0, 'Start with capital letter.'),
  createMcq('y3-gram-005', 'year3', 'grammar', 'What is the opposite of "hot"?', ['warm', 'cold', 'cool', 'heat'], 1, 'Cold is the opposite of hot.'),

  // Year 5 Grammar
  createMcq('y5-gram-001', 'year5', 'grammar', 'Which is a verb?', ['quickly', 'beautiful', 'run', 'happy'], 2, 'Run is an action word (verb).'),
  createMcq('y5-gram-002', 'year5', 'grammar', 'What is an adjective?', ['describes a noun', 'describes action', 'connects words', 'shows emotion'], 0, 'Adjectives describe nouns.'),
  createMcq('y5-gram-003', 'year5', 'grammar', 'Which sentence uses a comma correctly?', ['I like apples bananas and oranges.', 'I like, apples, bananas and oranges.', 'I like apples, bananas, and oranges.', 'I like apples bananas, and oranges.'], 2, 'Oxford comma before "and".'),
  createMcq('y5-gram-004', 'year5', 'grammar', 'What is the past tense of "go"?', ['goes', 'gone', 'went', 'going'], 2, 'Went is the past tense of go.'),
  createMcq('y5-gram-005', 'year5', 'grammar', 'Which is a compound sentence?', ['The cat slept.', 'The cat slept because it was tired.', 'The cat slept. It dreamed.', 'Sleeping cat.'], 2, 'Two independent clauses joined by period.'),

  // Year 7 Grammar
  createMcq('y7-gram-001', 'year7', 'grammar', 'What is a pronoun?', ['replaces a noun', 'describes a noun', 'action word', 'connecting word'], 0, 'Pronouns replace nouns.'),
  createMcq('y7-gram-002', 'year7', 'grammar', 'Which sentence has a simile?', ['The cat is asleep.', 'The cat sleeps like a log.', 'The sleeping cat.', 'The cat sleeps.'], 1, 'Like a log is a simile.'),
  createMcq('y7-gram-003', 'year7', 'grammar', 'What is the present perfect tense?', ['action completed', 'action ongoing', 'action at unspecified time', 'action in future'], 2, 'Has/have + past participle.'),
];

// ==================== EXPORT ALL ====================
export const curatedMcqs: Mcq[] = [
  ...year3NumeracyMcqs,
  ...year5NumeracyMcqs,
  ...year7NumeracyMcqs,
  ...year9NumeracyMcqs,
  ...grammarMcqs,
];

// Export by grade
export const mcqsByGrade = {
  year3: [...year3NumeracyMcqs, ...grammarMcqs.filter(m => m.grade === 'year3')],
  year5: [...year5NumeracyMcqs, ...grammarMcqs.filter(m => m.grade === 'year5')],
  year7: [...year7NumeracyMcqs, ...grammarMcqs.filter(m => m.grade === 'year7')],
  year9: [...year9NumeracyMcqs],
};

// Export by subject
export const numeracyMcqs = [...year3NumeracyMcqs, ...year5NumeracyMcqs, ...year7NumeracyMcqs, ...year9NumeracyMcqs];
export const grammarAllMcqs = [...grammarMcqs];

// Coverage report
export const coverageReport = {
  total: curatedMcqs.length,
  byGrade: {
    year3: mcqsByGrade.year3.length,
    year5: mcqsByGrade.year5.length,
    year7: mcqsByGrade.year7.length,
    year9: mcqsByGrade.year9.length,
  },
  bySubject: {
    numeracy: numeracyMcqs.length,
    grammar: grammarAllMcqs.length,
  },
};
