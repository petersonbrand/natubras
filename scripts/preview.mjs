import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../out/", import.meta.url)));
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url || "/", "http://localhost").pathname,
    );
    const path = resolve(root, `.${pathname}`);
    if (path !== root && !path.startsWith(root + sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    const candidates =
      path === root
        ? [resolve(root, "index.html")]
        : extname(path)
          ? [path]
          : [path + ".html", resolve(path, "index.html")];
    for (const candidate of candidates) {
      if (!(await stat(candidate).catch(() => null))?.isFile()) continue;
      const data = await readFile(candidate);
      response.writeHead(200, {
        "Content-Type": types[extname(candidate)] || "application/octet-stream",
        "Content-Length": data.length,
        "X-Content-Type-Options": "nosniff",
      });
      response.end(request.method === "HEAD" ? undefined : data);
      return;
    }
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(
      await readFile(resolve(root, "404.html")).catch(
        () => "Página não encontrada",
      ),
    );
  } catch {
    response.writeHead(400);
    response.end("Requisição inválida");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Local: http://localhost:${port}`),
);
