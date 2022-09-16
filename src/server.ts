import dotenv from 'dotenv';
import app from "./index"
dotenv.config();

const PORT: number = Number(process.env.PORT) || 4200;

app.listen(PORT, () => {
  console.log(`\nListening server on port: ${PORT}`);
});