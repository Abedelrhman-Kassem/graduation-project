function validateSQLInput(studentQuery, correctQuery) {
  const normalizedQuery = studentQuery
    .trim()
    .replace(/\s+/g, " ")
    .replace(/`|"/g, "")
    .replace(/;/g, "")
    .toLowerCase();

  const normalizedCorrectQuery = correctQuery
    .trim()
    .replace(/\s+/g, " ")
    .replace(/`|"/g, "")
    .replace(/;/g, "")
    .toLowerCase();

  console.log(normalizedQuery);

  return normalizedQuery === normalizedCorrectQuery;
}

export default validateSQLInput;
