import urllib.parse

client_id = 'decbae04d2836ff99a244c5767d7a851'
client_secret = 'bd0ef0ae0d0b3a0c9ee1a3e4a5b6c7d8e9fa0'

base_url = "https://api.nightbot.tv/oauth2/authorize"
redirect_uri = "http://localhost:8458"\
    
response_type = "code"

scope = [
    "channel"
]

params = {
    "client_id": client_id,
    "response_type": response_type,
    "redirect_uri": redirect_uri,
    "scope": " ".join(scope)
}

url = base_url + "?" + urllib.parse.urlencode(params)
print(url)
