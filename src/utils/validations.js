// validations.js

export const validateFullName = (name) => {
  if (!name.trim()) {
    return "Full name is required";
  }
  if (name.trim().length < 2) {
    return "Full name must be at least 2 characters";
  }
  if (name.trim().length > 100) {
    return "Full name must not exceed 100 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Full name should contain only letters and spaces";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  if (email.length > 254) {
    return "Email is too long";
  }
  return "";
};

export const validatePhone = (phone) => {
  if (!phone.trim()) {
    return "Phone number is required";
  }
  const cleanedPhone = phone.replace(/[\s\-\(\)]/g, "");
  if (!/^\+\d{11,15}$/.test(cleanedPhone)) {
    return "Please enter a valid phone number with country code (e.g., +911234567890)";
  }
  
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return "";
};

export const validateWorkMail = (workMail) => {
  if (!workMail.trim()) {
    return "Work email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(workMail)) {
    return "Please enter a valid work email address";
  }
  if (workMail.length > 254) {
    return "Work email is too long";
  }
  return "";
};

export const validateResume = (file) => {
  if (!file) {
    return "Resume is required";
  }

  const allowedTypes = [
    'application/pdf',
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return "Please upload a valid resume file (PDF only)";
  }

  const maxSize = 500 * 1024;
  if (file.size > maxSize) {
    return `Resume file size must be less than 500KB.`;
  }

  return "";
};

export const validateJobTitle = (title) => {
  if (!title.trim()) {
    return "Job title is required";
  }
  if (title.trim().length < 3) {
    return "Job title must be at least 3 characters";
  }
  if (title.trim().length > 100) {
    return "Job title must not exceed 100 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(title.trim())) {
    return "Job title should contain only letters and spaces";
  }
  return "";
};

export const validateJobDescription = (description) => {
  if (!description.trim()) {
    return "Job description is required";
  }
  if (description.trim().length < 50) {
    return "Job description must be at least 50 characters";
  }
  if (description.trim().length > 5000) {
    return "Job description must not exceed 5000 characters";
  }
  return "";
};

export const validateSalary = (salary) => {
  if (!salary.trim()) {
    return "CTC is required";
  }
  // Remove commas if any
  const cleanedSalary = salary.replace(/,/g, "");
  
  if (!/^\d+$/.test(cleanedSalary)) {
    return "CTC should contain only numbers";
  }
  
  const salaryNum = parseInt(cleanedSalary);
  
  if (salaryNum < 0) {
    return "CTC cannot be negative";
  }
  if (salaryNum < 10000) {
    return "CTC must be at least ₹10,000";
  }
  if (salaryNum > 100000000) {
    return "CTC cannot exceed ₹10 crores";
  }
  return "";
};

export const validateLocation = (location) => {
  if (!location.trim()) {
    return "Location is required";
  }
  if (location.trim().length < 2) {
    return "Location must be at least 2 characters";
  }
  if (location.trim().length > 100) {
    return "Location must not exceed 100 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(location.trim())) {
    return "Location should contain only letters and spaces";
  }
  return "";
};

export const validateState = (state) => {
  if (!state.trim()) {
    return "State is required";
  }
  if (state.trim().length < 2) {
    return "State must be at least 2 characters";
  }
  if (state.trim().length > 50) {
    return "State must not exceed 50 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(state.trim())) {
    return "State should contain only letters and spaces";
  }
  return "";
};
export const validateCity = (city) => {
  if (!city.trim()) {
    return "City is required";
  }
  if (city.trim().length < 2) {
    return "City must be at least 2 characters";
  }
  if (city.trim().length > 50) {
    return "City must not exceed 50 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(city.trim())) {
    return "City should contain only letters and spaces";
  }
  return "";
};

export const validateCountry = (country) => {
  if (!country.trim()) {
    return "Country is required";
  }
  if (country.trim().length < 2) {
    return "Country must be at least 2 characters";
  }
  if (country.trim().length > 50) {
    return "Country must not exceed 50 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(country.trim())) {
    return "Country should contain only letters and spaces";
  }
  return "";
};

export const validateExperience = (experience) => {
  if (!experience.toString().trim()) {
    return "Years of experience is required";
  }
  
  const exp = parseFloat(experience);
  
  if (isNaN(exp)) {
    return "Experience must be a valid number";
  }
  
  if (exp < 0) {
    return "Experience cannot be negative";
  }
  
  if (exp > 50) {
    return "Experience cannot exceed 50 years";
  }
  
  // Check if it has more than 1 decimal place
  if (experience.toString().includes('.')) {
    const decimalPlaces = experience.toString().split('.')[1]?.length || 0;
    if (decimalPlaces > 1) {
      return "Experience can have at most 1 decimal place (e.g., 2.5)";
    }
  }
  
  return "";
};