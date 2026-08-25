import json
from database import db
from models.user import User
from models.service import Service
from models.application import Application
from models.notification import Notification
from models.integration import Integration
from models.api_log import ApiLog
from datetime import datetime, timedelta

def seed_database():
    print("Initializing Database Seeding...")

    # Clear existing tables
    db.drop_all()
    db.create_all()

    # 1. Create Default Citizen User
    default_user = User(
        citizen_id="CIT-2026-88192",
        full_name="Yogesh R",
        email="yogesh@citizen.gov.in",
        mobile="+91 98765 43210",
        aadhaar_mock_id="XXXX-XXXX-4910",
        address="Flat 402, Block C, Civil Lines",
        state="Delhi NCR",
        district="New Delhi",
        pincode="110054",
        password_hash="password123"
    )
    db.session.add(default_user)
    db.session.flush()

    # 2. Add Government Services Directory across all required categories
    services_list = [
        # Election Services
        {
            "service_code": "ELEC-VOTER-01",
            "title": "New Voter Registration (Form 6)",
            "category": "Election Services",
            "department": "Election Commission of India",
            "short_desc": "Apply for enrollment in Electoral Roll and get issued a new Voter ID (EPIC) Card.",
            "detailed_desc": "Form 6 is used for registration of new voters who have attained 18 years of age or above. Successful application results in the issuance of a digital & physical Electoral Photo Identity Card (EPIC).",
            "eligibility": json.dumps(["Citizen of India", "Must be 18 years of age or older as of qualifying date", "Resident of specified assembly constituency"]),
            "required_docs": json.dumps(["Proof of Age (Birth Certificate / Matriculation Certificate)", "Proof of Residence (Aadhaar / Passport / Utility Bill)", "Passport size Photograph"]),
            "processing_time": "7 - 10 Working Days",
            "fee": "Free of Charge",
            "icon_name": "Vote",
            "target_adapter": "election"
        },
        {
            "service_code": "ELEC-VOTER-02",
            "title": "Voter ID Address & Constituency Transfer (Form 8)",
            "category": "Election Services",
            "department": "Election Commission of India",
            "short_desc": "Shift electoral residence address or correct particulars in existing Voter ID.",
            "detailed_desc": "Form 8 is designed for shifting of residence within or outside constituency, correction of entries in electoral roll, or replacement of damaged EPIC card.",
            "eligibility": json.dumps(["Registered Indian Voter with valid EPIC Number", "Valid proof of new residence"]),
            "required_docs": json.dumps(["Existing EPIC Card Copy", "Proof of New Address"]),
            "processing_time": "5 - 7 Working Days",
            "fee": "Free of Charge",
            "icon_name": "Vote",
            "target_adapter": "election"
        },

        # Identity & Documents
        {
            "service_code": "IDENT-AADHAAR-01",
            "title": "Aadhaar Demographic & Address Update",
            "category": "Identity & Documents",
            "department": "Unique Identification Authority of India (UIDAI)",
            "short_desc": "Update your address, mobile number, or name in your official Aadhaar profile.",
            "detailed_desc": "Enables citizens to update demographic details directly using verified document uploads. All updates are verified by UIDAI Regional Data Centers.",
            "eligibility": json.dumps(["Holder of valid 12-digit Aadhaar Number", "Active mobile number linked for OTP"]),
            "required_docs": json.dumps(["Proof of Identity (PAN Card / Passport)", "Proof of Address (Utility Bill / Bank Statement)"]),
            "processing_time": "3 - 5 Working Days",
            "fee": "₹ 50.00",
            "icon_name": "ShieldCheck",
            "target_adapter": "identity"
        },
        {
            "service_code": "IDENT-PASS-01",
            "title": "Ordinary Passport Renewal & Application",
            "category": "Identity & Documents",
            "department": "Ministry of External Affairs (Consular & Passport Division)",
            "short_desc": "Apply for new 36-page or 60-page Indian Passport or re-issue of expiring passport.",
            "detailed_desc": "Comprehensive online application for Fresh/Re-issue of Passport with integrated appointment booking at Passport Seva Kendra (PSK).",
            "eligibility": json.dumps(["Indian Citizen", "No pending criminal proceedings"]),
            "required_docs": json.dumps(["Proof of Present Address", "Proof of Date of Birth", "Non-ECR proof if eligible"]),
            "processing_time": "10 - 14 Business Days",
            "fee": "₹ 1,500.00",
            "icon_name": "ShieldCheck",
            "target_adapter": "identity"
        },

        # Certificates
        {
            "service_code": "CERT-INC-01",
            "title": "Issuance of Income Certificate",
            "category": "Certificates",
            "department": "Department of Revenue & e-District Portal",
            "short_desc": "Obtain official state-verified annual income certificate for educational & welfare aid.",
            "detailed_desc": "The Income Certificate verifies annual family income from all sources. Required for fee concessions, government scholarships, and social welfare schemes.",
            "eligibility": json.dumps(["Resident of the state for minimum 3 years", "Valid income proof from employer or self-declaration"]),
            "required_docs": json.dumps(["Aadhaar Card", "Salary Slip or Income Tax Return / Affidavit", "Ration Card copy"]),
            "processing_time": "3 - 5 Working Days",
            "fee": "₹ 20.00",
            "icon_name": "Award",
            "target_adapter": "certificate"
        },
        {
            "service_code": "CERT-DOM-02",
            "title": "Permanent Resident & Domicile Certificate",
            "category": "Certificates",
            "department": "Department of Revenue",
            "short_desc": "Official proof of permanent residence within state jurisdiction.",
            "detailed_desc": "Issued by the Sub-Divisional Magistrate (SDM) / Tehsildar to certify that the applicant is a permanent resident of the State/UT.",
            "eligibility": json.dumps(["Continuous residence in state for minimum 10 years or property ownership"]),
            "required_docs": json.dumps(["Electricity / Water bill of last 10 years", "School Leaving Certificate", "Aadhaar Card"]),
            "processing_time": "5 - 7 Working Days",
            "fee": "Free of Charge",
            "icon_name": "Award",
            "target_adapter": "certificate"
        },

        # Welfare Schemes
        {
            "service_code": "WELF-KISAN-01",
            "title": "PM-KISAN Samman Nidhi Direct Benefit",
            "category": "Welfare Schemes",
            "department": "Ministry of Agriculture & Farmers Welfare",
            "short_desc": "Financial assistance of ₹6,000 per year directly transferred to landholding farmer bank accounts.",
            "detailed_desc": "Direct Benefit Transfer (DBT) scheme providing supplemental income support to small and marginal farmer households across India.",
            "eligibility": json.dumps(["Landholding farmer family with cultivable landholding in revenue records", "Aadhaar-seeded bank account"]),
            "required_docs": json.dumps(["Land Record Papers (Khatauni / Khasra)", "Aadhaar Card", "Bank Passbook with IFSC"]),
            "processing_time": "7 - 12 Working Days",
            "fee": "Free of Charge",
            "icon_name": "HeartHandshake",
            "target_adapter": "welfare"
        },
        {
            "service_code": "WELF-PENS-02",
            "title": "Indira Gandhi National Senior Citizen Pension",
            "category": "Welfare Schemes",
            "department": "Ministry of Rural Development",
            "short_desc": "Monthly financial pension for senior citizens belonging to Below Poverty Line (BPL) families.",
            "detailed_desc": "Social assistance scheme providing monthly cash assistance directly to elderly citizens aged 60 years and above.",
            "eligibility": json.dumps(["Age 60 years or above", "Belongs to household below the poverty line (BPL)"]),
            "required_docs": json.dumps(["Age Proof (Aadhaar / Voter ID)", "BPL Ration Card Copy", "Bank Passbook Details"]),
            "processing_time": "10 - 15 Working Days",
            "fee": "Free of Charge",
            "icon_name": "HeartHandshake",
            "target_adapter": "welfare"
        },

        # Education
        {
            "service_code": "EDU-SCHOL-01",
            "title": "National Scholarship Portal (NSP) Application",
            "category": "Education",
            "department": "Ministry of Education & Minority Affairs",
            "short_desc": "Centralized scholarship portal for pre-matric, post-matric, and higher education aid.",
            "detailed_desc": "Unified portal offering financial assistance to meritorious students from low-income households for pursuing school & college education.",
            "eligibility": json.dumps(["Enrolled in recognized educational institution", "Family income within designated scheme threshold"]),
            "required_docs": json.dumps(["Student Marksheet", "Income Certificate", "Institution Bonafide Certificate", "Bank Passbook"]),
            "processing_time": "15 - 20 Working Days",
            "fee": "Free of Charge",
            "icon_name": "GraduationCap",
            "target_adapter": "welfare"
        },

        # Employment
        {
            "service_code": "EMP-NCS-01",
            "title": "National Career Service (NCS) Job Registration",
            "category": "Employment",
            "department": "Ministry of Labour & Employment",
            "short_desc": "Register on national employment exchange for job matching, career counseling, and job fairs.",
            "detailed_desc": "Connects jobseekers with public and private employers nationwide. Provides skill training recommendations and verified job postings.",
            "eligibility": json.dumps(["Indian Resident aged 18 to 60", "Any educational qualification"]),
            "required_docs": json.dumps(["Aadhaar Card", "Educational Certificates / Resume"]),
            "processing_time": "Immediate (Instant e-Card)",
            "fee": "Free of Charge",
            "icon_name": "Briefcase",
            "target_adapter": "identity"
        },

        # Health
        {
            "service_code": "HLTH-ABHA-01",
            "title": "Ayushman Bharat Health Account (ABHA) ID Generation",
            "category": "Health",
            "department": "National Health Authority (NHA)",
            "short_desc": "Create your unique 14-digit digital health ID to link all medical records & lab reports.",
            "detailed_desc": "ABHA card establishes a digital health identity across hospitals, clinics, and diagnostic labs, allowing secure consent-based access to personal health records.",
            "eligibility": json.dumps(["All Indian Citizens"]),
            "required_docs": json.dumps(["Aadhaar Card with linked Mobile Number"]),
            "processing_time": "Instant Digital Generation",
            "fee": "Free of Charge",
            "icon_name": "Activity",
            "target_adapter": "identity"
        },

        # Transport
        {
            "service_code": "TRANS-DL-01",
            "title": "Driving License Renewal & Slot Booking",
            "category": "Transport",
            "department": "Ministry of Road Transport & Highways (Sarathi Portal)",
            "short_desc": "Renew expiring Driving License online with biometric verification and slot selection.",
            "detailed_desc": "Allows drivers to renew non-transport and transport driving licenses before or after expiration date with automated RTO integration.",
            "eligibility": json.dumps(["Hold existing Driving License due for renewal", "Medical Fitness Certificate for applicants over 40 years"]),
            "required_docs": json.dumps(["Existing DL Card", "Medical Certificate (Form 1A)", "Address Proof"]),
            "processing_time": "3 - 5 Business Days",
            "fee": "₹ 200.00",
            "icon_name": "Car",
            "target_adapter": "transport"
        }
    ]

    service_db_map = {}
    for s_data in services_list:
        service_obj = Service(
            service_code=s_data["service_code"],
            title=s_data["title"],
            category=s_data["category"],
            department=s_data["department"],
            short_desc=s_data["short_desc"],
            detailed_desc=s_data["detailed_desc"],
            eligibility=s_data["eligibility"],
            required_docs=s_data["required_docs"],
            processing_time=s_data["processing_time"],
            fee=s_data["fee"],
            icon_name=s_data["icon_name"],
            target_adapter=s_data["target_adapter"]
        )
        db.session.add(service_obj)
        db.session.flush()
        service_db_map[s_data["service_code"]] = service_obj.id

    # 3. Create Sample Applications with realistic progress timelines
    now = datetime.utcnow()

    # Application 1: Voter Card (Approved)
    timeline_1 = [
        {"stage": "Submitted", "title": "Application Submitted", "timestamp": (now - timedelta(days=5)).strftime("%Y-%m-%d %H:%M UTC"), "status": "completed", "description": "Form 6 submitted via Central Portal dispatcher."},
        {"stage": "Under Verification", "title": "BLO Field Verification", "timestamp": (now - timedelta(days=3)).strftime("%Y-%m-%d %H:%M UTC"), "status": "completed", "description": "Verification completed by Booth Level Officer (Rajinder Kumar)."},
        {"stage": "Department Processing", "title": "Electoral Registration Officer Review", "timestamp": (now - timedelta(days=1)).strftime("%Y-%m-%d %H:%M UTC"), "status": "completed", "description": "Approved by ERO Assembly Constituency AC-40."},
        {"stage": "Approved", "title": "EPIC Issued & Digitally Signed", "timestamp": now.strftime("%Y-%m-%d %H:%M UTC"), "status": "completed", "description": "EPIC Voter Card issued: EPIC-NEW-882910"}
    ]
    app_1 = Application(
        application_id="APP-2026-00125",
        user_id=default_user.id,
        service_id=service_db_map["ELEC-VOTER-01"],
        status="Approved",
        timeline_json=json.dumps(timeline_1),
        form_data_json=json.dumps({"applicant_name": "Yogesh R", "dob": "1994-05-12", "constituency": "New Delhi"}),
        remarks="EPIC Card issued successfully. Physical card dispatched via speed post.",
        official_doc_ref="EPIC-NEW-882910",
        submitted_at=now - timedelta(days=5)
    )
    db.session.add(app_1)

    # Application 2: Income Certificate (Department Processing)
    timeline_2 = [
        {"stage": "Submitted", "title": "Application Received", "timestamp": (now - timedelta(days=2)).strftime("%Y-%m-%d %H:%M UTC"), "status": "completed", "description": "Income Certificate application received at Revenue Gateway."},
        {"stage": "Under Verification", "title": "Document Verification", "timestamp": (now - timedelta(days=1)).strftime("%Y-%m-%d %H:%M UTC"), "status": "completed", "description": "Aadhaar & Salary slip verified via API Service."},
        {"stage": "Department Processing", "title": "Tehsildar Digital Approval Queue", "timestamp": now.strftime("%Y-%m-%d %H:%M UTC"), "status": "current", "description": "Pending final electronic signature of Tehsildar."},
        {"stage": "Approved", "title": "Certificate Issuance", "timestamp": "Pending", "status": "upcoming", "description": "Will be downloadable in Citizen Vault upon approval."}
    ]
    app_2 = Application(
        application_id="APP-2026-00198",
        user_id=default_user.id,
        service_id=service_db_map["CERT-INC-01"],
        status="Department Processing",
        timeline_json=json.dumps(timeline_2),
        form_data_json=json.dumps({"applicant_name": "Yogesh R", "declared_income": "₹ 2,80,000", "occupation": "Private Service"}),
        remarks="Assigned to Circle Revenue Officer for e-signature.",
        submitted_at=now - timedelta(days=2)
    )
    db.session.add(app_2)

    # Application 3: Driving License Renewal (Under Verification)
    timeline_3 = [
        {"stage": "Submitted", "title": "RTO Application Lodged", "timestamp": now.strftime("%Y-%m-%d 09:30 UTC"), "status": "completed", "description": "Dispatched to Sarathi Transport National Repository."},
        {"stage": "Under Verification", "title": "Sarathi Biometric & Medical Check", "timestamp": now.strftime("%Y-%m-%d 10:15 UTC"), "status": "current", "description": "Automated verification of medical fitness certificate."},
        {"stage": "Department Processing", "title": "RTO Officer Endorsement", "timestamp": "Pending", "status": "upcoming", "description": "RTO Officer final endorsement."},
        {"stage": "Approved", "title": "DL Smart Card Dispatch", "timestamp": "Pending", "status": "upcoming", "description": "DL Smart Card printing and postal dispatch."}
    ]
    app_3 = Application(
        application_id="APP-2026-00244",
        user_id=default_user.id,
        service_id=service_db_map["TRANS-DL-01"],
        status="Under Verification",
        timeline_json=json.dumps(timeline_3),
        form_data_json=json.dumps({"dl_number": "DL-1420210088912", "rto_office": "RTO New Delhi Central (DL-01)"}),
        remarks="Medical Certificate Form 1A verified electronically.",
        submitted_at=now
    )
    db.session.add(app_3)

    # 4. Add Government Platform Integrations for Interoperability Demo
    integrations_list = [
        {
            "integration_code": "ELECTION_API",
            "system_name": "Election Commission Service API",
            "department": "Election Commission of India",
            "adapter_type": "election",
            "endpoint_url": "https://api.eci.gov.in/v1/voter-services",
            "connection_status": "Connected",
            "api_status": "Successful",
            "avg_latency_ms": 110,
            "success_rate": 99.9,
            "data_source": "Electoral Search National Database"
        },
        {
            "integration_code": "IDENTITY_API",
            "system_name": "National Identity & DigiLocker Vault API",
            "department": "UIDAI & Ministry of Electronics & IT",
            "adapter_type": "identity",
            "endpoint_url": "https://api.digilocker.gov.in/v3/auth-kyc",
            "connection_status": "Connected",
            "api_status": "Successful",
            "avg_latency_ms": 95,
            "success_rate": 100.0,
            "data_source": "National Identity Authentication Server"
        },
        {
            "integration_code": "CERTIFICATE_API",
            "system_name": "State Revenue & e-District Certificate API",
            "department": "Department of Revenue",
            "adapter_type": "certificate",
            "endpoint_url": "https://edistrict.gov.in/api/v2/certificates",
            "connection_status": "Connected",
            "api_status": "Successful",
            "avg_latency_ms": 140,
            "success_rate": 99.6,
            "data_source": "e-District Revenue Registry"
        },
        {
            "integration_code": "WELFARE_API",
            "system_name": "Social Welfare & PFMS DBT Gateway API",
            "department": "Ministry of Social Justice & PFMS",
            "adapter_type": "welfare",
            "endpoint_url": "https://pfms.nic.in/api/v1/dbt-verification",
            "connection_status": "Connected",
            "api_status": "Successful",
            "avg_latency_ms": 125,
            "success_rate": 99.8,
            "data_source": "Public Financial Management System (PFMS)"
        },
        {
            "integration_code": "TRANSPORT_API",
            "system_name": "Sarathi & Vahan Transport Portal API",
            "department": "Ministry of Road Transport & Highways",
            "adapter_type": "transport",
            "endpoint_url": "https://parivahan.gov.in/api/v1/sarathi-dl",
            "connection_status": "Connected",
            "api_status": "Successful",
            "avg_latency_ms": 130,
            "success_rate": 99.7,
            "data_source": "Sarathi Driving License National Repository"
        }
    ]

    for ig in integrations_list:
        obj = Integration(**ig)
        db.session.add(obj)

    # 5. Add Initial Notifications
    notifications_list = [
        {
            "user_id": default_user.id,
            "title": "Application Approved (APP-2026-00125)",
            "message": "Your Form 6 Voter Registration has been approved. Digital Voter ID is ready for download in your vault.",
            "notification_type": "success"
        },
        {
            "user_id": default_user.id,
            "title": "Department Processing (APP-2026-00198)",
            "message": "Your Income Certificate application has been assigned to Tahsildar for electronic signature.",
            "notification_type": "info"
        },
        {
            "user_id": default_user.id,
            "title": "Welcome to Unified Portal",
            "message": "Access all central & state government digital services seamlessly from a single login.",
            "notification_type": "info"
        }
    ]

    for n in notifications_list:
        db.session.add(Notification(**n))

    # 6. Add Initial API Logs
    initial_logs = [
        {
            "endpoint": "/api/external/election/voter-verify",
            "method": "POST",
            "status_code": 200,
            "latency_ms": 105,
            "request_payload": json.dumps({"service_code": "ELEC-VOTER-01", "epic_no": "EPIC-882910"}),
            "response_payload": json.dumps({"status": "success", "verified": True, "constituency": "New Delhi AC-40"})
        },
        {
            "endpoint": "/api/external/identity/aadhaar-verify",
            "method": "POST",
            "status_code": 200,
            "latency_ms": 88,
            "request_payload": json.dumps({"aadhaar_no": "XXXX-XXXX-4910", "action": "eKYC_verification"}),
            "response_payload": json.dumps({"status": "success", "kyc_status": "FULL_KYC_VERIFIED"})
        },
        {
            "endpoint": "/api/external/certificates/issue-income",
            "method": "POST",
            "status_code": 200,
            "latency_ms": 135,
            "request_payload": json.dumps({"application_id": "APP-2026-00198", "service_code": "CERT-INC-01"}),
            "response_payload": json.dumps({"status": "success", "assigned_authority": "Revenue Inspector"})
        }
    ]

    for log in initial_logs:
        db.session.add(ApiLog(**log))

    db.session.commit()
    print("Database Seeding Completed Successfully!")

if __name__ == '__main__':
    from app import app
    with app.app_context():
        seed_database()
