const API_BASE_URL = 'http://localhost:3000/api';

interface SignupPayload {
  nome: string;
  senha: string;
}

interface LoginPayload {
  nome: string;
  senha: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  error?: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export const authService = {
  async signup(nome: string, password: string): Promise<SignupResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          senha: password,
        } as SignupPayload),
      });

      if (response.status === 204) {
        return {
          success: true,
          data: {},
        };
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Erro ao criar conta',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro na conexão',
      };
    }
  },

  async login(nome: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          senha: password,
        } as LoginPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Erro ao fazer login',
        };
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return {
        success: true,
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro na conexão',
      };
    }
  },
};
