import requests

# code = "722577ce33f84ccaccc8ca866dd8e53886feb6fc"
# url = "http://127.0.0.1:8000/auth/nightbot/code"\

# headers = {
#     "Content-Type": "application/x-www-form-urlencoded",
# }

# res = requests.post(url, data={"authorization_code": code})
# print(res.text)

access_token = "641e9d4199ff875f360b9cc40db9aeac6ae88348"

url = "http://127.0.0.1:8000/auth/nightbot/refresh"
res = requests.post(url, data={"expired_token": access_token})

print(res.text)
