#!/usr/bin/env python3
import os
import zipfile
import shutil

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
output_name = "minimani-store-source.zip"
public_path = os.path.join(project_root, "public", output_name)
root_path = os.path.join(project_root, output_name)

ignore_dirs = {'.git', 'node_modules', 'dist', 'dist-preview', 'docs', '.vite', '__pycache__', '.temp', '.idea', '.vscode'}
ignore_exts = {'.zip', '.tar', '.gz', '.pyc'}
# فایل پیش‌نمایش تکفایلی یک خروجی بیلد است، نه سورس؛ برای سبک ماندن آرشیو حذف می‌شود.
ignore_names = {'preview.html'}

print(f"Packaging project from {project_root}...")

with zipfile.ZipFile(public_path, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(project_root):
        dirs[:] = [d for d in dirs if d not in ignore_dirs and not d.startswith('.')]
        for file in files:
            if file in ignore_names:
                continue
            if any(file.endswith(ext) for ext in ignore_exts):
                continue
            if file.startswith('.') and file not in ['.gitignore', '.env.example']:
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, project_root)
            if rel_path in [output_name, os.path.join('public', output_name)]:
                continue
            zf.write(full_path, rel_path)

shutil.copyfile(public_path, root_path)
size_kb = os.path.getsize(public_path) / 1024
print(f"Package created: {public_path} ({size_kb:.1f} KB)")
print(f"Also copied to: {root_path}")
