import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    BASE_DIR = BASE_DIR
    SECRET_KEY = os.environ.get('SECRET_KEY', 'gov-portal-secret-key-2026-secure')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', f"sqlite:///{os.path.join(BASE_DIR, 'portal.db')}")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # API Integration Keys (Mocked or real environment variables)
    ELECTION_API_KEY = os.environ.get('ELECTION_API_KEY', 'mock-election-key-sec-8921')
    IDENTITY_API_KEY = os.environ.get('IDENTITY_API_KEY', 'mock-identity-key-sec-4402')
    CERTIFICATE_API_KEY = os.environ.get('CERTIFICATE_API_KEY', 'mock-cert-key-sec-1193')
    WELFARE_API_KEY = os.environ.get('WELFARE_API_KEY', 'mock-welfare-key-sec-9920')
    TRANSPORT_API_KEY = os.environ.get('TRANSPORT_API_KEY', 'mock-transport-key-sec-5541')
    
    # Base URL for local mock endpoints
    MOCK_EXTERNAL_API_BASE = os.environ.get('MOCK_EXTERNAL_API_BASE', 'http://127.0.0.1:5000/api/external')
