# Service Status Watcher Using Nodejs & SocketIO

A real-time service monitoring tool for Linux, built with **Node.js** and **Socket.IO**. This application enables users to check the status of system services remotely via WebSockets.

## 🚀 Features

- **Real-time status monitoring** for system services.
- **Asynchronous processing** for efficient status retrieval.
- **WebSocket-based communication** using Socket.IO.

## 🛠️ Installation

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the Socket.IO server:**
   ```sh
   node servicewatcher.js
   ```
3. **Run the test client:**
   ```sh
   node test.js
   ```

## Adding More Services

To monitor additional services, update the `services.json` file in the following format:

```json
[
  {
    "name": "Redis",
    "service": "redis"
  },
  {
    "name": "Apache Server",
    "service": "apache2"
  }
]
```

- `name:` A human-readable name for the service.
- `service:` The actual service name used in the `systemctl` command.

Save the file and restart the script.

---

## Done
