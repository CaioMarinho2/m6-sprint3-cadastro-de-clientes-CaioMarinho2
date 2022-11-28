import app from "./app";

app.get("/", (req, res) => {
  return res.send("Hello, world!");
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log("App running at http://localhost:3000"));
