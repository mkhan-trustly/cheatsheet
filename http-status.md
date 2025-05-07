🔁 When Calling the Legacy System (Upstream Dependency):

✅ 200 OK
•	Everything worked fine; legacy system responded correctly.

⚠️ 502 Bad Gateway
•	You received a bad response from the legacy system (e.g., corrupt response, invalid headers).
•	Typically used when the backend responds with something malformed.

⏳ 504 Gateway Timeout
•	Legacy system didn’t respond in time.
•	This is the most common error for timeouts when you’re acting as a proxy or gateway.

❌ 503 Service Unavailable
•	Legacy system is down or not reachable at all (e.g., DNS failure, service crashed).
•	You can also use this if you’ve implemented a circuit breaker and it’s currently open.

🚫 500 Internal Server Error
•	Unexpected error in your service not directly caused by the legacy system (e.g., null pointer, config error, parsing problem after getting a response).

⸻

💣 When Your Service Cannot Even Attempt the Legacy Call

🚫 400 Bad Request
•	Request to your service is missing required data for a valid backend call.

🔐 401 Unauthorized / 403 Forbidden
•	Your service is not authorized to call the legacy system.
•	Usually from auth token problems or role mismatches.

⸻

🔄 Retry-Oriented or Client-Helpful Responses

♻️ 429 Too Many Requests
•	Your service or the legacy system is rate limiting calls. Optional if you implement throttling.

🚧 408 Request Timeout (client-side)
•	If the client calling your microservice took too long to send the request.
•	Rarely used in microservices, more relevant in edge services or NGINX load balancers.

⸻

👮‍♀️ Optional Use Cases

🔄 424 Failed Dependency
•	If you want to clearly indicate that a dependency (legacy system) failed, and your service therefore failed.
•	Not widely used, but could be expressive in a tightly coupled system.

🧯 422 Unprocessable Entity
•	You got a valid request, but the business logic failed (e.g., legacy system responded “user not found”).

✅ Summary Table:
Code
Use When…
200
Everything worked
400
Bad input to your service
401 / 403
Auth error with legacy system
408
Client calling your service was too slow (rare)
422
Business logic failure (optional)
429
Rate limit
500
Your bug / unexpected error
502
Legacy system gave bad/malformed response
503
Legacy system is down/unreachable
504
Legacy system didn’t respond in time
424
Explicit dependency failure (optional, expressive)

```
@GetMapping("/call-legacy")
public Mono<ResponseEntity<String>> callLegacy() {
    return webClient.get()
        .uri("http://legacy-service/api")
        .retrieve()
        .bodyToMono(String.class)
        .timeout(Duration.ofSeconds(3))
        .map(body -> ResponseEntity.ok(body))
        .onErrorResume(TimeoutException.class, ex -> 
            Mono.just(ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT)
                .body("Legacy service timed out"))
        )
        .onErrorResume(ex -> 
            Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Internal error"))
        );
}
```

