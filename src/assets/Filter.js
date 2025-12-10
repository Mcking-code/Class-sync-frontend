

export function filterStudents(students, search, course, section, yearLevel, sortBy) {
  let filtered = [...students];

  // Search by name or ID
  if (search && search.trim() !== "") {
    filtered = filtered.filter((student) =>
      `${student.firstName} ${student.lastName} ${student.studentId}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  // Filter by course
  if (course && course !== "All") {
    filtered = filtered.filter((s) => s.course === course);
  }

  // Filter by section
  if (section && section !== "All") {
    filtered = filtered.filter((s) => s.section === section);
  }

  // Filter by year level
  if (yearLevel && yearLevel !== "All") {
    filtered = filtered.filter((s) => s.yearLevel === yearLevel);
  }

  // Sort
  if (sortBy === "A-Z"  && sortBy !== "All") {
    filtered.sort((a, b) => a.lastName.localeCompare(b.lastName));
  } else if (sortBy === "Z-A" && sortBy !== "All") {
    filtered.sort((a, b) => b.lastName.localeCompare(a.lastName));
  }

  return filtered;
}