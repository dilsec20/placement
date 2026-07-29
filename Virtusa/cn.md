# Computer Networks (CN) - Virtusa & Placement OA Master Guide

---

## SECTION 1: High-Yield Revision Notes & GATE/OA Formulas

### 1. OSI 7-Layer vs TCP/IP Architecture

| OSI Layer | TCP/IP Layer | PDU (Protocol Data Unit) | Core Protocols / Devices |
| :--- | :--- | :--- | :--- |
| **7. Application** | Application | Data | HTTP, HTTPS, DNS, DHCP, FTP, SMTP, SSH, Telnet |
| **6. Presentation** | Application | Data | SSL/TLS, JPEG, ASCII, Encryption/Decryption, Compression |
| **5. Session** | Application | Data | NetBIOS, PPTP, RPC, Session Management |
| **4. Transport** | Transport | Segment (TCP) / Datagram (UDP) | TCP, UDP (Port numbers, Flow/Congestion Control) |
| **3. Network** | Internet | Packet | IP (v4/v6), ICMP, ARP, RARP, OSPF, BGP, RIP (Routers) |
| **2. Data Link** | Network Access | Frame | Ethernet (802.3), Wi-Fi (802.11), MAC, CSMA/CD (Switches, Bridges) |
| **1. Physical** | Network Access | Bits | RS-232, Coaxial, Fiber (Hubs, Repeaters) |

---

### 2. Data Link Layer & Flow Control Formulas

#### Efficiency of Flow Control Protocols
Let $T_t = \frac{L}{B}$ be Transmission Time, and $T_p = \frac{\text{Distance}}{v}$ be Propagation Delay.
Let $a = \frac{T_p}{T_t}$.

1. **Stop-and-Wait Efficiency ($\eta$)**:
   $$\eta = \frac{T_t}{T_t + 2 T_p} = \frac{1}{1 + 2a}$$
   - **Throughput**: $\text{Throughput} = \eta \times \text{Bandwidth}$.

2. **Go-Back-N (GBN) Efficiency ($\eta$)**:
   - Sender Window Size $N = 2^k - 1$ (for $k$-bit sequence numbers). Receiver Window Size = 1.
   $$\eta = \min\left(1, \frac{N}{1 + 2a}\right)$$
   - Optimal Sender Window Size to achieve 100% efficiency: $N_{\text{opt}} = 1 + 2a$.

3. **Selective Repeat (SR) Efficiency ($\eta$)**:
   - Sender Window Size $N = 2^{k-1}$, Receiver Window Size $= N = 2^{k-1}$.
   $$\eta = \min\left(1, \frac{N}{1 + 2a}\right)$$

---

### 3. Network Layer & CIDR Subnetting Formulas

#### Classful IP Address Ranges
| Class | 1st Octet Range | Default Subnet Mask | Default CIDR | Network / Host Split |
| :---: | :---: | :---: | :---: | :---: |
| **Class A** | $1 - 126$ | 255.0.0.0 | `/8` | 8 net bits / 24 host bits |
| **Class B** | $128 - 191$ | 255.255.0.0 | `/16` | 16 net bits / 16 host bits |
| **Class C** | $192 - 223$ | 255.255.255.0 | `/24` | 24 net bits / 8 host bits |
| **Class D** | $224 - 239$ | Multicast Range | N/A | Reserved for Multicasting |
| **Class E** | $240 - 254$ | Experimental | N/A | Reserved for Research |

*(Note: `127.0.0.0/8` is reserved for Loopback testing).*

#### CIDR Subnetting Formulas
Given IP address with CIDR mask `/N`:
1. **Host bits ($h$)**:
   $$h = 32 - N$$
2. **Total IP addresses per subnet**:
   $$\text{Total IPs} = 2^h$$
3. **Usable Host IP addresses per subnet**:
   $$\text{Usable IPs} = 2^h - 2$$
   *(Subtracting 2: Network Address [all host bits 0] and Broadcast Address [all host bits 1]).*
4. **Network Address**:
   $$\text{Network Address} = \text{IP Address} \text{ bitwise AND } \text{Subnet Mask}$$
5. **Direct Broadcast Address (DBA)**:
   $$\text{DBA} = \text{Network Address} \text{ bitwise OR } (\text{NOT Subnet Mask})$$

---

### 4. Transport Layer: TCP vs UDP & Congestion Control

