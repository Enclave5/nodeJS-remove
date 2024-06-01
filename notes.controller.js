const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log("Here is the list notes:");
  notes.forEach((note) => {
    console.log(
      `<${chalk.red("a")} ${chalk.yellow("href")}=${chalk.green(
        `"tel:${note.id}"`
      )}>${note.id}</${chalk.red("a")}>`,
      note.title
    );
  });
}

async function removeNoteById(id) {
  const notes = await getNotes();

  const filtered = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(filtered));

  console.log(chalk.red.inverse("Note was deleted, id:", id));
}

module.exports = {
  addNote,
  printNotes,
  removeNoteById,
};
