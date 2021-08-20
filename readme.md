# Simple circuit breaker

Simple circuit breaker


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
const response = authserverCB.run(async () => {
    const response = await callMyApi();
    return Promise.resolve(response);
})
