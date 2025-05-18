// Define sampleProjects at the top to ensure it's globally accessible
const sampleProjects = [
    {
        name: 'My-Store',
        description: 'An e-commerce platform and my first project involving authentication. It’s based on affiliate marketing and taught me the basics of user auth systems.',
        html_url: 'https://souravdpal.github.io/store/?fbclid=PAZXh0bgNhZW0CMTEAAafpmVD-gb7KiYXvfGOhVXUzh8rlypUl5jG_aGyFMmMoIsFVGdMPf9j6eWT6uw_aem_9XZoAUk44_WufZh9sC_teQ'
    },
    {
        name: 'Solo Leveling RPG',
        description: 'An RPG game project where I learned real-time authentication, password hashing (bcrypt with 10 salt rounds), and backend development. It features XP-based productivity tasks, a leaderboard, and real-time updates.',
        html_url: 'https://solo-86qm.onrender.com/signup.html?fbclid=PAZXh0bgNhZW0CMTEAAacBJp7g8xJfzaASSxiohap887zRa0umzFU0jUYlvraKvLsreTMok8yTMXF8nQ_aem_rgefJonEZG_pCyzX39T4Cg'
    },
    {
        name: 'To-Do List',
        description: 'A basic to-do list application I created while learning JavaScript. It was my entry project into building real-world functionality with JS.',
        html_url: 'https://souravdpal.github.io/TO-DO/?fbclid=PAZXh0bgNhZW0CMTEAAacbiSpEg1hAeIArsWyFhj7Y7JUoBUPBbt4nrDRXpKRHzztAmQkGZQ4DrNY7pQ_aem_9BIICEaCPAyecD9i0AoBHQ'
    },
    {
        name: 'Real-Time Chat + Search App',
        description: 'A real-time multi-functional chat and search app. Users can chat globally, send friend requests, and have personal encrypted 1:1 chats via sockets. It features model-switching with Ollama, multilingual Wikipedia queries, and a secure Node.js backend using bcrypt with 10 salt rounds.',
        html_url: 'https://github.com/souravdpal/chat'
    }
];

// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// Matrix Background
function initMatrix() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixBg = document.querySelector('.matrix-bg');
    if (!matrixBg) return; // Exit if no matrix-bg element
    matrixBg.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
        ctx.font = `${fontSize}px 'Roboto Mono'`;

        drops.forEach((y, i) => {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }

    setInterval(draw, 33);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

document.addEventListener('DOMContentLoaded', initMatrix);

// Cursor Trail
const trail = document.createElement('div');
trail.classList.add('cursor-trail');
document.body.appendChild(trail);

document.addEventListener('mousemove', e => {
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
});

// Theme Selector
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.className = '';
        document.body.classList.add(btn.dataset.theme);
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('theme', btn.dataset.theme);
    });
});

if (localStorage.getItem('theme')) {
    document.body.className = '';
    document.body.classList.add(localStorage.getItem('theme'));
    themeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === localStorage.getItem('theme')));
}

// Scroll Animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger progress bar animation
            const progressBar = entry.target.querySelector('.progress-bar div');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        }
    });
}, { threshold: 0.1 });

