<button
  style={{ cursor: "pointer", backgroundColor: "#226699" }}
  onClick={() => {
    console.log("turma", classItem);
    console.log("turmas", classes);
  }}
>
  Como tá agora?
  {JSON.stringify(classItem)}
</button>;
