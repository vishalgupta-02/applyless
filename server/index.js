import app from "./app.js";

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello Everyone");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
