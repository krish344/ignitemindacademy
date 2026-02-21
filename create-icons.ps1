Add-Type -AssemblyName System.Drawing

# Create 192x192 icon
$bmp = New-Object System.Drawing.Bitmap(192,192)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(233,69,96))
$font = New-Object System.Drawing.Font('Arial',72,[System.Drawing.FontStyle]::Bold)
$brush = [System.Drawing.Brushes]::White
$g.DrawString('IM',$font,$brush,15,50)
$bmp.Save('C:\Users\HP\.openclaw\workspace\ignitemindacademy\public\icon-192.png')
$bmp.Dispose()

# Create 512x512 icon
$bmp2 = New-Object System.Drawing.Bitmap(512,512)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.Clear([System.Drawing.Color]::FromArgb(233,69,96))
$font2 = New-Object System.Drawing.Font('Arial',200,[System.Drawing.FontStyle]::Bold)
$brush2 = [System.Drawing.Brushes]::White
$g2.DrawString('IM',$font2,$brush2,40,130)
$bmp2.Save('C:\Users\HP\.openclaw\workspace\ignitemindacademy\public\icon-512.png')
$bmp2.Dispose()

Write-Host "Icons created!"
