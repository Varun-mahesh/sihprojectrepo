from services.adapters.base_adapter import BaseGovtAdapter
from services.adapters.election_adapter import ElectionGovtAdapter
from services.adapters.identity_adapter import IdentityGovtAdapter
from services.adapters.certificate_adapter import CertificateGovtAdapter
from services.adapters.welfare_adapter import WelfareGovtAdapter
from services.adapters.transport_adapter import TransportGovtAdapter

__all__ = [
    'BaseGovtAdapter',
    'ElectionGovtAdapter',
    'IdentityGovtAdapter',
    'CertificateGovtAdapter',
    'WelfareGovtAdapter',
    'TransportGovtAdapter'
]
