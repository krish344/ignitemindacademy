"""
Grade 3 NAPLAN Instagram Post Generator
Generates 1080x1080px images for Year 3 Numeracy topics
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Colors
PURPLE_PRIMARY = (156, 39, 176)  # #9C27B0
PURPLE_SECONDARY = (74, 20, 140)  # #4A148C
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
LIGHT_GRAY = (245, 245, 245)

# Output directory
OUTPUT_DIR = r"C:\Users\HP\.openclaw\workspace\ignitemindacademy\public\social-images\grade3"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_gradient_background(width, height, color1, color2):
    """Create a vertical gradient background"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    for y in range(height):
        ratio = y / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img

def create_naplan_post(topic, steps, example, output_filename):
    """Create a NAPLAN Instagram post"""
    width, height = 1080, 1080
    
    # Create gradient background
    img = create_gradient_background(width, height, PURPLE_PRIMARY, PURPLE_SECONDARY)
    
    # Create white card
    card_margin = 90
    card = Image.new('RGB', (width - card_margin*2, height - card_margin*2), WHITE)
    img.paste(card, (card_margin, card_margin))
    
    draw = ImageDraw.Draw(img)
    
    # Try to load fonts, fall back to default if not available
    try:
        title_font = ImageFont.truetype("arial.ttf", 60)
        header_font = ImageFont.truetype("arial.ttf", 35)
        step_font = ImageFont.truetype("arial.ttf", 32)
        example_font = ImageFont.truetype("arial.ttf", 30)
        footer_font = ImageFont.truetype("arial.ttf", 28)
    except:
        title_font = ImageFont.load_default()
        header_font = ImageFont.load_default()
        step_font = ImageFont.load_default()
        example_font = ImageFont.load_default()
        footer_font = ImageFont.load_default()
    
    # Header bar
    header_text = f"NUMERACY • YEAR 3"
    header_bbox = draw.textbbox((0, 0), header_text, font=header_font)
    header_width = header_bbox[2] - header_bbox[0]
    draw.text(((width - header_width) / 2, card_margin + 30), header_text, fill=PURPLE_PRIMARY, font=header_font)
    
    # Title
    title_text = f"{topic} Made Easy"
    title_bbox = draw.textbbox((0, 0), title_text, title_font)
    title_width = title_bbox[2] - title_bbox[0]
    draw.text(((width - title_width) / 2, card_margin + 120), title_text, fill=BLACK, font=title_font)
    
    # Steps
    y_offset = card_margin + 220
    for i, step in enumerate(steps, 1):
        step_text = f"{i}) {step}"
        draw.text((card_margin + 50, y_offset), step_text, fill=BLACK, font=step_font)
        y_offset += 70
    
    # Example box
    y_offset += 30
    example_bbox = draw.textbbox((0, 0), f"Example: {example}", example_font)
    example_width = example_bbox[2] - example_bbox[0] + 100
    example_x = (width - example_width) / 2
    
    # Draw example background
    draw.rectangle([example_x, y_offset, example_x + example_width, y_offset + 80], fill=LIGHT_GRAY, outline=PURPLE_PRIMARY, width=3)
    draw.text((example_x + 50, y_offset + 25), f"Example: {example}", fill=PURPLE_PRIMARY, font=example_font)
    
    # Footer
    footer_text = "IgniteMind Academy"
    footer_bbox = draw.textbbox((0, 0), footer_text, footer_font)
    footer_width = footer_bbox[2] - footer_bbox[0]
    draw.text(((width - footer_width) / 2, height - card_margin - 60), footer_text, fill=PURPLE_PRIMARY, font=footer_font)
    
    # Save
    img.save(os.path.join(OUTPUT_DIR, output_filename))
    print(f"Created: {output_filename}")

# Define posts
posts = [
    {
        "topic": "Addition",
        "steps": [
            "Start from the right (ones column)",
            "If sum is 10+, write ones and carry tens",
            "Add carried number to next column"
        ],
        "example": "47 + 28 = 75",
        "filename": "grade3-addition.png"
    },
    {
        "topic": "Subtraction",
        "steps": [
            "Start from the right (ones column)",
            "If top number is smaller, borrow",
            "Subtract the borrowed number"
        ],
        "example": "73 - 48 = 25",
        "filename": "grade3-subtraction.png"
    },
    {
        "topic": "Multiplication",
        "steps": [
            "Think of it as repeated addition",
            "Use the multiplication table up to 10×10",
            "Break bigger numbers into chunks"
        ],
        "example": "7 × 6 = 42",
        "filename": "grade3-multiplication.png"
    },
    {
        "topic": "Fractions",
        "steps": [
            "Bottom number = total equal parts",
            "Top number = parts we have",
            "Compare fractions with same denominator"
        ],
        "example": "3/4 > 1/4",
        "filename": "grade3-fractions.png"
    },
    {
        "topic": "Time",
        "steps": [
            "Read hour hand first (shorter)",
            "Read minute hand by counting by 5s",
            "Write as hours:minutes"
        ],
        "example": "3:45 = Quarter to 4",
        "filename": "grade3-time.png"
    }
]

# Generate all posts
for post in posts:
    create_naplan_post(
        topic=post["topic"],
        steps=post["steps"],
        example=post["example"],
        output_filename=post["filename"]
    )

print(f"\n✅ All {len(posts)} posts created in: {OUTPUT_DIR}")
