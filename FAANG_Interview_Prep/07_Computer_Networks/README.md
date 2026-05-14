# 07 — Computer Networks (FAANG Interview Guide)

## 🎯 What They Ask
- Explain the OSI model. What happens at each layer?
- What happens when you type google.com in the browser?
- TCP vs UDP — differences and when to use each?
- Explain the TCP 3-way handshake.
- What is DNS? How does DNS resolution work?
- HTTP/1.1 vs HTTP/2 vs HTTP/3?
- What is HTTPS? How does TLS work?
- WebSockets vs HTTP polling vs SSE?

---

## 1. OSI Model (7 Layers)

```
Layer 7  APPLICATION    │ HTTP, FTP, SMTP, DNS, WebSocket
         ───────────────┤ What the user interacts with
Layer 6  PRESENTATION   │ Encryption (TLS/SSL), Compression, Data format
         ───────────────┤ Translates data formats (JSON, XML, encoding)
Layer 5  SESSION        │ Establishes/manages sessions
         ───────────────┤ Authentication, session tokens
Layer 4  TRANSPORT      │ TCP, UDP
         ───────────────┤ Port numbers, reliability, flow control
Layer 3  NETWORK        │ IP, ICMP, Routers
         ───────────────┤ IP addressing, routing between networks
Layer 2  DATA LINK      │ Ethernet, WiFi, MAC address, Switch
         ───────────────┤ Node-to-node delivery within same network
Layer 1  PHYSICAL       │ Cables, Radio waves, Hubs
         ───────────────┤ Raw bits over physical medium
```

**Memory trick:** "**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing" (top to bottom)

### Interview shortcut — TCP/IP Model (4 layers, more practical)
```
APPLICATION  = OSI 5,6,7  (HTTP, DNS, FTP)
TRANSPORT    = OSI 4      (TCP, UDP)
INTERNET     = OSI 3      (IP, routing)
NETWORK ACC. = OSI 1,2    (Ethernet, WiFi)
```

---

## 2. What Happens When You Type google.com? ⭐

This is the **#1 most asked networking question**. Full answer:

```
Step 1: BROWSER CACHE CHECK
  Browser checks: Do I have this IP cached? → If yes, skip DNS

Step 2: DNS RESOLUTION
  Browser → OS cache → Router cache → ISP DNS → Root DNS → .com TLD → google.com authoritative
  Result: google.com → 142.250.190.46

Step 3: TCP CONNECTION (3-way handshake)
  Client → SYN → Server
  Client ← SYN-ACK ← Server
  Client → ACK → Server
  Connection established!

Step 4: TLS HANDSHAKE (if HTTPS)
  Client sends supported cipher suites
  Server sends certificate + chosen cipher
  Client verifies certificate (chain of trust)
  Both derive session keys
  Encrypted channel established!

Step 5: HTTP REQUEST
  GET / HTTP/1.1
  Host: google.com
  → Sent through the encrypted TCP connection

Step 6: SERVER PROCESSING
  Load balancer → Web server → Application → Database
  Generates HTML response

Step 7: HTTP RESPONSE
  HTTP/1.1 200 OK
  Content-Type: text/html
  <html>...</html>

Step 8: BROWSER RENDERING
  Parse HTML → Build DOM
  Parse CSS → Build CSSOM
  Combine → Render Tree
  Layout (calculate positions)
  Paint (draw pixels)
  Composite (layer composition)
```

---

## 3. TCP vs UDP

```
┌───────────────────┬───────────────────────────────────┐
│       TCP         │             UDP                   │
├───────────────────┼───────────────────────────────────┤
│ Connection-       │ Connectionless                    │
│ oriented          │ (just send, no handshake)         │
├───────────────────┼───────────────────────────────────┤
│ Reliable          │ Unreliable                        │
│ (ack, retransmit) │ (packets may be lost)             │
├───────────────────┼───────────────────────────────────┤
│ Ordered delivery  │ No ordering guarantee             │
├───────────────────┼───────────────────────────────────┤
│ Flow control      │ No flow control                   │
│ (sliding window)  │                                   │
├───────────────────┼───────────────────────────────────┤
│ Slower (overhead) │ Faster (minimal overhead)         │
├───────────────────┼───────────────────────────────────┤
│ USE CASES:        │ USE CASES:                        │
│ • HTTP/HTTPS      │ • Video streaming                 │
│ • Email (SMTP)    │ • Online gaming                   │
│ • File transfer   │ • VoIP (voice calls)              │
│ • Database conn.  │ • DNS queries                     │
│                   │ • IoT sensor data                 │
└───────────────────┴───────────────────────────────────┘
```

### TCP 3-Way Handshake

```
CLIENT                          SERVER
  │                                │
  │  ──── SYN (seq=100) ────────→ │  "I want to connect"
  │                                │
  │  ←── SYN-ACK (seq=300,        │  "OK, I acknowledge"
  │       ack=101) ───────────     │
  │                                │
  │  ──── ACK (ack=301) ────────→ │  "Got it, we're connected"
  │                                │
  │    ═══ CONNECTION OPEN ═══     │

CLOSING (4-way):
  │  ──── FIN ──────────────────→ │  "I'm done sending"
  │  ←── ACK ───────────────────  │  "OK"
  │  ←── FIN ───────────────────  │  "I'm done too"
  │  ──── ACK ──────────────────→ │  "OK, goodbye"
```

---

