import glob
import os

files = glob.glob('davila_realestate/*.html') + ['davila_realestate/css/styles.css']

replacements = {
    'hero_background.png': 'hero_background.jpg',
    'Andres & Jessica Lemus.png': 'Andres & Jessica Lemus.jpg',
    'Joe & Monique Rodriguez.png': 'Joe & Monique Rodriguez.jpg',
    'Denise C. Lopez.jpeg': 'Denise C. Lopez.jpg'
}

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
