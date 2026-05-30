param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

$dishDir = Join-Path $Root 'public/menu/dishes'
$referenceDir = Join-Path $Root 'public/menu/reference-crops'
New-Item -ItemType Directory -Force -Path $dishDir, $referenceDir | Out-Null

$sourceHome = 'C:\Users\hugoa\Downloads\ChatGPT Image 29_05_2026, 19_13_50.png'
$sourceSharing = 'C:\Users\hugoa\Downloads\ChatGPT Image 29_05_2026, 19_13_05.png'
$sourceDesktop = 'C:\Users\hugoa\Downloads\ChatGPT Image 29_05_2026, 18_37_51.png'

foreach ($source in @($sourceHome, $sourceSharing, $sourceDesktop)) {
  if (-not (Test-Path -LiteralPath $source)) {
    throw "Missing source image: $source"
  }
}

function Save-JpegCrop {
  param(
    [string]$Source,
    [string]$Name,
    [int]$X,
    [int]$Y,
    [int]$W,
    [int]$H
  )

  $image = [System.Drawing.Image]::FromFile($Source)
  try {
    $rect = New-Object System.Drawing.Rectangle $X, $Y, $W, $H
    $bitmap = New-Object System.Drawing.Bitmap $W, $H
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($image, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
      }
      finally {
        $graphics.Dispose()
      }

      $output = Join-Path $referenceDir "$Name.jpg"
      $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq 'image/jpeg' }
      $encoder = [System.Drawing.Imaging.Encoder]::Quality
      $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
      $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter $encoder, 92L
      $bitmap.Save($output, $codec, $encoderParams)
      $encoderParams.Dispose()
      return $output
    }
    finally {
      $bitmap.Dispose()
    }
  }
  finally {
    $image.Dispose()
  }
}

$crops = @{
  heroSalmon = Save-JpegCrop $sourceHome 'hero-salmon' 305 185 547 300
  firstRolls = Save-JpegCrop $sourceDesktop 'first-rolls' 242 433 210 168
  sharingPlatter = Save-JpegCrop $sourceSharing 'sharing-platter' 314 807 506 222
  chefLobster = Save-JpegCrop $sourceDesktop 'chef-lobster' 687 433 207 168
  summerCeviche = Save-JpegCrop $sourceDesktop 'summer-ceviche' 909 433 207 168
  starterSalmon = Save-JpegCrop $sourceDesktop 'starter-salmon' 242 798 160 190
  ceviche = Save-JpegCrop $sourceDesktop 'ceviche' 412 798 168 190
  signatureRoll = Save-JpegCrop $sourceDesktop 'signature-roll' 590 798 173 190
  temaki = Save-JpegCrop $sourceDesktop 'temaki' 768 798 163 190
  hotNoodles = Save-JpegCrop $sourceDesktop 'hot-noodles' 943 798 171 190
  dessert = Save-JpegCrop $sourceDesktop 'dessert' 242 1124 286 175
  tea = Save-JpegCrop $sourceDesktop 'tea' 528 1124 295 175
  drinks = Save-JpegCrop $sourceDesktop 'drinks' 823 1124 292 175
  tartare = Save-JpegCrop $sourceSharing 'tartare' 314 568 253 203
  tempura = Save-JpegCrop $sourceSharing 'tempura' 577 568 246 203
  premiumNigiri = Save-JpegCrop $sourceSharing 'premium-nigiri' 314 1056 506 214
  iceCream = Save-JpegCrop $sourceSharing 'ice-cream' 314 1303 286 186
}

function Select-Asset {
  param(
    [string]$Id,
    [string]$Category
  )

  switch -Regex ($Id) {
    'usuzukuri|carpaccio|sashimi|tataki|nigiri-tradicional' { return $crops.heroSalmon }
    'ceviche|tiradito|acevichado|vulkan|salada' { return $crops.ceviche }
    'tartaro|chutoro' { return $crops.tartare }
    'tempura|gyoza|hot-philadelphia|lx-roll|furikake|thai|spicy-tofu' { return $crops.tempura }
    'combo-confraria-ii|gajin|gueisha|moriwase' { return $crops.sharingPlatter }
    'combo|ebi-shake|aburi|uramaki|hossomaki|oisin|original-skin' { return $crops.signatureRoll }
    'gunkan|nigiri|caviar' { return $crops.premiumNigiri }
    'temaki' { return $crops.temaki }
    'udon|nasu' { return $crops.hotNoodles }
    'gelado' { return $crops.iceCream }
    'cha-' { return $crops.tea }
    'limoncello|licor|amendoa' { return $crops.drinks }
    'fondant|tarte|delight|cheesecake' { return $crops.dessert }
  }

  switch ($Category) {
    'starters' { return $crops.starterSalmon }
    'nikkei-ceviches' { return $crops.ceviche }
    'new-style' { return $crops.premiumNigiri }
    'signature-sushi' { return $crops.signatureRoll }
    'traditional-sushi' { return $crops.heroSalmon }
    'hot-vegetarian' { return $crops.hotNoodles }
    'finish' { return $crops.dessert }
    default { return $crops.heroSalmon }
  }
}

$menuText = Get-Content -LiteralPath (Join-Path $Root 'src/data/menu.ts') -Raw
$pattern = '(?s)id:\s*"([^"]+)",\s*name:\s*"[^"]+",\s*categoryId:\s*"([^"]+)"'
$matches = [regex]::Matches($menuText, $pattern)

foreach ($match in $matches) {
  $id = $match.Groups[1].Value
  $category = $match.Groups[2].Value
  $asset = Select-Asset -Id $id -Category $category
  Copy-Item -LiteralPath $asset -Destination (Join-Path $dishDir "$id.jpg") -Force
}

[pscustomobject]@{
  ReferenceCrops = $crops.Count
  DishImages = $matches.Count
  Output = $dishDir
} | ConvertTo-Json -Compress
