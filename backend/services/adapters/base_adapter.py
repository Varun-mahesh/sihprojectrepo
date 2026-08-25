from abc import ABC, abstractmethod
import time
import requests

class BaseGovtAdapter(ABC):
    """
    Abstract Base Class for all Government Platform Adapters.
    Encapsulates platform-specific security headers, payload mapping,
    and API calls. Standardizes all external government API responses
    into a unified structure.
    """

    def __init__(self, api_key=None, base_url=None):
        self.api_key = api_key
        self.base_url = base_url

    @abstractmethod
    def get_system_code(self) -> str:
        """Returns unique system identifier code (e.g. ELECTION_API)."""
        pass

    @abstractmethod
    def get_system_name(self) -> str:
        """Returns human readable department system name."""
        pass

    @abstractmethod
    def verify_citizen(self, citizen_id: str, identity_ref: str) -> dict:
        """Verifies citizen credentials against the government department registry."""
        pass

    @abstractmethod
    def process_application(self, service_code: str, application_id: str, form_data: dict) -> dict:
        """Dispatches service application payload to the government department system."""
        pass

    @abstractmethod
    def fetch_application_status(self, application_id: str, external_ref_id: str = None) -> dict:
        """Queries current processing state from the government department backend."""
        pass

    def _build_headers(self) -> dict:
        return {
            'Content-Type': 'application/json',
            'X-Gov-Platform-Key': self.api_key or 'mock-gateway-key-2026',
            'X-Portal-Agent': 'UnifiedGovCitizenPortal/v1.0'
        }

    def _execute_request(self, method: str, endpoint: str, json_data: dict = None) -> tuple:
        """Helper to execute HTTP requests with latency tracking and mock fallback."""
        start_time = time.time()
        url = f"{self.base_url.rstrip('/')}/{endpoint.lstrip('/')}"
        
        try:
            # Attempts real HTTP request if external endpoint is reachable
            res = requests.request(method, url, json=json_data, headers=self._build_headers(), timeout=3)
            latency = int((time.time() - start_time) * 1000)
            return res.json(), res.status_code, latency
        except Exception:
            # Fallback mock response for offline / standalone demonstration
            latency = int((time.time() - start_time) * 1000) + 45
            return None, 503, latency
