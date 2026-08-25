from database import db
import json

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    service_code = db.Column(db.String(50), unique=True, nullable=False) # e.g. ELEC-VOTER-01
    title = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(80), nullable=False) # Election, Identity, Certificates, Welfare, Transport, etc.
    department = db.Column(db.String(150), nullable=False)
    short_desc = db.Column(db.String(255), nullable=False)
    detailed_desc = db.Column(db.Text, nullable=False)
    eligibility = db.Column(db.Text, nullable=False) # Stored as JSON string or text
    required_docs = db.Column(db.Text, nullable=False) # Stored as JSON array or text
    processing_time = db.Column(db.String(50), nullable=False, default='3 - 7 Business Days')
    fee = db.Column(db.String(50), nullable=False, default='Free')
    icon_name = db.Column(db.String(50), nullable=False, default='FileText')
    target_adapter = db.Column(db.String(50), nullable=False, default='election') # target adapter key
    is_active = db.Column(db.Boolean, default=True)

    applications = db.relationship('Application', backref='service', lazy=True)

    def to_dict(self):
        try:
            docs = json.loads(self.required_docs)
        except Exception:
            docs = [self.required_docs]
            
        try:
            elig = json.loads(self.eligibility)
        except Exception:
            elig = [self.eligibility]

        return {
            'id': self.id,
            'service_code': self.service_code,
            'title': self.title,
            'category': self.category,
            'department': self.department,
            'short_desc': self.short_desc,
            'detailed_desc': self.detailed_desc,
            'eligibility': elig,
            'required_docs': docs,
            'processing_time': self.processing_time,
            'fee': self.fee,
            'icon_name': self.icon_name,
            'target_adapter': self.target_adapter,
            'is_active': self.is_active
        }
