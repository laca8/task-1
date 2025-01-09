// Get available branches for a given day
export const getBranchesForDay = (doctorsData, selectedDay) => {
  const availableBranches = [];

  // Loop through each doctor
  doctorsData?.forEach((doctor) => {
    // Check each branch schedule
    doctor?.branches?.forEach((branch) => {
      // If doctor works this day at this branch
      if (branch?.days?.includes(selectedDay)) {
        availableBranches.push({
          branch: branch.branch,
          doctor: `DR. ${doctor.fName} ${doctor.sName}`,
          time: `${branch.start} - ${branch.end}`,
        });
      }
    });
  });
  console.log(availableBranches);

  return availableBranches;
};
// Function to generate time slots between start and end times
function formatTime(date) {
  return date.toTimeString().slice(0, 5);
}
export function generateTimeSlots(start, end) {
  const slots = [];
  const startTime = new Date(`2000-01-01T${start}`);
  const endTime = new Date(`2000-01-01T${end}`);
  while (startTime < endTime) {
    slots.push(formatTime(startTime));
    startTime.setMinutes(startTime.getMinutes() + 30);
  }
  return slots;
}

//convert to minutes
export const convertToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Function to check if a time is within a range
export const isTimeInRange = (checkTime, range) => {
  const [start, end] = range.split(" - ");
  const [timeHour, timeMinute] = checkTime.split(":").map(Number);
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const timeInMinutes = timeHour * 60 + timeMinute;
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  return timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes;
};
