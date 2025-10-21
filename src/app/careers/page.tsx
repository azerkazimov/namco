
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Multi-step form validation schemas
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  actualAddress: z.string().min(5, "Address must be at least 5 characters"),
  registrationAddress: z.string().min(5, "Registration address must be at least 5 characters"),
  birthCity: z.string().min(2, "Birth city is required"),
  birthCountry: z.string().min(2, "Birth country is required"),
  citizenship: z.string().min(2, "Citizenship is required"),
});

const languageSkillsSchema = z.object({
  languages: z.array(z.object({
    language: z.string().min(1, "Language is required"),
    speaking: z.enum(["Beginner", "Intermediate", "Advanced", "Native"]),
    reading: z.enum(["Beginner", "Intermediate", "Advanced", "Native"]),
    writing: z.enum(["Beginner", "Intermediate", "Advanced", "Native"]),
  })).min(1, "At least one language is required"),
});

const professionalExperienceSchema = z.object({
  experiences: z.array(z.object({
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    current: z.boolean(),
    description: z.string().min(10, "Description must be at least 10 characters"),
  })).min(1, "At least one experience is required"),
});

const educationSchema = z.object({
  secondaryEducation: z.object({
    school: z.string().min(1, "School name is required"),
    graduationYear: z.string().min(4, "Graduation year is required"),
    gpa: z.string().optional(),
  }),
  higherEducation: z.array(z.object({
    institution: z.string().min(1, "Institution name is required"),
    degree: z.string().min(1, "Degree is required"),
    field: z.string().min(1, "Field of study is required"),
    graduationYear: z.string().min(4, "Graduation year is required"),
    gpa: z.string().optional(),
  })),
});

const certificatesSchema = z.object({
  certificates: z.array(z.object({
    name: z.string().min(1, "Certificate name is required"),
    issuer: z.string().min(1, "Issuer is required"),
    date: z.string().min(1, "Date is required"),
    file: z.instanceof(File).optional(),
  })),
  trainings: z.array(z.object({
    name: z.string().min(1, "Training name is required"),
    institution: z.string().min(1, "Institution is required"),
    duration: z.string().min(1, "Duration is required"),
    date: z.string().min(1, "Date is required"),
  })),
});

const additionalInfoSchema = z.object({
  relatives: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    workplace: z.string().min(1, "Workplace is required"),
    position: z.string().min(1, "Position is required"),
  })),
  recommenders: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    phone: z.string().min(10, "Phone number is required"),
    email: z.string().email("Valid email is required"),
  })),
  questions: z.object({
    motivation: z.string().min(20, "Motivation must be at least 20 characters"),
    availability: z.string().min(1, "Availability is required"),
    salary: z.string().optional(),
    additionalInfo: z.string().optional(),
  }),
  cv: z.instanceof(File, { message: "Please upload a CV file" }).refine(
    (file) => file.type === "application/pdf",
    "Only PDF files are allowed"
  ),
});

// Combined schema for final validation
const applicationSchema = personalInfoSchema
  .merge(languageSkillsSchema)
  .merge(professionalExperienceSchema)
  .merge(educationSchema)
  .merge(certificatesSchema)
  .merge(additionalInfoSchema);

type ApplicationFormData = z.infer<typeof applicationSchema>;

const steps = [
  { id: 1, title: "Personal Information", description: "Enter your personal details" },
  { id: 2, title: "Language Skills", description: "Your language proficiency" },
  { id: 3, title: "Professional Experience", description: "Your work experience" },
  { id: 4, title: "Education", description: "Your educational background" },
  { id: 5, title: "Certificates & Training", description: "Your certifications and training" },
  { id: 6, title: "Additional Information", description: "Relatives, recommenders, and questions" },
];

