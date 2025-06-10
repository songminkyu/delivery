### 1. postman에서 post 설정 http://localhost:3003/order url 입력 후 Body로 가서 아래내용 작성
```json
{
    "productIds": ["21d6572d-00a9-45f6-971f-5ff68bd1715c", "5bf8e1ff-e091-4007-a151-b2a1cf3519fc"],
    "address": {
        "name": "코드팩토리",
        "street": "도산대로 14",
        "city": "서울",
        "postalCode": "0412222",
        "country": "대한민국"
    },
    "payment": {
        "paymentMethod": "CreditCard",
        "paymentName": "법인카드",
        "cardNumber": "1234123412341234",
        "expiryYear": "26",
        "expiryMonth":"12",
        "birthOrRegistration": "921111",
        "passwordTwoDigits": "12",
        "amount": 3000
    }
}
```

### 2. Authorization 탭으로 이동 후 Auth Type에서 Bearer Token 설정 후 로그인후 발급 받은 accessToken 값을 설정