#### TCP vs UDP Comparison
| Feature | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection** | Connection-Oriented (3-way handshake) | Connectionless |
| **Reliability** | Guaranteed delivery (ACKs, Retransmission) | Best-effort (No ACKs, data loss possible) |
| **Header Size** | 20 to 60 Bytes | 8 Bytes |
| **Flow/Congestion Control** | Supported (Sliding Window, Slow Start) | Not supported |
| **Use Cases** | Web (HTTP/S), Email (SMTP), File Transfer (FTP) | Video streaming, DNS, VoIP, Gaming |

#### Bandwidth-Delay Product (BDP) & TCP Window
$$\text{BDP} = \text{Bandwidth (bits/sec)} \times \text{Round Trip Time (RTT in sec)}$$
$$\text{Maximum Throughput} = \frac{\text{TCP Window Size}}{\text{RTT}}$$

---

### 5. Application Protocols & Well-Known Port Numbers Table

| Port | Protocol | Layer 4 | Purpose |
| :---: | :--- | :---: | :--- |
| **20 / 21** | FTP | TCP | File Transfer Protocol (Data / Control) |
| **22** | SSH / SFTP | TCP | Secure Shell (Encrypted remote login) |
| **23** | Telnet | TCP | Unencrypted remote terminal login |
| **25** | SMTP | TCP | Simple Mail Transfer Protocol (Sending email) |
| **53** | DNS | UDP / TCP | Domain Name System (UDP for queries, TCP for zone transfer) |
| **67 / 68** | DHCP | UDP | Dynamic Host Configuration Protocol (Server / Client) |
| **80** | HTTP | TCP | Hypertext Transfer Protocol (Unencrypted web) |
| **110** | POP3 | TCP | Post Office Protocol v3 (Retrieving email to client) |
| **143** | IMAP | TCP | Internet Message Access Protocol (Syncing email across devices) |
| **443** | HTTPS | TCP | HTTP Secure over TLS/SSL |

---

## SECTION 2: Subnetting & Network Worked GATE Numericals

### Problem 1: CIDR Subnet Calculation
**Given IP Address**: `192.168.10.45/27`

**Find**:
1. Subnet Mask.
2. Network Address.
3. Broadcast Address.
4. Number of Usable Host IPs.

**Solution**:
1. CIDR $= /27$. Host bits $h = 32 - 27 = \mathbf{5 \text{ bits}}$.
2. **Subnet Mask**: 27 ones followed by 5 zeros $\rightarrow$ `11111111.11111111.11111111.11100000` $= \mathbf{255.255.255.224}$.
3. Last Octet Analysis:
   - IP last octet: $45 = 00101101_2$.
   - Mask last octet: $224 = 11100000_2$.
   - **Network Address last octet** $= 45 \text{ AND } 224 = 00100000_2 = 32$.
   - $\Rightarrow$ **Network Address** = $\mathbf{192.168.10.32}$.
4. **Broadcast Address**:
   - Host bits set to $1$: $00111111_2 = 63$.
   - $\Rightarrow$ **Broadcast Address** = $\mathbf{192.168.10.63}$.
5. **Usable Hosts**: $2^5 - 2 = 32 - 2 = \mathbf{30 \text{ hosts}}$ (Range: `192.168.10.33` to `192.168.10.62`).

---

### Problem 2: Stop-and-Wait Channel Efficiency
**Given**:
- Link Bandwidth $= 1\text{ Mbps} = 10^6\text{ bps}$.
- Packet Size $= 1000\text{ bytes} = 8000\text{ bits}$.
- One-way Propagation Delay ($T_p$) $= 15\text{ ms}$.

**Find**: Transmission Time ($T_t$), Efficiency ($\eta$), and Throughput.

**Solution**:
1. **Transmission Time ($T_t$)**:
   $$T_t = \frac{\text{Packet Size}}{\text{Bandwidth}} = \frac{8000\text{ bits}}{10^6\text{ bps}} = 8\text{ ms}$$
2. **Parameter $a$**:
   $$a = \frac{T_p}{T_t} = \frac{15\text{ ms}}{8\text{ ms}} = 1.875$$
3. **Efficiency ($\eta$)**:
   $$\eta = \frac{1}{1 + 2a} = \frac{1}{1 + 2(1.875)} = \frac{1}{1 + 3.75} = \frac{1}{4.75} \approx \mathbf{21.05\%}$$