## 4. HTTP Versions

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---------|----------|--------|--------|
| Protocol | Text-based | Binary | Binary |
| Multiplexing | ❌ One request per connection | ✅ Multiple streams | ✅ Multiple streams |
| Head-of-line blocking | ✅ Yes (at TCP level) | Partially (TCP level) | ❌ No (uses QUIC/UDP) |
| Header compression | ❌ No | ✅ HPACK | ✅ QPACK |
| Server push | ❌ No | ✅ Yes | ✅ Yes |
| Transport | TCP | TCP | QUIC (over UDP) |
| Connection | Keep-alive (reuse) | Single connection | 0-RTT reconnection |

```
HTTP/1.1:                    HTTP/2:
  ┌─ Conn 1 ─┐              ┌─ Single Connection ─┐
  │  Req 1   │              │  Stream 1: req/res   │
  │  Res 1   │              │  Stream 2: req/res   │
  └──────────┘              │  Stream 3: req/res   │
  ┌─ Conn 2 ─┐              │  (all multiplexed!)  │
  │  Req 2   │              └──────────────────────┘
  │  Res 2   │              
  └──────────┘              One connection handles
  (6 parallel max)          ALL requests simultaneously
```

---

## 5. DNS Resolution

```
Browser: "What is the IP for api.example.com?"

1. Browser cache (already visited? → use cached IP)
       ↓ miss
2. OS cache (/etc/hosts or system DNS cache)
       ↓ miss
3. Router cache
       ↓ miss
4. ISP Recursive Resolver
       ↓ miss
5. Root DNS Server (13 worldwide)
   → "I don't know, but .com TLD is at 192.5.6.30"
       ↓
6. TLD Server (.com)
   → "example.com nameserver is ns1.example.com"
       ↓
7. Authoritative DNS (ns1.example.com)
   → "api.example.com = 93.184.216.34"
       ↓
8. IP cached at each level (TTL-based)
   → Browser gets the IP, connects!
```

### DNS Record Types

| Type | Purpose | Example |
|------|---------|---------|
| **A** | Domain → IPv4 | example.com → 93.184.216.34 |
| **AAAA** | Domain → IPv6 | example.com → 2606:2800:... |
| **CNAME** | Alias → another domain | www.example.com → example.com |
| **MX** | Mail server | example.com → mail.example.com |
| **NS** | Nameserver | example.com → ns1.example.com |
| **TXT** | Arbitrary text | SPF records, domain verification |

---

## 6. HTTPS / TLS

```
TLS Handshake (simplified):

CLIENT                                    SERVER
  │                                          │
  │  ClientHello                             │
  │  (supported ciphers, random)             │
  │ ────────────────────────────────────────→ │
  │                                          │
  │  ServerHello + Certificate               │
  │  (chosen cipher, server's public key)    │
  │ ←──────────────────────────────────────── │
  │                                          │
  │  Client verifies certificate             │
  │  (checks CA signature chain)             │
  │                                          │
  │  Key Exchange                            │
  │  (generate shared secret using           │
  │   Diffie-Hellman or RSA)                 │
  │ ────────────────────────────────────────→ │
  │                                          │
  │  Both derive symmetric session key       │
  │                                          │
  │  ═══ ALL DATA NOW ENCRYPTED ═══         │
  │  (using fast symmetric encryption        │
  │   like AES-256-GCM)                      │
```

**Why both asymmetric + symmetric?**
- Asymmetric (RSA/ECDH): Secure key exchange (slow, used only once)
- Symmetric (AES): Fast data encryption (used for all subsequent data)

---

## 7. WebSocket vs HTTP Polling vs SSE

```
HTTP Polling:                  Long Polling:
Client → Server (any data?)    Client → Server (hold until data)
Server → No                    Server → ... waits ...
Client → Server (any data?)    Server → Here's data!
Server → No                    Client → Server (hold again)
Server → Yes! Here's data      
(Wasteful! Many empty requests) (Better, but still HTTP overhead)

WebSocket:                     SSE (Server-Sent Events):
Client → Server (Upgrade!)     Client → Server (GET /events)
Server → Accepted              Server → keeps connection open
═══ Full-duplex connection ═══ Server → event: data1
Client ↔ Server (both send)    Server → event: data2
Client ↔ Server (real-time)    (One-way: server → client only)
```

| Feature | HTTP Polling | Long Polling | WebSocket | SSE |
|---------|-------------|-------------|-----------|-----|
| Direction | Client → Server | Client → Server | Bidirectional | Server → Client |
| Overhead | High | Medium | Low (after handshake) | Low |
| Real-time | No (interval) | Near real-time | Real-time | Real-time |
| Use case | Dashboard refresh | Notifications | Chat, gaming | Live feeds, stock prices |

### 💻 WebSocket Code

```javascript
// SERVER (using ws library)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Echo: ${message}`);
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});

// CLIENT
const ws = new WebSocket('ws://localhost:8080');
ws.onopen = () => ws.send('Hello Server!');
ws.onmessage = (event) => console.log('Server says:', event.data);
```

---

## ⚡ Quick Revision

| Concept | One-liner |
|---------|-----------|
| OSI 7 layers | Application, Presentation, Session, Transport, Network, Data Link, Physical |
| TCP vs UDP | TCP = reliable + ordered + slower; UDP = unreliable + fast |
| 3-way handshake | SYN → SYN-ACK → ACK (establish TCP connection) |
| DNS | Translates domain names to IP addresses; hierarchical (Root→TLD→Auth) |
| HTTPS | HTTP + TLS encryption; asymmetric key exchange → symmetric data encryption |
| HTTP/2 vs 1.1 | Multiplexing, binary, header compression, server push, single connection |
| WebSocket | Full-duplex over single TCP connection; ws:// protocol |
| CORS | Browser blocks cross-origin requests; server must send Access-Control headers |
| CDN | Geographically distributed servers; cache static content close to users |
| Port numbers | HTTP=80, HTTPS=443, SSH=22, DNS=53, FTP=21, SMTP=25 |
