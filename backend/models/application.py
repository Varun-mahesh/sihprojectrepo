from database import db
from datetime import datetime
import json

class Application(db.Model):
    __tablename__ = 'applications'

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.String(50), unique=True, nullable=False) # e.g. APP-2026-00125
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='Submitted') # Submitted, Under Verification, Department Processing, Approved, Rejected
    timeline_json = db.Column(db.Text, nullable=False) # JSON array of history timeline stages
    form_data_json = db.Column(db.Text, nullable=True) # JSON payload submitted by citizen
    remarks = db.Column(db.Text, nullable=True, default='Application received by Central Portal dispatcher.')
    official_doc_ref = db.Column(db.String(100), nullable=True) # E-Certificate / Ref ID when approved
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        try:
            timeline = json.loads(self.timeline_json) if self.timeline_json else []
        except Exception:
            timeline = []

        try:
            form_data = json.loads(self.form_data_json) if self.form_data_json else {}
        except Exception:
            form_data = {}

        return {
            'id': self.id,
            'application_id': self.application_id,
            'user_id': self.user_id,
            'service_id': self.service_id,
            'service_title': self.service.title if self.service else 'Unknown Service',
            'service_category': self.service.category if self.service else 'General',
            'department': self.service.department if self.service else 'Government Portal',
            'status': self.status,
            'timeline': timeline,
            'form_data': form_data,
            'remarks': self.remarks,
            'official_doc_ref': self.official_doc_ref,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
