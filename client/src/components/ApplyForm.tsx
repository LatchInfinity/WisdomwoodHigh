import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyForm.css';

interface FormErrors {
    contactPersonMobile?: string;
    contactPersonEmail?: string;
    studentNameBlock?: string;
    [key: string]: string | undefined;
}

const ApplyForm: React.FC = () => {
    const [formData, setFormData] = useState({
        admissionFor: '',
        contactPersonName: '',
        contactPersonMobile: '',
        studentNameBlock: '',
        remarks: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [animating, setAnimating] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const resetForm = () => {
        setFormData({
            admissionFor: '',
            contactPersonName: '',
            contactPersonMobile: '',
            studentNameBlock: '',
            remarks: ''
        });
        setErrors({});
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Required field checks
        if (!formData.admissionFor.trim()) {
            newErrors.admissionFor = 'This field is required.';
        }
        if (!formData.contactPersonName.trim()) {
            newErrors.contactPersonName = 'This field is required.';
        }
        if (!formData.contactPersonMobile.trim()) {
            newErrors.contactPersonMobile = 'This field is required.';
        }

        if (!formData.studentNameBlock.trim()) {
            newErrors.studentNameBlock = 'This field is required.';
        }

        // Phone: digits only, 10 digits (only if not already flagged empty)
        const phone = formData.contactPersonMobile.trim();
        if (phone.length > 0) {
            if (!/^\d+$/.test(phone)) {
                newErrors.contactPersonMobile = 'Please enter digits only.';
            } else if (phone.length !== 10) {
                newErrors.contactPersonMobile = 'Mobile number must be exactly 10 digits.';
            }
        }

        // Student name must be BLOCK LETTERS
        const studentName = formData.studentNameBlock.trim();
        if (studentName.length > 0 && studentName !== studentName.toUpperCase()) {
            newErrors.studentNameBlock = 'Please enter the student name in BLOCK LETTERS (uppercase only).';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Google Apps Script Web App URL
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5rIDIlB23fXQUp7q5UJOpaCl9lnX-Ip6irjGVIwG9YasBD5bzaD3ARZCjRfzHlm7YxA/exec";

        const now = new Date();
        const submissionData = {
            ...formData,
            submissionDate: now.toLocaleDateString(),
            submissionTime: now.toLocaleTimeString()
        };

        setSubmitting(true);
        try {
            // Sending data to Google Sheets
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(submissionData),
            });

            // Fade out form, then redirect to thank you page
            setAnimating(true);
            setTimeout(() => {
                resetForm();
                setAnimating(false);
                setSubmitting(false);
                navigate('/thank-you');
            }, 500);

        } catch {
            setSubmitting(false);
            alert('There was an error submitting your form. Please try again later.');
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Auto-uppercase for student name
        if (name === 'studentNameBlock') {
            setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
        }
        // Phone: allow only digits
        else if (name === 'contactPersonMobile') {
            const digitsOnly = value.replace(/\D/g, '');
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear error for this field when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="enquiry-card">
            <div className="enquiry-header">
                ENQUIRY FORM
            </div>

            <form className={`enquiry-form ${animating ? 'fade-out' : 'fade-in'}`} onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                    <div className={`form-group ${errors.admissionFor ? 'has-error' : ''}`}>
                        <label>Admission for <span className="required">*</span></label>
                        <select name="admissionFor" value={formData.admissionFor} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="playgroup">Playgroup</option>
                            <option value="kg1">KG-1</option>
                            <option value="kg2">KG-2</option>
                            <option value="kg3">KG-3</option>
                            <option value="grade1">Grade 1</option>
                            <option value="grade2">Grade 2</option>
                            <option value="grade3">Grade 3</option>
                            <option value="grade4">Grade 4</option>
                            <option value="grade5">Grade 5</option>
                            <option value="grade6">Grade 6</option>
                            <option value="grade7">Grade 7</option>
                            <option value="grade8">Grade 8</option>
                            <option value="grade9">Grade 9</option>
                            <option value="grade10">Grade 10</option>
                        </select>
                        {errors.admissionFor && <span className="field-error">{errors.admissionFor}</span>}
                    </div>

                    <div className={`form-group ${errors.contactPersonName ? 'has-error' : ''}`}>
                        <label>Contact Person Name <span className="required">*</span></label>
                        <input type="text" name="contactPersonName" placeholder="Contact Person Name" value={formData.contactPersonName} onChange={handleChange} required />
                        {errors.contactPersonName && <span className="field-error">{errors.contactPersonName}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className={`form-group ${errors.contactPersonMobile ? 'has-error' : ''}`}>
                        <label>Contact Person Mobile <span className="required">*</span></label>
                        <input
                            type="tel"
                            name="contactPersonMobile"
                            placeholder="Contact Person Mobile"
                            value={formData.contactPersonMobile}
                            onChange={handleChange}
                            required
                            maxLength={10}
                            inputMode="numeric"
                        />
                        {errors.contactPersonMobile && <span className="field-error">{errors.contactPersonMobile}</span>}
                    </div>

                    <div className={`form-group ${errors.studentNameBlock ? 'has-error' : ''}`}>
                        <label>Name of the Student (IN BLOCK LETTERS) <span className="required">*</span></label>
                        <input
                            type="text"
                            name="studentNameBlock"
                            placeholder="STUDENT NAME"
                            value={formData.studentNameBlock}
                            onChange={handleChange}
                            required
                            style={{ textTransform: 'uppercase' }}
                        />
                        {errors.studentNameBlock && <span className="field-error">{errors.studentNameBlock}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label>Remarks (if any):</label>
                    <textarea name="remarks" placeholder="Remarks (if any)" value={formData.remarks} onChange={handleChange} rows={1} />
                </div>

                <button type="submit" className="submit-btn highlight" disabled={submitting}>
                    {submitting ? (
                        <div className="btn-content">
                            <span>Submitting...</span>
                            <div className="loader"></div>
                        </div>
                    ) : (
                        'Submit'
                    )}
                </button>

                <div className="form-footer">
                    <p className="recaptcha-notice">
                        This site is protected by reCAPTCHA and the Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ApplyForm;
