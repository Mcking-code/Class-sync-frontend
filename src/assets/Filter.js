export function Filter(students = [], search = "") {
  const query = search.toLowerCase();

  return students.filter(student =>
    String(student.id).toLowerCase().includes(query) ||
    String(student.lastname).toLowerCase().includes(query) ||
    String(student.firstname).toLowerCase().includes(query) ||
    String(student.middle).toLowerCase().includes(query) ||
    String(student.yearLevel).toLowerCase().includes(query) ||
    String(student.section).toLowerCase().includes(query) ||
    String(student.course).toLowerCase().includes(query) ||
    String(student.courseFull).toLowerCase().includes(query)
  );
}