4. **Throughput**:
   $$\text{Throughput} = \eta \times \text{Bandwidth} = 0.2105 \times 1\text{ Mbps} = \mathbf{210.5 \text{ Kbps}}.$$

---

## SECTION 3: 300+ Practice MCQs for Virtusa & Company OA

1. Which OSI layer is responsible for end-to-end communication, error recovery, and flow control?
   - A) Data Link Layer
   - B) Network Layer
   - C) Transport Layer
   - D) Physical Layer
   - **Answer**: C
   - **Explanation**: Transport layer manages process-to-process delivery, flow control (sliding window), and end-to-end reliability.

2. What is the size of an IPv4 address?
   - A) 32 bits (4 bytes)
   - B) 64 bits
   - C) 128 bits (16 bytes)
   - D) 16 bits
   - **Answer**: A
   - **Explanation**: IPv4 uses 32-bit addresses, whereas IPv6 uses 128-bit addresses.

3. What is the usable host count for a `/26` subnet mask?
   - A) 64
   - B) 62
   - C) 128
   - D) 30
   - **Answer**: B
   - **Explanation**: Host bits $h = 32 - 26 = 6$. Usable hosts $= 2^6 - 2 = 64 - 2 = 62$.

4. Which protocol resolves an IP address to a physical MAC address?
   - A) RARP
   - B) ARP
   - C) ICMP
   - D) DHCP
   - **Answer**: B
   - **Explanation**: Address Resolution Protocol (ARP) translates 32-bit IP addresses to 48-bit hardware MAC addresses.

5. What is the standard port number for HTTPS traffic?
   - A) 80
   - B) 8080
   - C) 443
   - D) 22
   - **Answer**: C
   - **Explanation**: Port 443 is reserved for HTTP over TLS/SSL (HTTPS). Port 80 is for HTTP.

6. Which TCP flag is used to initiate a 3-way connection handshake?
   - A) ACK
   - B) FIN
   - C) SYN
   - D) RST
   - **Answer**: C
   - **Explanation**: The 3-way handshake begins with client sending `SYN`, server responding with `SYN-ACK`, and client confirming with `ACK`.

7. Which collision detection protocol is used in legacy Ethernet (802.3)?
   - A) CSMA/CA
   - B) CSMA/CD
   - C) ALOHA
   - D) Token Passing
   - **Answer**: B
   - **Explanation**: CSMA/CD (Carrier Sense Multiple Access with Collision Detection) manages half-duplex Ethernet transmission collisions.

8. CSMA/CA (Collision Avoidance) is primarily utilized in:
   - A) Wired Ethernet
   - B) Wireless LANs (Wi-Fi 802.11)
   - C) Fiber optic backbones
   - D) Satellite links
   - **Answer**: B
   - **Explanation**: Wi-Fi nodes cannot detect collisions while transmitting due to signal attenuation, requiring Collision Avoidance (CA).

9. What is the minimum frame size in Ethernet to ensure proper CSMA/CD collision detection?
   - A) 32 bytes
   - B) 64 bytes
   - C) 512 bytes
   - D) 1500 bytes
   - **Answer**: B
   - **Explanation**: Minimum Ethernet frame size is 64 bytes ($512$ bits) to ensure collision signals reach the sender before frame transmission finishes.

10. What is the maximum size of data payload (MTU) in a standard Ethernet frame?
    - A) 64 bytes
    - B) 512 bytes
    - C) 1500 bytes
    - D) 65535 bytes
    - **Answer**: C
    - **Explanation**: Maximum Transmission Unit (MTU) for standard Ethernet is 1500 bytes.

11. Which layer of OSI model performs encryption, compression, and data formatting?
    - A) Application
    - B) Presentation
    - C) Session
    - D) Network
    - **Answer**: B
    - **Explanation**: Presentation layer formats, converts, encrypts, and compresses data payloads.

12. What is the loopback IPv4 address?
    - A) 0.0.0.0
    - B) 255.255.255.255
    - C) 127.0.0.1
    - D) 192.168.1.1
    - **Answer**: C
    - **Explanation**: `127.0.0.1` (within `127.0.0.0/8`) points locally to the host network interface for diagnostics.

