from flask import Blueprint, request, jsonify

mock_external_bp = Blueprint('mock_external', __name__)

@mock_external_bp.route('/election/voter-verify', methods=['POST'])
def mock_election_verify():
    data = request.get_json() or {}
    epic = data.get('epic_no', 'EPIC-992102')
    return jsonify({
        "status": "success",
        "service": "Election Commission Service API",
        "data": {
            "epic_number": epic,
            "voter_name": "Rajesh Sharma",
            "polling_booth": "Central Govt Secondary School, Room 4",
            "constituency": "New Delhi - 04",
            "electoral_status": "Active / Enrolled"
        }
    })

@mock_external_bp.route('/identity/aadhaar-verify', methods=['POST'])
def mock_identity_verify():
    data = request.get_json() or {}
    aadhaar = data.get('aadhaar_no', 'XXXX-XXXX-4910')
    return jsonify({
        "status": "success",
        "service": "National Identity Authentication API",
        "data": {
            "masked_aadhaar": aadhaar,
            "kyc_verified": True,
            "biometric_token": "BIO-VALID-2026-X99",
            "issuer": "Unique Identification Authority of India (UIDAI)"
        }
    })

@mock_external_bp.route('/certificates/issue-income', methods=['POST'])
def mock_certificate_issue():
    data = request.get_json() or {}
    applicant = data.get('applicant_name', 'Citizen')
    return jsonify({
        "status": "success",
        "service": "Revenue & e-District Certificate API",
        "data": {
            "certificate_type": "Annual Family Income Certificate",
            "applicant": applicant,
            "approved_amount": "₹ 2,40,000 P.A.",
            "certificate_id": "CERT-REV-2026-90412",
            "digital_sign_hash": "SHA256:e89a2b91048f..."
        }
    })

@mock_external_bp.route('/welfare/dbt-verify', methods=['POST'])
def mock_welfare_verify():
    return jsonify({
        "status": "success",
        "service": "PFMS & Social Welfare Direct Benefit API",
        "data": {
            "scheme": "Pradhan Mantri KISAN Samman Nidhi",
            "eligibility_status": "Eligible / Account Seeded",
            "annual_benefit": "₹ 6,000",
            "bank_name": "State Bank of India (IFSC: SBIN0001021)"
        }
    })

@mock_external_bp.route('/transport/dl-verify', methods=['POST'])
def mock_transport_verify():
    return jsonify({
        "status": "success",
        "service": "Ministry of Road Transport & Sarathi API",
        "data": {
            "dl_number": "DL-1420210088912",
            "class_of_vehicle": "MCWG / LMV",
            "validity_expiry": "2031-10-14",
            "rto_location": "RTO New Delhi Central"
        }
    })
