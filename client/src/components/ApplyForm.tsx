import React, { useState } from 'react';
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
        contactPersonEmail: '',
        studentNameBlock: '',
        motherTongue: '',
        currentAddress: '',
        awarenessSource: '',
        remarks: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [animating, setAnimating] = useState(false);

    const resetForm = () => {
        setFormData({
            admissionFor: '',
            contactPersonName: '',
            contactPersonMobile: '',
            contactPersonEmail: '',
            studentNameBlock: '',
            motherTongue: '',
            currentAddress: '',
            awarenessSource: '',
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
        if (!formData.contactPersonEmail.trim()) {
            newErrors.contactPersonEmail = 'This field is required.';
        }
        if (!formData.studentNameBlock.trim()) {
            newErrors.studentNameBlock = 'This field is required.';
        }
        if (!formData.motherTongue.trim()) {
            newErrors.motherTongue = 'This field is required.';
        }
        if (!formData.currentAddress.trim()) {
            newErrors.currentAddress = 'This field is required.';
        }
        if (!formData.awarenessSource.trim()) {
            newErrors.awarenessSource = 'This field is required.';
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

        // Email validation (only if not already flagged empty)
        const email = formData.contactPersonEmail.trim();
        if (email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.contactPersonEmail = 'Please enter a valid email address.';
        }

        // Student name must be BLOCK LETTERS
        const studentName = formData.studentNameBlock.trim();
        if (studentName.length > 0 && studentName !== studentName.toUpperCase()) {
            newErrors.studentNameBlock = 'Please enter the student name in BLOCK LETTERS (uppercase only).';
        }

        // Contact person name and student name cannot be the same
        if (
            formData.contactPersonName.trim().length > 0 &&
            studentName.length > 0 &&
            formData.contactPersonName.trim().toUpperCase() === studentName.toUpperCase()
        ) {
            newErrors.studentNameBlock = 'Student name and contact person name cannot be the same.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Google Apps Script Web App URL
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOAtP8WrKhK2Wfang7HHYZ21oS_cvjZIiikMpsQL5nOi1aGImXCh0hGIwnIq8K4DYS/exec";

        const now = new Date();
        const submissionData = {
            ...formData,
            submissionDate: now.toLocaleDateString(),
            submissionTime: now.toLocaleTimeString()
        };

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

            // Fade out form, then show thank you
            setAnimating(true);
            setTimeout(() => {
                setSubmitted(true);
                resetForm();
                setAnimating(false);
            }, 500);

        } catch (error) {
            console.error('Submission error:', error);
            alert('There was an error submitting your form. Please try again later.');
        }
    };

    const handleApplyAgain = () => {
        setAnimating(true);
        setTimeout(() => {
            setSubmitted(false);
            setAnimating(false);
        }, 500);
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
                {submitted ? 'THANK YOU' : 'ENQUIRY FORM'}
            </div>

            {/* FORM VIEW */}
            {!submitted && (
                <form className={`enquiry-form ${animating ? 'fade-out' : 'fade-in'}`} onSubmit={handleSubmit} noValidate>
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

                    <div className={`form-group ${errors.contactPersonEmail ? 'has-error' : ''}`}>
                        <label>Contact Person Email <span className="required">*</span></label>
                        <input type="email" name="contactPersonEmail" placeholder="Contact Person Email" value={formData.contactPersonEmail} onChange={handleChange} required />
                        {errors.contactPersonEmail && <span className="field-error">{errors.contactPersonEmail}</span>}
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

                    <div className={`form-group ${errors.motherTongue ? 'has-error' : ''}`}>
                        <label>Mother Tongue <span className="required">*</span></label>
                        <select name="motherTongue" value={formData.motherTongue} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="assamese">Assamese</option>
                            <option value="awadhi">Awadhi</option>
                            <option value="badagu">Badagu</option>
                            <option value="bengali">Bengali</option>
                            <option value="bhojpuri">Bhojpuri</option>
                            <option value="english">English</option>
                            <option value="gujarati">Gujarati</option>
                            <option value="hindi">Hindi</option>
                            <option value="kannada">Kannada</option>
                            <option value="kodava">Kodava</option>
                            <option value="konkani">Konkani</option>
                            <option value="kutchi">Kutchi</option>
                            <option value="malayalam">Malayalam</option>
                            <option value="marathi">Marathi</option>
                            <option value="marwadi">Marwadi</option>
                            <option value="mathili">Mathili</option>
                            <option value="oriya">Oriya</option>
                            <option value="punjabi">Punjabi</option>
                            <option value="rajastani">Rajastani</option>
                            <option value="sankethi">Sankethi</option>
                            <option value="sindhi">Sindhi</option>
                            <option value="sourashtra">Sourashtra</option>
                            <option value="tamil">Tamil</option>
                            <option value="telugu">Telugu</option>
                            <option value="tulu">Tulu</option>
                            <option value="urdu">Urdu</option>
                            <option value="others">Others</option>
                        </select>
                        {errors.motherTongue && <span className="field-error">{errors.motherTongue}</span>}
                    </div>

                    <div className={`form-group ${errors.currentAddress ? 'has-error' : ''}`}>
                        <label>Current Address <span className="required">*</span></label>
                        <textarea name="currentAddress" placeholder="Current Address" value={formData.currentAddress} onChange={handleChange} required rows={1} />
                        {errors.currentAddress && <span className="field-error">{errors.currentAddress}</span>}
                    </div>

                    <div className={`form-group ${errors.awarenessSource ? 'has-error' : ''}`}>
                        <label>How did you come to know about WISDOMWOOD HIGH? <span className="required">*</span></label>
                        <select name="awarenessSource" value={formData.awarenessSource} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="others">Others</option>
                            <option value="social_media">Social Media</option>
                            <option value="through_flyers">Through Flyers</option>
                            <option value="through_hoarding_banners">Through Hoarding / Banners</option>
                            <option value="through_newspaper">Through Newspaper</option>
                            <option value="word_of_mouth">Through word of mouth</option>
                        </select>
                        {errors.awarenessSource && <span className="field-error">{errors.awarenessSource}</span>}
                    </div>

                    <div className="form-group">
                        <label>Remarks (if any):</label>
                        <textarea name="remarks" placeholder="Remarks (if any)" value={formData.remarks} onChange={handleChange} rows={1} />
                    </div>

                    <button type="submit" className="submit-btn highlight">Submit</button>

                    <div className="form-footer">
                        <p className="recaptcha-notice">
                            This site is protected by reCAPTCHA and the Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
                        </p>
                    </div>
                </form>
            )}

            {/* THANK YOU VIEW */}
            {submitted && (
                <div className={`thank-you-view ${animating ? 'fade-out' : 'fade-in'}`}>
                    <div className="thank-you-icon">✓</div>
                    <h2 className="thank-you-title">Thank You!</h2>
                    <p className="thank-you-message">
                        Your enquiry has been submitted successfully.<br />
                        Our admissions team will contact you within 24-48 hours.
                    </p>
                    <div className="thank-you-buttons">
                        <a href="#" className="btn-secondary">Back to Home</a>
                        <button type="button" className="btn-primary-action" onClick={handleApplyAgain}>Apply Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplyForm;