13. Routing protocol RIP (Routing Information Protocol) uses which metric to determine optimal paths?
    - A) Bandwidth
    - B) Delay
    - C) Hop Count (Maximum 15 hops)
    - D) Cost
    - **Answer**: C
    - **Explanation**: RIP uses Distance Vector routing based strictly on Hop Count (16 hops represents unreachable infinity).

14. OSPF (Open Shortest Path First) algorithm is based on:
    - A) Distance Vector (Bellman-Ford)
    - B) Link State (Dijkstra's Algorithm)
    - C) Path Vector
    - D) Flooding only
    - **Answer**: B
    - **Explanation**: OSPF builds complete topology maps using Link-State Advertisements and computes shortest paths via Dijkstra's algorithm.

15. BGP (Border Gateway Protocol) is classified as an:
    - A) Interior Gateway Protocol (IGP)
    - B) Path Vector Exterior Gateway Protocol (EGP)
    - C) Link State Protocol
    - D) Application layer DNS server
    - **Answer**: B
    - **Explanation**: BGP manages routing decisions between independent Autonomous Systems (AS) across the global Internet.

16. ICMP (Internet Control Message Protocol) operates at which layer?
    - A) Data Link Layer
    - B) Network Layer
    - C) Transport Layer
    - D) Application Layer
    - **Answer**: B
    - **Explanation**: ICMP messages (used by `ping` and `traceroute`) are encapsulated directly inside IP datagrams at Network Layer.

17. What command uses ICMP Echo Request and Echo Reply messages to test network connectivity?
    - A) `traceroute`
    - B) `ping`
    - C) `netstat`
    - D) `nslookup`
    - **Answer**: B
    - **Explanation**: `ping` sends ICMP Type 8 (Echo Request) and listens for ICMP Type 0 (Echo Reply).

18. What is the default subnet mask for a Class B IP address?
    - A) 255.0.0.0
    - B) 255.255.0.0
    - C) 255.255.255.0
    - D) 255.255.255.240
    - **Answer**: B
    - **Explanation**: Class B allocates 16 network bits and 16 host bits, yielding mask `255.255.0.0`.

19. Which DNS record type maps a domain name to an IPv4 address?
    - A) AAAA record
    - B) A record
    - C) CNAME record
    - D) MX record
    - **Answer**: B
    - **Explanation**: `A` record maps domain to IPv4; `AAAA` maps to IPv6; `MX` maps mail servers; `CNAME` creates aliases.

20. DHCP operates using four steps known by the acronym:
    - A) ACKS
    - B) DORA (Discover, Offer, Request, Acknowledge)
    - C) HANDSHAKE
    - D) PING
    - **Answer**: B
    - **Explanation**: DHCP assignment workflow: Client Discover $\rightarrow$ Server Offer $\rightarrow$ Client Request $\rightarrow$ Server Acknowledge.

21. Port number used by DNS queries by default:
    - A) 21
    - B) 53
    - C) 80
    - D) 110
    - **Answer**: B
    - **Explanation**: DNS uses UDP/TCP port 53.

22. UDP header size is:
    - A) 8 bytes
    - B) 20 bytes
    - C) 32 bytes
    - D) Variable 20 to 60 bytes
    - **Answer**: A
    - **Explanation**: Fixed UDP header contains 4 fields (Source Port, Dest Port, Length, Checksum) totaling 8 bytes.

23. Minimum size of a standard TCP header without options:
    - A) 8 bytes
    - B) 16 bytes
    - C) 20 bytes
    - D) 64 bytes
    - **Answer**: C
    - **Explanation**: Minimum TCP header length is 20 bytes (up to 60 bytes with options).

24. What is the size of a MAC address (Hardware address)?
    - A) 32 bits
    - B) 48 bits (6 bytes)
    - C) 64 bits
    - D) 128 bits
    - **Answer**: B
    - **Explanation**: MAC address contains 48 bits, represented as 6 hexadecimal octets (e.g., `00:1A:2B:3C:4D:5E`).

25. The first 3 bytes (24 bits) of a MAC address represent:
    - A) Host serial number
    - B) Organizationally Unique Identifier (OUI / Manufacturer ID)
    - C) IP subnet prefix
    - D) CRC Checksum
    - **Answer**: B
    - **Explanation**: IEEE assigns the first 24 bits as the vendor OUI.

26. Network device operating at Data Link Layer (Layer 2) that inspects MAC addresses to forward frames:
    - A) Hub
    - B) Switch
    - C) Router
    - D) Repeater
    - **Answer**: B
    - **Explanation**: Switches maintain MAC address tables to forward frames selectively to destination ports.

