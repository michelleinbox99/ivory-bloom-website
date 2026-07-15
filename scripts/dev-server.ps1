$root = Split-Path -Parent $PSScriptRoot
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port/"

$mime = @{
  '.html'='text/html'; '.css'='text/css'; '.js'='application/javascript';
  '.svg'='image/svg+xml'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.png'='image/png';
  '.woff2'='font/woff2'; '.xml'='application/xml'; '.ico'='image/x-icon'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $reqPath = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
  if ($reqPath -eq '/') { $reqPath = '/index.html' }
  $filePath = Join-Path $root $reqPath.TrimStart('/')
  if (Test-Path $filePath -PathType Container) { $filePath = Join-Path $filePath 'index.html' }

  if (Test-Path $filePath -PathType Leaf) {
    $ext = [IO.Path]::GetExtension($filePath)
    $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
    $bytes = [IO.File]::ReadAllBytes($filePath)
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
    $notFound = Join-Path $root '404.html'
    if (Test-Path $notFound) {
      $bytes = [IO.File]::ReadAllBytes($notFound)
      $ctx.Response.ContentType = 'text/html'
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  }
  $ctx.Response.OutputStream.Close()
}
