from database import db
from datetime import datetime
import json

class ApiLog(db.Model):
    __tablename__ = 'api_logs'

    id = db.Column(db.Integer, primary_key=True)
    endpoint = db.Column(db.String(255), nullable=False)
    method = db.Column(db.String(10), nullable=False)
    status_code = db.Column(db.Integer, nullable=False)
    latency_ms = db.Column(db.Integer, nullable=False)
    request_payload = db.Column(db.Text, nullable=True)
    response_payload = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        try:
            req = json.loads(self.request_payload) if self.request_payload else None
        except Exception:
            req = self.request_payload

        try:
            res = json.loads(self.response_payload) if self.response_payload else None
        except Exception:
            res = self.response_payload

        return {
            'id': self.id,
            'endpoint': self.endpoint,
            'method': self.method,
            'status_code': self.status_code,
            'latency_ms': self.latency_ms,
            'request_payload': req,
            'response_payload': res,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }
