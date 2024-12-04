db.createCollection('user')
db.user.insertOne({
    username:"christiano",
    passowrd:"12345",
    email:"man@mail.com",
    createdAt: new Date()
})