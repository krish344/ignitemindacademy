Get-ChildItem -Path "src" -Recurse -Include "*.ts", "*.tsx" -ErrorAction SilentlyContinue | Select-String -Pattern "resend" -ErrorAction SilentlyContinue | Select-Object Path, Line
