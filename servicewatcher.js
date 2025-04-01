const util = require("util");
const stdExec = require("child_process").exec;
const exec = util.promisify(stdExec); // Promisify the exec function to use async/await
const services = require('./services.json'); // Load service configurations from JSON file

// Create an HTTP server
const server = require("http").createServer();
const io = require("socket.io")(server); // Attach Socket.IO to the server

// Handle client connections
io.on("connection", (client) => {
  console.log("Client Connected");

  // Handle the "get_service_status" event from the client
  client.on("get_service_status", async (data, fn) => {
    try {
      // Check the status of each service asynchronously
      await Promise.all(
        services.map(async (service, index) => {
          const result = await getStatus(service["service"]); // Get service status
          services[index]["status"] = result.trim() == "active" ? true : false; // Store status as boolean
        })
      );
      fn(services); // Send the service status back to the client
    } catch (err) {
      console.log("Error fetching service status:", err);
    }
  });

  // Handle client disconnection
  client.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

// Start the server on localhost at port 3030
server.listen(3030, "localhost", function () {
  console.log("Server running at http://localhost:3030/");
});

// Function to get the status of a given service
const getStatus = async (service_name) => {
  const value = await exec(
    `systemctl status ${service_name} | grep -Po '(?<=Active: )(.+?)(?= \\()'`
  );
  return value.stdout.toString(); // Extract and return the status
};