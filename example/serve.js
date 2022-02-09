const esbuild = require("esbuild");
const http = require("http");
const fs = require("fs");

// Start esbuild's server on a random local port
esbuild
  .serve(
    {
      port: 8000,
      // servedir: "public",
    },
    {
      entryPoints: ["src/index.tsx"],
      outfile: "public/bundle.js",
      bundle: true,
    }
  )
  .then((result) => {
    // The result tells us where esbuild's local server is
    const { host, port } = result;

    // Then start a proxy server on port 3000
    http
      .createServer((req, res) => {
        const options = {
          hostname: host,
          port: port,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        // Forward each incoming request to esbuild
        const proxyReq = http.request(options, (proxyRes) => {
          // If esbuild returns "not found", send index.html
          if (proxyRes.statusCode === 404) {
            const redirectReq = http.request(
              { ...options, path: "/" },
              (proxyRes) => {
                res.writeHead(200, { "Content-Type": "text/html" });
                const html = fs.readFileSync("public/index.html");
                res.end(html);
              }
            );
            redirectReq.end();
            return;
          }

          // Otherwise, forward the response from esbuild to the client
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res, { end: true });
        });

        // Forward the body of the request to esbuild
        req.pipe(proxyReq, { end: true });
      })
      .listen(8000);
  });
