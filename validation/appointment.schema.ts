import * as yup from "yup";


export const appointmentSchema = yup.object({ 
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be 10 digits"),
  time: yup.string().required("Time is required").matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Time must be in HH:mm format"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  comment: yup.string().required("Comment is required").min(10, "Comment must be at least 10 characters"),
})

export type AppointmentFormData = yup.InferType<typeof appointmentSchema>;
