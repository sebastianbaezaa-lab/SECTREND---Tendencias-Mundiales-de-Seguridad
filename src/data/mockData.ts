import { Trend, Stat, Category } from '../types';

export const mockTrends: Trend[] = [
  {
    id: "TRD-001",
    title: "Log4Shell Vulnerability (CVE-2021-44228)",
    description: "A critical vulnerability in Apache Log4j 2 allowing remote code execution.",
    longDescription: "Log4Shell is a zero-day vulnerability in Log4j involving unauthenticated remote code execution. Attackers can exploit this by sending a specially crafted request to a vulnerable system, causing the system to execute arbitrary code. The vulnerability stems from how Log4j processes log messages, specifically interpreting JNDI features.",
    category: "CVE",
    severity: "Critical",
    dateDiscovered: "2021-12-09T00:00:00Z",
    affectedSystems: ["Apache Struts", "Apache Solr", "Apache Druid", "VMware vCenter", "Numerous Java apps"],
    mentions: 154200,
    timeline: [
      { date: "2021-11-24T00:00:00Z", event: "Vulnerability reported to Apache by Alibaba Cloud" },
      { date: "2021-12-09T00:00:00Z", event: "Public disclosure and proof-of-concept released" },
      { date: "2021-12-10T00:00:00Z", event: "Active exploitation observed globally" }
    ],
    remediation: [
      "Update Log4j to version 2.15.0 or later immediately.",
      "If unable to update, set the system property log4j2.formatMsgNoLookups to true.",
      "Remove the JndiLookup class from the classpath."
    ],
    references: [
      { title: "NVD - CVE-2021-44228", url: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228" }
    ],
    relatedIds: ["TRD-009"]
  },
  {
    id: "TRD-002",
    title: "Midnight Blizzard Microsoft Breach",
    description: "Russian state-sponsored actor access to Microsoft corporate email accounts.",
    longDescription: "Microsoft disclosed that Nobelium (Midnight Blizzard) breached their corporate systems using a password spray attack against a legacy non-production tenant account. From there, they accessed a small percentage of Microsoft corporate email accounts, including members of senior leadership and employees in cybersecurity, legal, and other functions.",
    category: "Data Breach",
    severity: "High",
    dateDiscovered: "2024-01-12T00:00:00Z",
    affectedSystems: ["Microsoft Corporate Email", "Legacy Tenants"],
    mentions: 45000,
    timeline: [
      { date: "2023-11-01T00:00:00Z", event: "Initial intrusion via password spray" },
      { date: "2024-01-12T00:00:00Z", event: "Breach detected by Microsoft security teams" },
      { date: "2024-01-19T00:00:00Z", event: "Public disclosure of the incident" }
    ],
    remediation: [
      "Enforce MFA on all accounts, including legacy and test accounts.",
      "Audit logs for anomalous access patterns.",
      "Transition away from legacy authentication protocols."
    ],
    references: [
      { title: "MSRC Blog Post", url: "https://msrc.microsoft.com/blog/" }
    ],
    relatedIds: []
  },
  {
    id: "TRD-003",
    title: "XZ Utils Backdoor (CVE-2024-3094)",
    description: "Malicious backdoor discovered in upstream XZ Utils source code.",
    longDescription: "A sophisticated, multi-stage backdoor was intentionally introduced into the open-source XZ Utils package. The backdoor specifically targets sshd (OpenSSH daemon) via the liblzma library dependency. If deployed in a production environment, it would allow a remote attacker to bypass SSH authentication and gain unauthorized access.",
    category: "Zero-Day",
    severity: "Critical",
    dateDiscovered: "2024-03-29T00:00:00Z",
    affectedSystems: ["Linux (Debian testing, Fedora Rawhide, openSUSE Tumbleweed, Kali Linux)"],
    mentions: 89000,
    timeline: [
      { date: "2024-02-23T00:00:00Z", event: "Malicious code first injected into repository" },
      { date: "2024-03-29T00:00:00Z", event: "Discovered and reported by Andres Freund" }
    ],
    remediation: [
      "Downgrade XZ Utils to an uncompromised version (e.g., 5.4.6).",
      "Scan infrastructure for the vulnerable library versions 5.6.0 and 5.6.1.",
      "Monitor SSH logs for unusual authentication patterns."
    ],
    references: [
      { title: "Red Hat Security Advisory", url: "https://access.redhat.com/security/cve/cve-2024-3094" }
    ],
    relatedIds: []
  },
  {
    id: "TRD-004",
    title: "LockBit 3.0 Resurgence",
    description: "Ransomware-as-a-service group returns with new tactics despite law enforcement actions.",
    longDescription: "Following Operation Cronos which seized LockBit infrastructure, the group has resurfaced using new encryptors and targeting unpatched VPN gateways. The new variants show enhanced evasion techniques against EDR solutions and faster encryption speeds.",
    category: "Malware",
    severity: "Critical",
    dateDiscovered: "2024-04-15T00:00:00Z",
    affectedSystems: ["Windows Environments", "VMware ESXi", "Fortinet VPNs"],
    mentions: 32000,
    timeline: [
      { date: "2024-02-20T00:00:00Z", event: "Operation Cronos disrupts LockBit" },
      { date: "2024-04-15T00:00:00Z", event: "New LockBit 3.0 infrastructure detected" }
    ],
    remediation: [
      "Patch edge devices and VPN gateways immediately.",
      "Implement offline, immutable backups.",
      "Deploy EDR with behavior-based detection rules updated for new LockBit signatures."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-005",
    title: "Ivanti Connect Secure VPN Flaw (CVE-2024-21892)",
    description: "Authentication bypass in Ivanti Connect Secure.",
    longDescription: "A vulnerability in Ivanti Connect Secure allows an unauthenticated attacker to bypass authentication and access restricted resources. This flaw has been heavily targeted by APT groups to establish persistence and drop web shells.",
    category: "CVE",
    severity: "Critical",
    dateDiscovered: "2024-01-31T00:00:00Z",
    affectedSystems: ["Ivanti Connect Secure", "Ivanti Policy Secure"],
    mentions: 56000,
    timeline: [
      { date: "2024-01-31T00:00:00Z", event: "Vulnerability disclosed" },
      { date: "2024-02-10T00:00:00Z", event: "Mass exploitation begins" }
    ],
    remediation: [
      "Apply the vendor-supplied patch.",
      "Review access logs for signs of compromise.",
      "Perform a factory reset if compromise is suspected before patching."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-006",
    title: "Change Healthcare Cyberattack",
    description: "Massive ransomware attack crippling US healthcare billing.",
    longDescription: "A cyberattack attributed to the ALPHV/Blackcat ransomware gang crippled Change Healthcare's systems, causing nationwide disruption to prescription processing and medical billing. The disruption highlighted the systemic risk in centralized healthcare IT infrastructure.",
    category: "News",
    severity: "High",
    dateDiscovered: "2024-02-21T00:00:00Z",
    affectedSystems: ["Change Healthcare IT Infrastructure", "US Pharmacies", "Hospitals"],
    mentions: 112000,
    timeline: [
      { date: "2024-02-21T00:00:00Z", event: "Attack occurs, systems shut down" },
      { date: "2024-03-01T00:00:00Z", event: "Blackcat claims responsibility" }
    ],
    remediation: [
      "Establish redundant billing processors.",
      "Implement strong third-party risk management.",
      "Enhance network segmentation."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-007",
    title: "Palo Alto PAN-OS Command Injection (CVE-2024-3400)",
    description: "Unauthenticated OS command injection in GlobalProtect gateway.",
    longDescription: "A command injection vulnerability in the GlobalProtect feature of Palo Alto Networks PAN-OS software allows an unauthenticated attacker to execute arbitrary code with root privileges on the firewall.",
    category: "Zero-Day",
    severity: "Critical",
    dateDiscovered: "2024-04-12T00:00:00Z",
    affectedSystems: ["PAN-OS 10.2", "PAN-OS 11.0", "PAN-OS 11.1"],
    mentions: 78000,
    timeline: [
      { date: "2024-04-12T00:00:00Z", event: "Palo Alto releases advisory" },
      { date: "2024-04-14T00:00:00Z", event: "PoC exploits go public" }
    ],
    remediation: [
      "Apply hotfixes provided by Palo Alto Networks.",
      "Enable threat prevention signatures for this CVE.",
      "Temporarily disable GlobalProtect telemetry."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-008",
    title: "AT&T Data Leak",
    description: "Data of 73 million current and former AT&T customers leaked on dark web.",
    longDescription: "A dataset containing personal information, including social security numbers, passcodes, and contact details of approximately 7.6 million current and 65.4 million former AT&T customers was published on a hacker forum.",
    category: "Data Breach",
    severity: "High",
    dateDiscovered: "2024-03-30T00:00:00Z",
    affectedSystems: ["AT&T Customer Databases"],
    mentions: 65000,
    timeline: [
      { date: "2021-08-01T00:00:00Z", event: "Data initially claimed to be stolen by ShinyHunters" },
      { date: "2024-03-17T00:00:00Z", event: "Full dataset leaks for free on BreachForums" }
    ],
    remediation: [
      "Reset passcodes for affected accounts.",
      "Offer credit monitoring services to affected individuals.",
      "Conduct a comprehensive review of cloud database security."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-009",
    title: "Fake AI-Generated Tech Support Sites",
    description: "Rise in SEO-poisoned tech support scams using LLM-generated content.",
    longDescription: "Threat actors are utilizing Large Language Models (LLMs) to programmatically generate thousands of fake tech support and software download pages. These pages use SEO poisoning to rank high in search results, distributing infostealers like RedLine and Lumma.",
    category: "Malware",
    severity: "Medium",
    dateDiscovered: "2024-05-01T00:00:00Z",
    affectedSystems: ["Search Engines", "Windows Users"],
    mentions: 15000,
    timeline: [
      { date: "2024-01-01T00:00:00Z", event: "Increase in fake sites noticed" },
      { date: "2024-05-01T00:00:00Z", event: "Report published detailing the AI generation mechanics" }
    ],
    remediation: [
      "Educate users to verify domain names before downloading.",
      "Implement DNS filtering to block known malicious domains.",
      "Use reputable ad-blockers to filter sponsored malware links."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-010",
    title: "GitHub Actions Reposjacking",
    description: "Widespread vulnerability involving abandoned namespaces in GitHub Actions.",
    longDescription: "Security researchers identified multiple high-profile open-source projects vulnerable to 'reposjacking'. If a GitHub user renames their account, the old namespace becomes available. Attackers claiming this namespace can hijack GitHub Actions that depend on actions hosted in the old namespace.",
    category: "News",
    severity: "Medium",
    dateDiscovered: "2023-11-15T00:00:00Z",
    affectedSystems: ["GitHub Actions", "CI/CD Pipelines"],
    mentions: 21000,
    timeline: [
      { date: "2023-11-15T00:00:00Z", event: "Research published regarding reposjacking scope" }
    ],
    remediation: [
      "Pin GitHub Actions to a specific commit SHA rather than a branch or tag.",
      "Regularly audit CI/CD dependencies for abandoned repositories.",
      "Use trusted publisher mechanisms where possible."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-011",
    title: "Sisense Supply Chain Breach",
    description: "Data analytics company Sisense compromised, affecting downstream customers.",
    longDescription: "Sisense suffered a compromise that exposed customer credentials and access tokens. CISA issued an alert urging Sisense customers to reset credentials and any secrets potentially exposed to the platform, as attackers were using the access to target Sisense clients.",
    category: "Data Breach",
    severity: "Critical",
    dateDiscovered: "2024-04-10T00:00:00Z",
    affectedSystems: ["Sisense Cloud", "Customer Databases"],
    mentions: 41000,
    timeline: [
      { date: "2024-04-10T00:00:00Z", event: "Sisense begins notifying customers" },
      { date: "2024-04-11T00:00:00Z", event: "CISA alerts organizations to reset credentials" }
    ],
    remediation: [
      "Reset all credentials, tokens, and SSH keys shared with Sisense.",
      "Review access logs indicating connections from Sisense IP addresses.",
      "Implement stricter least-privilege access for third-party integrations."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-012",
    title: "QakBot Infrastructure Rebuilding",
    description: "Signs of QakBot botnet returning after 2023 takedown.",
    longDescription: "Despite a massive multinational law enforcement takedown in late 2023, security firms have spotted new phishing campaigns distributing QakBot (Qbot) payloads. The operators appear to be testing new delivery mechanisms, shifting away from macros towards malicious MSI files and LNK shortcuts.",
    category: "Malware",
    severity: "High",
    dateDiscovered: "2024-02-05T00:00:00Z",
    affectedSystems: ["Windows Environments", "Email Gateways"],
    mentions: 28000,
    timeline: [
      { date: "2023-08-29T00:00:00Z", event: "FBI announces QakBot takedown" },
      { date: "2024-02-05T00:00:00Z", event: "New QakBot phishing campaigns detected" }
    ],
    remediation: [
      "Block execution of MSI and LNK files originating from email or web downloads.",
      "Enhance email security to detect evasive phishing links.",
      "Monitor for network indicators associated with the new QakBot C2 servers."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-013",
    title: "Jenkins Arbitrary File Read (CVE-2024-23897)",
    description: "Vulnerability in Jenkins CLI allows reading arbitrary files.",
    longDescription: "An unauthenticated attacker can use the Jenkins CLI (Command Line Interface) feature along with the args4j library to read arbitrary files on the Jenkins controller file system. This can lead to RCE if specific files (like SSH keys or secret binaries) are read.",
    category: "CVE",
    severity: "Critical",
    dateDiscovered: "2024-01-24T00:00:00Z",
    affectedSystems: ["Jenkins Controller < 2.442", "Jenkins LTS < 2.426.3"],
    mentions: 49000,
    timeline: [
      { date: "2024-01-24T00:00:00Z", event: "Jenkins releases security advisory and patches" },
      { date: "2024-01-26T00:00:00Z", event: "Multiple PoC exploits available in the wild" }
    ],
    remediation: [
      "Update Jenkins to version 2.442 or LTS 2.426.3 immediately.",
      "If unable to update, disable the Jenkins CLI.",
      "Rotate any secrets that may have been stored unencrypted on the controller filesystem."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-014",
    title: "Snowflake Customer Accounts Targeted",
    description: "Targeted attacks against Snowflake customer environments.",
    longDescription: "Threat actors launched targeted cyberattacks against users of the Snowflake cloud data platform. The attacks leveraged compromised credentials obtained via infostealers, specifically targeting accounts that did not have Multi-Factor Authentication (MFA) enabled.",
    category: "Data Breach",
    severity: "High",
    dateDiscovered: "2024-05-23T00:00:00Z",
    affectedSystems: ["Snowflake Cloud Environments"],
    mentions: 55000,
    timeline: [
      { date: "2024-05-23T00:00:00Z", event: "Snowflake issues statement on targeted attacks" },
      { date: "2024-05-31T00:00:00Z", event: "Multiple large organizations confirm data exfiltration" }
    ],
    remediation: [
      "Enforce MFA on all Snowflake accounts immediately.",
      "Implement network allowlists to restrict access to Snowflake instances.",
      "Review Snowflake access logs for unauthorized queries and high-volume data egress."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-015",
    title: "Blast-RADIUS Attack (CVE-2024-3596)",
    description: "Protocol vulnerability in RADIUS authentication.",
    longDescription: "The Blast-RADIUS attack exploits a fundamental flaw in the RADIUS protocol (specifically PAP authentication). It allows a Man-in-the-Middle (MitM) attacker to forge a valid Accept message, bypassing authentication for switches, routers, and VPNs.",
    category: "CVE",
    severity: "High",
    dateDiscovered: "2024-07-09T00:00:00Z",
    affectedSystems: ["Network Infrastructure using RADIUS/PAP"],
    mentions: 34000,
    timeline: [
      { date: "2024-07-09T00:00:00Z", event: "Blast-RADIUS paper and CVE published" }
    ],
    remediation: [
      "Require Message-Authenticator attributes in all RADIUS requests and responses.",
      "Upgrade to RADIUS over TLS (RadSec).",
      "Migrate away from PAP to EAP-based authentication methods."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-016",
    title: "Deepfake Vishing Attacks",
    description: "Increase in voice cloning used for executive impersonation.",
    longDescription: "Attackers are increasingly using AI voice cloning technology to impersonate executives (vishing). These deepfakes are used in targeted social engineering attacks to authorize fraudulent wire transfers or extract sensitive information from employees.",
    category: "News",
    severity: "Medium",
    dateDiscovered: "2024-03-01T00:00:00Z",
    affectedSystems: ["Corporate Finance", "Helpdesks"],
    mentions: 42000,
    timeline: [
      { date: "2024-02-04T00:00:00Z", event: "Multi-million dollar deepfake scam reported in Hong Kong" }
    ],
    remediation: [
      "Establish multi-channel verification protocols for financial transactions.",
      "Train employees on the existence and capabilities of deepfake audio.",
      "Implement 'safe words' for high-stakes internal communications."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-017",
    title: "ScreenConnect Authentication Bypass (CVE-2024-1709)",
    description: "Critical flaw in ConnectWise ScreenConnect.",
    longDescription: "An authentication bypass vulnerability in ConnectWise ScreenConnect allows attackers to create administrative users on the server and execute arbitrary code. This was heavily exploited by ransomware operators to deploy payloads across managed networks.",
    category: "CVE",
    severity: "Critical",
    dateDiscovered: "2024-02-19T00:00:00Z",
    affectedSystems: ["ConnectWise ScreenConnect < 23.9.8"],
    mentions: 61000,
    timeline: [
      { date: "2024-02-19T00:00:00Z", event: "ConnectWise discloses CVSS 10.0 vulnerability" },
      { date: "2024-02-21T00:00:00Z", event: "Active exploitation observed dropping ransomware" }
    ],
    remediation: [
      "Update on-premise ScreenConnect servers to 23.9.8+ immediately.",
      "Review the SetupWizard.aspx page access logs.",
      "Hunt for anomalous processes spawned by the ScreenConnect service."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-018",
    title: "NPM Package Typosquatting Campaign",
    description: "Large-scale campaign deploying info-stealers in NPM.",
    longDescription: "A coordinated campaign uploaded over 200 typosquatted packages to the NPM registry. The packages mimic popular libraries like React, Axios, and Lodash. When installed, they run post-install scripts that exfiltrate environment variables, AWS keys, and developer credentials.",
    category: "Malware",
    severity: "High",
    dateDiscovered: "2024-06-12T00:00:00Z",
    affectedSystems: ["Node.js Environments", "Developer Workstations", "CI/CD Pipelines"],
    mentions: 19000,
    timeline: [
      { date: "2024-06-12T00:00:00Z", event: "Security researchers detect coordinated upload wave" },
      { date: "2024-06-14T00:00:00Z", event: "NPM team removes the malicious packages" }
    ],
    remediation: [
      "Implement strict package lockfiles (package-lock.json).",
      "Use automated SCA (Software Composition Analysis) tools to detect anomalies.",
      "Disable post-install scripts (npm ci --ignore-scripts) in untrusted environments."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-019",
    title: "Router Botnets Targeting SOHO Devices",
    description: "Volt Typhoon and others using end-of-life SOHO routers.",
    longDescription: "Nation-state actors, including China-nexus 'Volt Typhoon', are building massive stealth botnets using end-of-life Small Office/Home Office (SOHO) routers (e.g., Cisco, Netgear, ASUS). These botnets are used to proxy traffic, obscuring the origin of attacks against critical infrastructure.",
    category: "Zero-Day", // Using Zero-Day/Hardware for variety
    severity: "High",
    dateDiscovered: "2024-01-31T00:00:00Z",
    affectedSystems: ["EOL SOHO Routers", "Critical Infrastructure (targets)"],
    mentions: 38000,
    timeline: [
      { date: "2024-01-31T00:00:00Z", event: "FBI announces disruption of KV Botnet" }
    ],
    remediation: [
      "Replace end-of-life routing and firewall equipment.",
      "Disable remote management interfaces on WAN ports.",
      "Implement geographically based traffic filtering."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-020",
    title: "AnyDesk Compromise",
    description: "Remote desktop software provider AnyDesk suffered a production breach.",
    longDescription: "AnyDesk confirmed a cyberattack compromised their production systems, including source code and code signing certificates. While they state user sessions were not hijacked, passwords to the web portal were reset as a precaution.",
    category: "Data Breach",
    severity: "High",
    dateDiscovered: "2024-02-02T00:00:00Z",
    affectedSystems: ["AnyDesk Infrastructure"],
    mentions: 44000,
    timeline: [
      { date: "2024-02-02T00:00:00Z", event: "AnyDesk publicly discloses the breach" }
    ],
    remediation: [
      "Update the AnyDesk client to versions using the new code signing certificate.",
      "Reset passwords on the AnyDesk customer portal.",
      "Monitor environments for unauthorized persistence via remote access tools."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-021",
    title: "Tailgating and Badge Cloning Campaign",
    description: "Coordinated physical breaches utilizing cloned proximity cards.",
    longDescription: "Organized groups are employing sophisticated RFID sniffing devices hidden in backpacks to clone employee access badges in corporate cafeterias and nearby transit hubs. Following the cloning, actors tailgate employees into sensitive building zones, deploying rogue access points or 'Dropbox' network implants on internal networks to establish persistent backdoor access.",
    category: "Physical Security",
    severity: "High",
    dateDiscovered: "2024-06-10T00:00:00Z",
    affectedSystems: ["Corporate Offices", "Access Control Systems", "HVAC Panels"],
    mentions: 12500,
    timeline: [
      { date: "2024-06-10T00:00:00Z", event: "Initial physical breach detected on CCTV logs" },
      { date: "2024-06-14T00:00:00Z", event: "Discovery of rogue devices plugged into meeting room switches" }
    ],
    remediation: [
      "Upgrade legacy proximity cards (e.g., 125kHz HID Prox) to high-frequency encrypted smart cards (e.g., HID iCLASS SE or SEOS).",
      "Enforce strictly audited anti-passback policies within access control software.",
      "Conduct physical penetration testing and employee awareness training on tailgating."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-022",
    title: "Global Shipping Port Ransomware Pivot",
    description: "Ransomware operators pivoting to target maritime logistics and ports.",
    longDescription: "Major shipping ports across Europe and Asia have reported coordinated attacks targeting their automated container terminal logistics software (TOS - Terminal Operating Systems). Ransomware groups are specifically taking down the EDI (Electronic Data Interchange) systems, halting ship-to-shore crane operations and causing massive cargo bottlenecks. The attackers blend OT (Operational Technology) disruption with traditional IT data extortion.",
    category: "Logistics",
    severity: "Critical",
    dateDiscovered: "2024-08-22T00:00:00Z",
    affectedSystems: ["Terminal Operating Systems (TOS)", "EDI Gateways", "Automated Cranes"],
    mentions: 54000,
    timeline: [
      { date: "2024-08-22T00:00:00Z", event: "Port automation grid suddenly shuts down" },
      { date: "2024-08-23T00:00:00Z", event: "Ransom note received citing encrypted TOS databases" }
    ],
    remediation: [
      "Strictly segment IT networks from OT (Operational Technology) and ICS environments.",
      "Implement strong localized fallback modes for automated terminal systems.",
      "Conduct regular tabletop exercises specifically tailored to physical cargo halting scenarios."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-023",
    title: "Agricultural Facility IoT Sabotage",
    description: "Cyber-physical attacks targeting climate control in food storage.",
    longDescription: "Hacktivists and state-sponsored actors have begun exploiting vulnerabilities in connected IoT sensors and industrial HVAC systems used by large-scale agricultural storage facilities. By manipulating the reported temperature telemetry and overriding chilling systems, attackers aim to spoil metric tons of raw food stock, severely impacting the food supply chain before processing.",
    category: "Food Defense",
    severity: "Critical",
    dateDiscovered: "2024-07-05T00:00:00Z",
    affectedSystems: ["Industrial HVAC", "Cold-Chain Storage Logistics", "IoT Temperature Sensors"],
    mentions: 28000,
    timeline: [
      { date: "2024-07-05T00:00:00Z", event: "Temperature anomalies reported across multiple silos" },
      { date: "2024-07-07T00:00:00Z", event: "Investigation reveals compromised PLC firmware" }
    ],
    remediation: [
      "Isolate physical IoT and SCADA/PLC networks from the public internet using jump servers and VPNs.",
      "Implement independent, analog redundant temperature monitoring alarms.",
      "Patch vulnerabilities in industrial control systems and change default vendor credentials."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-024",
    title: "Freight Forwarding GPS Spoofing",
    description: "Manipulation of GPS signals to misdirect high-value logistics shipments.",
    longDescription: "Logistics carriers moving high-value goods (like pharmaceuticals and advanced electronics) report increased incidents of organized crime syndicates using portable GPS spoofing devices. The spoofing forces transport trucks to deviate from secured routes while dispatch systems falsely see the truck on-track, enabling physical highjacking of the cargo.",
    category: "Logistics",
    severity: "High",
    dateDiscovered: "2024-05-18T00:00:00Z",
    affectedSystems: ["Fleet Telematics", "GPS Tracking Beacons", "Routing Software"],
    mentions: 19500,
    timeline: [
      { date: "2024-05-18T00:00:00Z", event: "Truck goes offline but telematics report normal route" },
      { date: "2024-05-19T00:00:00Z", event: "Driver found unharmed, cargo stolen" }
    ],
    remediation: [
      "Implement multi-modal tracking incorporating cellular triangulation and dead reckoning alongside GPS.",
      "Harden transport vehicle physical locks with geofenced unlock protocols.",
      "Train drivers on physical anomaly detection and manual distress signaling."
    ],
    references: [],
    relatedIds: []
  },
  {
    id: "TRD-025",
    title: "Data Center Physical Security Breach",
    description: "Infiltration of colocation facilities to compromise hardware supply train.",
    longDescription: "Advanced persistent threats (APTs) are increasingly relying on physical infiltration of mid-tier colocation data centers. Attackers disguise themselves as third-party contractor technicians to install hardware loggers, substitute network cables with malicious interceptors, or steal physical backup drives containing encrypted data for offline cracking.",
    category: "Physical Security",
    severity: "Critical",
    dateDiscovered: "2024-09-02T00:00:00Z",
    affectedSystems: ["Data Center Racks", "Physical Backup Media", "Inter-switch Uplinks"],
    mentions: 31000,
    timeline: [
      { date: "2024-09-02T00:00:00Z", event: "Routine audit discovers malicious fiber tap hardware" }
    ],
    remediation: [
      "Mandate biometric multi-factor authentication combined with strict 'mantrap' entry for all server room ingress.",
      "Implement continuous physical audit logs of all cage openings correlated with scheduled ticket windows.",
      "Deploy full payload encryption in transit (e.g., MACsec) across all intra-datacenter links."
    ],
    references: [],
    relatedIds: []
  }
];

export const mockStats: Stat[] = [
  { label: "Active Threats Tracked", value: "2,451", trend: 12 },
  { label: "Critical Vulnerabilities (7d)", value: "34", trend: -5 },
  { label: "Global Incidents Today", value: "128", trend: 8 }
];

export const CATEGORY_INFO: Record<string, { icon: string; description: string }> = {
  "CVE": { icon: "shield-alert", description: "Common Vulnerabilities and Exposures in software." },
  "Data Breach": { icon: "database", description: "Incidents involving unauthorized access to data." },
  "Malware": { icon: "bug", description: "Malicious software, ransomware, and botnets." },
  "Zero-Day": { icon: "zap", description: "Previously unknown vulnerabilities with active exploits." },
  "News": { icon: "newspaper", description: "General cybersecurity industry news and reports." },
  "Physical Security": { icon: "camera", description: "Breaches of physical premises and hardware tampering." },
  "Logistics": { icon: "truck", description: "Supply chain disruptions and logistics infrastructure threats." },
  "Food Defense": { icon: "shield-plus", description: "Threats targeting agricultural operations and food supply chains." },
};