function triggerAnimations() {
    document.querySelectorAll('.animate').forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', triggerAnimations);

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Sound Effects
function playClickSound() {
    const audio = new Audio('https://freesound.org/data/previews/256/256458_4770666-lq.mp3');
    audio.play().catch(() => {});
}

document.querySelectorAll('.navbar a, .theme-btn, .hero .btn').forEach(el => {
    el.addEventListener('click', playClickSound);
});

// Highlight active nav link
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Terminal Emulator (Expanded Commands)
const terminalInput = document.getElementById('terminal-input');
if (terminalInput) {
    const terminal = document.querySelector('.terminal');
    const commands = {
        'whoami': 'Self-taught cybersecurity enthusiast',
        'skills': 'SQL Injection, OSINT, Wi-Fi Hacking, Nmap, Tor, OpenVPN\nLinux: systemctl, nmcli, grep, htop, pkill -f',
        'clear': () => {
            terminal.querySelectorAll('.output').forEach(el => el.remove());
            return '';
        },
        'ls': 'dir1 dir2 file1.txt file2.txt',
        'ls -l': 'drwxr-xr-x 2 user user 4096 May 18 12:34 dir1\n-rw-r--r-- 1 user user 123 May 18 12:34 file1.txt',
        'ls -a': '. .. .hidden dir1 dir2 file1.txt file2.txt',
        'ls -la': 'drwxr-xr-x 2 user user 4096 May 18 12:34 .\ndrwxr-xr-x 2 user user 4096 May 18 12:34 ..',
        'cd': 'Changed directory',
        'cd ..': 'Moved up one directory',
        'cd ~': 'Changed to home directory',
        'cd /': 'Changed to root directory',
        'pwd': '/home/user',
        'cat file1.txt': 'Hello, world!',
        'cat': 'cat: missing file operand',
        'rm file1.txt': 'Removed file1.txt',
        'rm -rf dir1': 'Removed directory dir1',
        'mkdir newdir': 'Created directory newdir',
        'touch newfile.txt': 'Created newfile.txt',
        'cp file1.txt file2.txt': 'Copied file1.txt to file2.txt',
        'mv file1.txt dir1': 'Moved file1.txt to dir1',
        'grep "text" file1.txt': 'text: Hello, world!',
        'find . -name "*.txt"': './file1.txt\n./file2.txt',
        'chmod 755 script.sh': 'Changed permissions to 755 for script.sh',
        'chown user file1.txt': 'Changed owner to user for file1.txt',
        'ps aux': 'USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND\nuser 1234 0.0 0.6 123m 12m pts/0 S 12:34 0:01 bash',
        'kill 1234': 'Terminated process 1234',
        'kill -9 1234': 'Forcefully terminated process 1234',
        'top': 'PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND\n1234 user 20 0 123m 12m 8m S 0.0 0.6 0:01.23 bash',
        'htop': 'Interactive process viewer launched',
        'df -h': 'Filesystem Size Used Avail Use% Mounted on\n/dev/sda1 1.0T 500G 500G 50% /',
        'du -sh': '20K .',
        'free -m': 'total used free shared buff/cache available\nMem: 8192 2048 4096 512 2048 5632',
        'uptime': '12:34:56 up 1 day, 2:34, 2 users, load average: 0.10, 0.20, 0.30',
        'uname -a': 'Linux hostname 5.15.0-73-generic #80-Ubuntu SMP Mon May 18 12:34:56 UTC 2025 x86_64',
        'who': 'user pts/0 2025-05-18 12:34 (192.168.1.1)',
        'ping 8.8.8.8': '64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.3 ms',
        'curl example.com': 'HTTP/1.1 200 OK\nContent-Type: text/html',
        'wget example.com': 'Downloaded index.html',
        'netstat -tuln': 'Proto Recv-Q Send-Q Local Address Foreign Address State\ntcp 0 0 127.0.0.1:80 0.0.0.0:* LISTEN',
        'ss -tuln': 'Netid State Recv-Q Send-Q Local Address:Port Peer Address:Port\ntcp LISTEN 0 128 127.0.0.1:80 0.0.0.0:*',
        'ifconfig': 'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500\ninet 192.168.1.100 netmask 255.255.255.0 broadcast 192.168.1.255',
        'ip addr': '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536\ninet 127.0.0.1/8 scope host lo',
        'route -n': 'Destination Gateway Genmask Flags Metric Ref Use Iface\ndefault 192.168.1.1 0.0.0.0 UG 100 0 0 eth0',
        'nmap localhost': 'Starting Nmap 7.93\nNmap scan report for localhost (127.0.0.1)\nPORT STATE SERVICE\n22/tcp open ssh\n80/tcp open http',
        'nmap --help': 'Nmap 7.93 usage: nmap [Scan Type] [Options] {target specification}',
        'nmap -sV localhost': 'Starting Nmap 7.93\nPORT STATE SERVICE VERSION\n22/tcp open ssh OpenSSH 8.9\n80/tcp open http Apache/2.4.52',
        'dig example.com': ';; ANSWER SECTION:\nexample.com. 3600 IN A 93.184.216.34',
        'nslookup example.com': 'Server: 8.8.8.8\nAddress: 93.184.216.34\nName: example.com',
        'whois example.com': 'Domain Name: example.com\nRegistrar: Namecheap',
        'traceroute 8.8.8.8': '1 192.168.1.1 0.123 ms\n2 8.8.8.8 12.345 ms',
        'telnet localhost 80': 'Connected to localhost',
        'ssh user@localhost': 'ssh: connect to host localhost port 22: Connection established',
        'scp file.txt user@localhost:/home/user': 'file.txt 100% 12KB 12.0KB/s 00:01',
        'rsync -av file.txt user@localhost:/home/user': 'sent 123 bytes received 45 bytes 336.00 bytes/sec',
        'iptables -L': 'Chain INPUT (policy ACCEPT)\ntarget prot opt source destination',
        'ufw status': 'Status: active\nTo Action From\n22 ALLOW Anywhere',
        'fail2ban-client status': 'Status for the jail: sshd\n|- Filter\n|  `- Currently failed: 0\n`- Actions\n   `- Currently banned: 0',
        'aircrack-ng wlan0': 'Aircrack-ng 1.7\n[00:00:01] 1234 keys tested (123.45 k/s)',
        'wifite --all': 'WiFite v2.7.0\n[*] Scanning for wireless devices',
        'hydra -l admin -P pass.txt 127.0.0.1 http-post-form': 'Hydra v9.4\n[80][http-post-form] host: 127.0.0.1 login: admin password: password',
        'msfconsole': 'Metasploit Framework v6.3.0\nmsf6 >',
        'sqlmap -u "http://example.com"': 'sqlmap/1.7.5\n[*] starting @ 12:34:56\n[INFO] testing connection to the target URL',
        'burpsuite': 'Burp Suite Professional v2023.10\n[*] Starting proxy service',
        'wireshark': 'Wireshark 4.0.6\n[*] Capturing on eth0',
        'tcpdump -i eth0': 'tcpdump: listening on eth0, link-type EN10MB (Ethernet)',
        'john --wordlist=pass.txt hash.txt': 'John the Ripper 1.9.0\n[*] Cracking password hash',
        'hashcat -m 0 hash.txt pass.txt': 'hashcat 6.2.6\n[*] Starting attack',
        'openssl genrsa': 'OpenSSL 3.0.8\n[*] Generating RSA private key',
        'tor': 'Tor 0.4.7.13\n[*] Bootstrapped 100%: Done',
        'openvpn client.ovpn': 'OpenVPN 2.5.9\n[*] Connected to VPN server',
        'proxychains curl example.com': 'ProxyChains-4.16\n[*] Proxying through 127.0.0.1:9050',
        'nc -l 12345': 'Ncat: Version 7.93\n[*] Listening on 0.0.0.0:12345',
        'socat TCP-LISTEN:12345 stdout': 'socat 1.7.4.4\n[*] Forwarding TCP connections',
        'ngrok http 80': 'ngrok http 80\n[*] Tunnel established',
        'chroot /newroot': 'Changed root directory',
        'sudo whoami': 'root',
        'su': 'Switched to root user',
        'passwd': 'Password changed',
        'adduser newuser': 'Added new user newuser',
        'deluser olduser': 'Deleted user olduser',
        'groupadd newgroup': 'Added new group newgroup',
        'systemctl status sshd': '● sshd.service - OpenSSH server\n   Loaded: loaded (/lib/systemd/system/sshd.service; enabled)',
        'journalctl -u sshd': 'May 18 12:34:56 hostname sshd[1234]: Accepted password for user',
        'dmesg': '[1234.567890] kernel: USB device found',
        'lsblk': 'NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT\nsda 8:0 0 1T 0 disk\n└─sda1 8:1 0 1T 0 part /',
        'fdisk -l': 'Disk /dev/sda: 1 TiB, 1000000000000 bytes, 1953125000 sectors',
        'parted /dev/sda': 'GNU Parted 3.5\n(parted)',
        'mkfs.ext4 /dev/sdb1': 'mke2fs 1.47.0\n[*] Creating ext4 filesystem',
        'mount /dev/sda1 /mnt': '/dev/sda1 on /mnt type ext4 (rw,relatime)',
        'umount /mnt': 'Unmounted /mnt',
        'lscpu': 'Architecture: x86_64\nCPU(s): 4\nModel name: Intel(R) Core(TM) i5-9600K',
        'lspci': '00:1f.6 Ethernet controller: Intel Corporation Ethernet Connection',
        'lsusb': 'Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub',
        'dmidecode -t system': 'System Information\nManufacturer: Dell Inc.',
        'crontab -l': '* * * * * /path/to/script.sh',
        'at now + 1 minute': 'Job 123 scheduled for Sat May 18 12:35:56 2025',
        'watch date': 'Every 2.0s: date\nSat May 18 12:34:56 IST 2025',
        'screen': 'Screen session started',
        'tmux new': 'tmux session started',
        'nano file.txt': 'GNU nano 7.2\n[*] Editing file.txt',
        'vim file.txt': 'Vim 9.0\n[*] Editing file.txt',
        'less file.txt': 'Viewing file.txt',
        'man ls': 'NAME\n       ls - list directory contents',
        'history': '1 ls\n2 cd\n3 pwd',
        'echo $PATH': '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin',
        'export MYVAR=value': 'Set environment variable MYVAR=value',
        'alias ll="ls -l"': 'Created alias ll for ls -l',
        'date': 'Sat May 18 12:34:56 IST 2025',
        'cal': 'May 2025\nSu Mo Tu We Th Fr Sa\n                1  2  3\n 4  5  6  7  8  9 10\n11 12 13 14 15 16 17\n18 19 20 21 22 23 24\n25 26 27 28 29 30 31',
        'bc': 'bc 1.07.1\n1+1\n2',
        'awk ':"{print $1} file.txt Hello",
        'sed ':'"s/world/earth/" file.txt Hello, earth!',
        'tar' :'-cvf archive.tar dir1 dir1/\ndir1/file1.txt',
        'gzip file.txt': 'Compressed file.txt to file.txt.gz',
        'unzip archive.zip': 'Extracted archive.zip'
    };

    terminalInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim().toLowerCase();
            const outputDiv = document.createElement('div');
            outputDiv.classList.add('output');
            outputDiv.textContent = `$ ${input}`;
            terminal.insertBefore(outputDiv, terminalInput.parentElement);

            if (commands[input]) {
                const response = typeof commands[input] === 'function' ? commands[input]() : commands[input];
                if (response) {
                    const responseDiv = document.createElement('div');
                    responseDiv.classList.add('output');
                    responseDiv.textContent = response;
                    terminal.insertBefore(responseDiv, terminalInput.parentElement);
                }
            } else if (input) {
                const errorDiv = document.createElement('div');
                errorDiv.classList.add('output');
                errorDiv.textContent = `Command not found: ${input}`;
                terminal.insertBefore(errorDiv, terminalInput.parentElement);
            }

            terminalInput.value = '';
            terminal.scrollTop = terminal.scrollHeight;
            playClickSound();
        }
    });
}

// Dynamic GitHub Projects
const projectGrid = document.querySelector('.project-grid');

if (projectGrid) {
    fetch('https://api.github.com/users/yourusername/repos')
        .then(response => response.json())
        .then(data => {
            projectGrid.innerHTML = '';
            (data.slice(0, 3).length ? data : sampleProjects).forEach(repo => {
                const card = document.createElement('div');
                card.classList.add('project-card', 'animate');
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;
                projectGrid.appendChild(card);
                observer.observe(card);
            });
        })
        .catch(() => {
            projectGrid.innerHTML = '';
            sampleProjects.forEach(repo => {
                const card = document.createElement('div');
                card.classList.add('project-card', 'animate');
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;
                projectGrid.appendChild(card);
                observer.observe(card);
            });
        });
}