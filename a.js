let arr = [
    { a:3,b:'dww'},
    { a:53,b:'rtjr'}
]


const filtered = arr.map(el => ({
    value: el.a,
    user: 'username'

}))

newArr = [...filtered]

console.log(newArr);