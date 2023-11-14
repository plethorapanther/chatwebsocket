Security Vulnerabilities:

Cross-Site Scripting (XSS): This app directly inserts user input into the HTML without proper validation or sanitization. This can lead to XSS attacks if users are able to inject malicious scripts. 

No Authentication: This app does not have any form of user authentication. It relies on clients to send their chosen handles without verification. Adding authentication mechanisms, such as using tokens or a user database, would improve security and prevent impersonation.

No Encryption: The WebSocket communication is done over an unsecured connection (ws://). It should be using a secure WebSocket connection (wss://) to encrypt the data during transmission and protect against man-in-the-middle attacks.

What I learned:

WebSockets is a communication protocol that provides communication channels over a single, long-lived connection between a client and a server. Unlike HTTP, where a client sends a request and waits for a server response, WebSockets allow for real-time communication. This means both the client and server can independently send messages to each other at any time, enabling more interactive and efficient web applications. 

I also got practice creating html, js and css files and having them interact with each other. 

I had trouble getting my files to communicate with the Node.js code. I got each working independently of each other but when I tried to link the files to the localhost none of the messages appeared. I spent a lot of time troubleshooting and trying different things but had a difficult time finding resources to help with that step. That also made it harder to test the username addition. 