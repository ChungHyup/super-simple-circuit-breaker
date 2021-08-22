# Super Simple circuit breaker

Super Simple circuit breaker


## Installation

```
npm install super-simple-circuit-breaker
```

## Usage
---
```
const SimpleCircuitBreaker = requere("simple-circuit-breaker')

// after 3 times failure, citcuit breaker open a circuit for 1000ms
const options = {
    retry: 3,
    halfopenTime: 1000
}
const authServerCB = new SimpleCircuitBreaker(options);
// res will be http response obj
const res = await authServerCB.run(callGoogle = async () => {
  return new Promise( (resolve, reject) => {
    http.get({
      host: "www.google.com"
    }, (res) => {
      return resolve(res)
    })
  })
})

