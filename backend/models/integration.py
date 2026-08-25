from database import db
from datetime import datetime

class Integration(db.Model):
    __tablename__ = 'integrations'

    id = db.Column(db.Integer, primary_key=True)
    integration_code = db.Column(db.String(50), unique=True, nullable=False) # e.g. ELECTION_API
    system_name = db.Column(db.String(150), nullable=False)
    department = db.Column(db.String(150), nullable=False)
    adapter_type = db.Column(db.String(50), nullable=False) # election, identity, certificate, welfare, transport
    endpoint_url = db.Column(db.String(255), nullable=False)
    connection_status = db.Column(db.String(30), default='Connected') # Connected, Degraded, Disconnected
    api_status = db.Column(db.String(30), default='Successful') # Successful, Maintenance, Failed
    avg_latency_ms = db.Column(db.Integer, default=120)
    success_rate = db.Column(db.Float, default=99.8)
    data_source = db.Column(db.String(100), default='Government Core Portal API Gateway')
    last_sync = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'integration_code': self.integration_code,
            'system_name': self.system_name,
            'department': self.department,
            'adapter_type': self.adapter_type,
            'endpoint_url': self.endpoint_url,
            'connection_status': self.connection_status,
            'api_status': self.api_status,
            'avg_latency_ms': self.avg_latency_ms,
            'success_rate': self.success_rate,
            'data_source': self.data_source,
            'last_sync': self.last_sync.isoformat() if self.last_sync else None
        }