export default function Careers() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      languages: [{ language: "", speaking: "Beginner", reading: "Beginner", writing: "Beginner" }],
      experiences: [{ company: "", position: "", startDate: "", endDate: "", current: false, description: "" }],
      higherEducation: [{ institution: "", degree: "", field: "", graduationYear: "", gpa: "" }],
      certificates: [{ name: "", issuer: "", date: "" }],
      trainings: [{ name: "", institution: "", duration: "", date: "" }],
      relatives: [{ name: "", relationship: "", workplace: "", position: "" }],
      recommenders: [{ name: "", position: "", company: "", phone: "", email: "" }],
    },
  });

  const cvFile = watch("cv");

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("cv", data.cv);

      // Submit to API endpoint
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      await response.json();
      setUploadedFileName(data.cv.name);
      setShowSuccessDialog(true);
      reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name *
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name *
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Father&apos;s Name *
                </label>
                <input
                  {...register("fatherName")}
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your father's name"
                />
                {errors.fatherName && (
                  <p className="text-destructive text-sm mt-1">{errors.fatherName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+994 ___ __ __"
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Actual Address *
                </label>
                <input
                  {...register("actualAddress")}
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your actual address"
                />
                {errors.actualAddress && (
                  <p className="text-destructive text-sm mt-1">{errors.actualAddress.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Registration Address *
                </label>
                <input
                  {...register("registrationAddress")}
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your registration address"
                />
                {errors.registrationAddress && (
                  <p className="text-destructive text-sm mt-1">{errors.registrationAddress.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Birth City *
                </label>
                <select
                  {...register("birthCity")}
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select city</option>
                  <option value="Baku">Baku</option>
                  <option value="Ganja">Ganja</option>
                  <option value="Sumgayit">Sumgayit</option>
                  <option value="Other">Other</option>
                </select>
                {errors.birthCity && (
                  <p className="text-destructive text-sm mt-1">{errors.birthCity.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Birth Country *
                </label>
                <select
                  {...register("birthCountry")}
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select country</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Russia">Russia</option>
                  <option value="Other">Other</option>
                </select>
                {errors.birthCountry && (
                  <p className="text-destructive text-sm mt-1">{errors.birthCountry.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Citizenship *
                </label>
                <select
                  {...register("citizenship")}
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select citizenship</option>
                  <option value="Azerbaijani">Azerbaijani</option>
                  <option value="Turkish">Turkish</option>
                  <option value="Russian">Russian</option>
                  <option value="Other">Other</option>
                </select>
                {errors.citizenship && (
                  <p className="text-destructive text-sm mt-1">{errors.citizenship.message}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Language Skills</h3>
              {watch("languages")?.map((_, index) => (
                <div key={index} className="border border-border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Language *
                      </label>
                      <input
                        {...register(`languages.${index}.language`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., English, Azerbaijani"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Speaking
                      </label>
                      <select
                        {...register(`languages.${index}.speaking`)}
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Native">Native</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Reading
                      </label>
                      <select
                        {...register(`languages.${index}.reading`)}
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Native">Native</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Writing
                      </label>
                      <select
                        {...register(`languages.${index}.writing`)}
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Native">Native</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setValue("languages", [...(watch("languages") || []), { language: "", speaking: "Beginner", reading: "Beginner", writing: "Beginner" }])}
              >
                Add Language
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>
              {watch("experiences")?.map((_, index) => (
                <div key={index} className="border border-border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company *
                      </label>
                      <input
                        {...register(`experiences.${index}.company`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Position *
                      </label>
                      <input
                        {...register(`experiences.${index}.position`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your position"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Start Date *
                      </label>
                      <input
                        {...register(`experiences.${index}.startDate`)}
                        type="date"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        End Date
                      </label>
                      <input
                        {...register(`experiences.${index}.endDate`)}
                        type="date"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center">
                        <input
                          {...register(`experiences.${index}.current`)}
                          type="checkbox"
                          className="mr-2"
                        />
                        Currently working here
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description *
                    </label>
                    <textarea
                      {...register(`experiences.${index}.description`)}
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Describe your responsibilities and achievements"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setValue("experiences", [...(watch("experiences") || []), { company: "", position: "", startDate: "", endDate: "", current: false, description: "" }])}
              >
                Add Experience
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Secondary Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    School *
                  </label>
                  <input
                    {...register("secondaryEducation.school")}
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="School name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Graduation Year *
                  </label>
                  <input
                    {...register("secondaryEducation.graduationYear")}
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    GPA (Optional)
                  </label>
                  <input
                    {...register("secondaryEducation.gpa")}
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="3.5"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Higher Education</h3>
              {watch("higherEducation")?.map((_, index) => (
                <div key={index} className="border border-border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Institution *
                      </label>
                      <input
                        {...register(`higherEducation.${index}.institution`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="University name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Degree *
                      </label>
                      <input
                        {...register(`higherEducation.${index}.degree`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Bachelor, Master, PhD"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Field of Study *
                      </label>
                      <input
                        {...register(`higherEducation.${index}.field`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Chemistry, Geology, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Graduation Year *
                      </label>
                      <input
                        {...register(`higherEducation.${index}.graduationYear`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        {...register(`higherEducation.${index}.gpa`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="3.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setValue("higherEducation", [...(watch("higherEducation") || []), { institution: "", degree: "", field: "", graduationYear: "", gpa: "" }])}
              >
                Add Education
              </Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Certificates</h3>
              {watch("certificates")?.map((_, index) => (
                <div key={index} className="border border-border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Certificate Name *
                      </label>
                      <input
                        {...register(`certificates.${index}.name`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Certificate name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Issuer *
                      </label>
                      <input
                        {...register(`certificates.${index}.issuer`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Issuing organization"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Date *
                      </label>
                      <input
                        {...register(`certificates.${index}.date`)}
                        type="date"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setValue("certificates", [...(watch("certificates") || []), { name: "", issuer: "", date: "" }])}
              >
                Add Certificate
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Training</h3>
              {watch("trainings")?.map((_, index) => (
                <div key={index} className="border border-border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Training Name *
                      </label>
                      <input
                        {...register(`trainings.${index}.name`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Training name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Institution *
                      </label>
                      <input
                        {...register(`trainings.${index}.institution`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Training institution"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Duration *
                      </label>
                      <input
                        {...register(`trainings.${index}.duration`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., 3 months, 40 hours"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Date *
                      </label>
                      <input
                        {...register(`trainings.${index}.date`)}
                        type="date"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setValue("trainings", [...(watch("trainings") || []), { name: "", institution: "", duration: "", date: "" }])}
              >
                Add Training
              </Button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Close Relatives</h3>
              {watch("relatives")?.map((_, index) => (
                <div key={index} className="border border-border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        {...register(`relatives.${index}.name`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Relative's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Relationship *
                      </label>
                      <input
                        {...register(`relatives.${index}.relationship`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Father, Mother, Brother, etc."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Workplace *
                      </label>
                      <input
                        {...register(`relatives.${index}.workplace`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Workplace name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Position *
                      </label>
                      <input
                        {...register(`relatives.${index}.position`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Position title"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setValue("relatives", [...(watch("relatives") || []), { name: "", relationship: "", workplace: "", position: "" }])}
              >
                Add Relative
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Recommenders</h3>
              {watch("recommenders")?.map((_, index) => (
                <div key={index} className="border border-border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        {...register(`recommenders.${index}.name`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Recommender's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Position *
                      </label>
                      <input
                        {...register(`recommenders.${index}.position`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Position title"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company *
                      </label>
                      <input
                        {...register(`recommenders.${index}.company`)}
                        type="text"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone *
                      </label>
                      <input
                        {...register(`recommenders.${index}.phone`)}
                        type="tel"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        {...register(`recommenders.${index}.email`)}
                        type="email"
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setValue("recommenders", [...(watch("recommenders") || []), { name: "", position: "", company: "", phone: "", email: "" }])}
              >
                Add Recommender
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Questions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Why do you want to work for us? *
                  </label>
                  <textarea
                    {...register("questions.motivation")}
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your motivation..."
                  />
                  {errors.questions?.motivation && (
                    <p className="text-destructive text-sm mt-1">{errors.questions.motivation.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    When can you start? *
                  </label>
                  <input
                    {...register("questions.availability")}
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Immediately, 2 weeks notice"
                  />
                  {errors.questions?.availability && (
                    <p className="text-destructive text-sm mt-1">{errors.questions.availability.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Expected Salary (Optional)
                  </label>
                  <input
                    {...register("questions.salary")}
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 1500-2000 AZN"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Information
                  </label>
                  <textarea
                    {...register("questions.additionalInfo")}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload CV (PDF only) *
              </label>
              <input
                {...register("cv")}
                type="file"
                accept=".pdf"
                className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {errors.cv && (
                <p className="text-destructive text-sm mt-1">{errors.cv.message}</p>
              )}
              {cvFile && (
                <p className="text-sm text-muted-foreground mt-1">
                  Selected file: {cvFile.name}
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/atas.png)" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase font-orbitron tracking-wider mb-4">
              CAREERS
            </h1>
            <p className="text-xl md:text-2xl font-medium">
              Join Our Team and Shape the Future of Mining
            </p>
          </div>
        </div>
      </div>

      {/* Job Position Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 mb-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Laborant Position</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  Full-time
                </span>
                <span className="text-muted-foreground">Location: Mining Site</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-step Form */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Submit Your Application</h2>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {steps.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.id}
                    </div>
                    {step.id < steps.length && (
                      <div
                        className={`w-12 h-1 mx-2 ${
                          currentStep > step.id ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {steps[currentStep - 1]?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {steps[currentStep - 1]?.description}
                </p>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-600">Application Submitted Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              Thank you for your interest in the Laborant position. We have received your application with the CV file &quot;{uploadedFileName}&quot;. 
              Our HR team will review your application and contact you within 5-7 business days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
