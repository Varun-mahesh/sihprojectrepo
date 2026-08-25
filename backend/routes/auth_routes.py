from flask import Blueprint, request, jsonify
from database import db
from models.user import User
import uuid

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    full_name = data.get('full_name')
    email = data.get('email')
    mobile = data.get('mobile')
    password = data.get('password')

    if not full_name or not email or not mobile or not password:
        return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

    existing_user = User.query.filter((User.email == email) | (User.mobile == mobile)).first()
    if existing_user:
        return jsonify({'status': 'error', 'message': 'User with this email or mobile already exists'}), 400

    citizen_id = f"CIT-2026-{str(uuid.uuid4().int)[:6]}"
    masked_aadhaar = f"XXXX-XXXX-{str(uuid.uuid4().int)[:4]}"

    user = User(
        citizen_id=citizen_id,
        full_name=full_name,
        email=email,
        mobile=mobile,
        aadhaar_mock_id=masked_aadhaar,
        password_hash=password # For demo prototype
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Registration successful. OTP verification required.',
        'user': user.to_dict(),
        'requires_otp': True,
        'mock_otp': '123456'
    })

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    identifier = data.get('identifier') # email or mobile
    password = data.get('password')

    if not identifier or not password:
        return jsonify({'status': 'error', 'message': 'Please provide email/mobile and password'}), 400

    user = User.query.filter((User.email == identifier) | (User.mobile == identifier)).first()
    if not user or user.password_hash != password:
        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

    return jsonify({
        'status': 'success',
        'message': 'Credentials verified. OTP sent to registered mobile.',
        'user': user.to_dict(),
        'requires_otp': True,
        'mock_otp': '123456'
    })

@auth_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json() or {}
    otp = data.get('otp')
    user_id = data.get('user_id')

    if otp != '123456' and otp != '654321':
        return jsonify({'status': 'error', 'message': 'Invalid OTP entered. (Use demo OTP: 123456)'}), 400

    user = User.query.get(user_id) if user_id else User.query.first()
    if not user:
        return jsonify({'status': 'error', 'message': 'User session not found'}), 404

    return jsonify({
        'status': 'success',
        'message': 'Identity authenticated successfully.',
        'token': f"session-token-citizen-{user.citizen_id}",
        'user': user.to_dict()
    })

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    # Returns default logged in citizen for demo convenience
    user = User.query.first()
    if not user:
        return jsonify({'status': 'error', 'message': 'No profile found'}), 404
    return jsonify({'status': 'success', 'user': user.to_dict()})
