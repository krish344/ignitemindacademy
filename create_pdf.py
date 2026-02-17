from fpdf import FPDF
import os

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'NAPLAN Revision Notes - Area & Perimeter', 0, 1, 'C')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, 'IgniteMind Academy - NAPLAN Prep', 0, 0, 'C')

pdf = PDF()
pdf.add_page()
pdf.set_font('Arial', '', 12)

# Grade 3 Section
pdf.set_font('Arial', 'B', 14)
pdf.cell(0, 10, 'Grade 3 - Area & Perimeter', 0, 1, 'L')
pdf.ln(2)

pdf.set_font('Arial', 'B', 12)
pdf.cell(0, 8, 'AREA', 0, 1, 'L')
pdf.set_font('Arial', '', 11)
pdf.multi_cell(0, 6, '''What is area?
Area is the space inside a shape.

How to find area:
- Count the squares inside a shape
- Area = length x width

Example:
A 4x4 rectangle has Area = 4 x 4 = 16 squares

Key words: inside, cover, square units''')
pdf.ln(5)

pdf.set_font('Arial', 'B', 12)
pdf.cell(0, 8, 'PERIMETER', 0, 1, 'L')
pdf.set_font('Arial', '', 11)
pdf.multi_cell(0, 6, '''What is perimeter?
Perimeter is the distance around the outside of a shape.

How to find perimeter:
- Add up all the sides
- Perimeter = side + side + side + side

Example:
A 4cm x 3cm rectangle
Perimeter = 4 + 3 + 4 + 3 = 14 cm

Key words: around, outside, edges, boundary''')
pdf.ln(5)

pdf.set_font('Arial', 'B', 11)
pdf.cell(0, 8, 'Grade 3 Tips:', 0, 1, 'L')
pdf.set_font('Arial', '', 10)
pdf.multi_cell(0, 5, '''- Draw pictures to visualise
- Count squares carefully
- Don't forget units (cm2 for area, cm for perimeter)''')
pdf.ln(10)

# Grade 5 Section
pdf.set_font('Arial', 'B', 14)
pdf.cell(0, 10, 'Grade 5 - Area & Perimeter', 0, 1, 'L')
pdf.ln(2)

pdf.set_font('Arial', 'B', 12)
pdf.cell(0, 8, 'AREA OF RECTANGLE', 0, 1, 'L')
pdf.set_font('Arial', '', 11)
pdf.multi_cell(0, 6, '''Formula: Area = length x width
A = l x w

Example:
Length = 8 cm, Width = 5 cm
Area = 8 x 5 = 40 cm2''')
pdf.ln(5)

pdf.set_font('Arial', 'B', 12)
pdf.cell(0, 8, 'AREA OF TRIANGLE', 0, 1, 'L')
pdf.set_font('Arial', '', 11)
pdf.multi_cell(0, 6, '''Formula: Area = 1/2 x base x height
A = 1/2 x b x h

Example:
Base = 6 cm, Height = 4 cm
Area = 1/2 x 6 x 4 = 12 cm2''')
pdf.ln(5)

pdf.set_font('Arial', 'B', 12)
pdf.cell(0, 8, 'PERIMETER OF RECTANGLE', 0, 1, 'L')
pdf.set_font('Arial', '', 11)
pdf.multi_cell(0, 6, '''Formula: Perimeter = 2 x (length + width)
P = 2(l + w)

Example:
Length = 8 cm, Width = 5 cm
Perimeter = 2 x (8 + 5) = 26 cm''')
pdf.ln(5)

pdf.set_font('Arial', 'B', 12)
pdf.cell(0, 8, 'AREA OF COMPOSITE SHAPES', 0, 1, 'L')
pdf.set_font('Arial', '', 11)
pdf.multi_cell(0, 6, 'Break into smaller shapes, find each area, then add together.')
pdf.ln(5)

pdf.set_font('Arial', 'B', 11)
pdf.cell(0, 8, 'Grade 5 Tips:', 0, 1, 'L')
pdf.set_font('Arial', '', 10)
pdf.multi_cell(0, 5, '''- Remember: area uses cm2 (square units)
- Perimeter uses cm (linear units)
- For triangles, always multiply by 1/2
- Show all working in exams
- Check units match in calculations''')
pdf.ln(10)

# Quick Formulas
pdf.set_font('Arial', 'B', 14)
pdf.cell(0, 10, 'Quick Formulas Reference', 0, 1, 'L')
pdf.ln(2)

pdf.set_font('Arial', '', 10)
pdf.cell(60, 8, 'Shape', 1, 0, 'C')
pdf.cell(60, 8, 'Area', 1, 0, 'C')
pdf.cell(60, 8, 'Perimeter', 1, 1, 'C')

pdf.cell(60, 8, 'Rectangle', 1, 0, 'C')
pdf.cell(60, 8, 'l x w', 1, 0, 'C')
pdf.cell(60, 8, '2(l + w)', 1, 1, 'C')

pdf.cell(60, 8, 'Square', 1, 0, 'C')
pdf.cell(60, 8, 's x s', 1, 0, 'C')
pdf.cell(60, 8, '4s', 1, 1, 'C')

pdf.cell(60, 8, 'Triangle', 1, 0, 'C')
pdf.cell(60, 8, '1/2b x h', 1, 0, 'C')
pdf.cell(60, 8, 's1 + s2 + s3', 1, 1, 'C')
pdf.ln(10)

# Key Remember
pdf.set_font('Arial', 'B', 12)
pdf.cell(0, 8, 'Remember:', 0, 1, 'L')
pdf.set_font('Arial', '', 11)
pdf.cell(0, 6, '- Area = what is INSIDE (cm2)', 0, 1, 'L')
pdf.cell(0, 6, '- Perimeter = what is AROUND (cm)', 0, 1, 'L')

output_path = r'C:\Users\HP\.openclaw\workspace\ignitemindacademy\area-perimeter-notes.pdf'
pdf.output(output_path)
print(f"PDF created: {output_path}")
