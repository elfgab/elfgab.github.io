import os
from PIL import Image

assets_dir = 'davila_realestate/assets'

def convert_and_compress(filename, new_ext, max_width):
    path = os.path.join(assets_dir, filename)
    if not os.path.exists(path):
        print(f"Skipping {filename}, not found.")
        return None
    
    img = Image.open(path)
    if img.mode in ("RGBA", "P") and new_ext == '.jpg':
        img = img.convert("RGB")
        
    if img.width > max_width:
        ratio = max_width / float(img.width)
        new_height = int((float(img.height) * float(ratio)))
        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
    new_filename = os.path.splitext(filename)[0] + new_ext
    new_path = os.path.join(assets_dir, new_filename)
    
    if new_ext == '.jpg':
        img.save(new_path, "JPEG", optimize=True, quality=80)
    elif new_ext == '.png':
        img.save(new_path, "PNG", optimize=True)
        
    if new_path != path:
        os.remove(path)
        
    print(f"Processed {filename} -> {new_filename} ({os.path.getsize(new_path)} bytes)")
    return new_filename

convert_and_compress('Andres & Jessica Lemus.png', '.jpg', 800)
convert_and_compress('Joe & Monique Rodriguez.png', '.jpg', 800)
convert_and_compress('Denise C. Lopez.jpeg', '.jpg', 800)
convert_and_compress('hero_background.png', '.jpg', 1920)
convert_and_compress('Real nancy.jpg', '.jpg', 800)

# favicon is special
path = os.path.join(assets_dir, 'favicon.png')
if os.path.exists(path):
    img = Image.open(path)
    if img.width > 64:
        img = img.resize((64, 64), Image.Resampling.LANCZOS)
        img.save(path, "PNG", optimize=True)
    print(f"Processed favicon.png ({os.path.getsize(path)} bytes)")