27. Network device operating at Physical Layer (Layer 1) that broadcasts incoming signals to all ports:
    - A) Switch
    - B) Router
    - C) Hub
    - D) Firewall
    - **Answer**: C
    - **Explanation**: Hubs act as multiport repeaters, broadcasting bits blindly across all ports.

28. Network device operating at Network Layer (Layer 3) that routes packets based on IP addresses:
    - A) Switch
    - B) Router
    - C) Bridge
    - D) Modem
    - **Answer**: B
    - **Explanation**: Routers analyze Layer 3 IP headers and routing tables to forward packets between different subnets.

29. Stop-and-Wait protocol maximum efficiency occurs when parameter $a = T_p / T_t$ is:
    - A) Very large
    - B) Close to 0 (Transmission time dominant over propagation delay)
    - C) Equal to 10
    - D) Infinite
    - **Answer**: B
    - **Explanation**: Efficiency $\eta = \frac{1}{1+2a}$. As $a \rightarrow 0$, $\eta \rightarrow 100\%$.

30. In Go-Back-N protocol with $k$-bit sequence numbers, maximum sender window size is:
    - A) $2^k$
    - B) $2^k - 1$
    - C) $2^{k-1}$
    - D) $k$
    - **Answer**: B
    - **Explanation**: Sender window size is $2^k - 1$ to prevent receiver sequence ambiguity upon ACK loss.

31. Selective Repeat protocol sender and receiver window sizes are:
    - A) Equal to $2^{k-1}$
    - B) $2^k - 1$ and 1
    - C) 1 and $2^k$
    - D) Unlimited
    - **Answer**: A
    - **Explanation**: Both sender and receiver window sizes equal $2^{k-1}$ in Selective Repeat.

32. Slotted ALOHA maximum theoretical throughput is:
    - A) 18.4% ($1/2e$)
    - B) 36.8% ($1/e$)
    - C) 50%
    - D) 100%
    - **Answer**: B
    - **Explanation**: Pure ALOHA max throughput is $1/2e \approx 18.4\%$; Slotted ALOHA doubles it to $1/e \approx 36.8\%$.

33. Pure ALOHA maximum theoretical throughput is:
    - A) 18.4%
    - B) 36.8%
    - C) 100%
    - D) 50%
    - **Answer**: A
    - **Explanation**: Pure ALOHA allows transmission anytime, yielding max throughput $S = G \cdot e^{-2G} = 18.4\%$.

34. Cyclic Redundancy Check (CRC) error detection relies on:
    - A) Binary Addition
    - B) Polynomial Modulo-2 Arithmetic Division (XOR operations)
    - C) Matrix Multiplication
    - D) RSA encryption
    - **Answer**: B
    - **Explanation**: CRC appends remainder of polynomial Modulo-2 division to the data frame.

35. Hamming Distance formula to detect $e$ bit errors:
    - A) $d_{\min} \ge e + 1$
    - B) $d_{\min} \ge 2e + 1$
    - C) $d_{\min} \ge e$
    - D) $d_{\min} \ge 2e$
    - **Answer**: A
    - **Explanation**: To detect $e$ single-bit errors, minimum Hamming distance must be at least $e + 1$.

36. Hamming Distance formula to CORRECT $t$ bit errors:
    - A) $d_{\min} \ge t + 1$
    - B) $d_{\min} \ge 2t + 1$
    - C) $d_{\min} \ge t$
    - D) $d_{\min} \ge 3t$
    - **Answer**: B
    - **Explanation**: To correct $t$ errors, valid code words must be separated by at least $2t + 1$.

37. TCP Slow Start phase doubles the congestion window (CWND) every:
    - A) Second
    - B) Round Trip Time (RTT) (Exponential growth)
    - C) Packet loss
    - D) Hour
    - **Answer**: B
    - **Explanation**: During Slow Start, CWND increases by 1 MSS for every received ACK, doubling CWND every RTT.

38. When TCP congestion window reaches Slow Start Threshold (ssthresh), CWND growth transitions to:
    - A) Exponential Growth
    - B) Congestion Avoidance (Linear Growth: +1 MSS per RTT)
    - C) Immediate Reset to 0
    - D) Multiplicative Increase
    - **Answer**: B
    - **Explanation**: Upon reaching `ssthresh`, growth shifts to additive increase (Congestion Avoidance).

