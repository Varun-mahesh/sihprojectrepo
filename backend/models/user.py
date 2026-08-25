from database import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    citizen_id = db.Column(db.String(50), unique=True, nullable=False) # e.g. CIT-2026-88192
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    mobile = db.Column(db.String(20), nullable=False)
    aadhaar_mock_id = db.Column(db.String(20), nullable=True) # Masked e.g. XXXX-XXXX-4910
    address = db.Column(db.String(255), nullable=True)
    state = db.Column(db.String(100), nullable=True, default='Delhi NCR')
    district = db.Column(db.String(100), nullable=True, default='New Delhi')
    pincode = db.Column(db.String(10), nullable=True, default='110001')
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    applications = db.relationship('Application', backref='user', lazy=True)
    notifications = db.relationship('Notification', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'citizen_id': self.citizen_id,
            'full_name': self.full_name,
            'email': self.email,
            'mobile': self.mobile,
            'aadhaar_mock_id': self.aadhaar_mock_id,
            'address': self.address,
            'state': self.state,
            'district': self.district,
            'pincode': self.pincode,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
