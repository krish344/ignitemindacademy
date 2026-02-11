Get-ChildItem -Path "src\app\api" -Recurse -File -ErrorAction SilentlyContinue | Select-Object FullName