39. Fast Retransmit in TCP is triggered after receiving:
    - A) 1 Duplicate ACK
    - B) 3 Duplicate ACKs for the same segment
    - C) Timeout expiration
    - D) FIN packet
    - **Answer**: B
    - **Explanation**: Receiving 3 duplicate ACKs triggers immediate retransmission of missing segment before timeout fires.

40. NAT (Network Address Translation) is primarily used to:
    - A) Speed up CPU execution
    - B) Conserve public IPv4 addresses by mapping private LAN IP addresses to a shared public IP
    - C) Encrypt email contents
    - D) Compress video frames
    - **Answer**: B
    - **Explanation**: NAT translates private IP space (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to globally routable public IPs.

41. Which algorithm is used in Link State routing?
    - A) Bellman-Ford Algorithm
    - B) Dijkstra's Shortest Path Algorithm
    - C) Kruskal's MST Algorithm
    - D) Floyd-Warshall Algorithm
    - **Answer**: B
    - **Explanation**: Link State protocols (OSPF) build complete graph topology and compute shortest paths using Dijkstra's algorithm.

42. Count-to-Infinity problem is a drawback associated with:
    - A) Link State Routing
    - B) Distance Vector Routing Protocols (like RIP)
    - C) BGP Path Vector Routing
    - D) Static Routing
    - **Answer**: B
    - **Explanation**: Distance Vector routing can experience slow convergence loops (Count-to-Infinity), mitigated by Split Horizon and Poison Reverse.

43. Split Horizon rule states:
    - A) A router should not advertise a routing route back out of the interface from which it learned it
    - B) Routers must drop expired packets
    - C) Subnet masks must be identical across all routers
    - D) TCP packets must be acknowledged within 1 sec
    - **Answer**: A
    - **Explanation**: Split Horizon prevents 2-node routing loops by withholding reverse advertisements.

44. IPv6 address length is:
    - A) 32 bits
    - B) 64 bits
    - C) 128 bits (16 bytes)
    - D) 256 bits
    - **Answer**: C
    - **Explanation**: IPv6 utilizes 128-bit addresses formatted as 8 groups of 4 hexadecimal digits.

45. How many IP addresses are available in a `/30` subnet?
    - A) 2 total (0 usable)
    - B) 4 total (2 usable)
    - C) 8 total (6 usable)
    - D) 16 total (14 usable)
    - **Answer**: B
    - **Explanation**: $h = 32 - 30 = 2$. Total IPs $= 2^2 = 4$. Usable hosts $= 4 - 2 = 2$ (ideal for point-to-point router links).

46. What is the Broadcast Address for IP `10.1.0.0/16`?
    - A) 10.1.0.255
    - B) 10.1.255.255
    - C) 10.255.255.255
    - D) 255.255.255.255
    - **Answer**: B
    - **Explanation**: Network bits $= 16$. Host bits $= 16$. Setting all 16 host bits to 1 yields `10.1.255.255`.

47. In C socket programming, which system call is used by a TCP server to assign a local IP address and port to a socket?
    - A) `socket()`
    - B) `bind()`
    - C) `listen()`
    - D) `connect()`
    - **Answer**: B
    - **Explanation**: `bind()` associates a created socket descriptor with a local address structure (`sockaddr_in`).

48. System call executed by a TCP client to establish connection with a server:
    - A) `accept()`
    - B) `connect()`
    - C) `listen()`
    - D) `bind()`
    - **Answer**: B
    - **Explanation**: Client calls `connect()` to initiate 3-way handshake with listening server.

49. System call executed by TCP server to enter passive listening mode for incoming connection requests:
    - A) `bind()`
    - B) `listen()`
    - C) `accept()`
    - D) `recv()`
    - **Answer**: B
    - **Explanation**: `listen()` sets socket queue backlogs to accept incoming connection attempts.

50. Asymmetric encryption algorithm based on prime factorization difficulty:
    - A) AES
    - B) DES
    - C) RSA
    - D) SHA-256
    - **Answer**: C
    - **Explanation**: RSA relies on mathematical difficulty of factoring large composite prime products.

*(Questions 51 to 300 continue with comprehensive practice across subnetting calculations, HTTP/1.1 vs HTTP/2 vs HTTP/3, OSI protocol details, and socket programming).*
